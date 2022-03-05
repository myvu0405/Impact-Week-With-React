import React from 'react'
import { Link } from 'react-router-dom'
import './ShowOneQuestion.css'
import moment from 'moment'

function ShowOneQuestion() {
  return (
    <div>

<Link to="/questions" className="btn btn-info btnBackQuestion">Back</Link>
  <div className="showOneContainer">
    <div className="card" id="cardShowOne">
      <div className="card-body content">
        <h3 className="titleShowOne card-title">ABC</h3>
        <p className="card-textOneQuestion">XYZ</p>
        <div className="createInfoBtn-Question">
            <div className="created-info-showOne">
              <p><strong>Created by: </strong></p>
              <p><strong>Created date: </strong></p>
              <p><strong>Updated date: </strong></p>
            </div>
            <div className="edit-delete-question">
              {/* if (result.user_id.id == locals.user.id){  */}
                <Link className="btn btn-info btn-sm" to="/editQuestion/result.id" >Edit question</Link>
                <Link className="btn btn-danger btn-sm btnEditDelQuestion" to="/deleteQuestion/result.id" >Delete question</Link>
               {/* } */}
            </div>
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
                      <p style={{fontStyle: "italic", fontSize: "10px"}}><strong>Updated at:</strong>moment(answer.updatedAt).format('MMMM Do YYYY, h:mm a')</p>
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