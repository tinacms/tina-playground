import { Example } from "../app";
import { queryCode, wrapCodeNoImport } from "./basic";
import { schemaCode, markdownCode, wrapCode } from "./basic";

export const reactCode = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {data.post.title}
      </h2>
    </div>
  </div>
)`;

export const string = {
  label: "String",
  name: "string",
  value: {
    queryCode,
    schemaCode,
    markdownCode,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

const SchemaWithComponent = `import * as React from "react";
import { defineSchema } from "tinacms";

export default defineSchema({
  collections: [
    {
      label: "Post",
      name: "post",
      path: "posts",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
          ui: {
            component: ({ input }) => {
              return (
                <div>
                  <label htmlFor="title">Title: </label>
                  <input {...input}></input>
                </div>
              );
            },
          },
        },
      ],
    },
  ],
});
`;

const SchemaWithFormatAndParse = `import * as React from "react";
import { defineSchema } from "tinacms";

export default defineSchema({
  collections: [
    {
      label: "Post",
      name: "post",
      path: "posts",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "string",
          ui: {
            // is called on every form change but result is stored in data and not in the form value (saved to file but not displayed to the user)
            parse: (val?: string)=>val && val.toUpperCase(),
            // Is called on every form change and the result is put back into the value of the form (displayed to the user)
            format: (val?: string)=> (val ? val.toLowerCase() : ""),
          },
        },
      ],
    },
  ],
});
`;

export const stringWithComponent = {
  label: "String with custom component",
  name: "string-component",
  value: {
    queryCode,
    schemaCode: SchemaWithComponent,
    markdownCode,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

const markdownCodeUpper = `---
title: HELLO, WORLD
---`;
export const stringWithFormatAndParse = {
  label: "String with format and parse",
  name: "string-format-parse",
  value: {
    queryCode,
    schemaCode: SchemaWithFormatAndParse,
    markdownCode: markdownCodeUpper,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

export const queryCode2 = `query {
  post(relativePath: "hello-world.md") {
    tags
  }
}`;

export const reactCode2 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 space-x-2">
      {data.post.tags?.map((tag) => (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
          {tag}
        </span>
      ))}
    </div>
  </div>
);`;

export const schemaCode2 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Tags",
      name: "tags",
      type: "string",
      list: true
    }]
  }]
})`;

export const markdownCode2 = `---
tags:
  - music
  - movies
---`;

export const stringList = {
  label: "String List",
  name: "string-list",
  value: {
    queryCode: queryCode2,
    schemaCode: schemaCode2,
    markdownCode: markdownCode2,
    reactCode: wrapCode(reactCode2, queryCode2),
  },
  section: "middle",
};

export const queryCode3 = `query {
  post(relativePath: "hello-world.md") {
    category
  }
}`;

export const reactCode3 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 space-x-2">
      <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
        {data.post.category}
      </span>
    </div>
  </div>
);`;

export const schemaCode3 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Category",
      name: "category",
      type: "string",
      options: [{
        value: "movies",
        label: "Movies"
      }, {
        value: "music",
        label: "Music"
      }]
    }]
  }]
})`;

export const markdownCode3 = `---
category: movies
---`;

export const stringOptions = {
  label: "String + Options",
  name: "string-options",
  value: {
    queryCode: queryCode3,
    schemaCode: schemaCode3,
    markdownCode: markdownCode3,
    reactCode: wrapCode(reactCode3, queryCode3),
  },
  section: "middle",
};

export const queryCode4 = `query {
  post(relativePath: "hello-world.md") {
    categories
  }
}`;

export const reactCode4 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 space-x-2">
      {data.post.categories?.map((tag) => (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
          {tag}
        </span>
      ))}
    </div>
  </div>
);`;

export const schemaCode4 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Categories",
      name: "categories",
      type: "string",
      list: true,
      options: [
        {
          value: "movies",
          label: "Movies"
        }, {
          value: "music",
          label: "Music"
        }
      ]
    }]
  }]
})`;

export const markdownCode4 = `---
categories:
  - music
