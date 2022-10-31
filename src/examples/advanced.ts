export const queryCode = `query {
  post(relativePath: "hello-world.md") {
    title
    body
  }
}`;

export const reactCode = `import * as React from 'react'
import { useTina } from 'tinacms/dist/react'
import { TinaMarkdown } from "tinacms/dist/rich-text";

const Callout = ({message}) => {
  if(!message) {
    return null
  }
  return (<div className="mt-8 flex justify-center">
    <div className="inline-flex rounded-md shadow">
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {message}
      </a>
    </div>
  </div>)
}

export default function Page(props) {
  const {data, isLoading} = useTina({ query: \`${queryCode}\`,
    variables: {},
    data: props.data
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mb-4">
          <span className="block">{data.post.title}</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <TinaMarkdown
          content={data.post.body}
          components={{Callout}}
        />
      </div>
    </div>
  )
}`;

export const schemaCode = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Title",
      name: "title",
      type: "string",
      list: false,
      ui: {
        validate: (val) => {
          if (val.length > 20) {
            return "Title must be less then 20 characters"
          }
        }
      }
    }, {
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
})


export default defineConfig({ schema })`;

export const markdownCode = `---
title: Hello, Again!
---

## This is the [body](https://example.com)!

<Callout message="Sign up today!" />
`;
