import '../pages/index.css';
import {closePopup, openPopup, closeEscPopup, setListenerOverlayButtton} from './modal';
import { initialCards } from './cards';
import {cardAdd, deleteCard, cardTemplate, iconLike} from './card';
const formAddElement = document.forms.new;
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinklInput = document.querySelector('.popup__input_type_url');
const main = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const formEditElement = popupEdit.querySelector('.popup__form');
export const nameInput = formEditElement.querySelector('.popup__input_type_name');
export const jobInput = formEditElement.querySelector('.popup__input_type_description');
export const nameValue = document.querySelector('.profile__title');
export const jobValue = document.querySelector('.profile__description');
const imgPopup = document.querySelector('.popup_type_image');
const imgpopupImg = imgPopup.querySelector('.popup__image');
const imgpopupCaption = imgPopup.querySelector('.popup__caption');
// @todo: DOM узлы
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard, iconLike, openimgPopup));
})
// Открытие и закрытие модального окна
buttonEdit.addEventListener('click', function (evt) {
    openPopup(popupEdit);
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
});
setListenerOverlayButtton(popupEdit);
setListenerOverlayButtton(popupAdd);
setListenerOverlayButtton(imgPopup);

buttonAdd.addEventListener('click', function (evt) {
    openPopup(popupAdd);
});
export function openimgPopup(evt){
    openPopup(imgPopup);
    imgpopupImg.src = evt.target.src;
    imgpopupImg.alt=evt.target.closest('.card').textContent;
    imgpopupCaption.textContent = evt.target.closest('.card').textContent;
}
//Редактирование имени и информации о себе
function handleFormEditSubmit(evt) {
    evt.preventDefault(); 
    nameValue.textContent = nameInput.value;
    jobValue.textContent = jobInput.value;
    closePopup(popupEdit);
}
formEditElement.addEventListener('submit', handleFormEditSubmit); 

//Форма добавления карточки
formAddElement.addEventListener('submit', function(evt){
    evt.preventDefault();
    placesList.prepend(cardAdd(placeNameInput.value, placeLinklInput.value, deleteCard, iconLike, openimgPopup));
    closePopup(popupAdd);
    formAddElement.reset();
})


