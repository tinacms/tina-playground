export const API_URL = import.meta.env.VITE_API_URL;

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
