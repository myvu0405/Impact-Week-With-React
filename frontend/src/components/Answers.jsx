import React from 'react'
import { Link } from 'react-router-dom';

export default function Answers(props) {

    const {answers, loginUser,questionOwnerId} = props;

    return (
        <div>
            { answers.length>0 && answers.map( (answer,index) => (
                <div className="showAnswer" key={index}>
                    <p className="card-textOneQuestion">{answer.description}</p>
                    <div className="createdInfo-Answer">
                        <div>
                            <small ><strong>Created at: </strong>{answer.createdAt}</small><br />
                            <small ><strong>Updated at: </strong>{answer.updatedAt}</small>
                        </div>
                        <small ><strong>Answer by:</strong>{answer.user_id.username}</small>
                    </div>
                    <div className="g-btnEditDelAnswer">
                        {answer.user_id._id === loginUser.id && (
                            <Link to={`/edit-answer/answer._id`}>Edit answer</Link>
                        )}
                        {(questionOwnerId === loginUser.id || answer.user_id._id ===loginUser.id) &&
                        <button className="btn btn-danger btn-sm btnEditDelAnswer" >Delete answer</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
