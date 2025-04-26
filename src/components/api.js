const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
  headers: {
    authorization: "16fb5f38-567c-4872-981d-ff16ef83a560",
    "Content-Type": "application/json",
  },
};
// Загрузка информации о пользователе с сервера
function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      // Обновление элементов шапки страницы
      document.querySelector(".profile__title").textContent = data.name;
      document.querySelector(".profile__description").textContent = data.about;
      document.querySelector(".profile__image").src = data.avatar;
    })

    .catch((err) => {
      console.log(err);
    });
}
export { getProfile };

function editProfile() {
  fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: "Anastasia",
      about: "Frontend developer",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

export { editProfile };

//футкция добавления карточки
const addCardToServer = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка при добавлении карточки");
    }
    return response.json();
  });
};

export { addCardToServer };

// Функция для получения данных пользователя
const fetchUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных пользователя");
    }
    return response.json();
  });
};

export { fetchUserData };

// Функция для получения карточек
const fetchCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки карточек");
    }
    return response.json();
  });
};
export { fetchCards };

//футкция удалния карточки
const removeCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка загрузки карточек");
    }
    return response.json();
  });
};
export { removeCardFromServer };

//запрос отправки лайка
const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка при добавлении лайка");
    }
    return response.json();
  });
};

export { likeCard };
//запрос удаления лайка лайка
const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка при добавлении лайка");
    }
    return response.json();
  });
};
export { unlikeCard };



const addAvatarToServer = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,  
    body: JSON.stringify({ avatar: avatarLink })
})
    .then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка при добавлении карточки");
    }
    return response.json();
  });
};

export { addAvatarToServer };
