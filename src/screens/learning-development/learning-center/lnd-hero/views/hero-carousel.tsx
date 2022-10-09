import { Carousel, Button, Space, Upload } from 'antd';
import * as React from 'react';
import './index.css'
import 'antd/dist/antd.css';


function HeroCarousel(){
  return(
  <><Carousel effect="fade" autoplay>
      <div>
        <img width={1600} height={300} alt="example" src="https://cerncourier.com/wp-content/uploads/2019/07/CERN-Image-no-logo-1600x300.jpg" />
      </div>
      <div>
        <img width={1600} height={300} alt="example" src="https://www.nttftrg.com/sites/default/files/2020-06/3efdf7ee195976800343789a2d83e009.jpg" />
      </div>
      <div>
        <img width={1600} height={300} alt="example" src="https://cdn-glefd.nitrocdn.com/XfUXHZhWcHAddqPBcgFnKhSOmDoEGdQc/assets/static/optimized/rev-0efda0e/wp-content/uploads/2017/03/banner-mp-1600x300.jpg" />
      </div>
    </Carousel>
    <br></br>
    </>

  )
  };

export default HeroCarousel;