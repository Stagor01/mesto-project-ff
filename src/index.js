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
import { getCards, getUserInfo } from "./components/api";

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
  const newCard = addCard(cardData, deleteCardFunction, likeCard, openImagePopup, profileId);
  cardsContainer.prepend(newCard);
  closeModal(evt.currentTarget.closest('.popup'));
  formElementAdd.reset(); //сбрасываем поля
}

formElementAdd.addEventListener('submit', handleAddPlaceCardFormSubmit);
/*
// Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(addCard(card, deleteCard, likeCard, openImagePopup));
});
*/

function renderCards(cardData, deleteCardFunction, likeCard, openImagePopup, profileId) {
  cardsContainer.innerHTML;
  cardData.forEach(cardData => {
    const cardElement = addCard(cardData, deleteCardFunction, likeCard, openImagePopup, profileId);
    cardsContainer.appendChild(cardElement);
  })
}

Promise.all([getUserInfo, getCards])
  .then(([user, cardData]) => {
    profileId = user._id;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    renderCards(cardData, deleteCardFunction, likeCard, openImagePopup, profileId);
  })
  .catch((err) => {
    console.log(err);
  });
  