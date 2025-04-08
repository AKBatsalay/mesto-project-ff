const popups = document.querySelectorAll('.popup'); //фон попап окна

export const openPopup = (popup) => {
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

  popups.forEach(popup => {
    popup.addEventListener('click', (event) => {
       if (event.target === popup) {
       closePopup(popup); 
     }
   });
  });    
 
