import { cardAdd } from "../card"
import { nameValue, jobValue, profAvatar, placesList, openimgPopup} from ".."
import { deleteCard, iconLike } from "../card"
function getUser() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-5/users/me', {
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(res.status);
            }
        })
}
// запрос списка карточек
function getCards() {
    return fetch('https://nomoreparties.co/v1/wff-cohort-5/cards', {
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          })
}

Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
        nameValue.textContent = userData.name;
        jobValue.textContent = userData.about;
        profAvatar.style.backgroundImage = `url(${userData.avatar})`;

        cardsData.forEach(function (element) {
            placesList.append(cardAdd(element.name, element.link, element.likes, element._id, element.owner._id, deleteCard, iconLike, openimgPopup));
        })
    })
//Редактирование профиля
function nameChange(name, about) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-5/users/me', {
        method: 'PATCH',
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name.textContent}`,
            about: `${about.textContent}`
        })
    });
}
//добавление карточки

function cardAddForApi(name, link) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-5/cards/', {
        method: 'POST',
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
        
    })
    
}


function addNewAvatar(link) {
    return fetch('https://nomoreparties.co/v1/wff-cohort-5/users/me/avatar', {
        method: 'PATCH',
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: `${link}`
        })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    .then((data)=>{
        profAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      })

}



export { getUser, getCards, nameChange, cardAddForApi, addNewAvatar }

// like 
export function likePut(id, likeCounter) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => {
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          })
}
export function likeDelete(id, likeCounter) {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
            'Content-Type': 'application/json'
        }
    }
    )
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            else {
                return Promise.reject(res.status);
            }
        })
        .then((data) => {
            likeCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          })
}
export function delCardApi(id){
    return fetch(`https://nomoreparties.co/v1/wff-cohort-5/cards/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: 'c52618b5-5707-4e7f-96f5-da48c2905442',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    if (res.ok) {
                      return res.json();
                    }
              
                    // если ошибка, отклоняем промис
                    return Promise.reject(`Ошибка: ${res.status}`);
                  })
                  .catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                  })
}