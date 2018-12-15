import fetch from 'node-fetch';
import ZeroPaper from '.';

describe('Complete Flow', () => {
  let zeropaper = null;
  const credentials = {
    username: 'arthur@github.com',
    password: '123456789',
  };

  beforeEach(async () => {
    fetch.mock.reset();

    zeropaper = new ZeroPaper(credentials);
  });

  test('logs in the user successfully', async () => {
    await zeropaper.login();

    expect(zeropaper.loginToken).not.toBeNull();

    expect(fetch.mock.calls()).toHaveLength(1);
    expect(fetch.mock.calls()[0]).toMatchObject({
      method: 'POST',
      url: 'https://accounts.zeropaper.com.br/access_client/sign_in',
      body: JSON.stringify(credentials),
    });
  });

  test('Recovers transactions', async () => {
    await zeropaper.login();
    const transactions = await zeropaper.getTransactions({
      companyId: '123',
      start: '2018-01-01',
      end: '2018-01-31',
    });

    expect(fetch.mock.calls()).toHaveLength(2);
    expect(fetch.mock.calls()[1]).toMatchObject({
      method: 'GET',
      url:
        'https://api.zeropaper.com.br/v2/transactions?company_id=123&filter%5Bstart_date%5D=2018-01-01&filter%5Bend_date%5D=2018-01-31',
    });

    expect(transactions).toEqual([
      {
        id: 111111111,
        category_id: 3,
        description: 'IOF',
        paydate: '2018-01-31',
        paid: true,
        value: 16.81,
        payment_plan: 'one_time',
        frequency_main_id: null,
        frequency_type: null,
        frequency_total: null,
        frequency_number: null,
        comment: '',
        duedate: '2018-01-31',
        document_number: null,
        split: false,
        has_nf: false,
        has_boleto: false,
        has_attachment: false,
        relationships: {
          contact: {
            id: 1,
            name: 'Banco do Brasil',
          },
          transaction_subcategory: {
            id: 2,
            name: 'Imposto',
          },
          bank_account: {
            id: 3,
            name: 'Cartão de Crédito BB',
          },
          expense_center: {
            id: null,
            name: null,
          },
          bank_account_origin: {
            id: null,
            name: null,
          },
          bank_account_destination: {
            id: null,
            name: null,
          },
          boleto: {
            id: null,
            status: null,
            url: null,
            due_date: null,
            total_amount: null,
            contact: {
              id: null,
              name: null,
              work_email: null,
              home_email: null,
              address: {
                id: null,
                cep: null,
              },
            },
            item: {
              id: null,
              description: null,
            },
          },
          splits: [],
        },
      },
      {
        id: 222222222,
        category_id: 1,
        description: 'Cliente X - Pagamento Y',
        paydate: '2018-01-20',
        paid: true,
        value: 20000,
        payment_plan: 'instalment',
        frequency_main_id: 407908855,
        frequency_type: 'M',
        frequency_total: 5,
        frequency_number: 5,
        comment: '',
        duedate: '2018-01-30',
        document_number: '',
        split: false,
        has_nf: false,
        has_boleto: false,
        has_attachment: false,
        relationships: {
          contact: {
            id: 1,
            name: 'Cliente X',
          },
          transaction_subcategory: {
            id: 2,
            name: 'Serviço Z',
          },
          bank_account: {
            id: 3,
            name: 'Conta Corrente BB',
          },
          expense_center: {
            id: null,
            name: null,
          },
          bank_account_origin: {
            id: null,
            name: null,
          },
          bank_account_destination: {
            id: null,
            name: null,
          },
          boleto: {
            id: null,
            status: null,
            url: null,
            due_date: null,
            total_amount: null,
            contact: {
              id: null,
              name: null,
              work_email: null,
              home_email: null,
              address: {
                id: null,
                cep: null,
              },
            },
            item: {
              id: null,
              description: null,
            },
          },
          splits: [],
        },
      },
    ]);
  });

  test('Updates transaction', async () => {
    await zeropaper.login();

    const body = {
      company_id: '111111',
      force_update: 'N',
      reference_date: '2018-01-30',
      tags: [],
    };

    expect(zeropaper.updateTransaction(1, body)).resolves.toBeTruthy();

    expect(fetch.mock.calls()).toHaveLength(2);
    expect(fetch.mock.calls()[1]).toMatchObject({
      method: 'PATCH',
      url: 'https://api.zeropaper.com.br/v1/transactions/1',
      body: JSON.stringify(body),
    });
  });
});
