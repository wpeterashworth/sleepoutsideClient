import * as utils from "./utils.mts";
import Alert from "./alert.mts";
const baseURL = import.meta.env.VITE_SERVER_URL;

export function isProtectedRoute() {
    const protectedRoutes = [
        '/cart',
        '/checkout',
        '/profile'
    ];
    return protectedRoutes.some(route => window.location.pathname.startsWith(route));
}

interface UserStore {
    isLoggedIn:boolean,
    user?:{
        name:string
        email:string
        _id:string
    },
    token:string
}
export const userStore = $state( {isLoggedIn: false, user: {}, token: ""}) as UserStore;

export async function login(email:string, password:string) {
    const res = await fetch(`${baseURL}users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if(res.status !== 200) {
        throw new Error(data.message);
    }

    
    
    utils.setLocalStorage('so-user', data);
    userStore.user = data.user;
    userStore.token = data.token;
    userStore.isLoggedIn = true;

    return 'Welcome back, ' + data.user.name;
}

export function logout() {
    userStore.user = undefined;
    userStore.token = "";
    userStore.isLoggedIn = false;
    utils.setLocalStorage('so-user', null);
    new Alert({ message: 'You have been logged out.' }).show();
    // window.location.reload();
}

export function checkAuth() {
    // really we are just initilizing our store with data from local storage. We aren't really checking to see if the token is still valid. That will happen the next time we try to use it.
    // if we use it and get an error from the server, we should logout and clear our local storage. 
    const userData = utils.getLocalStorage("so-user");
    // console.log(userData)
    if(userData) {
      userStore.user = userData.user
      userStore.token = userData.token;
      userStore.isLoggedIn = true;
    } else {
      userStore.isLoggedIn = false;
      userStore.user = undefined;
      userStore.token = "";
    }
    // the double bang !! turns a variable into a boolean this will return a true or false.
    return !!userData;
}
