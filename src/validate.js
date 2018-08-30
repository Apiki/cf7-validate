import 'whatwg-fetch';
import IMask from 'imask';

export default class ValidateForm {
  constructor(form, options) {
    this.form = form;
    this.options = options;

    this.successMessage = `
    <div class="success-form">
      <i class="fa fa-thumbs-o-up"></i>
      <div class="success-form-content">
        <div class="success-title">Cadastro enviado com sucesso!</div>
      </div>
    </div>
    `;

    this.init();
    this.addEventListeners();
  }

  init() {
    this.shouldDisableSubmit(true);
    this.setHtmlElements();
  }

  addEventListeners() {
    const fieldsNames = this.getFieldsNames();
    const handleInputField = this.debounce(this.validateField, 250);

    this.form.addEventListener('submit', this.onSubmit.bind(this));

    fieldsNames.forEach((item) => {
      const { element } = this.options.fields[item];

      if (!element) {
        return;
      }

      element.addEventListener('blur', this.validateField.bind(this, item));
      element.addEventListener('input', handleInputField.bind(this, item));
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.shouldDisableSubmit(true);

    const target = e.target;
    const data = {
      method: 'POST',
      body: new FormData(target)
    };

    fetch(target.action, data)
      .then(() => {
        const parent = target.parentNode;
        parent.innerHTML = this.successMessage;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  validateField(name, { target }) {
    if (!target.classList.contains('wpcf7-validates-as-required')) {
      return;
    }

    const regex = this.options.fields[name].regex;
    const parent = target.parentNode;

    if ( regex.test(target.value) ) {
      parent.classList.add('field-is-valid');
      parent.classList.remove('field-is-invalid');
      target.setAttribute('data-valid', 'true');
    } else {
      parent.classList.add('field-is-invalid');
      parent.classList.remove('field-is-valid');
      target.setAttribute('data-valid', 'false');
    }

    this.validateForm();
  }

  validateForm() {
    const elements = this.form.querySelectorAll('[data-valid="false"]');

    if (!elements.length) {
      this.shouldDisableSubmit(false);
    } else {
      this.shouldDisableSubmit(true);
    }
  }

  setHtmlElements() {
    const fieldsNames = this.getFieldsNames();

    fieldsNames.forEach((item) => {
      const element = this.form.querySelector(`input[name="${item}"]`) || null;

      if (!element) {
        return;
      }

      const mask = this.options.fields[item].iMask || null;

      if (mask) {
        new IMask(element, mask);
      }

      element.setAttribute('data-valid', 'false');
      this.options.fields[item].element = element;
    });
  }

  getFieldsNames() {
    return Object.keys(this.options.fields);
  }

  shouldDisableSubmit(status) {
    const button = this.form.querySelector('.wpcf7-submit');

    if (status) {
      button.setAttribute('disabled', 'true');
    } else {
      button.removeAttribute('disabled');
    }
  }

  debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
}
/*
Estou validando o campo de cnpj ao sair do focus, no momento apenas dando um console.log() para ver o que estou recebendo no front...
- [x] Pegar cada um dos campos de acordo com o [name] em options para realizar a validação em cada um deles
- [x] Validar os campos de acordo com o Regex encontrado na option
- [x] Inserir mascara nos forms
- [x] Habilitar submit quando todos os campos requeridos estiverem validados
*/
