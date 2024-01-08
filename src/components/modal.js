const popupEdit = document.querySelector('.popup_type_edit');
popupEdit.classList.add('popup_is-animated');
const popupAdd = document.querySelector('.popup_type_new-card');
popupAdd.classList.add('popup_is-animated');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

export default function modalOpen (type){
    if (type === buttonEdit){
        popupEdit.classList.add('popup_is-opened');
        const buttonDel = popupEdit.querySelector('.popup__close');
        buttonDel.addEventListener('click', modalClose);
        popupEdit.addEventListener('click', function(evt){
            if (evt.target !== popupEdit) {
                return;
              }
            modalClose(evt);
        });
        document.addEventListener('keydown', function(evt){
            if (evt.key == "Escape") {
                popupEdit.classList.remove('popup_is-opened');
                document.removeEventListener('keydown', function(evt){})
           }
        })
    }
    else if (type === buttonAdd){
        popupAdd.classList.add('popup_is-opened');
        const buttonDel = popupAdd.querySelector('.popup__close');
        buttonDel.addEventListener('click', modalClose);
        popupAdd.addEventListener('click', function(evt){
            if (evt.target !== popupAdd) {
                return;
              }
            modalClose(evt);
        });
        document.addEventListener('keydown', function(evt){
            if (evt.key == "Escape") {
                popupAdd.classList.remove('popup_is-opened');
                document.removeEventListener('keydown', function(evt){})
           }
        })
    }
}
function modalClose (evt){
    evt.target.closest('.popup').classList.remove('popup_is-opened');
}
export {modalClose};
