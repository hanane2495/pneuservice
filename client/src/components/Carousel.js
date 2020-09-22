import React, { useEffect, useState} from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBTestimonial} from 'mdbreact';
import styled from 'styled-components'

//images
import marque1 from '../assets/marques/LOGO PNEU-01.png'
import marque2 from '../assets/marques/LOGO PNEU-02.png'
import marque3 from '../assets/marques/LOGO PNEU-03.png'
import marque4 from '../assets/marques/LOGO PNEU-04.png'
import marque5 from '../assets/marques/LOGO PNEU-05.png'
import marque6 from '../assets/marques/LOGO PNEU-06.png'
import marque7 from '../assets/marques/LOGO PNEU-07.png'
import marque8 from '../assets/marques/LOGO PNEU-08.png'
import marque9 from '../assets/marques/LOGO PNEU-09.png'
import marque10 from '../assets/marques/LOGO PNEU-10.png'
import marque11 from '../assets/marques/LOGO PNEU-11.png'
import marque12 from '../assets/marques/LOGO PNEU-12.png'
import marque13 from '../assets/marques/LOGO PNEU-13.png'
import marque14 from '../assets/marques/LOGO PNEU-14.png'
import marque15 from '../assets/marques/LOGO PNEU-15.png'
import marque16 from '../assets/marques/LOGO PNEU-16.png'
import marque17 from '../assets/marques/LOGO PNEU-17.png'
import marque18 from '../assets/marques/LOGO PNEU-18.png'
import marque19 from '../assets/marques/LOGO PNEU-19.png'
import marque20 from '../assets/marques/LOGO PNEU-20.png'



const Styles = styled.div`

.Carousel-row{
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    width:100%;
}
.image-container{
    width:15%;
    height:100%;
    margin: 0 2%;
}
`;

const Product_Carousel = (props) => {
    return (
        <Styles>
            <MDBCarouselInner>
            <MDBCarousel activeItem={1} length={4} slide={true} showControls={true} multiItem testimonial>
              
                <MDBCarouselItem itemId="1">
                    <div className='Carousel-row'>
                        <div className='image-container'>
                            <img
                            src={marque1}
                            width='150'
                            height='50'
                            />
                         </div> 
                         <div className='image-container'>
                         <img
                            src={marque2}
                            width='150'
                            height='50'
                            />
                         </div>  
                            
                            <div className='image-container'>
                            <img
                            src={marque3}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque4}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque5}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                        
                    </div>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                <div className='Carousel-row'>
                        <div className='image-container'>
                            <img
                            src={marque6}
                            width='150'
                            height='50'
                            />
                        </div>
                        <div className='image-container'>
                            <img
                            src={marque7}
                            width='150'
                            height='50'
                            />
                        </div>
                        <div className='image-container'>
                        <img
                            src={marque8}
                            width='150'
                            height='50'
                            />
                        </div>
                           
                        <div className='image-container'>
                        <img
                            src={marque9}
                            width='150'
                            height='50'
                            />
                        </div>
                        <div className='image-container'>
                        <img
                            src={marque10}
                            width='150'
                            height='50'
                            />
                        </div>
                    </div>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                <div className='Carousel-row'>
                        <div className='image-container'>
                            <img
                            src={marque11}
                            width='150'
                            height='50'
                            />
                            </div>
                            <div className='image-container'>
                            <img
                            src={marque12}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque13}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque14}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque15}
                            width='150'
                            height='50'
                            />
                            </div>
                    </div>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="4">
                <div className='Carousel-row'>
                        <div className='image-container'>
                            <img
                            src={marque16}
                            width='150'
                            height='50'
                            />
                            </div>
                            <div className='image-container'>
                                <img
                                    src={marque17}
                                    width='150'
                                    height='50'
                                />
                            </div>
                            <div className='image-container'>
                            <img
                            src={marque18}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque19}
                            width='150'
                            height='50'
                            />
                            </div>
                            
                            <div className='image-container'>
                            <img
                            src={marque20}
                            width='150'
                            height='50'
                            />
                            </div>  
                    </div>
                </MDBCarouselItem>
            
        </MDBCarousel>
        </MDBCarouselInner>
        </Styles>
      );
  }
  
  export default Product_Carousel;


  //props.content[0].image