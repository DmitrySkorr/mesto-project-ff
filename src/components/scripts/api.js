const commonLink = 'https://nomoreparties.co/v1/wff-cohort-5';
const authorizationData = 'c52618b5-5707-4e7f-96f5-da48c2905442'
// `${commonLink}`
function getUser() {
    return fetch(`${commonLink}/users/me`, {
        headers: {
            authorization: `${authorizationData}`
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
    return fetch(`${commonLink}/cards`, {
        headers: {
            authorization: `${authorizationData}`
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
//Редактирование профиля
function changeName(name, about) {
    return fetch(`${commonLink}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: `${authorizationData}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name.textContent}`,
            about: `${about.textContent}`
        })
    });
}
//добавление карточки

function addCardForApi(name, link) {
    return fetch(`${commonLink}/cards/`, {
        method: 'POST',
        headers: {
            authorization: `${authorizationData}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
        
    })
    
}


function addNewAvatar(link, profAvatar) {
    return fetch(`${commonLink}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: `${authorizationData}`,
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
    

}



export { getUser, getCards, changeName, addCardForApi, addNewAvatar }

// like 
export function putLike(id, likeCounter) {
    return fetch(`${commonLink}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
            authorization: `${authorizationData}`,
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
        
}
export function deleteLike(id, likeCounter) {
    return fetch(`${commonLink}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
            authorization: `${authorizationData}`,
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
        
}
export function deleteCardApi(id){
    return fetch(`${commonLink}/cards/${id}`, {
                    method: 'DELETE',
                    headers: {
                        authorization: `${authorizationData}`,
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
                  
}
/**
.catch((err) => {
                    console.log(err); // выводим ошибку в консоль
                  })
 */