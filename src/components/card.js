import { removeCardFromServer, likeCard, unlikeCard } from "../components/api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const userId = "cd2edee0a78d9add8415fa3b"; // мой Id
// @todo: Функция создания карточки
export const createCard = (
  { name, link, likes = [], owner, _id },
  deleteCard,
  handleLike,
  handleImageClick
) => {
  const cardsElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeButton = cardsElement.querySelector(".card__like-button");
  const cardImage = cardsElement.querySelector(".card__image");
  const deleteButton = cardsElement.querySelector(".card__delete-button");
  const likeCountElement = cardsElement.querySelector(".like-count");

  cardsElement.querySelector(".card__title").textContent = name;
  cardsElement.querySelector(".card__image").alt = name;
  cardsElement.querySelector(".card__image").src = link;
  likeCountElement.textContent = likes.length;
  const cardId = _id;

  if (owner._id === userId) {
    deleteButton.style.display = "block"; // Показываем кнопку удаления
    deleteButton.addEventListener("click", () => {
      deleteCard(cardsElement, cardId); // вызываем функцию удаления карточки
    });
  } else {
    deleteButton.style.display = "none"; // Скрываем кнопку удаления для чужих карточек
  }
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, likes, likeCountElement, cardId, _id);
  });
  return cardsElement;
};

export function handleLike(evt, likes, likeCountElement, cardId, _id) {
  const userId = _id; //идентификатер текущего пользователя

  if (evt.target.classList.contains("card__like-button")) {
    const isLiked = likes.includes(userId);

    if (isLiked) {
      // Если лайк уже поставлен, убираем его
      unlikeCard(cardId).then(() => {
        likes = likes.filter((id) => id !== userId);
        if (evt.target.classList.contains("card__like-button"))
          evt.target.classList.toggle("card__like-button_is-active");
        likeCountElement.textContent = likes.length;
      });
    } else {
      // Если лайка нет, добавляем его
      likeCard(cardId).then(() => {
        likes.push(userId);
        if (evt.target.classList.contains("card__like-button"))
          evt.target.classList.toggle("card__like-button_is-active");
        likeCountElement.textContent = likes.length;
      });
    }
  }
}
// @todo: Функция удаления карточки
export function deleteCard(cardsElement, cardId) {
  removeCardFromServer(cardId)
    .then(() => {
      cardsElement.remove(); // Удаляем карточку из DOM
    })
    .catch((error) => {
      console.log(error); // Обработка ошибок
    });
}
