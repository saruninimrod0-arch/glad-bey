import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Mycarousel = () => {
  // Inline style for consistent image sizing
  const slideImageStyle = {
    height: '70vh', // Sets height to 70% of the screen height
    objectFit: 'cover', // Prevents stretching
    filter: 'brightness(70%)' // Slightly darkens image to make text pop
  };

  return (
    <div className="container-fluid p-0"> {/* container-fluid p-0 makes it go edge-to-edge */}
      <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
        
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/advert5.jfif" className="d-block w-100" alt="Slide 1" style={slideImageStyle} />
            <div className="carousel-caption d-none d-md-block mb-5">
              <h1 className="display-3 fw-bold">Explore on Our products</h1>
              <p className="fs-4">Experience the quality of Glad-Bey.</p>
              
            </div>
          </div>

          <div className="carousel-item">
            <img src="images/advert2.jfif" className="d-block w-100" alt="Slide 2" style={slideImageStyle} />
            <div className="carousel-caption d-none d-md-block mb-5">
              <h1 className="display-3 fw-bold">Your happiness our wish</h1>
              <p className="fs-4">Tailored solutions for your needs.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img src="images/advert3.jfif" className="d-block w-100" alt="Slide 3" style={slideImageStyle} />
            <div className="carousel-caption d-none d-md-block mb-5">
              <h1 className="display-3 fw-bold">The Products with the best brands</h1>
              <p className="fs-4">Join our us today append every day.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </div>
  )
}

export default Mycarousel
