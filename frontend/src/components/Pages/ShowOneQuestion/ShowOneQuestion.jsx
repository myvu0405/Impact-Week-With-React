import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './ShowOneQuestion.css'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Answers from '../Answer/Answers';
import AddAnswer from '../Answer/AddAnswer';

function ShowOneQuestion() {

    const navigate= useNavigate();
    const {id} = useParams();
    const token=localStorage.getItem('user');

    const [question, setQuestion] = useState(null);
    const [newAnswer, setNewAnswer] = useState({description:'', question_id: id});

    const [answers, setAnswers] = useState([]);
    const [questionErrors, setQuestionErrors] = useState('');
    const [answerErrors, setAnswerErrors] = useState('');
    const [result, setResult] = useState('');

    const [loginUser, setLoginUser] = useState(null);

  useEffect( () =>{
    //check if user logged in, if not navigate to homepage
    if(!token) {
        
        navigate('/');
    } else {
        const decoded = jwt_decode(token);
        setLoginUser(decoded);
        axios.get(`http://localhost:5000/showOneQuestion/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          setQuestion(res.data.result);
          setAnswers(res.data.answers);
          setResult('');
        })
        .catch(err => {
            setQuestionErrors(err.response.data);
        })
    }       
  },[navigate,id,token,result,newAnswer]);

  const handleDelQuestion = () => {
    const token=localStorage.getItem('user');
    axios.delete(`http://localhost:5000/deleteQuestion/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
        setResult(res.data);
        navigate('/questions');
    })
    .catch(err => setResult(err.response.data))
  } 

const handleEditQuestion = () => {
  navigate('/edit-question' + '/' + id)
}

const setInput = ({target}) => {
    setNewAnswer({
        ...newAnswer,
        [target.name]: target.value
    });
}

const addNewAnswer = (e) => {
    e.preventDefault();
    const token=localStorage.getItem('user');

    //send a post request to add a new answer
    axios.post(`http://localhost:5000/addAnswer`, newAnswer, {
        headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setResult(res.data.result);
            setAnswerErrors('');
            setNewAnswer({
                ...newAnswer,
                description:''
            })
        })
        .catch(err=> {
            setAnswerErrors(err.response.data.description);
            setResult('Add new answer failed.')
        })
}

const deleteAnswer = (answer_id) => {
    axios.delete(`http://localhost:5000/deleteAnswer/${answer_id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            setResult(res.data);
        })
        .catch(err=> {
            setResult(err.response.data);
        })
}

  return (
    <div>
      
      <Link to="/questions" className="btn btn-info btnBackQuestion">Back</Link>
      {questionErrors && <p className='errors'>{questionErrors}</p>}
      {question && (
        <div className="showOneContainer">
          <div className="card" id="cardShowOne">
            <div className="card-body content">
              <h3 className="titleShowOne card-title">{question.question}</h3>
              <p className="card-textOneQuestion">{question.description}</p>
              <div className="createInfoBtn-Question">
                  <div className="created-info-showOne">
                    <p><strong>Created by: </strong>{question.user_id.username}</p>
                    <p><strong>Created date: </strong>{moment(question.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                    <p><strong>Updated date: </strong>{moment(question.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                  </div>
                  {loginUser.id === question.user_id._id &&
                  <div className="edit-delete-question">
                        {/* <Link className="btn btn-info btn-sm" to={`/editQuestion/${id}`} >Edit question</Link> */}
                        <button className="btn btn-info btn-sm btnEditDelQuestion" onClick={handleEditQuestion}>Edit question</button>
                        <button className="btn btn-danger btn-sm btnEditDelQuestion" onClick={handleDelQuestion}>Delete question</button>
                  </div>
                  }
              </div>

              <AddAnswer onChange={setInput} errors={answerErrors} description={newAnswer.description} onSubmit={addNewAnswer}/>

              {/* <!-- Display answer --> */}
            <small>There are currently {answers.length} answer(s) to this question.</small>
            <Answers onClick={ (answer_id) => deleteAnswer(answer_id)} answers={answers} loginUser={loginUser} questionOwnerId={question.user_id._id}/>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowOneQuestion