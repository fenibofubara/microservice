const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
var multer = require('multer');
var upload = multer();


// for parsing multipart/form-data
app.use(bodyParser.json())
app.use(cors())

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

const commentsByPostId = {}



app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || [])

})


app.post('/posts/:id/comments',async(req,res)=>{
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const comments = commentsByPostId[req.params.id] || []
    comments.push({id:commentId,content, status:'pending'})
    commentsByPostId[req.params.id] = comments
    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
           id:commentId,
           content,
           postId:req.params.id,
           status:'pending'
        }
    })
    res.status(201).send(comments)

})

app.post('/events',async(req,res)=>{
    console.log('Received Event',req.body.type)

    const {type,data} = req.body
    if(type==='CommentModerated'){
        const {postId,id,status,content} = data
        const comments = commentsByPostId[postId]
        const comment = comments.find(comment =>{
         return comment.id ===id
        })

        comment.status = status 
        await axios.post('http://localhost:4005/events',{
            type:'CommentUpdated',
            data:{
                id,
                postId,
                status,
                content

            }
        })
    }
    res.send({})
})



app.listen('4001',()=>{
    console.log('Listening On Port 4001')
})