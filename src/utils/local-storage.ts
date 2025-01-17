"use client";

export const LOCAL_STORAGE_KEYS = {
  SESSION: "SESSION",
  ROLES: "ROLES",
} as const;

type LocalStorageKey = keyof typeof LOCAL_STORAGE_KEYS;

/**
 * Safely retrieves an item from local storage, parsing it as JSON if applicable.
 * @param key - The key of the item to retrieve.
 * @returns The parsed item, or null if the key doesn't exist or parsing fails.
 */
export function getLocalStorage<T>(key: LocalStorageKey): T | null {
  const item = localStorage.getItem(LOCAL_STORAGE_KEYS[key]);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return item as unknown as T;
  }
}

/**
 * Stores an item in local storage. Converts objects to JSON strings.
 * @param key - The key to store the item under.
 * @param value - The value to store. Objects are stringified.
 */
export function setLocalStorage(key: LocalStorageKey, value: unknown): void {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  localStorage.setItem(LOCAL_STORAGE_KEYS[key], stringValue);
}

/**
 * Removes an item from local storage.
 * @param key - The key of the item to remove.
 */
export function removeLocalStorage(key: LocalStorageKey): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
}

/**
 * Clears all items from local storage.
 */
export function clearLocalStorage(): void {
  localStorage.clear();
}
