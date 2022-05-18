import { launchGus } from './apis/gusAPI.js';

const IS_OPEN = 'is-open';

const modal = document.querySelector('[data-modal]');
const form = document.querySelector('[data-form]');
const successModal = document.querySelector('[data-success-modal]');

const openModalBtn = document.querySelector('[data-modal-open]');
const launchBtn = document.querySelector('[data-launch-btn]');
const closeBtns = document.querySelectorAll('[data-modal-close]');

const showModal = () => modal.classList.add(IS_OPEN);
const hideModal = () => modal.classList.remove(IS_OPEN);
const showSuccessModal = () => successModal.classList.add(IS_OPEN);
const hideSuccessModal = () => successModal.classList.remove(IS_OPEN);

const onFormSubmit = async e => {
  e.preventDefault();
  const gusForm = e.target;
  const formData = new FormData(gusForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  console.log({ name, email });

  if (!name || !email) {
    return console.log('Please enter all fields');
  }

  try {
    await launchGus(formData);
  } catch (error) {
    console.error(error);
  }

  hideModal();
  gusForm.removeEventListener('submit', onFormSubmit);
  setTimeout(showSuccessModal, 700);
  setTimeout(() => {
    hideSuccessModal();

    window.removeEventListener('keydown', onEscCloseModal);
    closeBtns.forEach(btn => {
      btn.removeEventListener('click', onCloseBtnClick);
    });
  }, 3000);

  gusForm.reset();
};

const closeModal = () => {
  hideModal();

  window.removeEventListener('keydown', onEscCloseModal);
  form.removeEventListener('submit', onFormSubmit);
  closeBtns.forEach(btn => {
    btn.removeEventListener('click', onCloseBtnClick);
  });
};

const onCloseBtnClick = e => {
  e.stopPropagation();
  hideSuccessModal();
  closeModal();
};

const onEscCloseModal = ({ code }) => {
  if (code !== 'Escape') return;

  hideSuccessModal();
  closeModal();
};

const openModal = () => {
  showModal();

  window.addEventListener('keydown', onEscCloseModal);
  form.addEventListener('submit', onFormSubmit);

  closeBtns.forEach(btn => {
    btn.addEventListener('click', onCloseBtnClick);
  });
};

openModalBtn.addEventListener('click', openModal);
