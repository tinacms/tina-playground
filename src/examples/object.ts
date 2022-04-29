import type { Example } from "../app";
import { wrapCode } from "./basic";

export const queryCode = `query {
  post(relativePath: "hello-world.md") {
    testimonial {
      author
      role
      quote
    }
  }
}`;

export const schemaCode = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Testimonial",
      name: "testimonial",
      type: "object",
      fields: [
        {
          label: "Author",
          name: "author",
          type: "string"
        },
        {
          label: "Role",
          name: "role",
          type: "string"
        },
        {
          label: "Quote",
          name: "quote",
          type: "string",
          ui: {
            component: "textarea"
          }
        }
      ]
    }]
  }]
})`;

export const markdownCode = `---
testimonial:
  author: Judith Black
  role: CEO
  quote: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.
---`;

export const reactCode = `return (
  <div className="relative">
  <blockquote className="mt-10 px-4">
    <div className="max-w-3xl mx-auto text-center text-xl leading-9 font-medium text-gray-900">
      <p>
        &ldquo;{data.post.testimonial?.quote}&rdquo;
      </p>
    </div>
    <footer className="mt-8">
      <div className="md:flex md:items-center md:justify-center">
        <div className="md:flex-shrink-0">
          <img
            className="mx-auto h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
          <div className="text-base font-medium text-gray-900">{data.post.testimonial?.author}</div>

          <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 0h3L9 20H6l5-20z" />
          </svg>

          <div className="text-base font-medium text-gray-500">{data.post.testimonial?.role}</div>
        </div>
      </div>
    </footer>
  </blockquote>
</div>
)`;

export const object = {
  label: "Simple Object",
  name: "object",
  value: {
    queryCode,
    schemaCode,
    markdownCode,
    reactCode: wrapCode(reactCode, queryCode),
  },
  section: "middle",
};

export const markdownCodeWithNoData = `---
testimonials:
  - author: Livvy Abby
    role: CEO
    quote: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.
---`;

export const schemaCodeWithData = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Testimonials",
      name: "testimonials",
      type: "object",
      list: true,
      ui: {
        // This allows the customization of the list item UI
        // Data can be accessed by item?.<Name of field>
        itemProps: (item) => {
          return { label: \`\${item?.author}  ( \${item?.role} ) \`}
        },
        // Setting a default will auto-populate new items with the given values
        defaultItem: {
          author: "Judith Black",
          role: "CEO",
          quote: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."
        }
      },
      fields: [
        {
          label: "Author",
          name: "author",
          type: "string"
        },
        {
          label: "Role",
          name: "role",
          type: "string"
        },
        {
          label: "Quote",
          name: "quote",
          type: "string",
          ui: {
            component: "textarea"
          }
        }
      ]
    }]
  }]
})`;

export const queryCode2 = `query {
  post(relativePath: "hello-world.md") {
    testimonials {
      author
      role
      quote
    }
  }
}`;

export const reactCode2 = `return (
  <div className="relative">
  {data.post.testimonials?.map(testimonial => (<blockquote className="mt-10">
    <div className="max-w-3xl mx-auto text-center text-xl leading-9 font-medium text-gray-900">
      <p>
        &ldquo;{testimonial?.quote}&rdquo;
      </p>
    </div>
    <footer className="mt-8">
      <div className="md:flex md:items-center md:justify-center">
        <div className="md:flex-shrink-0">
          <img
            className="mx-auto h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
          <div className="text-base font-medium text-gray-900">{testimonial?.author}</div>

          <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 0h3L9 20H6l5-20z" />
          </svg>

          <div className="text-base font-medium text-gray-500">{testimonial?.role}</div>
        </div>
      </div>
    </footer>
  </blockquote>))}
</div>
)`;

export const objectListWithData = {
  label: "Object list with data",
  name: "object-list-data",
  value: {
    queryCode: queryCode2,
    schemaCode: schemaCodeWithData,
    markdownCode: markdownCodeWithNoData,
    reactCode: wrapCode(reactCode2, queryCode2),
  },
  section: "middle",
};

export const markdownBlock = `---
pageBlocks:
  - header: Get in touch!
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis."
    _template: cta
  - author: Judith Black
    role: CEO
    quote: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.
    _template: testimonial
---`;

export const schemaCodeBlock = `import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [{
    label: "Post",
    name: "post",
    path: "posts",
    fields: [{
      label: "Page Blocks",
      name: "pageBlocks",
      type: "object",
      list: true,
      templates: [
        {
          label: "CTA",
          name: "cta",
          fields: [
            {
              label: "Header",
              name: "header",
              type: "string"
            },
            {
              label: "Description",
              name: "description",
              type: "string",
              ui: {
                component: "textarea"
              }
            }
          ]
        },
        {
          label: "Testimonial",
          name: "testimonial",
          fields: [
            {
              label: "Author",
              name: "author",
              type: "string"
            },
            {
              label: "Role",
              name: "role",
              type: "string"
            },
            {
              label: "Quote",
              name: "quote",
              type: "string",
              ui: {
                component: "textarea"
              }
            }
          ]
        }
      ]
    }]
  }]
})`;

export const queryCodeBlock = `query {
  post(relativePath: "hello-world.md") {
    pageBlocks {
      __typename
      ...on PostPageBlocksCta {
        header
        description
      }
      ...on PostPageBlocksTestimonial {
        author
        role
        quote
      }
    }
  }
}`;

export const blockCta = `return (
  <div className="bg-indigo-600">
    <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <h2 className="text-lg font-extrabold text-white sm:text-2xl">
        {pageBlock.header}
      </h2>
      <h2 className="text-md text-gray-100 sm:text-lg">
        {pageBlock.description}
      </h2>
    </div>
  </div>
)`;

export const blockTestimonial = `return (
  <div className="relative">
  <blockquote className="my-10 px-4">
    <div className="max-w-3xl mx-auto text-center text-xl leading-9 font-medium text-gray-900">
      <p>
        &ldquo;{pageBlock?.quote}&rdquo;
      </p>
    </div>
    <footer className="mt-8">
      <div className="md:flex md:items-center md:justify-center">
        <div className="md:flex-shrink-0">
          <img
            className="mx-auto h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
          <div className="text-base font-medium text-gray-900">{pageBlock?.author}</div>

          <svg className="hidden md:block mx-1 h-5 w-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 0h3L9 20H6l5-20z" />
          </svg>

          <div className="text-base font-medium text-gray-500">{pageBlock?.role}</div>
        </div>
      </div>
    </footer>
  </blockquote>
</div>
)`;

export const reactCodeBlock = `

return (
  <div>{data.post.pageBlocks?.map(pageBlock => {
    switch(pageBlock.__typename) {
      case "PostPageBlocksCta":
        ${blockCta}
      case "PostPageBlocksTestimonial":
        ${blockTestimonial}
    }
  })}</div>
)`;

export const objectLisBlock = {
  label: "Object list with templates",
  name: "object-list-templates",
  value: {
    queryCode: queryCodeBlock,
    schemaCode: schemaCodeBlock,
    markdownCode: markdownBlock,
    reactCode: wrapCode(reactCodeBlock, queryCodeBlock),
  },
  section: "middle",
};

export const objects: Example[] = [object, objectListWithData, objectLisBlock];
