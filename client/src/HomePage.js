import React, { useEffect, useState } from 'react'
import { Route} from 'react-router-dom'
import Carousel from './Carousel'
import About from './About'


function HomePage() {
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

    return (
        <div >
            <Route exact path='/'>
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
            <Route exact path='/about'>
                <About />
            </Route>

        </div>
    )
}

export default HomePage