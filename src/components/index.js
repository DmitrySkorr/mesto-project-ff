import "../pages/index.css";
import {
  getUser,
  getCards,
  changeName,
  addCardForApi,
  addNewAvatar,
} from "./scripts/api";
import { enableValidation, clearValidation } from "./scripts/validation";
import {
  closePopup,
  openPopup,
  setListenerOverlayButtton
} from "./modal";
import { createCard, deleteCard, handleCardLike } from "./card";
const formAddElement = document.forms.new;
const placeNameInput = document.querySelector(".popup__input_type_card-name");
const placeLinklInput = document.querySelector(".popup__input_type_url");
const avatarButton = document.querySelector(".profile__image-hover");
const main = document.querySelector(".content");
const popupAvatarChenge = document.querySelector(".popup_type_add-avatar");
const avatarInput = document.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const formEditElement = popupEdit.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);
const formEditElementAddCard = popupAdd.querySelector(".popup__form");
const formEditElementAddAvatar =
  popupAvatarChenge.querySelector(".popup__form");
const nameValue = document.querySelector(".profile__title");
const avararLinkInput = popupAvatarChenge.querySelector(
  ".popup__input_type_url"
);
const jobValue = document.querySelector(".profile__description");
const profAvatar = document.querySelector(".profile__image");
const imgPopup = document.querySelector(".popup_type_image");
const imgpopupImg = imgPopup.querySelector(".popup__image");
const imgpopupCaption = imgPopup.querySelector(".popup__caption");
const popupAvatarSaveButton = popupAvatarChenge.querySelector(".popup__button");
const popupAddSaveButton = popupAdd.querySelector(".popup__button");
const popupEditSaveButton = popupEdit.querySelector(".popup__button");
let myId = "";
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
// @todo: DOM узлы
// @todo: Вывести карточки на страницу
/*initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard, iconLike, openimgPopup));
})*/
// Открытие и закрытие модального окна
buttonEdit.addEventListener("click", function (evt) {
  openPopup(popupEdit);
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  enableValidation(config);
  clearValidation(formEditElement, config);
});
setListenerOverlayButtton(popupEdit);
setListenerOverlayButtton(popupAdd);
setListenerOverlayButtton(imgPopup);
setListenerOverlayButtton(popupAvatarChenge);

buttonAdd.addEventListener("click", function (evt) {
  openPopup(popupAdd);
  enableValidation(config);
});
avatarButton.addEventListener("click", function (evt) {
  openPopup(popupAvatarChenge);
  enableValidation(config);
});
function openimgPopup(evt) {
  openPopup(imgPopup);
  imgpopupImg.src = evt.target.src;
  imgpopupImg.alt = evt.target.closest(".card").textContent;
  imgpopupCaption.textContent = evt.target.closest(".card").textContent;
}
//Редактирование имени и информации о себе
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  loading(true, popupEditSaveButton);
  changeName(nameValue, jobValue)
    .then(() => {
      closePopup(popupEdit);
      nameValue.textContent = nameInput.value;
      jobValue.textContent = jobInput.value;
    })
    .finally(() => {
      loading(false, popupEditSaveButton);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}
formEditElement.addEventListener("submit", handleFormEditSubmit);

//Форма добавления карточки
formAddElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  loading(true, popupAddSaveButton);
  addCardForApi(placeNameInput.value, placeLinklInput.value)
    .then((res) => res.json())
    .then((data) => {
      placesList.prepend(
        createCard(data, deleteCard, handleCardLike, openimgPopup, myId)
      );
    })
    .then(() => {
      closePopup(popupAdd);
      formAddElement.reset();
    })
    .then(() => {
      clearValidation(formAddElement, config);
    })
    .finally(() => {
      loading(false, popupAddSaveButton);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
});

// add new avatar
formEditElementAddAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  loading(true, popupAvatarSaveButton);
  addNewAvatar(avararLinkInput.value)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      profAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .then(() => {
      closePopup(popupAvatarChenge);
      formEditElementAddAvatar.reset();
    })
    .then(() => {
      clearValidation(formAddElement, config);
    })
    .finally(() => {
      loading(false, popupAvatarSaveButton);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
  
});
function loading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
Promise.all([getUser(), getCards()])
  .then(([userData, cardsData]) => {
    nameValue.textContent = userData.name;
    myId = userData._id;
    jobValue.textContent = userData.about;
    profAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach(function (element) {
      placesList.append(
        createCard(element, deleteCard, handleCardLike, openimgPopup, myId)
      );
    });
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });
