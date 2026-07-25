/**
 * Defer instantiation of an outer generic to keep TypeScript's internal
 * instantiation stack shallow. kysely's single most valuable performance trick.
 */
export function DrainOuterGeneric(t) {
  return defer(t)
}
