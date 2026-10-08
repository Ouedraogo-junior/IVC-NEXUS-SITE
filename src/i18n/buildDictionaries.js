const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

export function deepMerge(base, override) {
  if (override === undefined) return base
  if (isObject(base) && isObject(override)) {
    const out = { ...base }
    for (const key of Object.keys(override)) {
      out[key] = deepMerge(base[key], override[key])
    }
    return out
  }
  return override
}

export function buildDictionaries({ fr, en, clientFr = {}, clientEn = {} }) {
  const frFull = deepMerge(fr, clientFr)
  const enFull = deepMerge(frFull, en)

  for (const key of Object.keys(clientFr)) {
    enFull[key] =
      clientEn[key] !== undefined ? deepMerge(frFull[key], clientEn[key]) : frFull[key]
  }

  return { fr: frFull, en: enFull }
}