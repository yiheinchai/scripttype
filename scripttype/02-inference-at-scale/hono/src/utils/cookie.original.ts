/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/utils/cookie.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type CookiePrefixOptions = 'host' | 'secure'

export type PartitionedCookieConstraint =
  | { partitioned: true; secure: true }
  | { partitioned?: boolean; secure?: boolean }

export type CookieOptions = {
  domain?: string
  expires?: Date
  httpOnly?: boolean
  maxAge?: number
  path?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None' | 'strict' | 'lax' | 'none'
  partitioned?: boolean
  priority?: 'Low' | 'Medium' | 'High' | 'low' | 'medium' | 'high'
  prefix?: CookiePrefixOptions
} & PartitionedCookieConstraint

export type SecureCookieConstraint = { secure: true }

export type HostCookieConstraint = { secure: true; path: '/'; domain?: undefined }

export type CookieConstraint<Name> = Name extends `__Secure-${string}`
  ? CookieOptions & SecureCookieConstraint
  : Name extends `__Host-${string}`
    ? CookieOptions & HostCookieConstraint
    : CookieOptions
