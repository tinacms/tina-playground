import type { Example } from "../app";
import { wrapCode } from "./basic";

export const queryCode = `query {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      count
    }
  }
}`;

export const schemaCode = `import { defineSchema } from '@tinacms/cli'

export default defineSchema({
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
})`;

export const markdownCode = `---
count: 3
---`;

export const reactCode = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Counter</span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{response.getPostDocument.data.count}</span>
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

export const queryCode2 = `query {
  getPostDocument(relativePath: "hello-world.md") {
    data {
      date
    }
  }
}`;

export const schemaCode2 = `import { defineSchema } from '@tinacms/cli'

export default defineSchema({
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
})`;

export const markdownCode2 = `---
date: '2021-12-09T08:00:00.000Z'
---`;

export const reactCode2 = `
return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Today's date: </span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{response.getPostDocument.data.date}</span>
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

export const schemaCodeFormatted = `import { defineSchema } from '@tinacms/cli'

export default defineSchema({
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
})`;

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
  getPostDocument(relativePath: "hello-world.md") {
    data {
      published
    }
  }
}`;

export const schemaCode3 = `import { defineSchema } from '@tinacms/cli'

export default defineSchema({
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
})`;

export const markdownCode3 = `---
published: true
---`;

export const reactCode3 = `return (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center">
      <a className={'bg-gray-50 text-gray-90 flex items-center px-3 py-2 text-sm font-medium rounded-md space-x-3'}>
        <span>Published</span>
        <span className='bg-gray-300 text-gray-600 ml-auto inline-block py-0.5 px-3 text-xs rounded-full'>{response.getPostDocument.data.published ? "true" : "false"}</span>
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

export const scalars: Example[] = [
  number,
  boolean,
  datetime,
  datetimeFormatted,
];
