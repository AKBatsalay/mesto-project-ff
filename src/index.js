import '/src/pages/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, deleteCard } from './components/cards.js';
import { openPopup, closePopup} from './components/modal.js';
 
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
 
// @todo: Вывести карточки на страницу
initialCards.map(cardsElement => createCard(cardsElement, deleteCard)).forEach((cardsElement) => placesList.append(cardsElement));


const openPopupButton = document.querySelector('.profile__edit-button');// кнопка для открытия попапа
const closePopupButtons = document.querySelectorAll('.popup__close'); //крестики для закрытия попапа
const profileAddButton = document.querySelector('.profile__add-button');// кнопка для открытия попапа через +
const popupProfoleEdit = document.querySelector('.popup_type_edit'); // окно попапа корректировки карточки
const popupAddCard = document.querySelector('.popup_type_new-card'); // окно попапа добавления карточки
const popupImage = document.querySelector('.popup_type_image');// окно попапа img
const popupImageContent = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup'); //фон попап окна


export function handleImageClick(link, name) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);  
};

openPopupButton.addEventListener("click", () => {
    openPopup(popupProfoleEdit);
});

profileAddButton.addEventListener("click", () => {
    openPopup(popupAddCard);
});

closePopupButtons.forEach((button) => {
    button.addEventListener("click", () => {
    const popupOpened = document.querySelector('.popup_is-opened');
     closePopup(popupOpened);
    });
});

popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
     if (event.target === popup) {
     closePopup(popup); 
   }
 });
});

 // Находим форму в DOM
const formElementEdit = document.querySelector('.popup__form[name="edit-profile"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEdit.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');
   
    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
   
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', handleFormSubmit);

export const newCardForm = document.querySelector('form[name="new-place"]');
const popupNewCard = document.querySelector('.popup_type_new-card');

newCardForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
  const placeLink = newCardForm.querySelector('.popup__input_type_url').value;

  // Создаем новую карточку
  const newCard = createCard({name: placeName, link: placeLink});

  // Добавляем новую карточку в начало списка
  placesList.prepend(newCard);

  // Очищаем форму
  newCardForm.reset();

  // Закрываем попап
  popupNewCard.classList.remove('popup_is-opened');
});

