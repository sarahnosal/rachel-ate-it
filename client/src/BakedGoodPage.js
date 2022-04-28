import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Box from '@mui/material/Box';
import Modal from './Modal'
import Review from './Review'
import Button from '@mui/material/Button';


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

    function handleUpdate(updatedReview){
        setReviews((reviews) => 
            reviews.map((review) => {
                return review.id === updatedReview.id ? updatedReview : review
            }))
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
                    setReviews([data,...reviews])
                    closeModal()
                })
            } else {
                r.json().then((err) => {
                    setErrors(err.errors)
                })
            }
        })
    }

    if (reviews != null) {
        
        return (
            <div >
                <h2 id='bg-title'>{bakedGood.name}</h2><hr />
                <div className='bg-page' >
                    <img id='bg-image' src={bakedGood.image} alt={bakedGood.name} />
                    <div>
                        <span id='bg-price'>Price: ${bakedGood.price}</span>&nbsp;&nbsp;&nbsp;
                        <Button variant='contained'sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C'}]}>Add to Cart</Button><br />< br/>
                        <p id='bg-description'>Description: {bakedGood.description}</p><br />
                        <Button variant='contained' sx={[{
                            '&:hover': {
                                backgroundColor: '#F0BEC8', border: 1, borderColor: '#DD798C'
                            },
                        }, {fontWeight: 'bold', fontFamily: 'Cormorant SC', color: '#1D6947', background: '#DD798C'}]}
                        onClick={() => user?setIsOpen(!isOpen):alert("You must be logged in to leave a review")}>Create Review</Button><br /><br />
                        <Box id='bg-reviews'>
                            Reviews: 
                            {
                                reviews.map((review) => (
                                    <Review  
                                            review={review} errors={errors}
                                            setReviews={setReviews} 
                                            user={user}
                                            comment={comment} setComment={setComment}
                                            onUpdate={handleUpdate}
                                           />))
                                }
                        </Box>
                        <Modal open={isOpen}>
                            {errors.map((e)=> <p key={e}>{e}</p>)}
                            <form className='review-form' onSubmit={onSubmit}>
                                <p style={{marginTop: 0, fontWeight: 'bold'}}>Leave a review!</p>
                                <div className='form-input'>
                                    <label className='score-input'style={{textAlign: 'center', marginRight: '5px'}}>Score: </label>
                                    <input
                                        style={{marginRight: '5px'}}
                                        type='integer'
                                        value={score}
                                        onChange={(event) => setScore(event.target.value)}
                                    />
                                    <label style={{marginBottom: 0, marginRight: '5px'}}>Comment:</label>
                                    <textarea
                                        type='textarea'
                                        value={comment}
                                        onChange={(event) => setComment(event.target.value)}
                                    />
                                </div>
                                <div className='form-buttons'>
                                    <Button sx={[{
                                                    '&:hover': {backgroundColor: '#F0BEC8', 
                                                    border: 1, 
                                                    borderColor: '#DD798C'},
                                                    }, 
                                                    {fontWeight: 'bold', 
                                                    fontFamily: 'Cormorant SC', 
                                                    color: '#1D6947', 
                                                    background: '#DD798C'}]}
                                        type="submit" >Submit</Button>&nbsp;&nbsp;
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

export default BakedGoodPage