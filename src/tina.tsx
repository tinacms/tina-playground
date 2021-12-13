import React from "react";
import { TinaCMS as TCMS, LocalClient, TinaProvider } from "tinacms";
import * as richtext from "tinacms/dist/rich-text";
import * as tinacms from "tinacms";
import { executeCode } from "./compile";
import { Dispatch } from "./app";
import { fetcher } from "./fetcher";

const deps = {
  react: React,
  "@tinacms/cli": { defineSchema: (obj: object) => obj },
  "tinacms/dist/rich-text": richtext,
  tinacms: tinacms,
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
      const schemaObj = (await executeCode(this.schemaCode, deps)) as object;
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
}) => {
  const cms = React.useMemo(() => {
    const cms = new TCMS({
      enabled: true,
      sidebar: {
        position: "overlay",
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
  return <TinaProvider cms={cms}>{props.children}</TinaProvider>;
};
