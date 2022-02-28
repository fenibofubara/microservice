const express = require('express')
const app = express()
const {randomBytes} = require('crypto')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
var multer = require('multer');

var upload = multer();


// for parsing multipart/form-data
app.use(bodyParser.json())
app.use(cors())
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));


const posts = {}

app.get('/posts',(req,res)=>{
res.send(posts)
})

app.post('/posts/create',async(req,res)=>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    posts[id] = {id,title}
    
    await axios.post('http://event-bus-service:4005/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    })

    res.status(201).send(posts)

})

app.post('/events',(req,res)=>{
    console.log('Received Event',req.body.type)
    res.send({})
})



app.listen('4000',()=>{
    console.log('v7377')
    console.log('Listening On Port 4000')
})