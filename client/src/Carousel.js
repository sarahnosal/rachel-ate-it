import React, { useState, useEffect } from 'react'

function Carousel({images, show}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(images.length)

    const [touchPosition, setTouchPosition] = useState(null)

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
        const touchDown = touchPosition
    
        if(touchDown === null) {
            return
        }
    
        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch
    
        if (diff > 5) {
            next()
        }
    
        if (diff < -5) {
            prev()
        }
    
        setTouchPosition(null)
    }

    useEffect(() => {
        setLength(images.length)
    }, [images])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }
    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {
                currentIndex > 0 &&
                <button onClick={prev} className="left-arrow">
                    &lt;
                </button>
                }
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div 
                        className={`carousel-content show-${show}`}
                        style={{ padding: 8, transform: `translateX(-${currentIndex * (100 / show)}%)` }}>
                        {images.map((image) => (
                        <img style={{paddingLeft: 8}} src={image} alt='test' key={image.id}/>))}
                    </div>
                </div>
                {
                currentIndex < (length - show) &&
                <button onClick={next} className="right-arrow">
                    &gt;
                </button>
                }
            </div>
        </div>
    )
}
export default Carousel