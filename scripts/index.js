// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const addButton = content.querySelector('.profile__add-button');
const cardsContainer = content.querySelector('.places__list');

// Функция создания карточки
function addCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard());

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(card) {

}

// Вывести карточки на страницу
initialCards.forEach(card => {
  cardsContainer.append(addCard(card));
});