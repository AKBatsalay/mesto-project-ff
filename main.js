(()=>{"use strict";var e=document.querySelector("#card-template").content,t=function(t,n,r,o){var c=t.name,p=t.link,u=e.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__like-button"),d=u.querySelector(".card__image"),i=u.querySelector(".card__delete-button");return u.querySelector(".card__title").textContent=c,u.querySelector(".card__image").alt=c,u.querySelector(".card__image").src=p,i.addEventListener("click",(function(){return n(u)})),d.addEventListener("click",(function(){return o(c,p)})),a.addEventListener("click",r),u};function n(e){e.target.classList.contains("card__like-button")&&e.target.classList.toggle("card__like-button_is-active")}function r(e){e.remove()}var o=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",p)},c=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",p)};function p(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");c(t)}}var u=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].map((function(e){return t(e,r,n,b)})).forEach((function(e){return u.append(e)}));var a=document.querySelector(".profile__edit-button"),d=document.querySelectorAll(".popup__close"),i=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_edit"),s=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_image"),m=_.querySelector(".popup__image"),y=_.querySelector(".popup__caption"),v=document.querySelectorAll(".popup"),f=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=document.querySelector('form[name="new-place"]'),k=document.querySelector(".popup_type_new-card"),g=S.querySelector(".popup__input_type_card-name"),E=S.querySelector(".popup__input_type_url"),L=document.querySelector('.popup__form[name="edit-profile"]'),h=L.querySelector(".popup__input_type_name"),x=L.querySelector(".popup__input_type_description");function b(e,t){m.src=t,m.alt=e,y.textContent=e,o(_)}v.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&c(e)}))})),a.addEventListener("click",(function(e){h.value=f.textContent,x.value=q.textContent,o(l)})),i.addEventListener("click",(function(){o(s)})),d.forEach((function(e){e.addEventListener("click",(function(){var e=document.querySelector(".popup_is-opened");c(e)}))})),L.addEventListener("submit",(function(e){e.preventDefault();var t=h.value,n=x.value;f.textContent=t,q.textContent=n,c(l)})),S.addEventListener("submit",(function(e){e.preventDefault();var o=g.value,p=E.value,a=t({name:o,link:p},r,n,b);u.prepend(a),S.reset(),c(k)}))})();