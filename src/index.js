import './pages/index.css';
import { initialCards } from './scripts/cards';
import {cardAdd, deleteCard, cardTemplate, iconLike} from './scripts/card';
const profileImg = new URL('./images/avatar.jpg', import.meta.url);
const Images = [{name: 'Avatar', link:profileImg}];
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard));
})
// Открытие и закрытие модального окна
import modalOpen from './components/modal';
const main = document.querySelector('.content');
main.addEventListener('click', function (evt) {
    modalOpen(evt.target)
});
//Редактирование имени и информации о себе
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent;
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    const saveButton = document.querySelector('.popup__button');

    // Выберите элементы, куда должны быть вставлены значения полей
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;

    // Вставьте новые значения с помощью textContent
    saveButton.addEventListener('click', function(evt){
        evt.target.closest('.popup').classList.remove('popup_is-opened');
    });
}
formElement.addEventListener('submit', handleFormSubmit); 

//Форма добавления карточки

const formAddElement = document.forms.new;
const placeNameInput = document.querySelector('.popup__input_type_card-name');
const placeLinklInput = document.querySelector('.popup__input_type_url');
formAddElement.addEventListener('submit', function(evt){
    evt.preventDefault();
    placesList.prepend(cardAdd(placeNameInput.value, placeLinklInput.value, deleteCard, iconLike));
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    placeNameInput.value = '';
    placeLinklInput.value = '';
})
/*const imgPopup = document.querySelector('.popup_type_image');
placesList.addEventListener('click', function(evt){
    const card = evt.target.closest('.card')
    if (evt.target.classList.contains('card__image')){
        const 
        imgPopup.classList.add('popup_is-opened');
    }
})*/
