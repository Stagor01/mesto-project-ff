import { closeByEscape } from "..";

// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
}
  
// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeByEscape);
}

export {openModal, closeModal};