// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
}
  
// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export {openModal, closeModal};