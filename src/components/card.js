import { cardsContainer } from "./constats";
import { deleteCard, putLike, deleteLike } from "./api";
// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
function addCard(cardData, deleteCardFunction, likeCard, openImagePopup, profileId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeCounts = cardElement.querySelector('.like__counts');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    likeCounts.textContent = card.likes.length;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    if (profileId != cardData.owner['_id']) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', (evt) => {
        deleteCardFunction(evt, card._id);
      })
    }

    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => likeCard(cardData, cardElement, profileId));
    
    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

    return cardElement;
}
  
// Функция удаления карточки
function deleteCardFunction(evt, cardId) {
  deleteCard(cardId)
    .then(() => evt.target.closest('.places__item').remove())
    .catch((err) => console.log(err));
}
  
// Функция лайка карточки
function likeCard(card, cardElement, profileId) {
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeCounts = cardElement.querySelector('.like__counts');

  if (meLike(card, profileId)) {
    deleteLike(card._id)
      .then ((res) => {
        likeCounts.textContent = res.likes.length;
        cardLikeButton.classList.remove('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch ((err) => {
        console.log(err);
      });
  } else {
    putLike(card._id)
      .then((res) => {
        likeCounts.textContent = res.likes.length;
        cardLikeButton.classList.add('card__like-button_is-active');
        card.likes = res.likes;
      })
      .catch ((err) => {
        console.log(err);
      });
  }
}

function meLike(card, profileId) {
  return card.likes.some((item) => item._id === profileId);
}

export {addCard, deleteCardFunction, likeCard};