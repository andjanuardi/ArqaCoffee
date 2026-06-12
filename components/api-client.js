// ============================================================
// API CLIENT — fetch wrapper with JWT auth and loading states
// ============================================================
var api = (function () {
  var BASE_URL = 'http://localhost:3000/api';
  var token = null;
  var loadingCounts = {};
  var errorHandler = null;
  var authErrorHandler = null;

  function getToken() {
    if (token) return token;
    try {
      token = sessionStorage.getItem('arqa_token');
    } catch (e) {}
    return token;
  }

  function setToken(t) {
    token = t;
    try { sessionStorage.setItem('arqa_token', t); } catch (e) {}
  }

  function clearToken() {
    token = null;
    try { sessionStorage.removeItem('arqa_token'); } catch (e) {}
  }

  function isLoading(path) {
    return !!loadingCounts[path];
  }

  function onError(fn) { errorHandler = fn; }
  function onAuthError(fn) { authErrorHandler = fn; }

  async function request(method, path, body) {
    var headers = { 'Content-Type': 'application/json' };
    var t = getToken();
    if (t) headers['Authorization'] = 'Bearer ' + t;

    loadingCounts[path] = (loadingCounts[path] || 0) + 1;

    try {
      var res = await fetch(BASE_URL + path, {
        method: method,
        headers: headers,
        body: body !== undefined ? JSON.stringify(body) : undefined
      });

      if (res.status === 401 && authErrorHandler) {
        authErrorHandler();
      }

      if (!res.ok) {
        var errBody = null;
        try { errBody = await res.json(); } catch (e) {}
        throw new Error((errBody && errBody.error) || 'HTTP ' + res.status);
      }

      if (res.status === 204) return null;
      return await res.json();
    } catch (err) {
      if (errorHandler) errorHandler(err);
      throw err;
    } finally {
      loadingCounts[path] = Math.max(0, (loadingCounts[path] || 1) - 1);
    }
  }

  return {
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    isLoading: isLoading,
    onError: onError,
    onAuthError: onAuthError,
    get: function (path) { return request('GET', path); },
    post: function (path, body) { return request('POST', path, body); },
    put: function (path, body) { return request('PUT', path, body); },
    del: function (path) { return request('DELETE', path); }
  };
})();
