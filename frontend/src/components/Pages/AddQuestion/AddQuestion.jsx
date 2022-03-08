import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './AddQuestion.css'

function AddQuestion() {

  const [question, setQuestion] = useState({question:'', description:''});
  const [errors, setErrors] = useState({question:'', description:''});
  const [result, setResult] = useState('');

  const navigate= useNavigate();

  useEffect( () =>{
      //check if user logged in, if not navigate to homepage
      const token=localStorage.getItem('user');
      if(!token) {
          
          navigate('/');
      }       
  },[navigate]);

  const setQuestionData = ({target}) => {
      setQuestion({...question, [target.name]:target.value});
  }

  const addNewQuestion = (e) => {
      e.preventDefault();
      const token=localStorage.getItem('user');
      //send a post request to add a new question
      axios.post(`http://localhost:5000/addQuestion`, question, {
          headers: { 'Authorization': `Bearer ${token}` }
          })
          .then(res => {
            console.log(res);
              setResult(res.data);
              setErrors({question:'', description:''});
              navigate('/questions');

          })
          .catch(err=> {
              setErrors(err.response.data);
              setResult('Add new question failed.')
          })

  }

 
  return (
    <div>
      <h3 className="title"> Add question </h3>
      <div className="add-question">
        {result && <p><strong>{result}</strong></p>}
          <form className="form" onSubmit={addNewQuestion}>
          <label>Question:</label>
              <input type="text" id="title" name="question" value={question.question} onChange={setQuestionData} placeholder="Enter question" />
              {errors.question && <small className='errors'>{errors.question}</small>}
              <label>Description:</label>
              <textarea  name="description" value={question.description} onChange={setQuestionData} placeholder="Enter description"></textarea>
              {errors.description && <small className='errors'>{errors.description}</small>}
              <br />
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link className="btn btn-warning btn-CancelQuestion" to="/questions">Cancel</Link>
          </form>
      </div>
    </div>
  )
}

export default AddQuestion