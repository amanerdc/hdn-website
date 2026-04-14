'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2, LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
import { adminResourceDefinitions, type ResourceKey } from '@/lib/admin-resources';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
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

const PAGE_SIZE = 10;
const PRODUCT_CATEGORY_ORDER = ['Fruits', 'Vegetables', 'Food & Beverage', 'Agri-products', 'Nursery', 'Livestock'] as const;
const PRODUCT_FILTER_OPTIONS = ['All categories', ...PRODUCT_CATEGORY_ORDER] as const;

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

function isBlankValue(value: unknown) {
  return value == null || (typeof value === 'string' && value.trim() === '');
}

function validateDraft(definition: (typeof adminResourceDefinitions)[ResourceKey], draftItem: Record<string, unknown> | null) {
  if (!draftItem) {
    return ['There is no item loaded to save.'];
  }

  const missingFields: string[] = [];
  const invalidFields: string[] = [];

  definition.fields.forEach((field) => {
    const value = getValueByPath(draftItem, field.path);

    if (field.required && isBlankValue(value)) {
      missingFields.push(field.label);
      return;
    }

    if (field.type === 'select' && !isBlankValue(value) && field.options && !field.options.includes(String(value))) {
      invalidFields.push(`${field.label} must be one of ${field.options.join(', ')}`);
    }

    if (field.type === 'number' && field.required && (value == null || value === '' || Number.isNaN(Number(value)))) {
      missingFields.push(field.label);
    }
  });

  if (missingFields.length || invalidFields.length) {
    const parts: string[] = [];
    if (missingFields.length) parts.push(`Missing required fields: ${missingFields.join(', ')}`);
    if (invalidFields.length) parts.push(`Invalid values: ${invalidFields.join('; ')}`);
    return parts;
  }

  return [];
}

function sortAdminRecords(resource: ResourceKey, items: Record<string, unknown>[]) {
  if (resource === 'products') {
    const categoryRank: Record<string, number> = Object.fromEntries(PRODUCT_CATEGORY_ORDER.map((category, index) => [category, index]));

    return [...items].sort((left, right) => {
      const leftCategory = String(left.category ?? '');
      const rightCategory = String(right.category ?? '');
      const categoryComparison = (categoryRank[leftCategory] ?? PRODUCT_CATEGORY_ORDER.length) - (categoryRank[rightCategory] ?? PRODUCT_CATEGORY_ORDER.length);
      const nameComparison = String(left.name ?? '').localeCompare(String(right.name ?? ''));
      return categoryComparison || nameComparison;
    });
  }

  const definition = adminResourceDefinitions[resource];
  const orderBy = definition.orderBy ?? [{ column: definition.primaryKey, ascending: true }];

  return [...items].sort((left, right) => {
    for (const rule of orderBy) {
      const leftValue = left[rule.column];
      const rightValue = right[rule.column];
      const leftNumber = Number(leftValue);
      const rightNumber = Number(rightValue);

      let comparison = 0;

      if (typeof leftValue === 'number' || typeof rightValue === 'number' || (!Number.isNaN(leftNumber) && !Number.isNaN(rightNumber))) {
        comparison = leftNumber - rightNumber;
      } else {
        comparison = String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true, sensitivity: 'base' });
      }

      if (comparison !== 0) {
        return rule.ascending ? comparison : -comparison;
      }
    }

    return 0;
  });
}

