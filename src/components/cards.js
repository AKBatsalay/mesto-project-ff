const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export {initialCards};
import { handleImageClick } from '../index.js'; 


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы


// @todo: Функция создания карточки
export function createCard({name, link}, deleteCard, handleLike) {   
    const cardsElement  = cardTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardsElement.querySelector('.card__like-button');

    cardsElement.querySelector('.card__title').textContent = name;
    cardsElement.querySelector('.card__image').alt = name;
    cardsElement.querySelector('.card__image').src = link;

    const deleteButton = cardsElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click',() => deleteCard(cardsElement));

    const cardImage = cardsElement.querySelector('.card__image');  

    cardImage.addEventListener('click', () => handleImageClick(link, name));

    function handleLike(evt) {
      if(evt.target.classList.contains('card__like-button'))
       evt.target.classList.toggle('card__like-button_is-active');
    };
    
    likeButton.addEventListener('click', handleLike);
   
    return cardsElement;
}

export function handleLike(evt) {
  if(evt.target.classList.contains('card__like-button'))
   evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Функция удаления карточки
export function deleteCard(cardsElement) {
    cardsElement.remove(); 
}