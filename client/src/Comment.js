import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


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
            <Box sx={{fontFamily: 'Cormorant SC', border: 2, marginTop: '10px', padding: '10px', background: '#F0BEC8'}}>
            <span>Comment: {comment.comment}</span><br />
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