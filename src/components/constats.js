// DOM узлы
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
// Элементы для попапа изображения
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image'); // картинка внутри попапа
const imageCaption = popupImage.querySelector('.popup__caption');
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
// Элементы для попапа аватара
const formProfileImage = document.forms["edit-avatar"];
const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const editAvatarButton = formProfileImage.querySelector('.popup__button');
// Элементы для валидации
const popupForm = document.querySelector('.popup__form');
const popupInput = document.querySelector('.popup__input');

export {
  content,
  profileEditButton,
  popupEdit,
  popupImage,
  image,
  imageCaption,
  formElementEdit,
  nameInput,
  jobInput,
  profileTitle,
  profileDescription,
  profileAddButton,
  popupAdd,
  cardsContainer,
  formElementAdd,
  namePlaceInput,
  linkImagePlaceInput,
  popupForm,
  popupInput,
  profileImage,
  popupAvatar,
  formProfileImage,
  editAvatarButton
}