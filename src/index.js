import "./pages/index.css";
import { createCard, deleteCardFunction, likeCard } from "./components/card";
import { openModal, closeModal, setCloseModalByClickListeners } from "./components/modal";

// DOM узлы
import { content,profileEditButton, popupEdit, } from "./components/constats";
// Элементы для попапа изображения
import { popupImage, image, imageCaption } from "./components/constats";
// Элементы для формы редактирования
import { 
  formElementEdit, nameInput, jobInput, profileTitle, profileDescription, editProfileButton
} from "./components/constats";
// Элементы для добавления карточек
import { 
  profileAddButton, popupAdd, cardsContainer, formElementAdd, namePlaceInput, linkImagePlaceInput, addCardButton
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
const popupList = document.querySelectorAll(".popup");
// Вешаем обработчики на закрытие попапов по кнопке и оверлею
setCloseModalByClickListeners(popupList);

// Функции-обработчики при открытии попапов
function handleOpenModalEdit() {
  setProfileData(nameInput, jobInput); // устанавливаем данные по-умолчанию
  clearValidation(formElementEdit, validationConfig);
  openModal(popupEdit);
}

function handleOpenModalAdd() {
  formElementAdd.reset();
  clearValidation(formElementAdd, validationConfig);
  openModal(popupAdd);
}

function handleOpenModalAvatar() {
  formProfileImage.reset();
  clearValidation(formProfileImage, validationConfig);
  openModal(popupAvatar);
}

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
  const defaultButtonText = editProfileButton.textContent;
  editProfileButton.textContent = 'Сохранение...'

  patchUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (editProfileButton.textContent = defaultButtonText));
}

// Функция добавления карточки с местом
function handleAddPlaceCardFormSubmit(evt) {
  evt.preventDefault();
  const defaultButtonText = addCardButton.textContent;
  addCardButton.textContent = 'Сохранение...'

  const cardData = {
    name: namePlaceInput.value, 
    link: linkImagePlaceInput.value};
  
  postCard(cardData.name, cardData.link)
    .then((card) => {
      const newCard = createCard(card, deleteCardFunction, likeCard, openImagePopup, profileId);
      cardsContainer.prepend(newCard);
      formElementAdd.reset(); //сбрасываем поля
      closeModal(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (addCardButton.textContent = defaultButtonText));
}

// Функция изменения аватара
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const defaultButtonText = editAvatarButton.textContent;
  editAvatarButton.textContent = 'Сохранение...'

  patchAvatar(formProfileImage.link.value)
    .then((profile) => {
      profileImage.style.backgroundImage = `url('${profile.avatar}')`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => (editAvatarButton.textContent = defaultButtonText));
}

// Слушатели на открытие попапов
profileEditButton.addEventListener("click", handleOpenModalEdit);

profileAddButton.addEventListener("click", handleOpenModalAdd);

profileImage.addEventListener("click", handleOpenModalAvatar);

// Обработчик редактирования профиля
formElementEdit.addEventListener('submit', handleEditFormSubmit);

// Обработчик Добавления карточки
formElementAdd.addEventListener('submit', handleAddPlaceCardFormSubmit);

// Обработчик изменения аватара
formProfileImage.addEventListener('submit', handleEditAvatarFormSubmit);

// Функция, которая выводит карточки на страницу
function renderCards(cardsList, deleteCardFunction, likeCard, openImagePopup, profileId) {
  cardsContainer.innerHTML = '';
  cardsList.forEach(card => {
    const cardElement = createCard(card, deleteCardFunction, likeCard, openImagePopup, profileId);
    cardsContainer.appendChild(cardElement);
  })
}

// Функция, которая ставит информацию о пользователе на страницу
function setUserInfo(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url('${user.avatar}')`;
  
  profileId = user._id;
}

// Выполнить запросы на сервер для получения информации о пользователе и карточках
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, deleteCardFunction, likeCard, openImagePopup, user._id);
  })
  .catch((err) => {
    console.log(err);
  });