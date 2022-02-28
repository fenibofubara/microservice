import React, {useState}  from 'react'
import axios from 'axios'


const Po = () => {
const [title, setTitle] = useState('')


const onSubmit = async(e)=>{
e.preventDefault()
await axios.post('http://anydomain.com/posts/create',{
    title
})

setTitle('')

}
return ( 
    
 <div>
<form onSubmit={onSubmit}>
    <div className='form-group'>
    <label>Title</label>
    <input className="form-control" value = {title} onChange = {e=>setTitle(e.target.value)}/>
    <button className="btn btn-primary">Submit</button>

    </div>
</form>

</div>
     );
}
 
export default Po;


