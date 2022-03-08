import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './ShowOneQuestion.css'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function ShowOneQuestion() {

  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [userNameQuestion, setUsernameQuestion] = useState("")
  const [userIdQuestion, setUserIdQuestion] = useState("")
  const [error, setError] = useState('');
  const [loginUser, setLoginUser] = useState(null);

  const navigate= useNavigate();
  const {id} = useParams();

  useEffect( () =>{
    //check if user logged in, if not navigate to homepage
    const token=localStorage.getItem('user');
    if(!token) {
        
        navigate('/');
    } else {
        const decoded = jwt_decode(token);
        setLoginUser(decoded);
        axios.get(`http://localhost:5000/showOneQuestion/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          // console.log(res);
          setUsernameQuestion(res.data.username)
          setUserIdQuestion(res.data.id)
          setQuestion(res.data.result);
          setAnswers(res.data.answers);
        })
        .catch(err => {
          // console.log(err);
          setError(err.response.data);
        })
    }       
  },[]);

  const handleDelQuestion = (e) => {
    e.preventDefault();
    const token=localStorage.getItem('user');
    axios.delete(`http://localhost:5000/deleteQuestion/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      console.log(res);
      navigate('/questions');
    })
    .catch(err => console.log(err))
  } 

const handleEditQuestion = (e) => {
  e.preventDefault();
  navigate('/editquestion' + '/' + id)
}

  const token=localStorage.getItem('user');
  const decoded = jwt_decode(token);

  return (
    <div>
      
      <Link to="/questions" className="btn btn-info btnBackQuestion">Back</Link>
        <div className="showOneContainer">
          <div className="card" id="cardShowOne">
            <div className="card-body content">
              <h3 className="titleShowOne card-title">{question.question}</h3>
              <p className="card-textOneQuestion">{question.description}</p>
              <div className="createInfoBtn-Question">
                  <div className="created-info-showOne">
                    <p><strong>Created by: </strong>{userNameQuestion}</p>
                    <p><strong>Created date: </strong>{moment(question.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                    <p><strong>Updated date: </strong>{moment(question.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                  </div>
                  {userIdQuestion && userIdQuestion == decoded.id &&
                  <div className="edit-delete-question">
                        {/* <Link className="btn btn-info btn-sm" to={`/editQuestion/${id}`} >Edit question</Link> */}
                        <button className="btn btn-info btn-sm btnEditDelQuestion" onClick={handleEditQuestion}>Edit question</button>
                        <button className="btn btn-danger btn-sm btnEditDelQuestion" onClick={handleDelQuestion}>Delete question</button>
                  </div>
                  }
              </div>

              {/* <!-- input & submit answer --> */}
              <form action="/addAnswer" method="POST" className="answerForm">
                  <label>Add your answer: </label>
                  <input type="text" id="fieldAnswer" name="answer" placeholder="Enter answer" />
                  <button className="btn btn-success btn-sm answerButton">Answer</button>
                  
              
                  <input type="hidden" name='question_id' value="" />
                  <input type="hidden" name='user_id' value=""/>
              </form>

              {/* <!-- Display answer --> */}
              {/* if(answers.length > 0){ */}
                <small>There are currently answer(s) to this question.</small>
                  {/* answers.forEach (answer => { */}
                    <div className="showAnswer">
                      <p className="card-textOneQuestion">AAA</p>
                      <div className="createdInfo-Answer">
                          <div>
                            <p style={{fontStyle: "italic", fontSize: "10px", marginBottom: "1px"}}><strong>Created at: </strong>{moment().format('MMMM Do YYYY, h:mm a')}</p>
                            <p style={{fontStyle: "italic", fontSize: "10px"}}><strong>Updated at:</strong>{moment().format('MMMM Do YYYY, h:mm a')}</p>
                          </div>
                          <p style={{color: "blue", fontstyle: "italic"}}><strong>Answer by:</strong></p>
                      </div>
                      <div className="g-btnEditDelAnswer">
                          {/* if(answer.user_id.id == locals.user.id){ */}
                            <form method="POST" action="/editAnswer/<%=answer._id%>" >
                              <Link className="btn btn-info btn-sm btnEditDelAnswer" to="/editAnswer/answer.id" >Edit answer</Link>
                            </form>
                          {/* } */}
                          {/* if (result.user_id.id == locals.user.id || answer.user_id.id == locals.user.id){ */}
                          <Link className="btn btn-danger btn-sm btnEditDelAnswer" to="/deleteAnswer/answer.id" >Delete answer</Link>
                          {/* } */}
                      </div>
                    </div>
                  {/* } */}
              {/* } */}

            </div>
          </div>
        </div>
    </div>
  )
}

export default ShowOneQuestion