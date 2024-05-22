export function makeQueryStringUrl(_URL, object) {
  const url = new URL(_URL);
  Object.keys(object).forEach((key) => {
    if (key === "filters") {
      url.searchParams.append(key, JSON.stringify(object[key]));
    } else {
      url.searchParams.append(key, object[key]);
    }
  });
  return url;
}
