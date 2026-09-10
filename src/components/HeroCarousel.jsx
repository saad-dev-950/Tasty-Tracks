import React from 'react';

const HeroCarousel = () => {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src="/Assets/Images/hero3.webp" className="d-block w-100" alt="hero 3" />
            </div>
            <div className="carousel-item">
                <img src="/Assets/Images/hero2.webp" className="d-block w-100" alt="hero 2" />
            </div>
            <div className="carousel-item">
                <img src="/Assets/Images/hero4.webp" className="d-block w-100" alt="hero 4" />
            </div>
            <div className="carousel-item">
                <img src="/Assets/Images/hero1.webp" className="d-block w-100" alt="hero 1" />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
  );
};

export default HeroCarousel;
