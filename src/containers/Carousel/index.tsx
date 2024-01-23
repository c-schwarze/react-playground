import React, { useState } from 'react';
import {mod} from 'mathjs';

import { imgs } from './constants';
import './styles.css';

/**
 * Carousel
 * 
 * TODOs
 *      - Add animation
 *      - Add styling
 *      - Add image props
 *      - Add tests
 * @returns 
 */
const Carousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const currentImage = imgs.find((_, index) => index === currentImageIndex)

    return (
        <div className='carousel'>
            <div className='carousel-btn-div'>
                <button className='carousel-btn btn-prev' onClick={() => setCurrentImageIndex(mod(currentImageIndex-1, imgs.length))}>{'<'}</button>
            </div>
            <div className='carousel-img-holder'>
                {
                    currentImage && (<img className="carousel-img" src={currentImage?.src} alt={currentImage?.altTxt || 'No alt text defined!'} />)
                }
            </div>
            <div className='carousel-btn-div'>
                <button className='carousel-btn btn-next' onClick={() => setCurrentImageIndex(mod(currentImageIndex+1, imgs.length))}>{'>'}</button>
            </div>
        </div>
    );
}

export default Carousel;