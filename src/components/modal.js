import { popups } from '../index.js'


export const openPopup = (popup) => {
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const descriptionInput = popupEdit.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title').textContent; 
const profileDescription = document.querySelector('.profile__description').textContent;

 nameInput.value = profileName;
 descriptionInput.value = profileDescription;

  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscKeyUp);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
}

export function handleEscKeyUp(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
    }
  };
    
 
