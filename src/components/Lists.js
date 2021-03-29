import React, { Fragment, useState, useEffect } from 'react';


const Lists = ({ setAuth }) => {
    const [lists, setLists] = useState("")

    const getRecipes = async () => {
        try {
            const user = getCurrentUser()
            console.log(user)
            const response = await fetch("http://localhost:5000/list", {
                method: "GET",
                headers: { token: localStorage.token }
            })

            const parseRes = await response.json()

            console.log(JSON.stringify(parseRes[0]))
            setRecipes(JSON.stringify(parseRes[0]))

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])
    return (

        <Fragment>
            <h1>This is the lists</h1>
        </Fragment>
    )
}

export default Lists; 