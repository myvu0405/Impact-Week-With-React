import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import '../AddQuestion/AddQuestion.css'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditQuestion() {

const [question, setQuestion] = useState({question:'', description:''});
const {id} = useParams();

useEffect(() => {
  const token=localStorage.getItem('user');
  if(!token) {
    navigate('/');
  } 
  else {
    axios.get(`http://localhost:5000/editQuestion/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    .then(res => { console.log(res); })
    .catch(err => console.log(err))
  }

})

const setQuestionData = ({target}) => {
  setQuestion({...question, [target.name]:target.value});
}



  return (
    <div>
        <Header />
        <h3 className="title"> Edit a question </h3>
        <div className="add-question">
            <form>
                <label>Question:</label>
                <input type="text" id="title" name="question" value={question.question} onChange={setQuestionData}/>
               
                <label>Description:</label>
                <textarea  name="description" value={question.description} onChange={setQuestionData}></textarea>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link id="btn-editQuestion" className="btn btn-warning" to="/showOneQuestion/id>">Cancel</Link>
            </form>
        </div>
        <Footer />
    </div>
  )
}

export default EditQuestion