'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
import { adminResourceDefinitions, type ResourceKey } from '@/lib/admin-resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type AdminContentMap = {
  [K in ResourceKey]: unknown[];
};

type AdminDashboardProps = {
  initialData: AdminContentMap;
  email: string;
};

function getValueByPath(target: Record<string, unknown>, path: string) {
  return path.split('.').reduce<unknown>((value, segment) => {
    if (value && typeof value === 'object' && segment in value) {
      return (value as Record<string, unknown>)[segment];
    }
    return undefined;
  }, target);
}

function setValueByPath(target: Record<string, unknown>, path: string, value: unknown) {
  const clone = structuredClone(target);
  const segments = path.split('.');
  let cursor: Record<string, unknown> = clone;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      cursor[segment] = value;
      return;
    }
    if (!cursor[segment] || typeof cursor[segment] !== 'object') {
      cursor[segment] = {};
    }
    cursor = cursor[segment] as Record<string, unknown>;
  });

  return clone;
}

export function AdminDashboard({ initialData, email }: AdminDashboardProps) {
  const router = useRouter();
  const resourceKeys = Object.keys(adminResourceDefinitions) as ResourceKey[];
  const [selectedResource, setSelectedResource] = useState<ResourceKey>('products');
  const [records, setRecords] = useState<AdminContentMap>(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [draft, setDraft] = useState<Record<string, unknown> | null>(structuredClone((initialData.products[0] ?? adminResourceDefinitions.products.emptyItem) as Record<string, unknown>));
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [uploadingField, setUploadingField] = useState('');

  const resourceDefinition = adminResourceDefinitions[selectedResource];
  const items = (records[selectedResource] ?? []) as Record<string, unknown>[];
  const activeItem = draft ?? structuredClone((items[selectedIndex] ?? resourceDefinition.emptyItem) as Record<string, unknown>);

  const selectedItemLabel = useMemo(() => {
    const item = items[selectedIndex];
    if (!item) return `New ${resourceDefinition.singularLabel}`;
    return String(item.title ?? item.name ?? item.slug ?? item.id ?? resourceDefinition.singularLabel);
  }, [items, resourceDefinition.singularLabel, selectedIndex]);

  function switchResource(resource: ResourceKey) {
    const nextItems = (records[resource] ?? []) as Record<string, unknown>[];
    setSelectedResource(resource);
    setSelectedIndex(0);
    setDraft(structuredClone((nextItems[0] ?? adminResourceDefinitions[resource].emptyItem) as Record<string, unknown>));
    setStatus('');
  }

  function selectRecord(index: number) {
    const item = (records[selectedResource][index] ?? resourceDefinition.emptyItem) as Record<string, unknown>;
    setSelectedIndex(index);
    setDraft(structuredClone(item));
    setStatus('');
  }

  async function handleSave() {
    setIsSaving(true);
    setStatus('');

    const isNew = !items[selectedIndex] || selectedIndex === -1;

    try {
      const response = await fetch(`/api/admin/content/${selectedResource}`, {
        method: resourceDefinition.singleton ? 'PUT' : isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to save this record.');
        return;
      }

      const nextItems = [...items];

      if (resourceDefinition.singleton) {
        nextItems[0] = payload.item;
        setRecords({ ...records, [selectedResource]: nextItems });
        setDraft(structuredClone(payload.item));
      } else if (isNew) {
        nextItems.push(payload.item);
        setRecords({ ...records, [selectedResource]: nextItems });
        setSelectedIndex(nextItems.length - 1);
        setDraft(structuredClone(payload.item));
      } else {
        nextItems[selectedIndex] = payload.item;
        setRecords({ ...records, [selectedResource]: nextItems });
        setDraft(structuredClone(payload.item));
      }

      setStatus('Saved.');
      router.refresh();
    } catch {
      setStatus('Unable to save this record.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (resourceDefinition.singleton || !items[selectedIndex]) return;

    const primaryValue = items[selectedIndex][resourceDefinition.primaryKey];
    setIsSaving(true);
    setStatus('');

    try {
      const response = await fetch(`/api/admin/content/${selectedResource}?id=${encodeURIComponent(String(primaryValue))}`, { method: 'DELETE' });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to delete this record.');
        return;
      }

      const nextItems = items.filter((_, index) => index !== selectedIndex);
      setRecords({ ...records, [selectedResource]: nextItems });
      setSelectedIndex(0);
      setDraft(structuredClone((nextItems[0] ?? resourceDefinition.emptyItem) as Record<string, unknown>));
      setStatus('Deleted.');
      router.refresh();
    } catch {
      setStatus('Unable to delete this record.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin');
    router.refresh();
  }

  async function handleUpload(fieldPath: string, file: File) {
    setUploadingField(fieldPath);
    setStatus('');

    try {
      const authResponse = await fetch(`/api/admin/imagekit-auth?folder=${selectedResource}`);
      const authPayload = await authResponse.json();

      if (!authResponse.ok) {
        setStatus(authPayload.error ?? 'Unable to get upload credentials.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('publicKey', authPayload.publicKey);
      formData.append('signature', authPayload.signature);
      formData.append('expire', String(authPayload.expire));
      formData.append('token', authPayload.token);
      formData.append('folder', authPayload.folder);
      formData.append('useUniqueFileName', 'true');

      const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', { method: 'POST', body: formData });
      const uploadPayload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setStatus(uploadPayload.message ?? 'Unable to upload image.');
        return;
      }

      setDraft((current) => current ? setValueByPath(current, fieldPath, uploadPayload.url) : current);
      setStatus('Image uploaded.');
    } catch {
      setStatus('Unable to upload image.');
    } finally {
      setUploadingField('');
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fbf4_0%,#edf7f0_100%)]">
      <div className="section-shell py-10">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_40px_rgba(33,74,52,0.08)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">HDN Admin</p>
            <h1 className="mt-2 text-4xl font-semibold text-foreground">Content Dashboard</h1>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">Signed in as {email}. Manage Supabase content and upload images to ImageKit from one place.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}><LogOut size={16} />Sign out</Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <Card>
            <CardHeader><CardTitle>Collections</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {resourceKeys.map((resource) => (
                <button key={resource} type="button" onClick={() => switchResource(resource)} className={`w-full rounded-2xl border px-4 py-3 text-left transition ${selectedResource === resource ? 'border-primary bg-primary/8 text-primary' : 'border-border bg-background text-foreground hover:border-primary/30'}`}>
                  <p className="font-semibold">{adminResourceDefinitions[resource].label}</p>
                  <p className="text-sm text-muted-foreground">{(records[resource] ?? []).length} item(s)</p>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle>{resourceDefinition.label}</CardTitle>
                {!resourceDefinition.singleton ? (
                  <Button variant="outline" size="sm" onClick={() => { setSelectedIndex(-1); setDraft(structuredClone(resourceDefinition.emptyItem as Record<string, unknown>)); setStatus(''); }}>
                    <Plus size={14} />New
                  </Button>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-3">
                {resourceDefinition.singleton ? (
                  <button type="button" onClick={() => selectRecord(0)} className="w-full rounded-2xl border border-primary/30 bg-primary/5 px-4 py-4 text-left">
                    <p className="font-semibold">{resourceDefinition.label}</p>
                    <p className="text-sm text-muted-foreground">Singleton content block</p>
                  </button>
                ) : items.length > 0 ? (
                  items.map((item, index) => (
                    <button key={`${resourceDefinition.primaryKey}-${String(item[resourceDefinition.primaryKey])}-${index}`} type="button" onClick={() => selectRecord(index)} className={`w-full rounded-2xl border px-4 py-4 text-left transition ${index === selectedIndex ? 'border-primary bg-primary/8' : 'border-border bg-background hover:border-primary/30'}`}>
                      <p className="font-semibold text-foreground">{String(item.title ?? item.name ?? item.slug ?? item.id ?? resourceDefinition.singularLabel)}</p>
                      <p className="text-sm text-muted-foreground">{String(item.date ?? item.category ?? item.duration ?? '')}</p>
                    </button>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">No entries yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{selectedItemLabel}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">Edit fields below, then save to update Supabase.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!resourceDefinition.singleton && items[selectedIndex] ? <Button variant="outline" onClick={handleDelete} disabled={isSaving}><Trash2 size={16} />Delete</Button> : null}
                  <Button onClick={handleSave} disabled={isSaving}>{isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}Save</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {resourceDefinition.fields.map((field) => {
                  const rawValue = getValueByPath(activeItem, field.path);
                  const stringValue = typeof rawValue === 'string' ? rawValue : rawValue == null ? '' : String(rawValue);

                  return (
                    <div key={field.path} className="space-y-2">
                      <label className="block text-sm font-semibold text-foreground">{field.label}</label>
                      {field.type === 'textarea' ? (
                        <Textarea value={stringValue} rows={field.path === 'content' ? 10 : 5} onChange={(event) => setDraft((current) => current ? setValueByPath(current, field.path, event.target.value) : current)} />
                      ) : field.type === 'boolean' ? (
                        <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                          <input type="checkbox" checked={Boolean(rawValue)} onChange={(event) => setDraft((current) => current ? setValueByPath(current, field.path, event.target.checked) : current)} />
                          <span className="text-sm text-foreground">Enabled</span>
                        </label>
                      ) : field.type === 'image' ? (
                        <div className="space-y-3">
                          <Input value={stringValue} onChange={(event) => setDraft((current) => current ? setValueByPath(current, field.path, event.target.value) : current)} placeholder="https://..." />
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/12">
                              <Upload size={14} />{uploadingField === field.path ? 'Uploading...' : 'Upload image'}
                              <input type="file" accept="image/*" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) void handleUpload(field.path, file); }} />
                            </label>
                            {stringValue ? <span className="text-sm text-muted-foreground">{stringValue}</span> : null}
                          </div>
                          {stringValue ? <div className="image-frame max-w-sm"><img src={stringValue} alt={field.label} className="h-48 w-full object-cover" /></div> : null}
                        </div>
                      ) : (
                        <Input type={field.type === 'number' ? 'number' : field.type} value={stringValue} disabled={field.disabledOnEdit && Boolean(items[selectedIndex])} onChange={(event) => setDraft((current) => current ? setValueByPath(current, field.path, field.type === 'number' ? Number(event.target.value) : event.target.value) : current)} />
                      )}
                    </div>
                  );
                })}
                {status ? <p className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-primary">{status}</p> : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
