import { Carousel, Button, Space, Upload } from 'antd';
import * as React from 'react';
import './index.css'
import 'antd/dist/antd.css';


function HeroCarousel(){
  return(
  <><Carousel effect="fade" autoplay>
      <div>
        <img width={1000} height={300} alt="example" src="https://imah.org.hk/wp-content/uploads/2016/05/sunrise-beach-clipart-wallpaper-1-1000x300.jpg" />
      </div>
      <div>
        <img width={1000} height={300} alt="example" src="https://crocuscoaching.co.uk/wp/wp-content/uploads/2013/03/maldivian_sunset-wallpaper-1000x300.jpg" />
      </div>
      <div>
        <img width={1000} height={300} alt="example" src="https://contego.com/wp-content/uploads/2014/07/1000-X-300-PNG.png" />
      </div>
    </Carousel>
    <br></br>
    </>

  )
  };

export default HeroCarousel;