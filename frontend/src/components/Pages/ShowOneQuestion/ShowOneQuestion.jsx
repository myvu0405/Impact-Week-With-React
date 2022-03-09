import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './ShowOneQuestion.css'
import moment from 'moment'
import { useParams, Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import EditAnswer from '../EditAnswer/EditAnswer';

function ShowOneQuestion() {

  const [question, setQuestion] = useState("");
  const [userNameQuestion, setUsernameQuestion] = useState("")
  const [userIdQuestion, setUserIdQuestion] = useState("")
  const [error, setError] = useState('');
  const [loginUser, setLoginUser] = useState(null);

  const {id} = useParams();

  const [newAnswer, setNewAnswer] = useState({description:'', question_id: id});
  const [answers, setAnswers] = useState([]);
  const [answerErrors, setAnswerErrors] = useState('');
  const [result, setResult] = useState('');

  const navigate= useNavigate();

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
  },[result]);

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

const setInput = ({target}) => {
  setNewAnswer({
      ...newAnswer,
      [target.name]: target.value
  });
}

const addNewAnswer = () => {
  const token=localStorage.getItem('user');
  console.log(newAnswer);
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
  console.log(answer_id);
  // e.preventDefault();
  axios.delete(`http://localhost:5000/deleteAnswer/${answer_id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
          setResult(res.data);
          navigate(`/showOneQuestion/${id}`);
      })
      .catch(err=> {
          setResult(err.response.data);
      })
}

const editAnswer = (e) => {
}

//  console.log(answers);
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
              <form onSubmit={addNewAnswer} className="answerForm">
                  <label>Add your answer: </label>
                  <input type="text" id="fieldAnswer" name="description" value={newAnswer.description} onChange={setInput} placeholder="Enter answer" />
                  <button className="btn btn-success btn-sm answerButton">Answer</button>
              </form>

              {/* <!-- Display answer --> */}
              {/* if(answers.length > 0){ */}
                <small>There are currently {answers.length} answer(s) to this question.</small>
                  { answers && answers.map(value => {
                    return (
                      <div className="showAnswer" key={value._id}>
                        <p className="card-textOneQuestion">{value.description}</p>
                        <div className="createdInfo-Answer">
                            <div>
                              <p style={{fontStyle: "italic", fontSize: "10px", marginBottom: "1px"}}><strong>Created at: </strong>{moment(value.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                              <p style={{fontStyle: "italic", fontSize: "10px"}}><strong>Updated at:</strong>{moment(value.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                            </div>
                            <p style={{color: "blue", fontstyle: "italic"}}><strong>Answer by: </strong>{value.user_id.username}</p>
                        </div>
                        <div className="g-btnEditDelAnswer">
                          {value.user_id && value.user_id._id == decoded.id &&
                            /* if(answer.user_id.id == locals.user.id){ */
                                <button className="btn btn-info btn-sm btnEditDelAnswer" onClick={() => navigate(`/editAnswer/${value._id}`)}>Edit Answer</button>
                            }      
                            { value.user_id && value.user_id._id == decoded.id &&
                                <button className="btn btn-danger btn-sm btnEditDelAnswer btnDel" onClick={() => deleteAnswer(value._id)}>Delete Answer</button>
                            }
                                {/* } */}
                            {/* if (result.user_id.id == locals.user.id || answer.user_id.id == locals.user.id){ */}
                            {/* <Link className="btn btn-danger btn-sm btnEditDelAnswer" to="/deleteAnswer/answer.id" >Delete answer</Link> */}
                            {/* } */}
                        </div>
                      </div>
                    )
                  })
                  }  

            </div>
          </div>
        </div>
    </div>
  )
}

export default ShowOneQuestion