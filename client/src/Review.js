import React from 'react'
import Box from '@mui/material/Box';

function Review({review}) {
    console.log(review)
    return (
        <div>
            <Box sx={{fontFamily: 'Alex Brush', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Score: {review.score}/5</span><br />
            <span>Comment: {review.comment}</span><br />
            <span>By: {review.user}</span>
                                
            </Box>
            <br />
        </div>
    )
}

export default Review