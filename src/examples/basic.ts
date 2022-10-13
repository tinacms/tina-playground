export const queryCode = `query {
  post(relativePath: "hello-world.md") {
    title
  }
}`;

export const wrapCode = (code: string, queryCode: string) => {
  return wrapCodeNoImport(
    code,
    queryCode,
    `import { useTina } from 'tinacms/dist/react'`
  );
};

export const wrapCodeNoImport = (
  code: string,
  queryCode: string,
  importItem: string
) => {
  return `import * as React from 'react'
${importItem}

export default function Page(props) {
  const {data, isLoading} = useTina({ query: \`${queryCode}\`,
    variables: {},
    data: props.data
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  ${code}
}`;
};

export const reactCode = wrapCode(
  `return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">{data.post.title}</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  )`,
  queryCode
);

export const schemaCode = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Title",
      name: "title",
      type: "string"
    }]
  }]
})

export default defineConfig({ schema })`;

export const markdownCode = `---
title: Hello, World
---`;
