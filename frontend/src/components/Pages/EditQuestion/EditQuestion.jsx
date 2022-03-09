import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import '../AddQuestion/AddQuestion.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function EditQuestion() {

const [question, setQuestion] = useState({question:'', description:''});
const {id} = useParams();
const navigate = useNavigate();
const token=localStorage.getItem('user');
const decoded = jwt_decode(token);

useEffect(() => {
  
  axios.get(`http://localhost:5000/editQuestion/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
  .then(res => { 
    // console.log(res); 
    setQuestion(res.data)
  })
  .catch(err => console.log(err))
}, [navigate,id,token])


const setQuestionData = ({target}) => {
  setQuestion({...question, [target.name]:target.value});
}

const updateQuestion = (e) => {
  e.preventDefault();
  const data = {
    question: question.question,
    description: question.description
  }
  axios.post(`http://localhost:5000/editQuestion/${id}`, data, {
          headers: { 'Authorization': `Bearer ${token}` }
      })
  .then( res => navigate(`/one-question/${id}`))
  .catch(err => console.log(err))
}

  return (
    <div>
        <h3 className="title"> Edit a question </h3>
        <div className="add-question">
            <form onSubmit={updateQuestion}>
                <label>Question:</label>
                <input type="text" id="title" name="question" value={question.question} onChange={setQuestionData}/>
               
                <label>Description:</label>
                <textarea  name="description" value={question.description} onChange={setQuestionData}></textarea>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
                <Link id="btn-editQuestion" className="btn btn-warning" to={`/one-question/${id}`}>Cancel</Link>
            </form>
        </div>
    </div>
  )
}

export default EditQuestion