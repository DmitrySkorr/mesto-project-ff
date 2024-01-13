import {openimgPopup} from './index.js';
const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
function cardAdd(name, link, deleteCard, iconLike) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cards.querySelector('.card__delete-button');
    const likeButton = cards.querySelector('.card__like-button');
    const img = document.querySelector('.card__image');
    cards.querySelector('.card__image').alt = name;
    cards.querySelector('.card__image').src = link;
    cards.querySelector('.card__title').textContent = name;
    cards.addEventListener('click', function(evt){
        if (evt.target === likeButton){
            iconLike(evt);
        }
        else if ( evt.target === cards.querySelector('.card__image')){
            openimgPopup(evt);
        }
        else if (evt.target === delButton){
            deleteCard(evt);
        }
        
    })
    return cards;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}
// like
function iconLike(evt){
    evt.target.classList.toggle('card__like-button_is-active');
}
export {cardAdd, deleteCard, cardTemplate, iconLike};