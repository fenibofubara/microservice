import React from 'react'
import PostCreate from './postCreate'
import PostLists from './postLists'

const App = ()=>{
    return <div className="container">Blog App
    <h1>Create Post</h1>
    <PostCreate/>
    <PostLists/>
    </div>
    
    
}

export default App