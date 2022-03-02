import React from 'react'
import Box from '@mui/material/Box';

function Comment({comment, setComments, user}) {
    console.log(comment)

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
            <Box sx={{fontFamily: 'Alex Brush', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Comment: {comment.comment}</span><br />
            <span>By: {comment.user}</span>
            {user.name === comment.user ? <button onClick= {() => handleDelete(comment.id)}>Delete</button> : null}
            
            </Box>
            <br />
        </div>
    )
}

export default Comment