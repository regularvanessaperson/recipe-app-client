import React, {Fragment, useState, useEffect} from 'react';
import { getCurrentUser } from '../services/auth.service';


const Recipes = () => {
    const [recipes, setRecipes] = useState([])

    const getRecipes = async () =>{
        try {
            const response = await fetch("http://localhost:5000/recipe", {
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json()
           
            console.log(parseRes)
            setRecipes(JSON.stringify(parseRes))

        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        getRecipes()
    }, [])

    return (

        <Fragment>
            <h1>This is the recipes</h1>
            <div>{recipes}</div>
        </Fragment>
    )
}

export default Recipes; 