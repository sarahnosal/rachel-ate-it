import React from 'react'
import Box from '@mui/material/Box';

function Account({user}){
    console.log(user.reviews)
    return(
        <div>
            <h2 className='user-name'>Hello {user.name}! Take a look at your account below! </h2>
            <div className='account-reviews'>
                <h3>Your Reviews:</h3>
                <ul className='user-reviews-list'>
                    {user.reviews.map((review) => (
                        <Box key={review.id} className='user-review'>
                        <img src={review.image} alt={review.baked_good} style={{maxWidth: '80px', height: 'auto'}}/>
                            <Box>
                                <span>{review.baked_good}</span><br />
                                <span>{review.score}</span><br />
                                <span>{review.comment}</span><br />
                            </Box>
                        </Box>
                    ))}
                </ul>
            </div>
            <div className='account-comments'>
                <h3>Your Comments</h3>
                <ul className='user-comments-list'>
                    {user.comments.map((comment) => (
                        <Box key={comment.id} className='user-comment'>
                        <img src={comment.image} alt={comment.blog} style={{maxWidth: '80px', height: 'auto'}}/>
                            <Box>
                                <span>{comment.blog}</span><br />
                                <span>{comment.comment}</span><br />
                            </Box>
                        </Box>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default Account