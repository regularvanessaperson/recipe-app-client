import { getItem, removeItem} from '../utilities/localStorage.utilities'

//logout the user
export const logout = () => {
    removeItem('user')
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}
