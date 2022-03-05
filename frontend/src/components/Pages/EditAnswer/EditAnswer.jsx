import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'
import '../AddQuestion/AddQuestion.css'

function EditAnswer() {
  return (
    <div>
        <Header />
        <h3 className="title"> Edit an answer </h3>
        <div className="add-question">
            <form form action="/editAnswer/id>" method="POST">
                <label for="description">Update your answer here:</label>
                <textarea cols="80"  rows="2" name="description"></textarea>
                   
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link id="btn-editQuestion" className="btn btn-warning" to="/showOneQuestion/id">Cancel</Link>
            </form>
        </div>
    </div>
  )
}

export default EditAnswer