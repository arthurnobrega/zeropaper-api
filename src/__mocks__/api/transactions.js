export default {
  meta: {
    code: 200,
  },
  notifications: [],
  response: [
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
  ],
};
