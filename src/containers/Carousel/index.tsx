import React, { useState } from 'react';
import { mod } from 'mathjs';

import { imgs } from './constants';
import { CarouselProps } from './interfaces';
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
const Carousel = ({ NumSideImages = 1 }: CarouselProps) => {
    
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    let currentImageIndices = [currentImageIndex]
    for (let i = 0; i < NumSideImages; i++) {
        let previousIndex = mod(currentImageIndex + (i-1), imgs.length);
        let nextIndex = mod(currentImageIndex + (i+1), imgs.length);
        if (!currentImageIndices.includes(previousIndex)) {
            currentImageIndices.unshift(previousIndex)
        }
        if (!currentImageIndices.includes(nextIndex)) {
            currentImageIndices.push(nextIndex)
        }
    }
    console.log(currentImageIndex, currentImageIndices)

    return (
        <div className='carousel'>
            <div className='carousel-btn-div'>
                <button className='carousel-btn btn-prev' onClick={() => setCurrentImageIndex(mod(currentImageIndex-1, imgs.length))}>{'<'}</button>
            </div>
            {
                currentImageIndices.map((imageIndex) => (
                    <div className={`carousel-img-holder ${currentImageIndex === imageIndex ? "carousel-img-holder-main" : "carousel-img-holder-side"}`}>
                        {
                            imgs[imageIndex] && (
                                <img className="carousel-img" src={imgs[imageIndex]?.src} alt={imgs[imageIndex]?.altTxt || 'No alt text defined!'} />
                            )
                        }
                    </div>
                ))
            }
            
            <div className='carousel-btn-div'>
                <button className='carousel-btn btn-next' onClick={() => setCurrentImageIndex(mod(currentImageIndex+1, imgs.length))}>{'>'}</button>
            </div>
        </div>
    );
}

export default Carousel;