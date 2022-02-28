import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from './Modal'
// import Button from '@mui/material/Button';


function BakedGoodPage({user}){
    const params= useParams()
    const [bakedGood, setBakedGood]= useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [score, setScore] = useState("")
    const [comment, setComment] = useState("")
    const [reviews, setReviews] = useState([])
    const [errors, setErrors] = useState([])
       
    useEffect(() => {
        fetch(`/baked_goods/${params.id}`)
        .then(r=>r.json())
        .then(data => {
            setBakedGood(data)
            setReviews(data.reviews)
        })
    }, [params])

    function closeModal() {
        setIsOpen(false)
        setScore("")
        setComment("")
    }

    function onSubmit(e){
        e.preventDefault()
        fetch('/reviews', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "review": {
                    baked_good_id: bakedGood.id,
                    user_id: user.id,
                    score: score,
                    comment: comment
                }
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setReviews([data, ...reviews])
                    closeModal()
                })
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                })
            }
        })
    }
    
    // const reviews = bakedGood.reviews

    if (reviews != null) {
        
        return (
            <div >
                <h2 id='bg-title'>{bakedGood.name}</h2><hr />
                <div style={{display: 'flex'}}>
                    <img id='bg-image' src={bakedGood.image} alt={bakedGood.name} />
                    <div>
                        <p id='bg-price'>Price: {bakedGood.price}</p><br />
                        <p id='bg-description'>Description: {bakedGood.description}</p><br />
                        <Box id='ig-reviews'>
                            Reviews: 
                            {
                                reviews.map((review) => (
                                    <p id="score">Score: {review.score}</p>
                                ))
                            }
                            {
                                reviews.map((review) => (
                                    <p id="comment">Comment: {review.comment}</p>
                                ))
                            }
                            {
                                reviews.map((review) => (
                                    <p id="user">User: </p>
                                ))
                            }
                            
                        </Box>
                        <Modal open={isOpen}>
                            {errors.map((e)=> <p key={e}>{e}</p>)}
                            <form onSubmit={onSubmit}>
                                <p>Leave a review!</p>
                                <label>Score: </label>
                                <input
                                    type='integer'
                                    value={score}
                                    onChange={(event) => setScore(event.target.value)}
                                />
                                <label>Comment:</label>
                                <textarea
                                    type='textarea'
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />
                                <button type="submit">Submit</button>
                            </form>
                            <button onClick={() => closeModal()}>Close</button>
                        </Modal>
                        <button onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a review")}>Create Review</button>
                    </div>
                    
                </div>
            </div>
        )
    } else return (
        <div></div>
    )
}

export default BakedGoodPage