// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
function addCard(cardData, deleteCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    
    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => likeCard(likeButton));
    
    cardImage.addEventListener('click', () => openImagePopup(cardData.link, cardData.name));

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

export {addCard, deleteCard, likeCard};