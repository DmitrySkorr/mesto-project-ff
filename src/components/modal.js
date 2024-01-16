import {popupEdit} from './index';
//когда наладишь config не забудь перенести экспорт
function openPopup(popup) { 
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEscPopup);
     //добавляем класс к элементу попапа  
     //вешаем обработчик closeEscPopup на document 
   }
   
function closePopup(popup) {  
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEscPopup) ;
     //удаляем класс у элемента попапа  
     //удаляем обработчик closeEscPopup у document 
}

function closeEscPopup(evt) { 
    if (evt.key === 'Escape') { 
     const popup = document.querySelector('.popup_is-opened');// ищем открытый popup по классу 'popup_opened' 
     closePopup(popup); 
    } 
}
function setListenerOverlayButtton(popup){
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', function(){
        closePopup(popup);
    });
    popup.addEventListener('click', function(evt){
        if (evt.target !== popup) {
            return;
          }
          closePopup(popup);
    })
}
export {closePopup, popupEdit, openPopup, closeEscPopup,setListenerOverlayButtton};



