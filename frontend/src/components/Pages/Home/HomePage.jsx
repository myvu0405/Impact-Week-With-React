import React, { useState, useEffect } from 'react'
import axios from 'axios';
import "./Homepage.css"
import handPointer from '../../Images/hand-pointer.jpg'
import homePageImg from '../../Images/Homepage_img.png'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const apiBase= process.env.REACT_APP_API_BASE;


function Homepage() {

  const [questions, setQuestions]=useState([]);
  const [error, setError] = useState('');

  const navigate= useNavigate();

  const getQuestions = (token) => {
      axios.get(`${apiBase}all-questions`, {
          headers: { 'Authorization': `Bearer ${token}` }
          })
          .then(res => { 
              setQuestions(res.data);
          })
          .catch(err=> {
              setError(err.response.data);
          })
  }
  useEffect( () =>{
    const token = localStorage.getItem('user');
    if(token) {
      getQuestions(token);
    }
    else {
      navigate('/login');
    }
  },[navigate]);

  return (
    <div>
       <div>
        <div className="addQuestionTitle">
          <h3>There are <span>{questions.length}</span> question(s)</h3>
          <img src={handPointer}  alt="" />
          <Link className="btn btn-success" to="/new-question">Add question</Link>
        </div>
        <div className="home-img">
          <img src={homePageImg} alt="Homepage image" /> 
        </div>
        { questions.length>0 && questions.map(q => {
          return(
            <div className="cardsContainer" key={q.question._id}>
              <div className="card cardHover">
                <div className="card-body ">
                  <h3 className="card-title card-title-question-home">{q.question.question}</h3>
                      <h6 className="card-subtitle mb-2 text-muted card-text content">{q.question.description}</h6>
                      <div id="created-info">
                        <p><strong>Created by: </strong>{q.question.user_id.username}</p>
                        <p><strong>Created date: </strong>{moment(q.question.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                      </div>
                      <p className="countAnswer"><span>{q.answerNum}</span> answer(s)</p>
                      <Link className="seeMore" to={`/one-question/${q.question._id}`} >See more</Link>
                </div>
              </div>
            </div>  
          )
          })
        }
        {error && <p className='errors'>{error}</p>}  
      </div>
    </div>
  )
}

export default Homepage
