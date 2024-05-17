export function makeLogin(requestConfig) {
  //   console.log("requestConfig", requestConfig);
  return new Promise(async (resolve, reject) => {
    return await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      headers: requestConfig.headers ? requestConfig.headers : {},
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    })
      .then((response) => console.log("response", response))
      .catch((error) => reject(error));
  });
}
