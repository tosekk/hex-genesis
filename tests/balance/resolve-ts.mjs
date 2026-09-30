// Test-worker loader only: Node's type stripping needs extensions on this Vite project's imports.
export async function resolve(specifier, context, nextResolve) {
  try { return await nextResolve(specifier, context); }
  catch (error) {
    if (specifier.startsWith('.') && ['ERR_MODULE_NOT_FOUND', 'ERR_UNSUPPORTED_DIR_IMPORT'].includes(error.code)) {
      for (const suffix of ['.ts', '/index.ts']) {
        try { return await nextResolve(specifier + suffix, context); } catch { /* try the other local form */ }
      }
    }
    throw error;
  }
}
