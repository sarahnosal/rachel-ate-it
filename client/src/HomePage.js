import React, { useEffect, useState } from 'react'
import { Route} from 'react-router-dom'
import Carousel from './Carousel'
import About from './About'
import MadeIt from './MadeIt'
import Favorites from './Favorites'
import Typography from '@mui/material/Typography';
import AteIt from './AteIt'
import Box from '@mui/material/Box';


function HomePage({user}) {
    const [blogs, setBlogs] = useState([])
    const [bakedGoods, setBakedGoods] = useState([])
    


    useEffect(() => {
        fetch('/blogs')
        .then(r => r.json())
        .then(data => {
            setBlogs(data)
        })
    },[])

    useEffect(() => {
        fetch('/baked_goods')
        .then(r => r.json())
        .then(data => {
            setBakedGoods(data)
        })
    },[])

    let blogImages = blogs.map(blog => blog.image)
    let bakedGoodImages = bakedGoods.map(bakedGood => bakedGood.image)
  
    let favorites = []

    return (
        <div >
            <Route exact path='/home'>
                <h2 id='food-title'>Rachel Made It!</h2>
                <div style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                    {blogs.length > 0 ?
                    <Carousel images={bakedGoodImages} key={bakedGoods.id} show={4}/> : <p>Baked Goods Loading....</p>}
                </div>
                <h2 id='blog-title'>Rachel Ate It!</h2>
                <div style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                    {blogs.length > 0 ?
                    <Carousel images={blogImages} key={blogs.id} show={4}/> : <p>Blogs Loading....</p>}
                </div>

            </Route>
            <Route exact path='/made-it'>
                <MadeIt bakedGoods={bakedGoods} />
            </Route>
            <Route exact path='/ate-it'>
                <AteIt blogs={blogs} />
            </Route>
            <Route exact path='/about'>
                <About />
            </Route>
            <Route exact path='/favorites'>
                {favorites.length > 0 ? 
                <Favorites /> : 
                <Box sx={{textAlign: "center", mt: "20px"}}>
                    <Typography sx={{mb: "5px"}} component="h1" variant="h3">Hello {user.name} </Typography>
                    <Typography component="h2" variant="h5">You have no favorites saved</Typography>
                </Box>}
            </Route>

        </div>
    )
}

export default HomePage