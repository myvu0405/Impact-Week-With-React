import React, { useState, useEffect } from 'react'
import Header from '../../Layout/Header';
import axios from 'axios';
import Footer from '../../Layout/Footer'
import "./Homepage.css"
import handPointer from '../../Images/hand-pointer.jpg'
import homePageImg from '../../Images/Homepage_img.png'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'

function Homepage() {

  const [questions, setQuestions]=useState([]);
  const [error, setError] = useState('');

  const navigate= useNavigate();

  const getQuestions = (token) => {
      axios.get(`http://localhost:5000/questions`, {
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
  },[]);

  return (
    <div>
       <div>
        <Header/>
        <div className="addQuestionTitle">
          <h3>There are <span>{questions.length}</span> question(s)</h3>
          <img src={handPointer}  alt="" />
          <Link className="btn btn-success" to="/addQuestion">Add question</Link>
        </div>
        <div className="home-img">
          <img src={homePageImg} alt="Homepage image" /> 
        </div>
        { questions && questions.map(result => {
          return(
            <div className="cardsContainer" key={result._id}>
              <div className="card cardHover">
                <div className="card-body ">
                  <h3 className="card-title card-title-question-home">{result.question}</h3>
                      <h6 className="card-subtitle mb-2 text-muted card-text content">{result.description}</h6>
                      <div id="created-info">
                        <p><strong>Created by: </strong>{result.user_id.username}</p>
                        <p><strong>Created date: </strong>{moment(result.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                      </div>
                      <p className="countAnswer"><span></span> answer(s)</p>
                      <Link className="seeMore" to={`/showOneQuestion/${result._id}`} >See more</Link>
                </div>
              </div>
            </div>  
          )
          })
        }  
        <Footer />
      </div>
    </div>
  )
}

export default Homepage


