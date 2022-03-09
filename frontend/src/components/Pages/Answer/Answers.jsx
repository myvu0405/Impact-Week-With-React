import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment'


export default function Answers(props) {

    const {answers, loginUser,questionOwnerId} = props;
    const navigate= useNavigate();
    
    const deleteOneAnswer =(id) => {
        props.onClick(id);
    }

    return (
        <div>
            { answers.length>0 && answers.map( (answer,index) => (
                <div className="showAnswer" key={index}>
                    <p className="card-textOneQuestion">{answer.description}</p>
                    <div className="createdInfo-Answer">
                        <div>
                            <p style={{fontStyle: "italic", fontSize: "10px", marginBottom: "1px"}}><strong>Created at: </strong>{moment(answer.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                            <p style={{fontStyle: "italic", fontSize: "10px"}}><strong>Updated at: </strong>{moment(answer.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
                        </div>
                        <p style={{color: "blue", fontstyle: "italic"}}><strong>Answer by: </strong>{answer.user_id.username}</p>

                    </div>
                    <div className="g-btnEditDelAnswer">
                        {answer.user_id._id === loginUser.id && (
                            // <Link to={`/edit-answer/${answer._id}`} className="btn btn-info btn-sm btnEditDelAnswer">Edit answer</Link>
                            <button className="btn btn-info btn-sm btnEditDelAnswer" onClick={() => navigate(`/edit-answer/${answer._id}`)}>Edit Answer</button>
                        )}
                        {(questionOwnerId === loginUser.id || answer.user_id._id ===loginUser.id) &&
                        <button onClick={() => deleteOneAnswer(answer._id)} className="btn btn-danger btn-sm btnEditDelAnswer btnDel" >Delete answer</button>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
