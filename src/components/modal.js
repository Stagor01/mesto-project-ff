// Функция открытия модального окна
function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeByEscape);
}
  
// Функция закрытия модального окна
function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeByEscape);
}

// Функция закрытия попапа по Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

// Функция проверки попал ли клик по оверлею
function handleCloseModalByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

// Функция установки обработчиков закрытия по клику на кнопку и оверлей
function setCloseModalByClickListeners(popupList) {
  popupList.forEach((popup) => {
    const popupCloseButton = popup.querySelector(".popup__close");
    // Вешаем обработчик закрытия на кнопку
    popupCloseButton.addEventListener("click", () => {
      closeModal(popup);
    });
    // Вешаем обработчик закрытия на оверлей
    popup.addEventListener("click", handleCloseModalByOverlay);
  });
}

export {openModal, closeModal, setCloseModalByClickListeners};