const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-14",
  headers: {
    authorization: "69da3c4a-deb1-4d6d-8d58-c5de5a5420fc",
    "Content-Type": "application/json",
  },
};

// Проверяем запрос
const checkRequest = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// Загрузка информации о пользователе
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users.me`, {
    headers: config.headers,
  }).then((res) => checkRequest(res));
};

// Загрузка карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkRequest(res));
};

// Редактирование профиля
const patchUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users.me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkRequest(res));
};

// Добавление новой карточки
const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkRequest(res));
};

// Удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkRequest(res));
}

// Поставить лайк
function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkRequest(res));
}

// Удалить лайк
function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkRequest(res));
}

// Сменить аватарку
function patchAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/${avatar}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => checkRequest(res));
}

export {
  getUserInfo,
  getCards,
  patchUserInfo,
  postCard,
  deleteCard,
  putLike,
  deleteLike,
  patchAvatar,
};
