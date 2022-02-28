import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Modal from './Modal'
import Button from '@mui/material/Button';
import Comment from './Comment';

function BlogPage({user}){
    const params= useParams()
    const [blog, setBlog]= useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [comment, setComment] = useState("")
    const [blogComments, setBlogComments] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/blogs/${params.id}`)
        .then(r=>r.json())
        .then(data => {
            setBlog(data)
            console.log(data)
            setBlogComments(data.comments)
        })
    }, [params])

    function closeModal() {
        setIsOpen(false)
        setComment("")
    }

    function onSubmit(e){
        e.preventDefault()
        fetch('/comments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "comment": {
                    blog_id: blog.id,
                    user_id: user.id,
                    comment: comment
                }
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setBlogComments([data, ...blogComments])
                    closeModal()
                })
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                })
            }
        })
    }

    console.log(blog.comments)
    if (blogComments != null) {

        return(
            <div>
                <h2 id='b-title'>{blog.name}</h2><hr />
                <div style={{display: 'flex'}}>
                    <img id='b-image' src={blog.image} alt={blog.name} />
                    <div>
                        <p id='b-restaurant'>Eat this here: {blog.restaurant}</p><br />
                        <p id='b-description'>Description: {blog.description}</p><br />
                        <p id='b-comments'>
                            Comments: 
                            {blogComments.map((blogComment) => (
                                <Comment blogComment={blogComment}/>))}
                            
                            
                        </p>
                        <Modal open={isOpen}>
                            {errors.map((e)=> <p key={e}>{e}</p>)}
                            <form className='comment-form' onSubmit={onSubmit}>
                                <p style={{marginTop: 0, fontWeight: 'bold'}}>Leave a comment!</p>
                                <div className='form-input'>
                                    <label style={{marginBottom: 0, marginRight: '5px'}}>Comment:</label>
                                    <textarea
                                        
                                        type='textarea'
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    />
                                </div>
                            </form>
                            <div className='form-buttons'>
                                <Button sx={[{
                                        '&:hover': {backgroundColor: '#F0BEC8', 
                                        border: 1, 
                                        borderColor: '#DD798C'},
                                        }, 
                                        {fontWeight: 'bold', 
                                        fontFamily: 'Cormorant SC', 
                                        color: '#1D6947', 
                                        background: '#DD798C'}]} type="submit">Submit</Button> &nbsp;&nbsp;
                                <Button sx={[{
                                    '&:hover': {backgroundColor: '#F0BEC8', 
                                    border: 1, 
                                    borderColor: '#DD798C'},
                                    }, 
                                    {fontWeight: 'bold', 
                                    fontFamily: 'Cormorant SC', 
                                    color: '#1D6947', 
                                    background: '#DD798C'}]} onClick={() => closeModal()}>Close</Button>
                            </div>
                        </Modal>
                        <Button sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C'}]} onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a review")}>Leave a Comment</Button>
                    </div>
                    
                </div>
            </div>
        )
    } 
    else return (
        <div></div>
    )}


export default BlogPage