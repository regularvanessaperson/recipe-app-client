import React, { Fragment, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/auth.service';
import { Link } from "react-router-dom";
import ListForm from "./ListForm"
const Lists = ({ setAuth }) => {
    const [lists, setLists] = useState([])

    const getLists = async () => {
        try {
            const user = getCurrentUser()
            console.log(user)
            const response = await fetch("http://localhost:5000/list", {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()

            console.log((parseRes))
            setLists(JSON.stringify(parseRes))

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getLists()
    }, [])
    return (

        <Fragment>
            <h1>This is the lists</h1>
            <Link to={"/listForm"} className="nav-link">
              Make a new list
            </Link>
            <div>{lists}</div>
        </Fragment>
    )
}

export default Lists; 