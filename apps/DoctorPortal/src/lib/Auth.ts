import { redirect } from "react-router-dom";
import Cookies from 'js-cookie';

export function tokenLoader() {
    const token = Cookies.get('token');
    console.log("Token check : " , token)
    if (!token) return null;

    
    return token;
}

export function checkToken() {
    const token = tokenLoader()
    if (!token) {
        return redirect('/login');  // Return the redirect action
    }

    return null;
}

export function restrict(){
    const token = tokenLoader() 
    if(token) return redirect('/')
    return null ;
}


export function logoutFunc(){
    console.log("logout")
    Cookies.remove('token')
    return redirect('/login')
}