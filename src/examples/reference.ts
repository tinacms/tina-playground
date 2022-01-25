import { Example } from "../app";
import { wrapCode } from "./basic";

export const queryCode = `query {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      author {
        data {
          name
          avatar
        }
      }
    }
  }
}`;

export const reactCode = `import React from 'react'
import { useTina } from 'tinacms/dist/edit-state'

export default function Page(props) {
  const {data, isLoading} = useTina({
    query: \`query {
      getPostDocument(relativePath: "hello-world.md") {
        data {
          author {
            ...on AuthorDocument {
              data {
                name
                avatar
              }
            }
          }
        }
      }
    }\`,
    variables: {}, 
    data: props.data
  })

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div>
      <div>
        <a href="#" className="inline-block">
          <span
            className="bg-indigo-100 text-indigo-800 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
          >
            Music
          </span>
        </a>
      </div>
      <a href="#" className="block mt-4">
        <p className="text-xl font-semibold text-gray-900">Hello, World!</p>
        <p className="mt-3 text-base text-gray-500">Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.</p>
      </a>
      <div className="mt-6 flex items-center">
        <div className="flex-shrink-0">
          <a href="#">
            <img className="h-10 w-10 rounded-full" src={data.getPostDocument.data.author.data.avatar} alt="" />
          </a>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">
            <a href="#">{data.getPostDocument.data.author.data.name}</a>
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <span >Yesterday</span>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}`;

export const schemaCode = `import { defineSchema } from '@tinacms/cli'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Author",
      name: "author",
      type: "reference",
      collections: ["author"]
    }]
  }, {
    label: "Author",
    name: "author",
    path: "authors",
    fields: [{
      label: "Name",
      name: "name",
      type: "string",
    }, {
      label: "Avatar",
      name: "avatar",
      type: "string",
    }]
  }]
})`;

export const markdownCode = `---
author: authors/pedro.md
---
`;

export const reference = {
  label: "Reference",
  name: "reference",
  value: {
    queryCode: queryCode,
    schemaCode: schemaCode,
    markdownCode: markdownCode,
    reactCode,
  },
  section: "middle",
};

export const references: Example[] = [reference];
