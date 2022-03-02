import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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
            <Box sx={{fontFamily: 'Cormorant SC', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span style={{marginBottom: '0px'}}>Score: {review.score}/5</span><br />
            <span style={{paddingBottom: '3px'}}>Comment: {review.comment}</span><br />
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