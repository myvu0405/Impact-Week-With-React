import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Questions() {

    const [questions, setQuestions]=useState([]);
    const [error, setError] = useState('');

    const navigate= useNavigate();

    const getQuestions = (token) => {
        axios.get(`http://localhost:5000/all-questions`, {
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

        const token=localStorage.getItem('user');
        if(token) {
            
            getQuestions(token);
        }
        else {
            navigate('/');
        }
    },[navigate]);

    return (
        <div>
            <h3>Questions dashboard</h3>
            <h4>There are currently {questions.length} question(s)</h4>
            
            <h4><Link to='/new-question'>Add a new questions</Link></h4>

            {questions.length>0 && ( questions.map( (question, index) => 
                (<div key={index} className='question'>
                    <label>Question: {question.question}</label>
                    <label >Description: {question.description}</label>
                    <label >Created at: {question.createdAt}</label>
                    <label >Last updated at: {question.updatedAt}</label>
                    
                    <Link to={`/one-question/${question._id}`}>See more</Link>
                </div>)))}
            
            {error && <p className='errors'>{error}</p>}
        </div>
    )
}
