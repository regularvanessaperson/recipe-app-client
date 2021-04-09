import React, { Fragment, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '../services/auth.service';




const ListForm = ({ setAuth }) => {
    const [list, setList] = useState([])
    const [user, setUser] = useState("")
    const [inputs, setInputs] = useState({
        name: "",
        ingredients: [],
        user_id: ""
    });
    
    const { name, ingredients, user_id } = inputs;

    const getCurrentUser = async ()=>{
        let data= await getUser()
        console.log(data)
        setUser(data.user_id)
    }

    useEffect (()=> {
        getCurrentUser()
    },[])

    const onChange = e =>{
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
        

    const addToList = (e)=> {
        e.preventDefault()
        setList([...list, e.target.value])
    }

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { name, ingredients:list, user_id: user };
            const response = await fetch(
                "http://localhost:5000/list/new",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                toast.success("Successfully saved!")
            } else {
                setAuth(false)
                toast.error(parseRes)
            }

        } catch (err) {
            console.error(err.message)

        }
    }

    return (

        <Fragment>
            <h1>This is the list form?</h1>
            <form  onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <label className="form-label">List Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name of your list"
                        value={name}
                        onChange={e => onChange(e)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Add List Item</label>
                    <input
                        type="text"
                        name="ingredients"
                        className="form-control"
                        placeholder="ingredient name"
                        value={ingredients}
                        onChange={e => onChange(e)} />
                    <button
                        value={ingredients}
                        type="button"
                        onClick={e => addToList(e)}
                        className="btn btn-success btn-block">
                        Add</button>
                </div>
                <ul>
                    {list.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
                <button type="text">Submit</button>
            </form>
        </Fragment >
    )
}

export default ListForm; 