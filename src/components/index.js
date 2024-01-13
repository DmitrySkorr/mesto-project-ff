import '../pages/index.css';
import {closePopup, openPopup, closeEscPopup} from './modal';
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
export const formEditElement = document.querySelector('.popup__form');
export const nameInput = formEditElement.querySelector('.popup__input_type_name');
export const jobInput = formEditElement.querySelector('.popup__input_type_description');
export const nameValue = document.querySelector('.profile__title');
export const jobValue = document.querySelector('.profile__description');
// @todo: DOM узлы
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard, iconLike));
})
// Открытие и закрытие модального окна
import modalOpen from './modal';
main.addEventListener('click', function (evt) {
    modalOpen(evt.target)
});
export function openimgPopup(evt){
    const imgPopup = document.querySelector('.popup_type_image');
    openPopup(imgPopup);
    const popupImg = imgPopup.querySelector('.popup__image');
    popupImg.src = evt.target.src;
    popupImg.alt=evt.target.closest('.card').textContent;
    const popupCaption = imgPopup.querySelector('.popup__caption');
    popupCaption.textContent = evt.target.closest('.card').textContent;
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
    placesList.prepend(cardAdd(placeNameInput.value, placeLinklInput.value, deleteCard, iconLike));
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    formAddElement.reset();
})

