import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../Layout/Header'

import './AddQuestion.css'

function AddQuestion() {
  return (
    <div>
      <Header />
      <h3 className="title"> Add question </h3>
      <div className="add-question">
          <form className="form" method="POST" action="/addQuestion">
              <label for="question">Question:</label>
              <input type="text" id="title" value="" name="question" placeholder="Enter question" />
              
              <label for="description">Description:</label>
              <textarea  name="description" placeholder="Enter description"></textarea>
              
              <button type="submit" className="btn btn-primary">Submit</button>
              <Link id="btn-editQuestion" className="btn btn-warning" to="/questions">Cancel</Link>
          </form>
      </div>
    </div>
  )
}

export default AddQuestion