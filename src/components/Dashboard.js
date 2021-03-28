import React, {Fragment, useState, useEffect} from 'react';
import {  toast } from 'react-toastify';

const Dashboard = ({setAuth}) => {
    const [user, setUser] = useState("")

    const getUser = async () =>{
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json()
           
            setUser(parseRes.user_name)
        } catch (err) {
            console.error(err.message)
        }
    }

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out successfully!")
    }

    useEffect(()=>{
        getUser()

    }, [])
    return (

        <Fragment>
            <h1>Dashboard {user}</h1>
            <button className="btn btn-primary" onClick={e=> logout(e)}>Logout</button>
        </Fragment>
    )
}

export default Dashboard; 