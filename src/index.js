import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { addCard, deleteCard, likeCard, openImage } from "./components/card";
import { openModal, closeModal } from "./components/modal";

// DOM узлы
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
// Элементы для формы редактирования
const formElementEdit = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// Элементы для добавления карточек
const profileAddButton = content.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const cardsContainer = content.querySelector(".places__list");
const formElementAdd = document.querySelector('form[name="new-place"]');
const namePlaceInput = document.querySelector('.popup__input_type_card-name');
const linkImagePlaceInput = document.querySelector('.popup__input_type_url');


// Создаем массив всех попапов
const popups = document.querySelectorAll(".popup");

// Навешиваем слушатели на все попапы на кнопки закрытия, оверлей и Esc

popups.forEach((popup) => {
  const popupClose = popup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(popup);
  });
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal(popup);
    }
  });
  document.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Слушатели на открытие попапов
profileEditButton.addEventListener("click", () => {
  setProfileData(nameInput, jobInput); // устанавливаем данные по-умолчанию
  openModal(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupAdd);
});

// Функция, которая устанавливает данные профиля по-умолчанию
function setProfileData(nameInput, jobInput) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция редактирования полей в форме редактирования
function editProfile(name, job) {
  profileTitle.textContent = name;
  profileDescription.textContent = job;
}

// Обработчик отправки формы
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  editProfile(nameInput.value, jobInput.value);
  closeModal(evt.currentTarget.closest('.popup'));
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);

// Функция добавления карточки с местом
function handleAddPlaceCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: namePlaceInput.value, 
    link: linkImagePlaceInput.value};
  const newCard = addCard(cardData, deleteCard, likeCard, openImage);
  cardsContainer.prepend(newCard);
  closeModal(evt.currentTarget.closest('.popup'));
  formElementAdd.reset(); //сбрасываем поля
}

formElementAdd.addEventListener('submit', handleAddPlaceCardFormSubmit);

// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(addCard(card, deleteCard, likeCard, openImage));
});
