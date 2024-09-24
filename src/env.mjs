import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  POSTGRES_CONNECTION_STRING: z.string().optional(),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  POSTGRES_CONNECTION_STRING: z.string(),
  NEXT_PUBLIC_APP_NAME: z.string(),
  NEXT_PUBLIC_APP_URI: z.string(),
  VERIFIER_API_URL: z.string(),
  ISSUER_API_URL: z.string(),
  KEYSTORE_FILE: z.string(),
  KEYSTORE_PASS: z.string(),
  KEYSTORE_ALIAS: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URI: process.env.NEXT_PUBLIC_APP_URI,
  VERIFIER_API_URL: process.env.VERIFIER_API_URL,
  ISSUER_API_URL: process.env.ISSUER_API_URL,
  KEYSTORE_FILE: process.env.KEYSTORE_FILE,
  KEYSTORE_PASS: process.env.KEYSTORE_PASS,
  KEYSTORE_ALIAS: process.env.KEYSTORE_ALIAS,
};

// Don't touch the part below
// --------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

export function validateEnv() {
  const isServer = typeof window === 'undefined';

  const parsed = isServer
    ? merged.safeParse(processEnv) // On the server, validate all env vars
    : client.safeParse(processEnv); // On the client, validate only client-exposed env vars

  if (parsed.success === false) {
    console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      // Throw an error if a server-side env var is accessed on the client
      if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[prop];
    },
  });
}


export { env };
