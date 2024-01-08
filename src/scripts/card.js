const cardTemplate = document.querySelector('#card-template').content;
// @todo: Функция создания карточки
function cardAdd(name, link, deleteCard, likeIcon) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cards.querySelector('.card__delete-button');
    const likeButton = cards.querySelector('.card__like-button');
    cards.querySelector('.card__image').alt = name;
    cards.querySelector('.card__image').src = link;
    cards.querySelector('.card__title').textContent = name;
    cards.addEventListener('click', openimgPopup);
    delButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', function(evt){
        if (evt.target.classList.contains('card__like-button')){
            iconLike(evt);
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
function openimgPopup(evt){
    const imgPopup = document.querySelector('.popup_type_image');
    imgPopup.classList.add('popup_is-animated');
    imgPopup.classList.add('popup_is-opened');
    imgPopup.classList.add('popup_is-animated');
    const img = imgPopup.querySelector('.popup__image');
    img.src = evt.target.src;
    const caption = imgPopup.querySelector('.popup__caption');
    caption.textContent = evt.target.closest('.card').textContent;
    const buttonDel = imgPopup.querySelector('.popup__close');
    buttonDel.addEventListener('click', function(){
        imgPopup.classList.remove('popup_is-opened');
    });
    imgPopup.addEventListener('click', function(evt){
        if (evt.target !== imgPopup) {
            return;
          }
          imgPopup.classList.remove('popup_is-opened');
    });
    document.addEventListener('keydown', function(evt){
        if (evt.key == "Escape") {
            imgPopup.classList.remove('popup_is-opened');
            document.removeEventListener('keydown', function(evt){})
       }
    })
}
//export {cardAdd, deleteCard, cardTemplate, addPlace};
export {cardAdd, deleteCard, cardTemplate, iconLike};