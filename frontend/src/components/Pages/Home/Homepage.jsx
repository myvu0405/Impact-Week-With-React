import React, { Component } from 'react'
import Header from '../../Layout/Header';
import axios from 'axios';
import Footer from '../../Layout/Footer'
import "./Homepage.css"
import handPointer from '../../Images/hand-pointer.jpg'
import homePageImg from '../../Images/Homepage_img.png'
import { Link } from 'react-router-dom';
// import moment from 'moment'


function Homepage() {

  const currentToken = localStorage.getItem('user')

  return (
    <div>
       <div>
        <Header token={currentToken}/>
        <div className="addQuestionTitle">
          <h3>There are <span>1</span> question(s)</h3>
          <img src={handPointer}  alt="" />
          <Link className="btn btn-success" to="/addQuestion">Add question</Link>
        </div>
        <div className="home-img">
          <img src={homePageImg} alt="Homepage image" /> 
        </div>

        <div className="cardsContainer">
              <div className="card cardHover">
                <div className="card-body ">
                  <h3 className="card-title card-title-question-home"></h3>
                      <h6 className="card-subtitle mb-2 text-muted card-text content"></h6>
                      <div id="created-info">
                        <p><strong>Created by: </strong></p>
                        <p><strong>Created date: </strong></p>
                      </div>
                      <p className="countAnswer"><span></span> answer(s)</p>
                      <Link className="seeMore" to="/showOneQuestion" >See more</Link>
                </div>
              </div>
            </div>    
        <Footer />
      </div>
    </div>
  )
}

export default Homepage


