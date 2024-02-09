import { putLike, deleteLike, deleteCardApi } from './scripts/api';
import { closePopup, openPopup, setListenerOverlayButtton } from './modal';
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete-card');
const deleteCardButton = popupDelete.querySelector('.popup__button');
// @todo: Функция создания карточки name, link, likes, id, ownerId,
function createCard(data, deleteCard, iconLike, openimgPopupCallback, myId) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');
    let likeCounter = card.querySelector('.card__like-button-counter');
    likeCounter.textContent = data.likes.length;
    const img = document.querySelector('.card__image');
    card.querySelector('.card__image').alt = data.name;
    card.querySelector('.card__image').src = data.link;
    data.likes.forEach(function (element) {
        if (element._id === myId) {
            likeButton.classList.add('card__like-button_is-active');
        }
    })
    card.querySelector('.card__title').textContent = data.name;
    likeButton.addEventListener('click', (evt) => iconLike(evt, data.likes, likeCounter, data._id));
    //delCard(data.owner._id, myId, delButton, data._id);
    defenitionDelCardIcon (data.owner._id, myId, delButton);
    card.querySelector('.card__image').addEventListener('click', (evt) => openimgPopupCallback(evt));
    return card;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}
// like
function iconLike(evt, likes, likeCounter, id) {
    if (!(evt.target.classList.contains('card__like-button_is-active'))) {
        evt.target.classList.add('card__like-button_is-active');
        putLike(id, likeCounter)
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          })
    } else {
        evt.target.classList.remove('card__like-button_is-active');
        deleteLike(id, likeCounter)
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          })
    }
}

/*function delCard(ownerId, myId, delButton, id) {
    if (ownerId == myId) {
        delButton.addEventListener('click', function (evt) {
            const event = evt;
            openPopup(popupDelete);
            setListenerOverlayButtton(popupDelete);
            deleteCardButton.addEventListener('click', () => {
                deleteCard(event);
                closePopup(popupDelete);
                deleteCardApi(id)
                .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                  })
            })
        }
        )
    }
    else {
        delButton.style.display = 'none';
    }

function defenitionDelCardIcon (ownerId, myId) {
    if (!ownerId == myId) {
        delButton.style.display = 'none';
    }
}

}*/
function defenitionDelCardIcon (ownerId, myId, delButton) {
    if ((ownerId == myId)) {
        console.log(1);
    }
    else {
        delButton.style.display = 'none';

    }
}
export { createCard, deleteCard, iconLike };