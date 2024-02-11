import { putLike, deleteLike, deleteCardApi } from "./scripts/api";
const cardTemplate = document.querySelector("#card-template").content;
// @todo: Функция создания карточки name, link, likes, id, ownerId,
function createCard(
  data,
  deleteCard,
  handleCardLike,
  openimgPopupCallback,
  myId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const delButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");
  let likeCounter = card.querySelector(".card__like-button-counter");
  likeCounter.textContent = data.likes.length;
  const img = document.querySelector(".card__image");
  card.querySelector(".card__image").alt = data.name;
  card.querySelector(".card__image").src = data.link;
  data.likes.forEach(function (element) {
    if (element._id === myId) {
      likeButton.classList.add("card__like-button_is-active");
    }
  });
  card.querySelector(".card__title").textContent = data.name;
  likeButton.addEventListener("click", (evt) =>
    handleCardLike(evt, data.likes, likeCounter, data._id)
  );
  defenitionDelCardIcon(data.owner._id, myId, delButton);
  delCard(data.owner._id, myId, delButton, data._id);
  card
    .querySelector(".card__image")
    .addEventListener("click", (evt) => openimgPopupCallback(evt));
  return card;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".places__item").remove();
}
// like
function handleCardLike(evt, likes, likeCounter, id) {
  if (!evt.target.classList.contains("card__like-button_is-active")) {
    putLike(id, likeCounter)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        evt.target.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    deleteLike(id, likeCounter)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        evt.target.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}
function delCard(ownerId, myId, delButton, id) {
  if (ownerId == myId) {
    delButton.addEventListener("click", function (evt) {
      deleteCardApi(id).then(() => {
        deleteCard(evt);
      });
    });
  }
}
function defenitionDelCardIcon(ownerId, myId, delButton) {
  if (ownerId == myId) {
    console.log(1);
  } else {
    delButton.style.display = "none";
  }
}

export { createCard, deleteCard, handleCardLike };
