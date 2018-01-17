const defaultOptions = {
  method: "GET",
  headers: {
    Accept: "application/json"
  },
  credentials: "include"
};

function mergeOptions(opt1, opt2) {
  return {
    ...opt1,
    ...opt2,
    headers: {
      ...opt1.headers,
      ...opt2.headers
    }
  };
}

function postOptions(options = {}) {
  return mergeOptions(options, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    }
  });
}

function makeRequest(url, options = {}) {
  const mergedOption = mergeOptions(defaultOptions, options);
  return fetch(url, mergedOption);
}

function handleResponse(response) {
  const { status, statusText } = response;
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("json");

  if (!response.ok) {
    if (!isJson) return Promise.reject({ status, statusText });

    return response.json().then((error) =>
      Promise.reject({
        status,
        statusText,
        error
      })
    );
  }

  if (isJson) return response.json();

  console.log("response", response); // eslint-disable-line
  throw new Error("unhandled response type");
}

function getJSON(url) {
  return makeRequest(url).then(handleResponse);
}

function postJSON(url, data) {
  const options = postOptions({ body: JSON.stringify(data) });
  return makeRequest(url, options).then(handleResponse);
}

module.exports = {
  getJSON,
  postJSON,
  makeRequest,
  postOptions
};
