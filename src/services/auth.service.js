import { getItem, removeItem} from '../utilities/localStorage.utilities'
import authHeader from '../utilities/authHeader.utilities'

//logout the user
export const logout = () => {
    removeItem('user')
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}

export const getUser = async () =>{
    try {
        const response = await fetch("http://localhost:5000/dashboard/", {
            method: "GET",
            headers: {token: localStorage.token}
        })

        const parseRes = await response.json()
       
        return parseRes
        // setUser(parseRes)
        
    } catch (err) {
        console.error(err.message)
    }
}