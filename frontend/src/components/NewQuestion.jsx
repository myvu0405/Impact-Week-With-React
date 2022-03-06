import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function NewQuestion() {

    const [question, setQuestion] = useState({question:'', description:''});
    const [errors, setErrors] = useState({question:'', description:''});
    const [result, setResult] = useState('');

    const navigate= useNavigate();

    useEffect( () =>{
        //check if user logged in, if not navigate to homepage
        const token=localStorage.getItem('user');
        if(!token) {
            
            navigate('/');
        }       
    },[navigate]);

    const setQuestionData = ({target}) => {
        setQuestion({...question,[target.name]:target.value});
    }

    const addNewQuestion = (e) => {
        e.preventDefault();

        const token=localStorage.getItem('user');
        //send a post request to add a new question
        axios.post(`http://localhost:5000/addQuestion`, question, {
            headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(res => {
                setResult(res.data);
                setErrors({question:'', description:''});
                navigate('/questions');

            })
            .catch(err=> {
                setErrors(err.response.data);
                setResult('Add new question failed.')
            })

    }

    const cancelNewQuestion = () => {
        navigate('/questions');

    }

    return (
        <div>
            <h3 className="title"> Add question </h3>
            <div className="add-question">
                {result && <p>{result}</p>}
                <form className="formAddQuestion" onSubmit={addNewQuestion}>
                    <label >Question:</label>
                    <input type="text" id="title" value={question.question} onChange={setQuestionData} name="question" placeholder="Enter question"/>
                    {errors.question && <small id="err" className="form-text text-muted errors">
                        {errors.question}
                    </small>}
                    
                    <label >Description:</label>
                    <textarea  name="description" value={question.description} onChange={setQuestionData} placeholder="Enter description"/>
                    {errors.description && <small id="err" className="form-text text-muted errors">
                        {errors.description}
                    </small>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button onClick={cancelNewQuestion} id="btn-editQuestion" className="btn btn-warning">Cancel</button>
                </form>
            </div>

        </div>
    )
}
