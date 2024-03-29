// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const profileAddButton = content.querySelector('.profile__add-button');
const cardsContainer = content.querySelector('.places__list');

// Функция создания карточки
function addCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardItem) {
  cardItem.remove();
}

// Вывести карточки на страницу
initialCards.forEach(card => cardsContainer.append(addCard(card, deleteCard)));