export function AdminDashboard({ initialData, email }: AdminDashboardProps) {
  const router = useRouter();
  const resourceKeys = Object.keys(adminResourceDefinitions) as ResourceKey[];
  const [selectedResource, setSelectedResource] = useState<ResourceKey>('products');
  const [records, setRecords] = useState<AdminContentMap>(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productCategoryFilter, setProductCategoryFilter] = useState<(typeof PRODUCT_FILTER_OPTIONS)[number]>('All categories');
  const [draft, setDraft] = useState<Record<string, unknown> | null>(
    structuredClone((initialData.products[0] ?? adminResourceDefinitions.products.emptyItem) as Record<string, unknown>),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [uploadingField, setUploadingField] = useState('');
  const [deletingImageField, setDeletingImageField] = useState('');

  const resourceDefinition = adminResourceDefinitions[selectedResource];
  const items = (records[selectedResource] ?? []) as Record<string, unknown>[];
  const sortedItems = useMemo(() => {
    if (selectedResource !== 'products') {
      return items.map((item, index) => ({ item, index }));
    }

    const categoryRank: Record<string, number> = Object.fromEntries(PRODUCT_CATEGORY_ORDER.map((category, index) => [category, index]));

    return items
      .map((item, index) => ({ item, index }))
      .sort((left, right) => {
        const leftCategory = String(left.item.category ?? '');
        const rightCategory = String(right.item.category ?? '');
        const categoryComparison = (categoryRank[leftCategory] ?? PRODUCT_CATEGORY_ORDER.length) - (categoryRank[rightCategory] ?? PRODUCT_CATEGORY_ORDER.length);
        const nameComparison = String(left.item.name ?? '').localeCompare(String(right.item.name ?? ''));
        return categoryComparison || nameComparison;
      });
  }, [items, selectedResource]);
  const visibleItems = useMemo(() => {
    if (selectedResource !== 'products' || productCategoryFilter === 'All categories') {
      return sortedItems;
    }

    return sortedItems.filter(({ item }) => String(item.category ?? '') === productCategoryFilter);
  }, [productCategoryFilter, selectedResource, sortedItems]);
  const totalPages = resourceDefinition.singleton ? 1 : Math.max(1, Math.ceil(visibleItems.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * PAGE_SIZE;
  const paginatedItems = resourceDefinition.singleton ? visibleItems : visibleItems.slice(pageStart, pageStart + PAGE_SIZE);
  const pageRangeStart = visibleItems.length === 0 ? 0 : pageStart + 1;
  const pageRangeEnd = Math.min(pageStart + PAGE_SIZE, visibleItems.length);
  const activeItem = draft ?? structuredClone((items[selectedIndex] ?? resourceDefinition.emptyItem) as Record<string, unknown>);
  const isStatusError = status.startsWith('Missing required fields:') || status.startsWith('Invalid values:') || status.startsWith('Unable') || status.startsWith('This image is not hosted');
  const primaryKeyValue = getValueByPath(activeItem, resourceDefinition.primaryKey);
  const primaryKeyDisplay = isBlankValue(primaryKeyValue) || primaryKeyValue === 0 ? 'Auto-generated on save' : String(primaryKeyValue);

  const selectedItemLabel = useMemo(() => {
    const item = items[selectedIndex];
    if (!item) return `New ${resourceDefinition.singularLabel}`;
    return String(item.title ?? item.name ?? item.slug ?? item.id ?? resourceDefinition.singularLabel);
  }, [items, resourceDefinition.singularLabel, selectedIndex]);

  function switchResource(resource: ResourceKey) {
    const nextItems = (records[resource] ?? []) as Record<string, unknown>[];
    setSelectedResource(resource);
    setSelectedIndex(0);
    setCurrentPage(1);
    setProductCategoryFilter('All categories');
    setDraft(structuredClone((nextItems[0] ?? adminResourceDefinitions[resource].emptyItem) as Record<string, unknown>));
    setStatus('');
  }

  function selectRecord(index: number) {
    const item = (records[selectedResource][index] ?? resourceDefinition.emptyItem) as Record<string, unknown>;
    setSelectedIndex(index);

    if (!resourceDefinition.singleton && index >= 0) {
      setCurrentPage(Math.floor(index / PAGE_SIZE) + 1);
    }

    setDraft(structuredClone(item));
    setStatus('');
  }

  function handleProductFilterChange(nextFilter: (typeof PRODUCT_FILTER_OPTIONS)[number]) {
    setProductCategoryFilter(nextFilter);
    setCurrentPage(1);

    if (selectedResource !== 'products' || nextFilter === 'All categories') {
      return;
    }

    const nextVisible = sortedItems.filter(({ item }) => String(item.category ?? '') === nextFilter);
    const firstVisible = nextVisible[0];

    if (firstVisible) {
      selectRecord(firstVisible.index);
      return;
    }

    setSelectedIndex(-1);
    setDraft(structuredClone(resourceDefinition.emptyItem as Record<string, unknown>));
  }

  async function handleSave() {
    setIsSaving(true);
    setStatus('');

    const validationErrors = validateDraft(resourceDefinition, draft);
    if (validationErrors.length) {
      setStatus(validationErrors.join(' '));
      setIsSaving(false);
      return;
    }

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
      const savedKeyValue = payload.item?.[resourceDefinition.primaryKey];

      if (resourceDefinition.singleton) {
        nextItems[0] = payload.item;
        setRecords({ ...records, [selectedResource]: nextItems });
        setDraft(structuredClone(payload.item));
      } else if (isNew) {
        nextItems.push(payload.item);
        const orderedItems = sortAdminRecords(selectedResource, nextItems);
        const savedIndex = orderedItems.findIndex((record) => String(record[resourceDefinition.primaryKey]) === String(savedKeyValue));
        setRecords({ ...records, [selectedResource]: orderedItems });
        setSelectedIndex(savedIndex >= 0 ? savedIndex : orderedItems.length - 1);
        setCurrentPage(savedIndex >= 0 ? Math.floor(savedIndex / PAGE_SIZE) + 1 : Math.floor((orderedItems.length - 1) / PAGE_SIZE) + 1);
        setDraft(structuredClone(payload.item));
      } else {
        nextItems[selectedIndex] = payload.item;
        const orderedItems = sortAdminRecords(selectedResource, nextItems);
        const savedIndex = orderedItems.findIndex((record) => String(record[resourceDefinition.primaryKey]) === String(savedKeyValue));
        setRecords({ ...records, [selectedResource]: orderedItems });
        setSelectedIndex(savedIndex >= 0 ? savedIndex : selectedIndex);
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
      const response = await fetch(`/api/admin/content/${selectedResource}?id=${encodeURIComponent(String(primaryValue))}`, {
        method: 'DELETE',
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to delete this record.');
        return;
      }

      const nextItems = items.filter((_, index) => index !== selectedIndex);
      setRecords({ ...records, [selectedResource]: nextItems });
      setSelectedIndex(0);
      setCurrentPage(1);
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

      const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadPayload = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setStatus(uploadPayload.message ?? 'Unable to upload image.');
        return;
      }

      setDraft((current) => (current ? setValueByPath(current, fieldPath, uploadPayload.url) : current));
      setStatus('Image uploaded.');
    } catch {
      setStatus('Unable to upload image.');
    } finally {
      setUploadingField('');
    }
  }

  function isImageKitUrl(value: string) {
    try {
      return new URL(value).hostname.includes('imagekit.io');
    } catch {
      return false;
    }
  }

  async function handleDeleteImage(fieldPath: string) {
    const rawValue = getValueByPath(activeItem, fieldPath);
    const imageUrl = typeof rawValue === 'string' ? rawValue : '';

    if (!imageUrl || !isImageKitUrl(imageUrl)) {
      setStatus('This image is not hosted on ImageKit.');
      return;
    }

    setDeletingImageField(fieldPath);
    setStatus('');

    try {
      const response = await fetch('/api/admin/imagekit-file', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileUrl: imageUrl }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to delete image from ImageKit.');
        return;
      }

      setDraft((current) => (current ? setValueByPath(current, fieldPath, '') : current));
      setStatus('Image deleted from ImageKit and removed from this record.');
    } catch {
      setStatus('Unable to delete image from ImageKit.');
    } finally {
      setDeletingImageField('');
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6fbf4_0%,#edf7f0_100%)]">
      <Navigation showLegend={false} />

      <div className="section-shell py-10">
        <div className="mb-8 rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_16px_40px_rgba(33,74,52,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">HDN Admin</p>
          <h1 className="mt-2 text-4xl font-semibold text-foreground">Content Dashboard</h1>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Manage Supabase content and upload images to ImageKit from one place.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collections</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resourceKeys.map((resource) => (
              <button
                key={resource}
                type="button"
                onClick={() => switchResource(resource)}
                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                  selectedResource === resource
                    ? 'border-primary bg-primary/8 text-primary'
                    : 'border-border bg-background text-foreground hover:border-primary/30'
                }`}
              >
                <p className="font-semibold">{adminResourceDefinitions[resource].label}</p>
                <p className="text-sm text-muted-foreground">{(records[resource] ?? []).length} item(s)</p>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
          <Card>
            <CardHeader className="space-y-3">
              <div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <CardTitle>{resourceDefinition.label}</CardTitle>
                  {!resourceDefinition.singleton ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedIndex(-1);
                        setDraft(structuredClone(resourceDefinition.emptyItem as Record<string, unknown>));
                        setStatus('');
                      }}
                    >
                      <Plus size={14} />
                      New
                    </Button>
                  ) : null}
                </div>
                {!resourceDefinition.singleton ? (
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Showing {pageRangeEnd} out of {visibleItems.length}
                  </p>
                ) : null}
              </div>
              {selectedResource === 'products' ? (
                <label className="flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground">
                  Category
                  <select
                    value={productCategoryFilter}
                    onChange={(event) => handleProductFilterChange(event.target.value as (typeof PRODUCT_FILTER_OPTIONS)[number])}
                    className="bg-transparent text-sm font-semibold text-foreground outline-none"
                  >
                    {PRODUCT_FILTER_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-3">
              {resourceDefinition.singleton ? (
                <button
                  type="button"
                  onClick={() => selectRecord(0)}
                  className="w-full rounded-2xl border border-primary/30 bg-primary/5 px-4 py-4 text-left"
                >
                  <p className="font-semibold">{resourceDefinition.label}</p>
                  <p className="text-sm text-muted-foreground">Singleton content block</p>
                </button>
              ) : visibleItems.length > 0 ? (
                paginatedItems.map((item, index) => {
                  const absoluteIndex = item.index;
                  const record = item.item;

                  return (
                    <button
                      key={`${resourceDefinition.primaryKey}-${String(record[resourceDefinition.primaryKey] ?? absoluteIndex)}-${absoluteIndex}`}
                      type="button"
                      onClick={() => selectRecord(absoluteIndex)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                        absoluteIndex === selectedIndex
                          ? 'border-primary bg-primary/8'
                          : 'border-border bg-background hover:border-primary/30'
                      }`}
                    >
                      <p className="font-semibold text-foreground">
                        {String(record.title ?? record.name ?? record.slug ?? record.id ?? resourceDefinition.singularLabel)}
                      </p>
                      <p className="text-sm text-muted-foreground">{String(record.date ?? record.category ?? record.duration ?? '')}</p>
                    </button>
                  );
                })
              ) : (
                <p className="rounded-2xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                  No entries yet.
                </p>
              )}

              {!resourceDefinition.singleton && visibleItems.length > PAGE_SIZE ? (
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <p className="text-sm text-muted-foreground">Page {safeCurrentPage} of {totalPages}</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={safeCurrentPage === 1}
                    >
                      <ChevronLeft size={14} />
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={safeCurrentPage === totalPages}
                    >
                      Next
                      <ChevronRight size={14} />
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>{selectedItemLabel}</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">Edit fields below, then save to update Supabase.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!resourceDefinition.singleton && items[selectedIndex] ? (
                  <Button variant="outline" onClick={handleDelete} disabled={isSaving}>
                    <Trash2 size={16} />
                    Delete
                  </Button>
                ) : null}
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2 rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{resourceDefinition.primaryKey.toUpperCase()}</p>
                <p className="text-sm text-muted-foreground">{primaryKeyDisplay}</p>
              </div>

              {resourceDefinition.fields.map((field) => {
                const rawValue = getValueByPath(activeItem, field.path);
                const stringValue = typeof rawValue === 'string' ? rawValue : rawValue == null ? '' : String(rawValue);
                const showHelper = Boolean(field.helperText || (field.required && field.type !== 'boolean'));

                return (
                  <div key={field.path} className="space-y-2">
                    <label className="block text-sm font-semibold text-foreground">
                      {field.label}
                      {field.required ? <span className="ml-1 text-primary">*</span> : null}
                    </label>
                    {showHelper ? <p className="text-xs leading-5 text-muted-foreground">{field.helperText ?? 'This field is required.'}</p> : null}
                    {field.type === 'textarea' ? (
                      <Textarea
                        value={stringValue}
                        rows={field.path === 'content' ? 10 : 5}
                        onChange={(event) =>
                          setDraft((current) => (current ? setValueByPath(current, field.path, event.target.value) : current))
                        }
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={stringValue}
                        onChange={(event) =>
                          setDraft((current) => (current ? setValueByPath(current, field.path, event.target.value) : current))
                        }
                        className="h-12 w-full rounded-2xl border border-white/70 bg-white/72 px-4 text-sm shadow-[0_12px_28px_rgba(33,74,52,0.06)] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        <option value="">Select an option</option>
                        {(field.options ?? []).map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'boolean' ? (
                      <label className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <input
                          type="checkbox"
                          checked={Boolean(rawValue)}
                          onChange={(event) =>
                            setDraft((current) => (current ? setValueByPath(current, field.path, event.target.checked) : current))
                          }
                        />
                        <span className="text-sm text-foreground">Enabled</span>
                      </label>
                    ) : field.type === 'image' ? (
                      <div className="space-y-3">
                        <Input
                          value={stringValue}
                          onChange={(event) =>
                            setDraft((current) => (current ? setValueByPath(current, field.path, event.target.value) : current))
                          }
                          placeholder="https://..."
                        />
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/12">
                            <Upload size={14} />
                            {uploadingField === field.path ? 'Uploading...' : 'Upload image'}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) void handleUpload(field.path, file);
                              }}
                            />
                          </label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDraft((current) => (current ? setValueByPath(current, field.path, '') : current))}
                            disabled={!stringValue}
                          >
                            Remove value
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => void handleDeleteImage(field.path)}
                            disabled={!stringValue || !isImageKitUrl(stringValue) || deletingImageField === field.path}
                          >
                            {deletingImageField === field.path ? 'Deleting...' : 'Delete from ImageKit'}
                          </Button>
                          {stringValue ? <span className="text-sm text-muted-foreground">{stringValue}</span> : null}
                        </div>
                        {stringValue ? (
                          <div className="image-frame max-w-sm">
                            <img src={stringValue} alt={field.label} className="h-48 w-full object-cover" />
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <Input
                        type={field.type === 'number' ? 'number' : field.type}
                        value={stringValue}
                        disabled={field.disabledOnEdit && Boolean(items[selectedIndex])}
                        onChange={(event) =>
                          setDraft((current) =>
                            current
                              ? setValueByPath(
                                  current,
                                  field.path,
                                  field.type === 'number' ? Number(event.target.value) : event.target.value,
                                )
                              : current,
                          )
                        }
                      />
                    )}
                  </div>
                );
              })}

              {status ? (
                <p className={`rounded-2xl px-4 py-3 text-sm ${isStatusError ? 'border border-red-200 bg-red-50 text-red-700' : 'border border-primary/15 bg-primary/8 text-primary'}`}>
                  {status}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
