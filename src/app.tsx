import React from "react";
import { BaseEditor } from "./editors/base-editor";
import * as Rich from "tinacms/dist/rich-text";
import * as EditState from "tinacms/dist/edit-state";

import * as tinacms from "tinacms";
import * as basic from "./examples/basic";
import * as validation from "./examples/validation";
import * as advanced from "./examples/advanced";
import { strings } from "./examples/string";
import { scalars } from "./examples/scalars";
import { objects } from "./examples/object";
import { richTexts } from "./examples/rich-text";
import { references } from "./examples/reference";
import { executeCode } from "./compile";
import { FakeTina } from "./tina";
import { Nav } from "./components/nav";
import { Tabs } from "./components/tabs";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  useSearchParams,
} from "react-router-dom";

const examples = [
  {
    label: "Basic",
    name: "basic",
    value: basic,
    section: "top",
  },
  {
    label: "Advanced",
    name: "advanced",
    value: advanced,
    section: "top",
  },
  {
    label: "Validation",
    name: "validation",
    value: validation,
    section: 'top'
  },
  ...strings,
  ...scalars,
  ...objects,
  ...richTexts,
  ...references,
];

const deps = {
  react: React,
  "@tinacms/cli": { defineSchema: (obj: object) => obj },
  "tinacms/dist/rich-text": Rich,
  "tinacms/dist/edit-state": EditState,
  tinacms: tinacms,
};
type Status = "ready" | "pending" | "error";
type Code = {
  reactCode: string;
  markdownCode: string;
  schemaCode: string;
  graphqlCode?: string;
};
export type Example = {
  label: string;
  name: string;
  value: Code;
  section: string;
};

export type Dispatch = React.Dispatch<Action>;
export type Error = { name: string; message: string };

export type State = Code & {
  example: Example;
  status: Status;
  errors: Error[];
  resetCounter: number;
  examples: Example[];
};

type Action =
  | { type: "reactCode"; value: string }
  | { type: "schemaCode"; value: string }
  | { type: "markdownCode"; value: string }
  | { type: "graphqlCode"; value: string }
  | { type: "reset" }
  | { type: "retry" }
  | { type: "error"; value: Error }
  | { type: "status"; value: Status };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "error":
      return {
        ...state,
        status: "error",
        // FIXME: GraphQL errors report twice so need to fix that on the useGraphQLForms side
        errors: [action.value],
      };
    case "status":
      return { ...state, status: action.value, errors: [] };
    case "reset":
      return {
        ...state,
        ...state.example.value,
        errors: [],
        status: "ready" as const,
        resetCounter: state.resetCounter + 1,
      };
    case "retry":
      return {
        ...state,
        errors: [],
        status: "ready" as const,
        resetCounter: state.resetCounter + 1,
      };
    default:
      return {
        ...state,
        errors: [],
        [action.type]: action.value,
        status: "pending" as const,
      };
  }
}

