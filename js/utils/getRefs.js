export const getRefs = () => ({
  modal: document.querySelector('[data-modal]'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  form: document.querySelector('[data-form]'),
  successModal: document.querySelector('[data-success-modal]'),

  closeModalBtns: document.querySelectorAll('[data-modal-close]'),
});
