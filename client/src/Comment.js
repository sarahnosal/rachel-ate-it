import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from './Modal';



function Comment({comment, setComments, user, errors, onUpdate}) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        comment: ""
    })

    function closeModal() {
        setIsOpen(false)
        setFormData("")
    }

    function handleChange(e) {
        const key= e.target.name
        const value= e.target.value
        console.log(formData)
        setFormData({...formData, [key]:value})
    }

    function handleUpdateBlogComment(e){
        e.preventDefault()
        fetch(`/comments/${comment.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                comment: formData.comment
            })
        })
        .then((r) => r.json())
        .then(data => {
            onUpdate(data)
            console.log(data)
            closeModal()
            setFormData("")
        })
    }

    function handleDelete(id){
        fetch(`/comments/${id}`,
        {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                setComments((comments) =>
                    comments.filter((comment) =>
                        comment.id !== id)
                )
            }
        })
    }
    return (
        <div>
            <Box sx={{fontFamily: 'Cormorant SC', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Comment: {comment.comment}</span>{'    '}{user.name === comment.user ? <Button onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a review")} variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },}, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C', height: '25px', width: '70px'}]}>Change</Button> : null}
             <Modal open={isOpen}>
                            {errors.map((e) => <p key={e}>{e}</p>)}
                            <form onSubmit={handleUpdateBlogComment}>
                                <p style={{marginTop: 0, fontWeight: 'bold', textAlign: 'center'}}>Update Your Comment</p>
                                <div className='form-input'>
                                    <label style={{marginBottom: 0, marginRight: '5px', paddingTop: '5px'}}>Comment: </label>
                                    <textarea 
                                    name='comment'
                                    type='textarea'
                                    value={formData.comment}
                                    onChange={handleChange}
                                    />
                                </div>
                                <div className='update-buttons'>
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
            <br />
            <span>By: {comment.user}</span>
            {user.name === comment.user ? <Button variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C', marginRight: 0, display: 'flex'}]}
            onClick= {() => handleDelete(comment.id)}>Delete</Button> : null}
            
            </Box>
            <br />
        </div>
    )
}

export default Comment