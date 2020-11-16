import React from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBRow, MDBTestimonial} from 'mdbreact';
import styled from 'styled-components'

//images
import marque1 from '../assets/marques/kumho.png'
import marque2 from '../assets/marques/michelin.png'
import marque3 from '../assets/marques/iris.png'
import marque4 from '../assets/marques/lassa.png'
import marque5 from '../assets/marques/nokian.png'
import marque6 from '../assets/marques/petlas.png'
import marque7 from '../assets/marques/pirelli.png'
import marque8 from '../assets/marques/riken.png'
import marque9 from '../assets/marques/goodyear.png'
import marque10 from '../assets/marques/hankook.png'
import marque11 from '../assets/marques/hifly.png'
import marque12 from '../assets/marques/giti.png'
import marque13 from '../assets/marques/continental.png'
import marque14 from '../assets/marques/cooper.png'
import marque15 from '../assets/marques/bridgestone.png'
import marque16 from '../assets/marques/bfgoodrich.png'
import marque17 from '../assets/marques/barum.png'
import marque18 from '../assets/marques/Apollo.png'
import marque19 from '../assets/marques/achilles.png'
import marque20 from '../assets/marques/Boto.png'



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