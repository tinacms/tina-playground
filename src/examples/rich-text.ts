import { Example } from "../app";
import { wrapCode } from "./basic";

export const queryCode = `query {
  post(relativePath: "hello-world.md") {
    body
  }
}`;

export const reactCode = `import * as React from 'react'
import { useTina } from 'tinacms/dist/edit-state'
import { useCMS } from 'tinacms'
import { TinaMarkdown } from "tinacms/dist/rich-text";

const Callout = ({message}) => {
  if(!message) {
    return null
  }
  return (<div className="mt-8 flex justify-center">
    <div className="inline-flex rounded-md shadow">
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {message}
      </a>
    </div>
  </div>)
}

export default function Page(props) {
  const cms = useCMS()
  React.useMemo(() => {
    cms.flags.set('rich-text-alt', true)
  }, [cms])
  const {data, isLoading} = useTina({ query: \`query {
      post(relativePath: "hello-world.md") {
        body
      }
    }\`, variables: {}, data: props.data
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="prose">
          <TinaMarkdown
            content={data.post.body}
            components={{Callout}}
          />
        </div>
      </div>
    </div>
  )
}`;

export const schemaCode = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Body",
      name: "body",
      isBody: true,
      type: "rich-text",
      templates: [
        {
          name: "Callout",
          label: "Callout",
          fields: [{
            name: "message",
            label: "Message",
            type: "string"
          }
        ]}
      ]
    }]
  }]
})`;

export const markdownCode = `---
---

## Welcome

Learn about working with [rich text](https://tina.io/docs/editing/mdx/)!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum neque at augue eleifend mollis. Aliquam consequat, lectus convallis egestas scelerisque, nulla ex efficitur massa, eu congue sapien ante rutrum felis. Quisque rutrum enim id nunc aliquam aliquet. Donec eu diam eu velit maximus tempus non eu libero. Aliquam venenatis lectus a odio feugiat consectetur. Integer vel nibh ac leo vehicula sollicitudin. Duis convallis porta ex sed tristique. Mauris id consequat risus, et ullamcorper velit. Vivamus ultricies dapibus suscipit. Nullam blandit nisl est, sit amet cursus eros bibendum ut. Nulla auctor porta justo mollis gravida. Aliquam in quam est. Vestibulum in justo nec libero feugiat maximus. Curabitur congue, metus nec congue luctus, odio nulla rutrum risus, sit amet dignissim leo nulla eget nunc.

<Callout message="Sign up today!" />

Quisque a orci tristique, consectetur nibh non, posuere arcu. Fusce justo diam, blandit sollicitudin eros sed, vestibulum bibendum dui. Sed rhoncus dui tellus, quis laoreet lectus ultricies in. Maecenas et metus porta, blandit tellus sed, facilisis ex. Nunc pellentesque ullamcorper velit, at elementum lectus lacinia a. Pellentesque a lacus tristique, sagittis eros ut, elementum leo. Etiam dapibus lacinia nulla aliquet blandit. Curabitur congue tempor lacus fringilla porttitor. Vestibulum vitae mi ut mauris pretium pellentesque euismod at ipsum. Nunc laoreet metus eu tempor egestas. Donec accumsan, sem eu sagittis fermentum, ligula ex facilisis metus, at viverra sem dolor in felis. Suspendisse eget odio arcu.

`;

export const richText = {
  label: "Rich text",
  name: "rich-text",
  value: {
    queryCode: queryCode,
    schemaCode: schemaCode,
    markdownCode: markdownCode,
    reactCode,
  },
  section: "middle",
};

export const richTexts: Example[] = [richText];
