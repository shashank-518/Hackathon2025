import React, { useState, useEffect } from 'react';
import './Carousel.css';
import People from '../../../public/People.jpeg'
import Police from '../../../public/Police.jpeg'
import Fire from '../../../public/Fire.jpeg'

const images = [
   People,
   Police,
  Fire
];

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [randomImages, setRandomImages] = useState([]);
  
    useEffect(() => {
      const shuffled = [...images].sort(() => 0.5 - Math.random());
      setRandomImages(shuffled.slice(0, 3));
    }, []);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % randomImages.length);
      }, 3000); 
  
      return () => clearInterval(interval);
    }, [randomImages]);
  
    return (
      <div className="carousel-container">

        

        {randomImages.length > 0 && (
          <>
          <img
            src={randomImages[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="carousel-image"
          />
          <div className="carousel-text">
        <h1>TOGETHER FOR A SAFER TOMORROW</h1>
      </div>

          
          </>
        )}
      </div>
    );
  }
export default Carousel;
