import 'server-only';

import { revalidatePath } from 'next/cache';
import { randomUUID } from 'node:crypto';
import { adminResourceDefinitions, type ResourceKey, type ResourceShapeMap } from '@/lib/admin-resources';
import { getSupabaseServerClient } from '@/lib/supabase';

function getDefinition<T extends ResourceKey>(resource: T) {
  return adminResourceDefinitions[resource];
}

function normalizeItem<T extends ResourceKey>(resource: T, record: Record<string, unknown>) {
  const definition = getDefinition(resource);
  return (definition.fromRecord ? definition.fromRecord(record) : record) as ResourceShapeMap[T];
}

function serializeItem<T extends ResourceKey>(resource: T, item: ResourceShapeMap[T]) {
  const definition = getDefinition(resource);
  return definition.toRecord ? definition.toRecord(item) : (item as Record<string, unknown>);
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getGeneratedPrimaryKey<T extends ResourceKey>(resource: T, payload: Record<string, unknown>) {
  const definition = getDefinition(resource);

  if (definition.primaryKey === 'id') {
    return undefined;
  }

  const currentValue = payload[definition.primaryKey];
  if (typeof currentValue === 'string' && currentValue.trim()) {
    return currentValue.trim();
  }

  const sourceValue = String(payload.title ?? payload.name ?? payload.slug ?? payload[definition.primaryKey] ?? 'item');
  const generated = createSlug(sourceValue) || 'item';
  return `${generated}-${randomUUID().slice(0, 8)}`;
}

async function prepareCreatePayload<T extends ResourceKey>(resource: T, item: ResourceShapeMap[T]) {
  const definition = getDefinition(resource);
  const supabase = getSupabaseServerClient();
  const payload = serializeItem(resource, item);

  if (definition.singleton) {
    return payload;
  }

  if (definition.primaryKey === 'id') {
    const { data, error } = await supabase
      .from(definition.table)
      .select(definition.primaryKey)
      .order(definition.primaryKey, { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    const maxPrimaryValue = Number((data as Record<string, unknown> | null)?.[definition.primaryKey] ?? 0);
    payload.id = Number.isFinite(maxPrimaryValue) && maxPrimaryValue > 0 ? maxPrimaryValue + 1 : 1;
  } else {
    const generatedPrimaryKey = getGeneratedPrimaryKey(resource, payload);
    if (generatedPrimaryKey) {
      payload[definition.primaryKey] = generatedPrimaryKey;
    }
  }

  return payload;
}

export async function getAdminResourceItems<T extends ResourceKey>(resource: T): Promise<ResourceShapeMap[T][]> {
  const definition = getDefinition(resource);
  const supabase = getSupabaseServerClient();
  let query = supabase.from(definition.table).select('*');

  for (const sort of definition.orderBy ?? [{ column: definition.primaryKey, ascending: true }]) {
    query = query.order(sort.column, { ascending: sort.ascending });
  }

  if (definition.singleton) {
    const { data, error } = await query.limit(1);
    if (error) throw new Error(error.message);
    const record = data?.[0];
    return [record ? normalizeItem(resource, record) : definition.emptyItem] as ResourceShapeMap[T][];
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map((record) => normalizeItem(resource, record as Record<string, unknown>));
}

export async function createAdminResourceItem<T extends ResourceKey>(resource: T, item: ResourceShapeMap[T]) {
  const definition = getDefinition(resource);
  const supabase = getSupabaseServerClient();
  const payload = await prepareCreatePayload(resource, item);

  const { data, error } = await supabase.from(definition.table).insert(payload).select('*').single();
  if (error) throw new Error(error.message);
  revalidateContentPaths();
  return normalizeItem(resource, data as Record<string, unknown>);
}

export async function updateAdminResourceItem<T extends ResourceKey>(resource: T, item: ResourceShapeMap[T]) {
  const definition = getDefinition(resource);
  const supabase = getSupabaseServerClient();
  const payload = serializeItem(resource, item);
  const primaryValue = payload[definition.primaryKey];

  const query = definition.singleton
    ? supabase.from(definition.table).upsert(payload).select('*').single()
    : supabase.from(definition.table).update(payload).eq(definition.primaryKey, primaryValue).select('*').single();

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  revalidateContentPaths();
  return normalizeItem(resource, data as Record<string, unknown>);
}

export async function deleteAdminResourceItem<T extends ResourceKey>(resource: T, primaryValue: string | number) {
  const definition = getDefinition(resource);
  if (definition.singleton) throw new Error('Singleton resources cannot be deleted.');
  const supabase = getSupabaseServerClient();
  const { error } = await supabase.from(definition.table).delete().eq(definition.primaryKey, primaryValue);
  if (error) throw new Error(error.message);
  revalidateContentPaths();
}

export async function getAllAdminContent() {
  const entries = await Promise.all((Object.keys(adminResourceDefinitions) as ResourceKey[]).map(async (key) => [key, await getAdminResourceItems(key)] as const));
  return Object.fromEntries(entries) as { [K in ResourceKey]: ResourceShapeMap[K][] };
}

function revalidateContentPaths() {
  ['/', '/products', '/events', '/pick-and-pay', '/contact', '/blog', '/learn/tesda-courses', '/admin/dashboard'].forEach((path) => revalidatePath(path));
}
