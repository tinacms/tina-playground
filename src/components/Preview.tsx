// TODO: when we switch to use iframe here we can use this for the preview

import * as React from 'react'

import * as tinacms from 'tinacms'
import * as Rich from "tinacms/dist/rich-text";
import * as EditState from "tinacms/dist/edit-state";
import * as TinaReact from "tinacms/dist/react";

import { executeCode } from '../compile';
import { Dispatch, ErrorBoundary, State } from '../app';

 function useTina<T extends object>(props: {
  query: string
  variables: object
  data: T
}): { data: T } {
  const [data, setData] = React.useState(props.data)
  React.useEffect(() => {
    const id = btoa(JSON.stringify({ query: props.query }))
    console.log('opening', id)
    parent.postMessage({ type: 'open', ...props, id }, window.location.origin)
    window.addEventListener('message', (event) => {
      console.log({event})
      if (event.data.id === id) {
        console.log('child: event received')
        setData(event.data.data)
      }
    })

    return () =>
      parent.postMessage({ type: 'close', id }, window.location.origin)
  }, [])
  return { data } as any
}


const deps = {
  react: React,
  "@tinacms/cli": { defineSchema: (obj: object) => obj, defineConfig: (obj: object) => obj },
  "tinacms/dist/rich-text": Rich,
  "tinacms/dist/edit-state": EditState,
  tinacms: tinacms,
  "tinacms/dist/react": TinaReact,
};


export function Preview({
    state,
    dispatch,
  }: {
    state: State;
    dispatch: Dispatch
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
  
  
  
   
    return (
     <ErrorBoundary
                  key={state.resetCounter}
                  status={state.status}
                  dispatch={dispatch}
                  errors={state.errors}
                >
                  {preview}
                </ErrorBoundary>)
  }