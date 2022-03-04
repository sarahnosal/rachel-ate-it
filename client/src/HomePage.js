
import React, { useEffect, useState } from 'react'
import { Route} from 'react-router-dom'
import Carousel from './Carousel'
import About from './About'
import MadeIt from './MadeIt'
import AteIt from './AteIt'
import BakedGoodPage from './BakedGoodPage'
import BlogPage from './BlogPage'
import Account from './Account'

function HomePage({user}) {
    const [blogs, setBlogs] = useState([])
    const [bakedGoods, setBakedGoods] = useState([])
    const [allUsers, setAllUsers] = useState([])


    
    useEffect(() => {
        fetch('/users')
        .then(r => r.json())
        .then(data =>
            setAllUsers(data))
    },[])

    console.log(allUsers)

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
            <Route exact path='/home'>
                <p className='blurb'>Weclome to Rachel Ate It! Here you can explore the various baked goods that Rachel has made as well as the highlights of all the delicious dishes she's eaten. </p>
                <h2 id='food-title'>Rachel Made It!</h2>
                <div style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                    {bakedGoods.length > 0 ?
                    <Carousel images={bakedGoodImages} key={bakedGoods.id} show={4} infiniteLoop={true}/> : <p>Baked Goods Loading...</p>}                 
                </div>
                <h2 id='blog-title'>Rachel Ate It!</h2>
                <div style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}>
                    {blogs.length > 0 ?
                    <Carousel images={blogImages} key={blogs.id} show={4} infiniteLoop={true}/> : <p>Blogs Loading....</p>}
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
            <Route exact path='/account'>
                <Account user={user} /> 
            </Route>
            <Route exact path='/made-it/:id'>
                    <BakedGoodPage user={user} />
            </Route>
            <Route exact path='/ate-it/:id'>
                    <BlogPage user={user}/>
            </Route>

        </div>
    )
}

export default HomePage