import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';    

import Answers from './Answers';

export default function OneQuestion() {

    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
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
                setQuestion(res.data.result);
                setAnswers(res.data.answers);
            })
            .catch(err=> {
                setError(err.response.data);
            })
        }       
    },[navigate,id]);

    const goBack = () => {
        navigate('/questions');

    }

    return (
        <div>
            <h3>Question detail</h3>

            <button className="btn btn-info btnBackQuestion" onClick={goBack}>Go back</button>
            {error && <p className='errors'>{error}</p>}
            {question && (
            <div className="showOneContainer">
                <div className="card" id="cardShowOne">
                    <div className="card-body content">
                        <h3 className="titleShowOne card-title">{question.question}</h3>
                        <p className="card-textOneQuestion">{question.description}</p>
                        <div className="createInfoBtn-Question">
                            <div className="created-info-showOne">
                            <p><strong>Created by: </strong>{question.user_id.username}</p>
                            <p><strong>Created date: </strong>{question.createdAt}</p>
                            <p><strong>Updated date: </strong>{question.updatedAt}</p>
                            </div>
                            {loginUser.id === question.user_id._id && (
                                <div className="edit-delete-question">
                                
                                    <Link to={`/edit-question/${question._id}`} className="btn btn-info btn-sm" >Edit question</Link>
                                    <br />
                                    <Link to={`/delete-question/${question._id}`} className="btn btn-danger btn-sm btnEditDelQuestion" >Delete question</Link>
                                
                                </div>
                            )}
                        </div>

                        <form className="answerForm">
                            <label>Add your answer: </label><br />
                            <input type="text" id="fieldAnswer" name="answer" placeholder="Enter answer"/>
                            <button className="btn btn-success btn-sm answerButton">Answer</button>
                            
                        </form>
                        <small>There are currently {answers.length} answers to this question.</small>
                        <Answers answers={answers} loginUser={loginUser} questionOwnerId={question.user_id._id}/>   

                    </div>
                </div>
            </div>
            )}
        </div>
    )
}
