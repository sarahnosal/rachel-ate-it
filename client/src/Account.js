import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link} from 'react-router-dom'

function Account({user}){

    const [reviews, setReviews] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch(`/reviews`)
        .then(r=> r.json())
        .then(data => setReviews(data))
    }, [])

    useEffect(() => {
        fetch(`/comments`)
        .then(r=> r.json())
        .then(data => setComments(data))
    }, [])

    let userReviews= reviews.filter((review) =>{
        return review.user_id === user.id
    })

    let userComments = comments.filter((comment) => {
        return comment.user_id === user.id
    })


    return(
        <div>
            <h2 className='user-name'>Hello {user.name}! Take a look at your account below! </h2>
            <div className='account-reviews'>
                <h3>Your Reviews:</h3>
                <Grid container rowSpacing={2} columnSpacing={3}className='user-reviews-list'>
                    {userReviews.map((review) => (
                        <Grid item>
                            <Link to={`/made-it/${review.baked_good_id}`} style={{textDecoration: 'none'}}>
                                <Box key={review.id} sx={{display: 'inline-flex', alignItems: 'center', padding: '10px', background:'#F0BEC8', width: '245px'}}className='user-review'>
                                <img src={review.image} alt={review.baked_good} style={{maxWidth: '80px', height: 'auto'}}/>
                                    <Box sx={{display: 'block', maxWidth: '600px', paddingLeft: '15px' }}>
                                        <span>{review.baked_good}</span><br />
                                        <span>Score: {review.score}</span><br />
                                        <span>Comment: {review.comment}</span><br />
                                    </Box>
                                </Box>
                            </Link>
                        &nbsp;&nbsp;&nbsp;
                        </Grid>
                    ))}
                </Grid>
            </div>
            <div className='account-comments'>
                <h3>Your Comments</h3>
                <Grid container rowSpacing={2} columnSpacing={3} className='user-comments-list'>
                    {userComments.map((comment) => (
                        <Grid item>
                            <Link to={`/ate-it/${comment.blog_id}`}style={{textDecoration: 'none'}}>
                                <Box key={comment.id} sx={{display: 'inline-flex', alignItems: 'center', padding: '10px', width: '245px', background:'#F0BEC8'}} className='user-comment'>
                                <img src={comment.image} alt={comment.blog} style={{maxWidth: '80px', height: 'auto'}}/>
                                    <Box sx={{display: 'block', maxWidth: '600px', paddingLeft: '15px'}}>
                                        <span>{comment.blog}</span><br />
                                        <span>Comment: {comment.bcomment}</span><br />
                                    </Box>
                                </Box>
                            </Link>
                        &nbsp;&nbsp;&nbsp;
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    )
}
export default Account