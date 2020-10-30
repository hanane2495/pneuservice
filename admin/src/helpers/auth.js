import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            //1Day
            expires : 1 
        })
    }
}

//remove from cookie
export const removeCookie = key => {
    if(window !== 'undefined'){
        cookie.remove(key, {
            //1Day
            expires : 1 
        })
    }
}

//get from cookie like token
export const getCookie = key => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

//set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localStorage
export const removeLocalStorage = key => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//Auth user after login 
export const Authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    setLocalStorage('image', response.data.image)
    console.log(localStorage.getItem('user'))
    console.log(localStorage.getItem('image'))
    next()
}

//Signout
export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};

//get user info from localstorage
export const isAuth = () => {
    if(window !== 'undefined'){
       const cookieChecked = getCookie('token')
       if (cookieChecked){
           if(localStorage.getItem('user')){
               return JSON.parse(localStorage.getItem('user'))
           }else{
               return null
           }
       }
    }
}

export const isLoggedIn = () => {
    if(localStorage.getItem('user')){
        console.log(JSON.parse(localStorage.getItem('user')))
        return true
    }else{
        return false
    }
}

//update user data in localStorage
export const updateUser = (response, next) =>{
    if(window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'))
        auth = response.data.profile
        localStorage.setItem('user', JSON.stringify(auth))
    }
    next()
}

//update user image in localStorage
export const updateImage = (response, next) =>{
    if(window !== 'undefined'){
        let img = JSON.parse(localStorage.getItem('image'))
        img = response.data.image
        localStorage.setItem('user', JSON.stringify(img))
    }
    next()
}
