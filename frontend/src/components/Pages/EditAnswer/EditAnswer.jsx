import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import '../AddQuestion/AddQuestion.css'

function EditAnswer() {

  const {id} = useParams();
    const navigate = useNavigate();
    const token=localStorage.getItem('user');

    const [answer, setAnswer] = useState('');
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
                navigate(`/showOneQuestion/${answer.question_id._id}`);
            })
            .catch(err=> {
                setErrors(err.response.data.description);
                setResult('Edit answer failed.')
            })
    }

    const goBack= () => {
      navigate(`/showOneQuestion/${answer.question_id._id}`);
  }

  return (
    <div>
      <Header />
        <h3 className="title"> Edit an answer </h3>
        { answer && 
          <div className="add-question">
              <form onSubmit={updateAnswer}>
                  <label>Update your answer here:</label>
                  <textarea cols="80"  rows="2" name="description" onChange={setUpdate} value={answer.description}></textarea>
                    
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button id="btn-editQuestion" className="btn btn-warning" onClick={goBack}>Cancel</button>
              </form>
          </div>
        }
        <Footer />
    </div>
  )
}

export default EditAnswer