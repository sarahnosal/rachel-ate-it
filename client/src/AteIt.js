import React from 'react'
import Box from '@mui/material/Box';
import { Link} from 'react-router-dom'

function AteIt({blogs}) {

    return (
        <div className='ate-it'>
            <h2 id='food-title'>Rachel Ate It</h2>
            <ul className='blogs-list'>
                {blogs.map((blog) => (
                   <Box key={blog.id} sx={{display: 'inline-flex', alignItems: 'center', padding: '20px'}} className='blogItem'>
                        <img className='blogImage' src={blog.image} alt={blog.name}/><br />
                        <Box sx={{display: 'block', maxWidth: '600px', padding: '25px'}}className='desc'>
                            <span className='blogName'>{blog.name}</span><hr id='hr'/>
                            <span className='blogRestaurant'>Where'd I Get This? {blog.restaurant}</span><br /><br />
                            <span className='blogDescription'>Description: {blog.description}</span><br />
                            <Link className='comment-link' to={`/ate-it/${blog.id}`} >Read more about this!</Link>

                        </Box>
                   </Box> 
                ))}
            </ul>
            
        </div>
    )
}

export default AteIt