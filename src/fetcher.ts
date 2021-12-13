export const API_URL = "http://localhost:4001/graphql-mem";

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
