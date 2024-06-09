import { deleteCard, putLike, deleteLike } from "./api";
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
function createCard(cardData, deleteCardFunction, likeCard, openImagePopup, profileId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCounter = cardElement.querySelector('.card__like-counter');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardLikeCounter.textContent = cardData.likes.length;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (profileId != cardData.owner._id) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', () => {
        deleteCardFunction(cardElement, cardData._id);
      })
    }

    if (isLikedByUser(cardData, profileId)) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }

    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardLikeCounter, cardData, cardElement, profileId));
    
    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    return cardElement;
}
  
// Функция удаления карточки
function deleteCardFunction(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.log(err));
}
  
// Функция лайка карточки
function likeCard(cardLikeButton, cardLikeCounter, card, cardElement, profileId) {
  if (isLikedByUser(card, profileId)) {
    deleteLike(card._id)
      .then ((res) => {
        cardLikeCounter.textContent = res.likes.length;
        cardLikeButton.classList.remove('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch ((err) => {
        console.log(err);
      });
  } else {
    putLike(card._id)
      .then((res) => {
        cardLikeCounter.textContent = res.likes.length;
        cardLikeButton.classList.add('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch ((err) => {
        console.log(err);
      });
  }
}

function isLikedByUser(card, profileId) {
  return card.likes.some((item) => item._id === profileId);
}

export {createCard, deleteCardFunction, likeCard};