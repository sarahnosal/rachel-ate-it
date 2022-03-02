import React from 'react'
import Box from '@mui/material/Box';

function Review({review, setReviews, user}) {
    console.log(review)

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
    return (
        <div>
            <Box sx={{fontFamily: 'Alex Brush', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Score: {review.score}/5</span><br />
            <span>Comment: {review.comment}</span><br />
            <span>By: {review.user}</span>
            {user.name === review.user ? <button onClick= {() => handleDelete(review.id)}>Delete</button> : null}
                                
            </Box>
            <br />
        </div>
    )
}

export default Review