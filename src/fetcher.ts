export const API_URL = import.meta.env.VITE_API_URL;
// export const API_URL =
//   "https://tinacms-site-next-6pwid2q8w-tinacms.vercel.app/api/graphql";
// // export const API_URL = "http://localhost:3002/api/graphql";

export const fetcher = async ({
  schemaCode,
  markdownCode,
  queryCode,
  variables,
}: {
  schemaCode: object;
  markdownCode: string;
  queryCode: string;
  variables: object;
}) => {
  const url = `${API_URL}?schema=${encodeURIComponent(
    JSON.stringify(schemaCode)
  )}&content=${encodeURIComponent(
    markdownCode
  )}&query=${queryCode}&variables=${encodeURIComponent(
    JSON.stringify(variables)
  )}`;
  console.log(url);

  const res = await fetch(
    `${API_URL}?schema=${encodeURIComponent(
      JSON.stringify(schemaCode)
    )}&content=${encodeURIComponent(
      markdownCode
    )}&query=${queryCode}&variables=${encodeURIComponent(
      JSON.stringify(variables)
    )}`
  );

  const json = await res.json();
  return json;
};
