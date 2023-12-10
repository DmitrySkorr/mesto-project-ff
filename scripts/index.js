// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function cardAdd(name, link, deleteCard) {
    const cards = cardTemplate.querySelector('.card').cloneNode(true);
    const delButton = cards.querySelector('.card__delete-button');
    cards.querySelector('.card__image').alt = name;
    cards.querySelector('.card__image').src = link;
    cards.querySelector('.card__title').textContent = name;
    delButton.addEventListener('click', deleteCard);
    return cards;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
    placesList.append(cardAdd(element.name, element.link, deleteCard));
})
