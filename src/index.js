import "/src/pages/index.css";
import { createCard, deleteCard, handleLike } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { form } from "./components/validation.js";
import {
  getProfile,
  fetchUserData,
  fetchCards,
  editProfile,
  addCardToServer,
  addAvatarToServer,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");

const openPopupButton = document.querySelector(".profile__edit-button"); // кнопка для открытия попапа
const closePopupButtons = document.querySelectorAll(".popup__close"); //крестики для закрытия попапа
const profileAddButton = document.querySelector(".profile__add-button"); // кнопка для открытия попапа через +
const popupProfoleEdit = document.querySelector(".popup_type_edit"); // окно попапа корректировки карточки
const popupAddCard = document.querySelector(".popup_type_new-card"); // окно попапа добавления карточки
const popupImage = document.querySelector(".popup_type_image"); // окно попапа img

const popupImageContent = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popups = document.querySelectorAll(".popup"); //фон попап окна

const profileTitle = document.querySelector(".profile__title");

const profileDescription = document.querySelector(".profile__description");

export const newCardForm = document.querySelector('form[name="new-place"]');
const popupNewCard = document.querySelector(".popup_type_new-card");

const inputNameFormAddNewCard = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const inputLinkFormAddNewCard = newCardForm.querySelector(
  ".popup__input_type_url"
);

export const formElementEdit = document.querySelector(
  '.popup__form[name="edit-profile"]'
); // Воспользуйтесь методом querySelector()
const nameInput = formElementEdit.querySelector(".popup__input_type_name");
const jobInput = formElementEdit.querySelector(
  ".popup__input_type_description"
); // Воспользуйтесь инструментом .querySelector()

//функцию обработки клика по изображению карточки
export function handleImageClick(name, link) {
  popupImageContent.src = link;
  popupImageContent.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
}

const avatarEditButton = document.querySelector(".profile__image"); //кнопка для открытия попапа при клике на изображение аватара
const popupAvatar = document.querySelector(".popup_type_new-avatar"); // окно попапа открытия аватара

//открытие попап по клику на аватар
avatarEditButton.addEventListener("click", (popup) => {
  openPopup(popupAvatar);
});

popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
});

openPopupButton.addEventListener("click", (popup) => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupProfoleEdit);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

closePopupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupOpened = document.querySelector(".popup_is-opened");
    closePopup(popupOpened);
  });
});

// Обработчик «отправки» формы, хотя пока // она никуда отправляться не будет
function profileEditHandleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closePopup(popupProfoleEdit);
}

// Прикрепляем обработчик к форме:// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener("submit", profileEditHandleFormSubmit);

const avatarFormEdit = document.querySelector(
  '.popup__form[name="new-avatar"]'
);
const avatarInput = avatarFormEdit.querySelector(".popup__input_type_url");

function avatarEditHandleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получаем значение из поля ввода
  const newAvatarLink = avatarInput.value;
  addAvatarToServer(newAvatarLink).then(() => {
    avatarEditButton.style.backgroundImage = `url('${newAvatarLink}')`;
  });
  avatarFormEdit.reset();
  closePopup(popupAvatar);
}

// Прикрепляем обработчик к форме:// он будет следить за событием “submit” - «отправка»
avatarFormEdit.addEventListener("submit", avatarEditHandleFormSubmit);

newCardForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  const name = inputNameFormAddNewCard.value;
  const link = inputLinkFormAddNewCard.value;
  const cardData = {
    name: name,
    link: link,
  };

  addCardToServer(cardData)
    .then((data) => {
      const newCard = createCard(
        { name: data.name, link: data.link, owner: data.owner, _id: data._id }, // Используем данные, возвращенные сервером
        deleteCard,
        handleLike,
        handleImageClick
      );
      // Добавляем новую карточку в начало списка
      placesList.prepend(newCard);
      // Очищаем форму
      newCardForm.reset();
      // Закрываем попап
      closePopup(popupNewCard);
    })
    .catch((error) => {
      console.log("Ошибка:", error);
    });
});

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "form__input-error",
  inactiveButtonClass: "form__submit_inactive",
  errorClass: "form__input_type_error",
};

enableValidation(validationConfig);

clearValidation(form, validationConfig);

// Вызов функции для загрузки профиля
getProfile();
//Вызов функции корректировки профиля
editProfile();

// Загрузка данных пользователя и карточек
Promise.all([fetchUserData(), fetchCards()])

  .then(([userId, cards]) => {
    cards
      .map((cardsElement) =>
        createCard(cardsElement, deleteCard, handleLike, handleImageClick)
      )
      .forEach((cardsElement) => placesList.append(cardsElement));
    console.log("Данные пользователя:", userId);
  })
  .catch((error) => {
    console.log("Ошибка:", error);
  });
