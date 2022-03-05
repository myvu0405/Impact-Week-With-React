import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'
import '../AddQuestion/AddQuestion.css'

function EditQuestion() {
  return (
    <div>
        <Header />
        <h3 className="title"> Edit a question </h3>
        <div className="add-question">
            <form className="form" method="POST" action="/editQuestion/id">
                <label for="question">Question:</label>
                <input type="text" id="title" name="question" value=""/>
               
                <label for="description">Description:</label>
                <textarea  name="description" placeholder="Enter description"></textarea>
                
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link id="btn-editQuestion" className="btn btn-warning" to="/showOneQuestion/id>">Cancel</Link>
            </form>
        </div>
    </div>
  )
}

export default EditQuestion