export function Layout({
  state,
  dispatch,
}: {
  state: State;
  dispatch: Dispatch;
}) {
  const [preview, setPreview] = React.useState<JSX.Element>(
    <div>Write some code</div>
  );
  React.useEffect(() => {
    if (state.status === "ready") {
      executeCode<JSX.Element>(state.reactCode, deps)
        .then((Preview) => {
          /**
           * FIXME: the `useGraphQLForms` hook expects the "query" to remain constant (ie. it's violating
           * the rule of hooks). Since the user can alter the query from within the react code, this isn't
           * getting picked up. So there may need to be 2 clicks for the new query to go through (not sure why but 2 works)
           */
          if (Preview) {
            // @ts-ignore JSX element type 'Preview' does not have any construct or call signatures.
            setPreview(<Preview />);
          }
        })
        .catch((e: Error) => {
          dispatch({
            type: "error",
            value: { name: "Compilation Error", message: e.message },
          });
        });
    }
    // }, [state.status, state.example, state.reactCode]);
  }, [state.status, state.example]);

  const items = [
    {
      name: ".tina/schema.tsx",
      render: (
        <BaseEditor
          extension="tsx"
          resetCounter={state.resetCounter}
          state={state}
          name={state.example.name}
          code={state.schemaCode}
          onUpdate={async (code) => {
            dispatch({ type: "schemaCode", value: code });
          }}
        />
      ),
    },
    {
      name: "posts/hello-world.md",
      render: (
        <BaseEditor
          extension="md"
          resetCounter={state.resetCounter}
          name={state.example.name}
          state={state}
          code={state.markdownCode}
          onUpdate={async (code) => {
            dispatch({ type: "markdownCode", value: code });
          }}
        />
      ),
    },
    {
      name: "pages/hello-world.jsx",
      render: (
        <BaseEditor
          extension="jsx"
          resetCounter={state.resetCounter}
          name={state.example.name}
          code={state.reactCode}
          state={state}
          onUpdate={async (code) => {
            dispatch({ type: "reactCode", value: code });
          }}
        />
      ),
    },
    // {
    //   name: "schema.graphql",
    //   render: (
    //     <BaseEditor
    //       extension="graphql"
    //       resetCounter={state.resetCounter}
    //       state={state}
    //       name={state.example.name}
    //       code={`query {
    //   __typename
    // }`}
    //       onUpdate={async (code) => {
    //         // dispatch({ type: "schemaCode", value: code });
    //       }}
    //     />
    //   ),
    // },
  ];
  const [activeIndex, setActiveIndex] = React.useState(0);

  const tabItems = [
    {
      name: ".tina/schema.tsx",
    },
    {
      name: "posts/hello-world.md",
    },
    {
      name: "pages/hello-world.jsx",
    },
    // GraphQL works, but isn't a great fit for the UX in this context
    // {
    //   name: "schema.graphql",
    // },
  ];

  return (
    <FakeTina {...state} dispatch={dispatch}>
      <div className="relative h-screen overflow-y-hidden">
        <div className="lg:hidden z-20 bg-white">
          <Tabs
            sticky={true}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            items={tabItems}
          />
        </div>
        <div
          className=" flex flex-col"
          style={{ height: "calc(100vh - 54px)" }}
        >
          <div className="flex-grow w-full flex border border-gray-200">
            <div className=" bg-white w-1/2 border-r border-gray-200">
              <div className="h-full w-full">
                <div className="hidden lg:block">
                  <Tabs
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    items={tabItems}
                  />
                </div>
                <div className="h-full w-full">{items[activeIndex].render}</div>
              </div>
            </div>
            <div
              className="bg-white w-1/2 relative overflow-y-scroll"
              style={{ height: "calc(100vh - 54px)" }}
            >
              {state.status === "error" && (
                <ErrorComp
                  dispatch={dispatch}
                  reset={() => {}}
                  errors={state.errors}
                />
              )}
              {state.status === "pending" && (
                <div
                  className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30`}
                >
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "retry" })}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Refresh
                  </button>
                </div>
              )}
              <ErrorBoundary
                key={state.resetCounter}
                status={state.status}
                dispatch={dispatch}
                errors={state.errors}
              >
                {preview}
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </FakeTina>
  );
}

type ErrorState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<
  { status: Status; dispatch: Dispatch; errors: Error[] },
  ErrorState
> {
  state: ErrorState = {
    hasError: this.props.status === "error",
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  render() {
    if (this.state.hasError) {
      const errors = this.state.error
        ? [...this.props.errors, this.state.error]
        : this.props.errors;
      return (
        <ErrorComp
          errors={errors}
          reset={() => this.setState({ hasError: false })}
          dispatch={this.props.dispatch}
        />
      );
    }

    return <>{this.props.children}</>;
  }
}

function Button({
  reset,
  dispatch,
}: {
  reset: () => void;
  dispatch: Dispatch;
}) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="inline-flex rounded-md shadow">
        <button
          type="button"
          onClick={() => {
            reset();
            dispatch({ type: "retry" });
          }}
          className="inline-flex items-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Retry
        </button>
      </div>
      <div className="ml-3 inline-flex rounded-md shadow">
        <button
          onClick={() => {
            reset();
            dispatch({ type: "reset" });
          }}
          type="button"
          className="inline-flex items-center px-8 py-2 border border-red-200 text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export const ErrorComp = ({
  dispatch,
  reset,
  errors,
}: {
  dispatch: Dispatch;
  reset: () => void;
  errors: Error[];
}) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute inset-0 top-12 lg:top-0 flex flex-col border-t border-gray-200 dark:border-white/10 lg:border-0 bg-gray-50 dark:bg-black">
        <div
          className="flex-auto grid justify-center"
          style={{ gridTemplateColumns: "100%" }}
        >
          <div className="relative"></div>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full p-6 bg-red-50 text-red-700 mt-10 border-t border-gray-200 dark:border-gray-600 md:mt-0 md:border-0">
        {errors.map((err) => {
          return (
            <>
              <h2 className="text-base leading-6 font-semibold text-red-900 mb-4 flex items-center">
                <span className="bg-red-500 rounded-full w-4 h-4 border-4 border-red-200" />
                <span className="ml-3.5">{err.name}</span>
              </h2>
              <h2 className="text-red-700 mb-4">{err.message}</h2>
            </>
          );
        })}
        <div className="mx-auto w-full">
          <Button reset={reset} dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

const Wrapper = ({
  includeNav = true,
  example,
}: {
  includeNav?: boolean;
  example: string;
}) => {
  const exampleObject = examples.find((ex) => ex.name === example);
  if (!exampleObject) {
    throw new Error(`Unable to find example code for ${example}`);
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const exampleOverride: typeof examples[0]["value"] | undefined =
    React.useMemo(() => {
      const overrides = {
        markdownCode: searchParams.get("markdownCode") || "",
        reactCode: searchParams.get("reactCode") || "",
        schemaCode: searchParams.get("schemaCode") || "",
      };
      if (
        overrides.reactCode &&
        overrides.markdownCode &&
        overrides.schemaCode
      ) {
        return overrides;
      }
    }, []);

  const init = {
    status: "ready" as const,
    resetCounter: 0,
    examples,
    errors: [],
    example: exampleObject,
    ...(exampleOverride || exampleObject.value),
  };
  const [state, dispatch] = React.useReducer(reducer, init);

  React.useEffect(() => {
    setSearchParams({
      markdownCode: state.markdownCode,
      schemaCode: state.schemaCode,
      reactCode: state.reactCode,
    });
  }, [state.markdownCode, state.schemaCode, state.reactCode]);

  return (
    <>
      {includeNav && (
        <Nav
          activeExampleLabel={state.example.label}
          examples={state.examples}
        />
      )}
      <Layout key={example} dispatch={dispatch} state={state} />
    </>
  );
};

const Inner = (props: { includeNav?: boolean }) => {
  const { example } = useParams();

  return <Wrapper {...props} key={example} example={example || "basic"} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inner />} />
        <Route path="/:example" element={<Inner />} />
        <Route path="iframe" element={<Inner includeNav={false} />} />
        <Route path="/iframe/:example" element={<Inner includeNav={false} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
