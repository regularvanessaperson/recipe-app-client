import React, {Fragment, useState, useEffect} from 'react';
import {  toast } from 'react-toastify';
import {getUser} from "../services/auth.service"

const Dashboard = ({setAuth}) => {
    const [user, setUser] = useState("")

    // const getUser = async () =>{
    //     try {
    //         const response = await fetch("http://localhost:5000/dashboard/", {
    //             method: "GET",
    //             headers: {token: localStorage.token}
    //         })

    //         const parseRes = await response.json()
           
    //         setUser(parseRes)
            
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    const getCurrentUser = async ()=>{
        let data= await getUser()
        console.log(data)
        setUser(data.user_name)
        return data
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out successfully!")
    }
    
    useEffect (()=>{
        getCurrentUser()
        
        
    }, [])

    return (

        <Fragment>
            <h1>Dashboard {user}</h1>
            {/* <ListForm user_id={user.user_id} /> */}
            <button className="btn btn-primary" onClick={e=> logout(e)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard; 