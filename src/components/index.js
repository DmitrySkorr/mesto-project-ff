import '../pages/index.css';
import {getUser, getCards, changeName, addCardForApi, addNewAvatar} from './scripts/api'
import {enableValidation, clearValidation} from './scripts/validation';
import {closePopup, openPopup, closeEscPopup, setListenerOverlayButtton} from './modal';
import { initialCards } from './cards';
import {createCard, deleteCard, iconLike} from './card';
const formAddElement = document.forms.new;
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinklInput = document.querySelector('.popup__input_type_url');
export const avatarButton = document.querySelector('.profile__image-hover');
const main = document.querySelector('.content');
export const popupAvatarChenge = document.querySelector('.popup_type_add-avatar');
export const avatarInput = document.querySelector('.popup__input_type_url');
export const placesList = document.querySelector('.places__list');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const formEditElement = popupEdit.querySelector('.popup__form');
export const nameInput = formEditElement.querySelector('.popup__input_type_name');
export const jobInput = formEditElement.querySelector('.popup__input_type_description');
export const formEditElementAddCard = popupAdd.querySelector('.popup__form');
export const formEditElementAddAvatar = popupAvatarChenge.querySelector('.popup__form');
export const nameValue = document.querySelector('.profile__title');
export const avararLinkInput =popupAvatarChenge.querySelector('.popup__input_type_url');
export const jobValue = document.querySelector('.profile__description');
export const profAvatar = document.querySelector('.profile__image');
const imgPopup = document.querySelector('.popup_type_image');
const imgpopupImg = imgPopup.querySelector('.popup__image');
const imgpopupCaption = imgPopup.querySelector('.popup__caption');
const popupAvatarSaveButton = popupAvatarChenge.querySelector('.popup__button');
const popupAddSaveButton = popupAdd.querySelector('.popup__button');
const popupEditSaveButton = popupEdit.querySelector('.popup__button');
export const myId = "22e891684787a52df5385b61";
export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }
// @todo: DOM узлы
// @todo: Вывести карточки на страницу
/*initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard, iconLike, openimgPopup));
})*/
// Открытие и закрытие модального окна
buttonEdit.addEventListener('click', function (evt) {
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

buttonAdd.addEventListener('click', function (evt) {
    openPopup(popupAdd);
    enableValidation(config);
});
avatarButton.addEventListener('click', function(evt){
    openPopup(popupAvatarChenge);
    enableValidation(config);
})
function openimgPopup(evt){
    openPopup(imgPopup);
    imgpopupImg.src = evt.target.src;
    imgpopupImg.alt=evt.target.closest('.card').textContent;
    imgpopupCaption.textContent = evt.target.closest('.card').textContent;
}
//Редактирование имени и информации о себе
function handleFormEditSubmit(evt) {
    evt.preventDefault();
    loading(true, popupEditSaveButton); 
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    changeName(nameValue, jobValue)
    .then(()=>{
        closePopup(popupEdit);
    })
    .finally(()=>{
        loading(false, popupEditSaveButton);
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })
}
formEditElement.addEventListener('submit', handleFormEditSubmit); 

//Форма добавления карточки
formAddElement.addEventListener('submit', function(evt){
    evt.preventDefault();
    loading(true, popupAddSaveButton);
    addCardForApi(placeNameInput.value, placeLinklInput.value)
    .then((res)=>res.json())
    .then((data)=>{
        //data.name, data.link, data.likes, data._id, data.owner._id,
        placesList.prepend(createCard(data,  deleteCard, iconLike, openimgPopup, myId));
    })
    .then(()=>{
        closePopup(popupAdd);
    })
    .finally(()=>{
        loading(false, popupAddSaveButton);
      })
    .catch((err) => {
    console.log(err); // выводим ошибку в консоль
      })
    formAddElement.reset();
    //closePopup(popupAdd);
    //loading(false, popupAddSaveButton);
    clearValidation(formAddElement, config);
})


// add new avatar
formEditElementAddAvatar.addEventListener('submit', function(evt){
    evt.preventDefault();
    loading(true, popupAvatarSaveButton);
    addNewAvatar(avararLinkInput.value, profAvatar)
    .then(()=>{
        closePopup(popupAvatarChenge);
        
    })
    .finally(()=>{
        loading(false, popupAvatarSaveButton);
      })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    profAvatar.style.backgroundImage = "url(`${avararLinkInput.value}`)";
    //closePopup(popupAvatarChenge);
    formEditElementAddAvatar.reset();
    clearValidation(formEditElementAddAvatar, config);
})
function loading (isLoading, button) {
    if (isLoading) {
        button.textContent = 'Сохранение...';
      }
      else {
        //button.textContent = `${buttonText}`;
        button.textContent = 'Сохранить';
      }
}
Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
        nameValue.textContent = userData.name;
        jobValue.textContent = userData.about;
        profAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cardsData.forEach(function (element) {
            placesList.append(createCard(element, deleteCard, iconLike, openimgPopup, myId));
        })
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })