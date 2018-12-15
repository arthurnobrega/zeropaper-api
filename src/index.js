import fetch from 'node-fetch';
import querystring from 'querystring';

export default class ZeroPaper {
  username = null;

  password = null;

  loginToken = null;

  constructor({ username, password }) {
    this.username = username;
    this.password = password;
  }

  async login() {
    const url = 'https://accounts.zeropaper.com.br/access_client/sign_in';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': ' application/json',
        intuit_sessionid: 'ACBDC15C8FE44B5AA8482812CB6541CA',
      },
    });

    const json = await response.json();

    this.isLoggedIn = true;
    this.loginToken = json.iamTicket.ticket;
  }

  async getTransactions({ companyId, start, end }) {
    const query = querystring.stringify({
      company_id: companyId,
      'filter[start_date]': start,
      'filter[end_date]': end,
    });

    const url = `https://api.zeropaper.com.br/v2/transactions?${query}`;

    const response = await fetch(url, {
      headers: {
        'X-Application-Uid':
          '73d4a5202a0101df4ccd770fd645f9b53e2d1efd3108748a122ff5bafe10a6ab',
        Authorization: `Intuit_IAM_Authentication intuit_userid=193514544004679,intuit_token=${
          this.loginToken
        },intuit_realmid=193514586571929`,
      },
    });

    const json = await response.json();

    return json.response;
  }

  async updateTransaction(id, body) {
    const url = `https://api.zeropaper.com.br/v1/transactions/${id}`;

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'X-Application-Uid':
          '73d4a5202a0101df4ccd770fd645f9b53e2d1efd3108748a122ff5bafe10a6ab',
        Authorization: `Intuit_IAM_Authentication intuit_userid=193514544004679,intuit_token=${
          this.loginToken
        },intuit_realmid=193514586571929`,
      },
    });

    return response.ok;
  }
}
