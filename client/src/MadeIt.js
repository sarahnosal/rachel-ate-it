import React from 'react'
import Box from '@mui/material/Box';


function MadeIt({bakedGoods}){

    return (
        <div className='made-it'>
            <h2 id='food-title'>Rachel Made It</h2>
            <ul className='bakedgoods-list'>
                {bakedGoods.map((bakedGood) => (
                   <Box sx={{display: 'inline-flex', alignItems: 'center', padding: '20px'}} className='foodItem'>
                        <img className='foodImage' src={bakedGood.image} alt={bakedGood.name}/><br />
                        <Box sx={{display: 'block', maxWidth: '600px', padding: '25px'}}className='desc'>
                            <span className='foodName'>{bakedGood.name}</span><hr id='hr'/>
                            <span className='foodPrice'>It's yours for: ${bakedGood.price}</span><br /><br />
                            <span className='foodDescription'>Description: {bakedGood.description}</span><br />
                        </Box>
                   </Box> 
                ))}
            </ul>
            
        </div>
    )
}

export default MadeIt