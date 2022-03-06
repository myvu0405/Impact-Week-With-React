import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'
import jwt_decode from 'jwt-decode'; 
import { Navigate  } from "react-router-dom";
import './AddQuestion.css'

function AddQuestion() {

 const [question, setQuestion] = useState('');
 const [description, setDescription] = useState('');
 const [redirect, setRedirect] = useState(false)
 const [errors, setErrors] = useState({
  question: '',
  description: '',  
})

const handleAddQuestion = (e) => {
  e.preventDefault();
  const decoded = jwt_decode(localStorage.getItem('user'));
  const id = decoded.id;

  const data = {question, description, id};
  // console.log('Value', data, question, description);
  axios.post('http://localhost:5000/addQuestion', data)
  .then(res => { 
    if(res.data.question == "Please enter your question." || res.data.question == "Minimum question length must be 5." 
      || res.data.description == "Please enter your description." || res.data.description == "Minimum length of description must be 5."
      ) { 
          setErrors(res.data);
          setRedirect(false);
    } else {
    setQuestion('');
    setDescription('');
    setRedirect(true);
    }
   })
  .catch(err => { 
    console.log(err);
  })

}
  return (
    <div>
      <Header />
      <h3 className="title"> Add question </h3>
      <div className="add-question">
          <form className="form" onSubmit={handleAddQuestion}>
          <label>Question:</label>
              <input type="text" id="title" name="question" onChange={e => setQuestion(e.target.value)} placeholder="Enter question" />
              {errors.question && <small className='errors'>{errors.question}</small>}
              <label>Description:</label>
              <textarea  name="description" onChange={e => setDescription(e.target.value)} placeholder="Enter description"></textarea>
              {errors.description && <small className='errors'>{errors.description}</small>}
              <br />
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link className="btn btn-warning btn-CancelQuestion" to="/questions">Cancel</Link>
          </form>
      </div>
      {redirect && <Navigate to='/' replace={true} />}
    </div>
  )
}

export default AddQuestion