import React, { useEffect, useMemo } from "react";
import {
  TinaCMS as TCMS,
  LocalClient,
  TinaProvider,
  TinaDataProvider,
} from "tinacms";
import { TinaSchema, addNamespaceToSchema } from "@tinacms/schema-tools";
import * as richtext from "tinacms/dist/rich-text";
import * as TinaReact from 'tinacms/dist/react'
import * as tinacms from "tinacms";
import { executeCode } from "./compile";
import { Dispatch } from "./app";
import { fetcher } from "./fetcher";

const deps = {
  react: React,
  "tinacms/dist/rich-text": richtext,
  tinacms: tinacms,
  "tinacms/dist/react": TinaReact,
};

class MockClient extends LocalClient {
  public markdownCode: string;
  public schemaCode: string;
  public dispatch: Dispatch;

  constructor(props: {
    markdownCode: string;
    schemaCode: string;
    dispatch: Dispatch;
  }) {
    // @ts-ignore
    super(props);
    this.dispatch = props.dispatch;
    this.markdownCode = props.markdownCode;
    this.schemaCode = props.schemaCode;
  }
  async request(query: string, options: { variables: object }) {
    try {
      // @ts-ignore
      const schemaObj = (await executeCode(this.schemaCode, deps))?.schema as object;
      // @ts-ignore
      this.schema = new TinaSchema({
        version: { fullVersion: "", major: "", minor: "", patch: "" },
        meta: { flags: [] },
        ...addNamespaceToSchema(schemaObj, []),
      });
      const res = await fetcher({
        schemaCode: schemaObj,
        markdownCode: this.markdownCode,
        queryCode: query,
        variables: options.variables,
      });
      if (res.errors) {
        const e = res.errors[0];
        this.dispatch({
          type: "error",
          value: { name: "GraphQL Error", message: e.message },
        });
        return;
      }
      return res.data;
    } catch (e) {
      if (e instanceof Error) {
        this.dispatch({
          type: "error",
          value: { name: "Schema Compilation Error", message: e.message },
        });
      }
    }
  }
}

export const FakeTina = (props: {
  markdownCode: string;
  schemaCode: string;
  reactCode: string;
  dispatch: Dispatch;
  children: JSX.Element;
  resetCounter: number;
}) => {
  const cms = React.useMemo(() => {
    const cms = new TCMS({
      enabled: true,
      sidebar: {
        // displayMode: "overlay",
      },
    });
    cms.registerApi(
      "tina",
      new MockClient({
        ...props,
      })
    );
    return cms;
  }, [props.markdownCode, props.schemaCode, props.reactCode]);

  return (
    <TinaProvider cms={cms}>
      <TinaDataProvider
        key={props.resetCounter}
        formifyCallback={undefined as any}
      >
        {props.children}
      </TinaDataProvider>
    </TinaProvider>
  );
};
