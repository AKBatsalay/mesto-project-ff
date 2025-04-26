

export const form = document.querySelector(".popup__form");
const popupsInput = form.querySelector(".popup__input");

// Вызовем функцию
const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add("form__input_type_error");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
  // добавьте класс ошибки элементу input
};

const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove("form__input_type_error");
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // удалите класс ошибки с элемента input

  errorElement.classList.remove("form__input-error_active");
  //  Удалите активный класс ошибки c formError.
  errorElement.textContent = "";
  //  Очистите свойство textContent элемента formError.
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Имя может содержать только латинские и кириллические буквы, пробелы и дефисы."
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

popupsInput.addEventListener("input", function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода,
  // на котором слушаем событие input
  checkInputValidity(form, popupsInput);
});

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__submit_inactive");
  }
};
export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
  const fieldsetList = Array.from(form.querySelectorAll(".form__set"));
  fieldsetList.forEach((fieldSet) => {
    setEventListeners(fieldSet);
   
  });
  
};

export { enableValidation };

function clearValidation(formElement, validationSettings) {
  
  // Очистка сообщений об ошибках
  const errorElements = formElement.querySelectorAll(validationSettings.inputErrorClasss);
  errorElements.forEach(errorElement => {
      errorElement.textContent = ''; // Очищаем текст ошибки
  });

  // Деактивация кнопки отправки
  const submitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  if (submitButton) {
      submitButton.disabled = true; // Делаем кнопку неактивной
  }
}

export  { clearValidation };


