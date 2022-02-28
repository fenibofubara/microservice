import React, {useState,useEffect}  from 'react'
import axios from 'axios'
import CommentCreate from './commentCreate'
import CommentLists from './commentLists'


const PostLists = () => {
const [posts, setposts] = useState({})

const getPostLists = async ()=>{
    const res = await axios.get('http://anydomain.com/posts')
    // console.log(res.data,'Just Inspecting')
    setposts(res.data)
   
}

useEffect(() => {
    getPostLists()
}, [])

const renderedLists = Object.values(posts).map(post=>{
    return <div className="card" style={{width:'30%', marginBottom:'20px'}} key = {post.id}>
    <div className="card-body">
    <h3>{post.title}</h3>
    <CommentLists comments={post.comments}/>
    <CommentCreate postId={post.id}/>

    </div>

    </div>
})
    return ( 
        
        <div className="d-flex flex-row flex-wrap justify-content-between">{renderedLists}</div>
        
     );
}
 
export default PostLists;