/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/middleware/bearer-auth/index.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
// Names imported from elsewhere in the library, declared here because relative
// imports do not resolve in this mirrored tree. Declarations only; no runtime meaning.
type Context<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
type Env<A = any, B = any, C = any, D = any, E = any, F = any, G = any, H = any> = any
export type MessageFunction = (c: Context) => string | object | Promise<string | object>

export type CustomizedErrorResponseOptions = {
  wwwAuthenticateHeader?: string | object | MessageFunction
  message?: string | object | MessageFunction
}

export type BearerAuthOptions<E extends Env = Env> =
  | {
      token: string | string[]
      realm?: string
      prefix?: string
      headerName?: string
      hashFunction?: Function
      /**
       * @deprecated Use noAuthenticationHeader.message instead
       */
      noAuthenticationHeaderMessage?: string | object | MessageFunction
      noAuthenticationHeader?: CustomizedErrorResponseOptions
      /**
       * @deprecated Use invalidAuthenticationHeader.message instead
       */
      invalidAuthenticationHeaderMessage?: string | object | MessageFunction
      invalidAuthenticationHeader?: CustomizedErrorResponseOptions
      /**
       * @deprecated Use invalidToken.message instead
       */
      invalidTokenMessage?: string | object | MessageFunction
      invalidToken?: CustomizedErrorResponseOptions
    }
  | {
      realm?: string
      prefix?: string
      headerName?: string
      verifyToken: (token: string, c: Context<E>) => boolean | Promise<boolean>
      hashFunction?: Function
      /**
       * @deprecated Use noAuthenticationHeader.message instead
       */
      noAuthenticationHeaderMessage?: string | object | MessageFunction
      noAuthenticationHeader?: CustomizedErrorResponseOptions
      /**
       * @deprecated Use invalidAuthenticationHeader.message instead
       */
      invalidAuthenticationHeaderMessage?: string | object | MessageFunction
      invalidAuthenticationHeader?: CustomizedErrorResponseOptions
      /**
       * @deprecated Use invalidToken.message instead
       */
      invalidTokenMessage?: string | object | MessageFunction
      invalidToken?: CustomizedErrorResponseOptions
    }
