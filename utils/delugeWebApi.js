import ajax from "./fetchWrapper";

const LOCAL_STORAGE_KEY = "deluge-web-api-pass";

const url = "/json";
let requestId = 0;

function makeRequest({ method, params = [] }) {
  requestId += 1;
  return ajax
    .postJSON(url, {
      id: requestId,
      method,
      params
    })
    .then((json) => {
      if (json.error) return Promise.reject(json);
      if (!json.result) return Promise.reject(json);
      return json;
    });
}

export function login(password) {
  return makeRequest({
    method: "auth.login",
    params: [password]
  })
    .then(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, password);
    })
    .catch((err) => {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      throw err;
    });
}

export function isAuthenticated() {
  return login(localStorage.getItem(LOCAL_STORAGE_KEY));
}

export function getTorrents() {
  return makeRequest({
    method: "webapi.get_torrents"
  });
}

export function addTorrent(magnetLink) {
  return makeRequest({
    method: "webapi.add_torrent",
    params: [magnetLink]
  });
}

export function removeTorrent(hash, removeData = false) {
  return makeRequest({
    method: "webapi.add_torrent",
    params: [hash, removeData]
  });
}
