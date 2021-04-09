import {getItem} from './localStorage.utilities'

export default function authHeader() {
    //grabbing the user from the local storage
    const user = getItem('token')
    //check if the user and if user has accessToken
    if(user && user.token){
        return {'x-access-token': user.token}
    }else { 
        return {};
    }
}
