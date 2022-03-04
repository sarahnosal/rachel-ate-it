import React, { useState, useEffect } from 'react'

function Carousel({images, show, infiniteLoop}) {
    const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0)
    const [length, setLength] = useState(images.length)

    const [touchPosition, setTouchPosition] = useState(null)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && images.length > show)
    const [transitionEnabled, setTransitionEnabled] = useState(true)

    useEffect(() => {
        setLength(images.length)
        setIsRepeating(infiniteLoop && images.length > show)
    }, [images, infiniteLoop, show])

    useEffect(() => {
        if (isRepeating) {
            if (currentIndex === show || currentIndex === length) {
                setTransitionEnabled(true)
            }
        }
    }, [currentIndex, isRepeating, show, length])


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
        if (isRepeating || currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }
    
    const prev = () => {
        if (isRepeating || currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    const handleTransitionEnd = () => {
        if (isRepeating) {
            if (currentIndex === 0) {
                setTransitionEnabled(false)
                setCurrentIndex(length)
            } else if (currentIndex === length + show) {
                setTransitionEnabled(false)
                setCurrentIndex(show)
            }
        }
    }

    const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(images[length - 1 - index])
        }
        output.reverse()
        return output.map((out) => <img src={out} alt={out} key={out.id}/>)
    }

    const renderExtraNext = () => {
        let output = []
        for ( let index = 0; index < show; index++) {
            output.push(images[index])
        }
        return output.map((out) => <img src={out} alt={out} key={out.id}/>)
    }

    return (
        <div className="carousel-container">
            <div className="carousel-wrapper">
                {
                (isRepeating || currentIndex > 0) &&
                <button onClick={prev} className="left-arrow">
                    &lt;
                </button>
                }
                <div className="carousel-content-wrapper" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                    <div 
                        className={`carousel-content show-${show}`}
                        style={{ padding: 8, transform: `translateX(-${currentIndex * (100 / show)}%)`, transition: !transitionEnabled ? 'none' : undefined }}
                        onTransitionEnd={() => handleTransitionEnd()}>
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {images.map((image) => <img style={{paddingLeft: 8}} src={image} alt='test' key={image.id}/>)}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                    </div>
                </div>
                {
                (isRepeating || currentIndex < (length - show)) &&
                <button onClick={next} className="right-arrow">
                    &gt;
                </button>
                }
            </div>
        </div>
    )
}
export default Carousel