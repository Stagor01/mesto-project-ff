// @todo: Темплейт карточки

// @todo: DOM узлы
const content = document.querySelector('.content');
const addButton = content.querySelector('.profile__add-button');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardData, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard());

  return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  placesList.appendChild(addCard);
});