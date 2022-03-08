import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from './Modal';


function Review({review, setReviews, user, errors, onUpdate}) {
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenComment, setIsOpenComment] = useState(false)
    const [formData, setFormData] = useState({
        score: "",
        comment: ""
    })
    function closeModal() {
        setIsOpen(false)
        setIsOpenComment(false)
        setFormData("")
    }

    function handleUpdateScore(e){
        e.preventDefault()
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                score: formData.score,
            })
        })
        .then((r) => r.json())
        .then(data => {
            onUpdate(data)
            closeModal()
            setFormData("")
        })
    }
    function handleUpdateComment(e){
        e.preventDefault()
        fetch(`/reviews/${review.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                comment: formData.comment,
            })
        })
        .then((r) => r.json())
        .then(data => {
            onUpdate(data)
            closeModal()
            setFormData("")
        })
    }

    function handleDelete(id){

        fetch(`/reviews/${id}`,
        {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                setReviews((reviews) =>
                    reviews.filter((review) =>
                        review.id !== id)
                )
            }
        })
    }

    function handleChange(e) {
        const key= e.target.name
        const value= e.target.value
        setFormData({...formData, [key]:value})
    }

    return (
        <div>
            <Box sx={{fontFamily: 'Cormorant SC', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span style={{marginBottom: '0px'}}>Score: {review.score}/5</span>{'    '}{user.name === review.user ? <Button onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a review")} variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },}, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C', height: '25px', width: '70px'}]}>Change</Button> : null}
            <Modal open={isOpen}>
                            {errors.map((e) => <p key={e}>{e}</p>)}
                            <form onSubmit={handleUpdateScore}>
                                <p style={{marginTop: 0, fontWeight: 'bold', textAlign: 'center'}}>Update Your Score</p>
                                <div className='form-input'>
                                    <label style={{marginBottom: 0, marginRight: '5px', paddingTop: '5px'}}>Score: </label>
                                    <input 
                                    name='score'
                                    type='integer'
                                    value={formData.score}
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
            <span style={{paddingBottom: '3px'}}>Comment: {review.comment}</span>{'      '}{user.name === review.user ? <Button onClick={() => user?setIsOpenComment(!isOpenComment):alert("You must be logged in to leave a review")} variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },}, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C', height: '25px', width: '70px'}]}>Change</Button> : null}
            <Modal open={isOpenComment}>
                            {errors.map((e) => <p key={e}>{e}</p>)}
                            <form onSubmit={handleUpdateComment}>
                                <p style={{marginTop: 0, fontWeight: 'bold', textAlign: 'center'}}>Update Your Comment</p>
                                <div className='form-input'>
                                    <label style={{marginBottom: 0, marginRight: '5px', paddingTop: '5px'}}>Comment: </label>
                                    <input 
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
            <span style={{paddingBottom: '10px'}}>By: {review.user}</span><br />
            {user.name === review.user ? <Button variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C', marginRight: 0, display: 'flex', marginTop: '10px'}]}
            onClick= {() => handleDelete(review.id)}>Delete</Button> : null}
            </Box>
            <br />
        </div>
    )
}

export default Review