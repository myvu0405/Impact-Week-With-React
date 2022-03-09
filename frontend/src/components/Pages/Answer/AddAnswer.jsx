import React from 'react'

export default function AddAnswer(props) {

    const {description,errors} = props;
    

    return (
        <div>
            <h4>Add your answer:</h4>
            <form className="answerForm" onSubmit={props.onSubmit}>
                <input type="text" onChange={props.onChange} id="fieldAnswer" value={description} name="description" placeholder="Enter answer"/>
                <button className="btn btn-success btn-sm answerButton">Answer</button>
                <br />
                {errors &&<small className='errors'>{errors}</small>}
            </form>
        </div>
    )
}
