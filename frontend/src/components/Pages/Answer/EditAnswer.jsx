import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


export default function EditAnswer() {

    const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem('user');

    const [answer, setAnswer] = useState(null);
    const [errors, setErrors] = useState('');
    const [result, setResult] = useState('');

    useEffect( () => {
        //check if user logged in, if not navigate to homepage
        if(!token) {
            
            navigate('/');
        } else {

            axios.get(`http://localhost:5000/oneAnswer/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                setAnswer(res.data);

            })
            .catch(err=> {
                setErrors(err.response.data);
            })
        }   
    },[navigate,id,token])

    const setUpdate = ({target}) => {
        setAnswer({
            ...answer,
            description: target.value
        })
    }

    const updateAnswer = (e) => {
        e.preventDefault();
        //send a post request to update an answer
        axios.put(`http://localhost:5000/editAnswer/${id}`, {description: answer.description}, {
            headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                setResult(res.data.result);
                setAnswer(res.data.answer)
                setErrors('');

            })
            .catch(err=> {
                setErrors(err.response.data.description);
                setResult('Edit answer failed.')
            })
    }

    const goBack= () => {
        navigate(`/one-question/${answer.question_id._id}`);
    }

    return (
        <div>
            <h3 className='title'>Edit Answer</h3>
            {answer && (<div className="add-question">
                <form className='form' onSubmit={updateAnswer}>
                    <label >Update your answer here:</label>
                    <textarea cols="80"  rows="2" name="description" onChange={setUpdate} value={answer.description}></textarea>
                        { errors &&
                            <>
                            <small id="err" className="errors">
                            {errors} </small>
                            <br />
                            </>
                        }
                    {result && <p><strong>{result}</strong></p>}

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button id="btn-editQuestion" className="btn btn-warning" onClick={goBack}>Back</button>

                </form>


            </div>)}
        </div>
    )
}
