import { Carousel } from 'antd';
import * as React from 'react';
import './index.css'
import 'antd/dist/antd.css';
import httpInstance from '../../../../../utility/http-client';

type carouselFormtype = {
  positionValue?: number
  imageSourceDocument?: string
  courseHyperlink?: string
}

function HeroCarousel( props: any) {

  const [carouselList,setList]= React.useState<carouselFormtype []>([{},{},{}])

  const fetchCarousel = React.useCallback(async () =>{
    let resp =await httpInstance.get("/microsite/lnd/hero/carousel-data")
    const carouselData: carouselFormtype [] = resp.data
    console.log(resp.data)
    if(carouselData.length == 3){
      setList(carouselData)
    }
    else if (carouselData.length < 3){
      while(carouselData.length<3){
        carouselData.push({imageSourceDocument:""})
      }
      setList(carouselData)
    }
  },[])

  if(props.props){
    fetchCarousel
  }

  React.useEffect(()=>{
      fetchCarousel()
    },[props.props, fetchCarousel]);

  //const [updatedcarouselList,refetchCarousel] = React.useCallback(fetchCarousel, carouselList)


  return (
    <>
      <span>
        {/* <ModalCarousal></ModalCarousal> */}
        <Carousel effect="fade" autoplay>
          <div>
            <img width={1600} height={300} alt="example" src={carouselList[0].imageSourceDocument} />
          </div>
          <div>
            <img width={1600} height={300} alt="example" src={carouselList[1].imageSourceDocument} />
          </div>
          <div>
            <img width={1600} height={300} alt="example" src={carouselList[2].imageSourceDocument} />
          </div>
        </Carousel>
        
      </span>
      <br></br>
    </>

  )
};

export default HeroCarousel;