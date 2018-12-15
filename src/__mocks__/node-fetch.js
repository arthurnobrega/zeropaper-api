import loginResponse from './api/login';
import transactionsResponse from './api/transactions';

function delayResponse(data) {
  return new Promise(resolve => setTimeout(() => resolve(data)), 10);
}

export default (function fetchMock() {
  let calls = [];

  const fetch = (url, { method = 'GET', body = null, headers }) => {
    calls.push({ url, method, body, headers });

    const defaultResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => delayResponse({}),
    };
    let response = {};

    if (/accounts.zeropaper.com.br\/access_client\/sign_in/.test(url)) {
      response = { json: () => delayResponse(loginResponse) };
    } else if (/api.zeropaper.com.br\/v2\/transactions/.test(url)) {
      response = { json: () => delayResponse(transactionsResponse) };
    }

    return delayResponse({ ...defaultResponse, ...response });
  };

  fetch.mock = {
    calls: () => calls,
    reset: () => {
      calls = [];
    },
  };

  return fetch;
})();
