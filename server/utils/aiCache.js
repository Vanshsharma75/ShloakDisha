// Lightweight in-memory cache with TTL for AI responses
const cache = new Map();

export const setCache = (key, value, ttl = 1000 * 60 * 60) => {
  const expiresAt = Date.now() + ttl;
  cache.set(key, { value, expiresAt });
};

export const getCache = (key) => {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.value;
};

export const delCache = (key) => cache.delete(key);

export const clearCache = () => cache.clear();

// simple helper to create a stable key for a verse text
export const keyForText = (text) => {
  if (!text) return null;
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return `ai:${Math.abs(hash)}`;
};
