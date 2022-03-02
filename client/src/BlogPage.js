import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from './Modal'
import Comment from './Comment'
import Button from '@mui/material/Button';


function BlogPage({user}){
    const params = useParams()
    const [blogPost, setBlogPost] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [bcomment, setBcomment] = useState("")
    const [comments, setComments] = useState([])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch(`/blogs/${params.id}`)
        .then(r=>r.json())
        .then(data => {
            setBlogPost(data)
            setComments(data.comments)
        })
    }, [params])

    function closeModal() {
        setIsOpen(false)
        setBcomment("")
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
                    blog_id: blogPost.id,
                    user_id: user.id,
                    comment: bcomment
                }
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setComments([data,...comments])
                    closeModal()
                })
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                })
            }
        })
    }
    if (comments != null) {
        return(
            <div >
                <h2 id='bp-title'>{blogPost.name}</h2>
                <div style={{display: 'flex'}}>
                    <img id='bp-image' src={blogPost.image} alt={blogPost.name}/>
                    <div>
                        <p id='bp-restaurant'>Restaurant: {blogPost.restaurant} </p><br />
                        <p id='bp-description'>{blogPost.description}</p><br />
                        <Button sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C'}]}
                        onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a comment")}>Create Comment</Button><br /><br />
                        <Box id='bp-comments'>
                            Comments:
                            {
                                comments.map((comment) => (
                                    <Comment comment={comment} />))
                            }
                        </Box>
                        <Modal open={isOpen}>
                            {errors.map((e) => <p key={e}>{e}</p>)}
                            <form onSubmit={onSubmit}>
                                <p style={{marginTop: 0, fontWeight: 'bold', textAlign: 'center'}}>Leave a comment!</p>
                                <div className='form-input'>
                                    <label style={{marginBottom: 0, marginRight: '5px', paddingTop: '5px'}}>Comment: </label>
                                    <textarea 
                                    type='textarea'
                                    value={bcomment}
                                    onChange={(event) => setBcomment(event.target.value)}
                                    />
                                </div>
                                <div className='comment-buttons'>
                                    <Button sx={[{
                                                '&:hover': {backgroundColor: '#F0BEC8', 
                                                border: 1, 
                                                borderColor: '#DD798C'},
                                                }, 
                                                {fontWeight: 'bold', 
                                                fontFamily: 'Cormorant SC', 
                                                color: '#1D6947', 
                                                background: '#DD798C'}]}
                                    type='submit' >Submit</Button>&nbsp;&nbsp;
                                    <Button sx={[{
                                            '&:hover': {backgroundColor: '#F0BEC8', 
                                            border: 1, 
                                            borderColor: '#DD798C'},
                                            }, 
                                            {fontWeight: 'bold', 
                                            fontFamily: 'Cormorant SC', 
                                            color: '#1D6947', 
                                            background: '#DD798C'}]}
                                onClick={() => closeModal()} >Close</Button>
                            </div>
                            </form>
                            
                        </Modal>
                    </div>
                </div>

            </div>
        )
    } else return (
        <div></div>
    )
}

export default BlogPage