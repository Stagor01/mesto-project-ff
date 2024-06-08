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
// Элементы для изменения аватара
import { formProfileImage, profileImage, popupAvatar, editAvatarButton } from "./components/constats";

// Для валидации
import { enableValidation, clearValidation, validationConfig } from "./components/validation";

// Для запросов на сервер
import { getCards, getUserInfo, patchAvatar, patchUserInfo, postCard } from "./components/api";

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
  formElementAdd.reset();
  openModal(popupAdd);
});

profileImage.addEventListener("click", () => {
  clearValidation(formProfileImage, validationConfig);
  formProfileImage.reset();
  openModal(popupAvatar);
})

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

// Функция редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  patchUserInfo(nameInput.value, jobInput.value);
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

// Обработчик редактирования профиля
formElementEdit.addEventListener('submit', handleEditFormSubmit);

// Функция добавления карточки с местом
function handleAddPlaceCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: namePlaceInput.value, 
    link: linkImagePlaceInput.value};
  
  postCard(cardData.name, cardData.link)
    .then((card) => {
      const newCard = addCard(card, deleteCardFunction, likeCard, openImagePopup, profileId);
      cardsContainer.prepend(newCard);
      formElementAdd.reset(); //сбрасываем поля
      closeModal(popupAdd);
    })
}

formElementAdd.addEventListener('submit', handleAddPlaceCardFormSubmit);

// Функция изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const buttonText = editAvatarButton.textContent;
  editAvatarButton.textContent = 'Сохранение...'

  patchAvatar(formProfileImage.link.value)
    .then((profile) => {
      profileImage.style.backgroundImage = `url(${profile.avatar})`;
      closeModal(popupAvatar);
    })
    .finally(() => (editAvatarButton.textContent = buttonText));
}

formProfileImage.addEventListener('submit', handleEditAvatarFormSubmit);

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