import React from 'react'
import Box from '@mui/material/Box';

function Comment({comment}) {
    console.log(comment.comment)
    return (
        <div>
            <Box sx={{fontFamily: 'Alex Brush', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Comment: {comment.comment}</span><br />
            <span>By: {comment.user}</span>
                                
            </Box>
            <br />
        </div>
    )
}

export default Comment