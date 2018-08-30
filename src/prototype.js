export const prototype = {
  defaults: {
    floatLabels: {
      customEvent      : null,
      customLabel      : null,
      customPlaceholder: () => '',
      exclude          : '.no-label',
      inputRegex       : /email|number|password|search|tel|text|url|date/,
      prefix           : 'fl-',
      prioritize       : 'label',
      requiredClass    : 'required',
      style            : 0,
      transform        : 'input, select, textarea',
    },

    validate: {
      fields: {
        cnpj: {
          regex: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
          iMask: {
            mask: '00.000.000/0000-00'
          },
          element: null
        },
        cpf: {
          regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          iMask: {
            mask: '000.000.000-00'
          },
          element: null
        },
        telefone: {
          regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
          iMask: {
            mask: '(00) 0000-0000?0'
          },
          element: null
        },
        email: {
          // tslint:disable-next-line:max-line-length
          regex: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
          element: null
        }
      }
    }
  },
};
