import type { Example } from "../app";
import { wrapCode } from "./basic";

export const queryCode = `query {
  post(relativePath: "hello-world.md") {
    count
  }
}`;

export const schemaCode = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Count",
      name: "count",
      type: "number",
    }]
  }]
})
export default defineConfig({ schema });
`;
export const schemaCodeValidate = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Count",
      name: "count",
      type: "number",
      ui:{
        validate: (val)=>{
          if(val >= 10 ) {
            return 'the number must be less then 10'
          }
        }
      }
    }]
  }]
})
export default defineConfig({ schema });
`;

export const markdownCode = `---
count: 3
---`;

export const reactCode = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Counter</span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{data.post.count}</span>
      </a>
    </div>
  </div>
)`;

export const number = {
  label: "Number",
  name: "number",
  value: {
    queryCode,
    schemaCode,
    markdownCode,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

export const numberWithValidate = {
  label: "Number with validate",
  name: "number-validate",
  value: {
    queryCode,
    schemaCode: schemaCodeValidate,
    markdownCode,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

export const queryCode2 = `query {
  post(relativePath: "hello-world.md") {
    date
  }
}`;

export const schemaCode2 = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Date",
      name: "date",
      type: "datetime",
    }]
  }]
})
export default defineConfig({ schema });
`;

export const markdownCode2 = `---
date: '2021-12-09T08:00:00.000Z'
---`;

export const reactCode2 = `
return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Today's date: </span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{data.post.date}</span>
      </a>
    </div>
  </div>
)`;

export const datetime = {
  label: "Datetime",
  name: "datetime",
  value: {
    queryCode: queryCode2,
    schemaCode: schemaCode2,
    markdownCode: markdownCode2,
    reactCode: wrapCode(reactCode2, queryCode2),
  },
  section: "middle",
};

export const schemaCodeFormatted = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Date",
      name: "date",
      type: "datetime",
      ui: {
        dateFormat: 'YYYY MM DD'
      }
    }]
  }]
})

export default defineConfig({ schema });
`;

export const datetimeFormatted = {
  label: "Datetime Custom Format",
  name: "datetime-format",
  value: {
    queryCode: queryCode2,
    schemaCode: schemaCodeFormatted,
    markdownCode: markdownCode2,
    reactCode: wrapCode(reactCode2, queryCode2),
  },
  section: "middle",
};

export const queryCode3 = `query {
  post(relativePath: "hello-world.md") {
    published
  }
}`;

export const schemaCode3 = `import { defineSchema, defineConfig } from 'tinacms'

const schema = defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Published",
      name: "published",
      type: "boolean",
    }]
  }]
})
export default defineConfig({ schema });
`;
export const schemaCode3WithComponent = `import * as React from "react";
import { defineSchema, defineConfig } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Post",
      name: "post",
      path: "posts",
      fields: [
        {
          label: "Published",
          name: "published",
          type: "boolean",
          ui: {
            component: ({ input }) => {
              return (
                <div>
                  <label htmlFor="published"> Published: </label>
                  <input
                    {...input}
                    id="published"
                    type="checkbox"
                    checked={input?.value}
                  ></input>
                </div>
              );
            },
          },
        },
      ],
    },
  ],
});
export default defineConfig({ schema });
`;

export const markdownCode3 = `---
published: true
---`;

export const reactCode3 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Published</span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{data.post.published ? "true" : "false"}</span>
      </a>
    </div>
  </div>
)`;

// FIXME: moment is not defined
export const boolean = {
  label: "Boolean",
  name: "boolean",
  value: {
    queryCode: queryCode3,
    schemaCode: schemaCode3,
    markdownCode: markdownCode3,
    reactCode: wrapCode(reactCode3, queryCode3),
  },
  section: "middle",
};
export const booleanWithComponent = {
  label: "Boolean  with custom component",
  name: "boolean-component",
  value: {
    queryCode: queryCode3,
    schemaCode: schemaCode3WithComponent,
    markdownCode: markdownCode3,
    reactCode: wrapCode(reactCode3, queryCode3),
  },
  section: "middle",
};

export const scalars: Example[] = [
  number,
  numberWithValidate,
  boolean,
  booleanWithComponent,
  datetime,
  datetimeFormatted,
];
