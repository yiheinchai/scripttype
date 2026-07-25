/**
 * ORIGINAL TypeScript from 02-inference-at-scale/hono/src/adapter/aws-lambda/types.ts, for comparison with the ScriptType alongside.
 *
 * Type declarations are verbatim. Imports are replaced by declarations of the names
 * they brought in, because relative imports do not resolve in this mirrored tree and
 * an unresolvable import is an editor error.
 */
export type Callback<TResult = any> = (error?: Error | string | null, result?: TResult) => void

export interface CognitoIdentity {
  cognitoIdentityId: string
  cognitoIdentityPoolId: string
}

export interface ClientContextClient {
  installationId: string
  appTitle: string
  appVersionName: string
  appVersionCode: string
  appPackageName: string
}

export interface ClientContextEnv {
  platformVersion: string
  platform: string
  make: string
  model: string
  locale: string
}

export interface ClientContext {
  client: ClientContextClient

  Custom?: any
  env: ClientContextEnv
}

export interface LambdaContext {
  callbackWaitsForEmptyEventLoop: boolean
  functionName: string
  functionVersion: string
  invokedFunctionArn: string
  memoryLimitInMB: string
  awsRequestId: string
  logGroupName: string
  logStreamName: string
  identity?: CognitoIdentity | undefined
  clientContext?: ClientContext | undefined

  getRemainingTimeInMillis(): number
}

export type Handler<TEvent = any, TResult = any> = (
  event: TEvent,
  context: LambdaContext,
  callback: Callback<TResult>
) => void | Promise<TResult>
