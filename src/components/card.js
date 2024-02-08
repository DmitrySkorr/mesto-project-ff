//import {openimgPopup} from './index.js';
import { myId } from './index';
import { likePut, likeDelete, delCardApi } from './scripts/api';
import { likeReload } from './scripts/api';
import { closePopup, openPopup, closeEscPopup, setListenerOverlayButtton } from './modal';
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete-card');
const deleteCardButton = popupDelete.querySelector('.popup__button');
// @todo: Функция создания карточки
function cardAdd(name, link, likes, id, ownerId, deleteCard, iconLike, openimgPopupCallback) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cards.querySelector('.card__delete-button');
    const likeButton = cards.querySelector('.card__like-button');
    let likeCounter = cards.querySelector('.card__like-button-counter');
    likeCounter.textContent = likes.length;
    const img = document.querySelector('.card__image');
    cards.querySelector('.card__image').alt = name;
    cards.querySelector('.card__image').src = link;
    likes.forEach(function (element) {
        if (element._id === myId) {
            likeButton.classList.add('card__like-button_is-active');
        }
    })
    cards.querySelector('.card__title').textContent = name;
    likeButton.addEventListener('click', (evt) => iconLike(evt, likes, likeCounter, id));
    delCard(ownerId, myId, delButton, id);

    cards.querySelector('.card__image').addEventListener('click', (evt) => openimgPopupCallback(evt));
    return cards;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}
// like
function iconLike(evt, likes, likeCounter, id) {
    if (!(evt.target.classList.contains('card__like-button_is-active'))) {
        evt.target.classList.add('card__like-button_is-active');
        likePut(id, likeCounter)
    } else {
        evt.target.classList.remove('card__like-button_is-active');
        likeDelete(id, likeCounter)
    }
}

function delCard(ownerId, myId, delButton, id) {
    if (ownerId == myId) {
        delButton.addEventListener('click', function (evt) {
            const event = evt;
            openPopup(popupDelete);
            setListenerOverlayButtton(popupDelete);
            deleteCardButton.addEventListener('click', () => {
                deleteCard(event);
                closePopup(popupDelete);
                delCardApi(id)
            })
        }
        )
    }
    else {
        delButton.style.display = 'none';
    }
}
export { cardAdd, deleteCard, cardTemplate, iconLike };