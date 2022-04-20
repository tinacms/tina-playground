import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor";
import { initializeMode } from "monaco-graphql/esm/initializeMode";
import { State } from "../app";
import { getIntrospectionQuery } from "graphql";
import { executeCode } from "../compile";
import * as richtext from "tinacms/dist/rich-text";
import * as tinacms from "tinacms";
import { MonacoGraphQLAPI } from "monaco-graphql";
import { API_URL, fetcher } from "../fetcher";

// These are manually copied over from @tinacms/graphql
import tinatypes from "./types.d.ts?raw";
import reactypes from "./react-types.d.ts?raw";

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
});
monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `
declare module 'tinacms' {
  ${tinatypes}
  export declare function defineSchema(obj: TinaCloudSchemaBase) : object
}

declare module 'react' {
  ${reactypes}
}
`,
  "file:///node_modules/@tinacms/cli/index.d.ts"
);

const deps = {
  react: React,
  "@tinacms/cli": { defineSchema: (obj: object) => obj },
  "tinacms/dist/rich-text": richtext,
  tinacms: tinacms,
};

export const BaseEditor = (props: {
  code: string;
  resetCounter: number;
  name: string;
  state: State;
  onUpdate: (code: string) => void;
  extension: "jsx" | "md" | "graphql" | "ts" | "tsx";
}) => {
  const monacoEl = useRef(null);
  const editor = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const model = React.useRef<monaco.editor.ITextModel | null>(null);

  const languages: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    md: "markdown",
    graphql: "graphql",
    jsx: "javascript",
    tsx: "typescript",
  };
  const language = languages[props.extension];

  useEffect(() => {
    let operationModel: monaco.editor.ITextModel | null;
    let operationEditor: monaco.editor.IStandaloneCodeEditor | null;
    let codelens: monaco.IDisposable | null;
    let monacoGraphQLAPI: MonacoGraphQLAPI | null;
    const run = async () => {
      if (monacoEl && !editor.current) {
        operationModel = monaco.editor.createModel(
          props.code,
          language,
          monaco.Uri.file(`/1/operation.${props.extension}`)
        );
        model.current = operationModel;
        operationEditor = monaco.editor.create(monacoEl.current!, {
          model: operationModel,
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          formatOnPaste: true,
          lineNumbers: "off",
          formatOnType: true,
          // Takes too much horizontal space for iframe
          folding: false,
          renderLineHighlight: "none",
          scrollbar: {
            verticalScrollbarSize: 1,
            horizontalScrollbarSize: 1,
          },
          language,
        });
        // Hack to give margin above first line https://github.com/Microsoft/monaco-editor/issues/1333#issuecomment-469319816
        operationEditor.changeViewZones((accessor) => {
          accessor.addZone({
            afterLineNumber: 0,
            heightInPx: 12,
            domNode: document.createElement("SPAN"),
          });
        });

        if (props.extension === "graphql") {
          monacoGraphQLAPI = initializeMode({
            formattingOptions: {
              prettierConfig: {
                printWidth: 120,
              },
            },
          });
          const schemaObj = (await executeCode(
            props.state.schemaCode,
            deps
          )) as object;
          const schema = await fetcher({
            markdownCode: props.state.markdownCode,
            queryCode: getIntrospectionQuery(),
            schemaCode: schemaObj,
            variables: {},
          });
          const operationUri = operationModel.uri.toString();
          if (typeof API_URL === "string") {
            const schemaConfig = {
              introspectionJSON: schema.data,
              uri: monaco.Uri.parse(API_URL).toString(),
            };
            if (schema) {
              monacoGraphQLAPI.setSchemaConfig([
                { ...schemaConfig, fileMatch: [operationUri] },
              ]);
            }
          }
        }

        editor.current = operationEditor;
      }
    };

    run();

    return () => {
      operationModel?.dispose();
      operationEditor?.dispose();
      codelens?.dispose();
      editor.current = null;
      model.current = null;
    };
  }, [monacoEl.current, props.extension, props.name, props.resetCounter]);
  const style = { height: "100%", width: "100%" };

  React.useEffect(() => {
    editor.current?.onDidChangeModelContent(() => {
      props.onUpdate(editor?.current?.getValue() || "");
    });
  }, [editor.current, props.extension, props.name, props.resetCounter]);

  return (
    <>
      <div style={style} ref={monacoEl}></div>
    </>
  );
};