---`;

export const stringListOptions = {
  label: "String List + Options",
  name: "string-list-options",
  value: {
    queryCode: queryCode4,
    schemaCode: schemaCode4,
    markdownCode: markdownCode4,
    reactCode: wrapCode(reactCode4, queryCode4),
  },
  section: "middle",
};

export const schemaCode5 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Title",
      name: "title",
      type: "string",
    }, {
      label: "Body",
      name: "body",
      type: "string",
      // Indicates this field should repesent the file's body
      isBody: true
    }]
  }]
})`;

export const markdownCode5 = `---
title: Hello, World
---

This is the body
`;

export const reactCode5 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900">
        {data.post.title}
      </h2>
      <div className="my-4 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <p className="text-md text-gray-700">
        {data.post.body}
      </p>
    </div>
  </div>
)`;

export const queryCode5 = `query {
  post(relativePath: "hello-world.md") {
    title
    body
  }
}`;

export const stringBody = {
  label: "String as body",
  name: "string-body",
  value: {
    queryCode: queryCode5,
    schemaCode: schemaCode5,
    markdownCode: markdownCode5,
    reactCode: wrapCode(reactCode5, queryCode5),
  },
  section: "middle",
};

export const schemaCode6 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Description",
      name: "description",
      type: "string",
      ui: {
        component: "textarea"
      }
    }]
  }]
})`;

export const markdownCode6 = `---
description: This is a lengthy description that would be easier to edit in a textarea field
---
`;

export const reactCode6 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <p className="text-md text-gray-700">
        {data.post.description}
      </p>
    </div>
  </div>
)`;

export const queryCode6 = `query {
  post(relativePath: "hello-world.md") {
    description
  }
}`;

export const stringTextarea = {
  label: "String with Textarea",
  name: "string-textarea",
  value: {
    queryCode: queryCode6,
    schemaCode: schemaCode6,
    markdownCode: markdownCode6,
    reactCode: wrapCode(reactCode6, queryCode6),
  },
  section: "middle",
};

export const schemaCode7 = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Favorite Ice Cream",
      name: "favoriteIceCream",
      type: "string",
      ui: {
        component: "my-datalist"
      }
    }]
  }]
})`;

export const markdownCode7 = `---
---
`;

export const reactCode7 = `import * as React from 'react'
import { useCMS, wrapFieldsWithMeta } from 'tinacms'
import { useTina } from 'tinacms/dist/edit-state'

const DataList = (props) => {
  const onChange = (e) => {
    props.input.onChange(e.target.value)
  }
  return (
    <>
      <input value={props.input.value} onChange={onChange} list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" />
      <datalist id="ice-cream-flavors">
        <option value="Chocolate" />
        <option value="Mint" />
        <option value="Vanilla" />
      </datalist>
    </>
  )
}

// Note: In most cases, this query would be
// autogenerated with \`client.queries.<Collection>\`
// https://tina.io/docs/features/data-fetching/
const QUERY =  \`query {
  post(relativePath: "hello-world.md") {
    favoriteIceCream
  }
}\`

export default function Page(props) {
  const {data, isLoading} = useTina({ query: QUERY, 
    variables: {}, data: props.data
  })

  const cms = useCMS()

  React.useMemo(() => cms.fields.add({
    name: "my-datalist",
    // wrapFieldsWithMeta will provide the
    // field label and any error messages around your component
    Component: wrapFieldsWithMeta(DataList)
  }),[])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <p className="text-md text-gray-700">
          My favorite ice cream flavor is: {data.post.favoriteIceCream}
        </p>
      </div>
    </div>
  )
}
`;

export const queryCode7 = `query {
  post(relativePath: "hello-world.md") {
    favoriteIceCream
  }
}`;

export const stringCustom = {
  label: "String with Custom Field",
  name: "string-custom",
  value: {
    queryCode: queryCode7,
    schemaCode: schemaCode7,
    markdownCode: markdownCode7,
    reactCode: reactCode7,
  },
  section: "middle",
};

export const strings: Example[] = [
  string,
  stringList,
  stringOptions,
  stringListOptions,
  stringBody,
  stringTextarea,
  stringCustom,
  stringWithComponent,
  stringWithFormatAndParse,
];
