import { openModal } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// Элемента для попапа изображения
const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image'); // картинка внутри попапа
const imageCaption = popupImage.querySelector('.popup__caption');

// Функция создания карточки
function addCard(cardData, deleteCard, likeCard, openImage) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeCard(likeButton));
    
    cardImage.addEventListener('click', () => openImage(cardData.link, cardData.name));

    return cardElement;
}
  
// Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}
  
// Функция лайка карточки
function likeCard(likeItem) {
  likeItem.classList.toggle('card__like-button_is-active');
}

// Функция открытия попапа изображения
function openImage(imageLink, imageDescription) {
  image.src = imageLink;
  image.alt = imageDescription;
  imageCaption.textContent = imageDescription;
  openModal(popupImage);
}

export {addCard, deleteCard, likeCard, openImage};