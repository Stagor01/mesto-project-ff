import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { addCard, deleteCard, deleteCardFunction, likeCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";

// DOM узлы
import { content,profileEditButton, popupEdit } from "./components/constats";
// Элементы для попапа изображения
import { popupImage, image, imageCaption } from "./components/constats";
// Элементы для формы редактирования
import { 
  formElementEdit, nameInput, jobInput, profileTitle, profileDescription 
} from "./components/constats";
// Элементы для добавления карточек
import { 
  profileAddButton, popupAdd, cardsContainer, formElementAdd, namePlaceInput, linkImagePlaceInput
} from "./components/constats";

// Для валидации
import { enableValidation, clearValidation, validationConfig } from "./components/validation";

// Для запросов на сервер
import { getCards, getUserInfo, patchUserInfo } from "./components/api";

let profileId = '';

enableValidation(validationConfig);

// Создаем массив всех попапов
const popups = document.querySelectorAll(".popup");

// Навешиваем слушатели на все попапы на кнопки закрытия и оверлей
popups.forEach((popup) => {
  const popupClose = popup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(popup);
  });
  document.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });
});

// Слушатели на открытие попапов
profileEditButton.addEventListener("click", () => {
  clearValidation(formElementEdit, validationConfig);
  setProfileData(nameInput, jobInput); // устанавливаем данные по-умолчанию
  openModal(popupEdit);
});

profileAddButton.addEventListener("click", () => {
  clearValidation(formElementAdd, validationConfig);
  openModal(popupAdd);
});

// Функция открытия попапа изображения
function openImagePopup(imageLink, imageDescription) {
  image.src = imageLink;
  image.alt = imageDescription;
  imageCaption.textContent = imageDescription;
  openModal(popupImage);
}

// Функция, которая устанавливает данные профиля по-умолчанию
function setProfileData(nameInput, jobInput) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик отправки формы
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  patchUserInfo(nameInput.value, jobInput.value);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(evt.currentTarget.closest('.popup'));
}

formElementEdit.addEventListener('submit', handleEditFormSubmit);

// Функция добавления карточки с местом
function handleAddPlaceCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: namePlaceInput.value, 
    link: linkImagePlaceInput.value};
  const newCard = addCard(cardData, deleteCardFunction, likeCard, openImagePopup, profileId);
  cardsContainer.prepend(newCard);
  closeModal(evt.currentTarget.closest('.popup'));
  formElementAdd.reset(); //сбрасываем поля
}

formElementAdd.addEventListener('submit', handleAddPlaceCardFormSubmit);

// Функция, которая выводит карточки на страницу
function connectCards(cardData, deleteCardFunction, likeCard, openImagePopup, profileId) {
  cardsContainer.innerHTML = '';
  cardData.forEach(card => {
    const cardElement = addCard(card, deleteCardFunction, likeCard, openImagePopup, profileId);
    cardsContainer.appendChild(cardElement);
  })
}

// Функция, которая ставит информацию о пользователе на страницу
let userId = '';
function setUserInfo(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  
  userId = user._id;
}

// Выполнить запросы на сервер для получения информации о пользователе и карточках
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    connectCards(cards, deleteCardFunction, likeCard, openImagePopup, user._id);
  })
  .catch((err) => {
    console.error(err);
  });