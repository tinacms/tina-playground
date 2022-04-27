import * as esbuild from "esbuild-wasm";
import wasmURL from "esbuild-wasm/esbuild.wasm?url";

let built = false;

export async function executeCode<T extends unknown>(
  code: string,
  dependencies: Record<string, unknown> = {}
): Promise<T> {
  if (!built) {
    await esbuild.initialize({
      wasmURL: wasmURL,
    });
    built = true;
  }
  // @ts-ignore
  return esbuild
    .transform(code, {
      jsx: "transform",
      loader: "tsx",
      format: "cjs",
    })
    .then((meh) => {
      const exports: Record<string, unknown> = {};
      const require = (path: string) => {
        if (dependencies[path]) {
          return dependencies[path];
        }
        throw Error(`Module not found: ${path}.`);
      };
      const result = new Function("exports", "require", meh.code);

      result(exports, require);

      return exports.default;
    });
}
