import React, {useState}  from 'react'
import axios from 'axios'
const CommentCreate = ({postId}) => {
const [comment, setcomment] = useState('')
const createComment = async(e)=>{
e.preventDefault()
await axios.post(`http://localhost:4001/posts/${postId}/comments`,{
content:comment
})

setcomment('')
}
console.log(comment)
    return ( 
        <>
        <div>
            <form onSubmit={createComment}>
                <div className="form-group"></div>
                <label>New Comment</label>
                <input value={comment} className="form-control" onChange={e=>setcomment(e.target.value)}/>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>

        </>
     );
}
 
export default CommentCreate;