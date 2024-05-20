// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.add('popup_is-animated');
}
  
// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export {openModal, closeModal};