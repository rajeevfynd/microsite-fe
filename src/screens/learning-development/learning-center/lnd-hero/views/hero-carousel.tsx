import { Carousel } from 'antd';
import * as React from 'react';
import './index.css'
import 'antd/dist/antd.css';
import { getCarouselData } from '../../../../../service/program-service';
import httpInstance from '../../../../../utility/http-client';

type carouselFormtype = {
  positionValue?: number
  imageDocumentId?: string
  courseHyperlink?: string
}

function HeroCarousel( props: any) {

  const [carouselList,setList]= React.useState<carouselFormtype []>([{},{},{}])

  const fetchCarousel = React.useCallback(async () =>{
    let resp =await getCarouselData();
    const carouselData: carouselFormtype [] = resp.data
    for(var d of carouselData){
      let img_res = await httpInstance.get("/microsite/document/download/"+d.imageDocumentId);
      d.imageDocumentId = img_res.data.url
    }
    if(carouselData.length == 3){
      setList(carouselData)
    }
    else if (carouselData.length < 3){
      while(carouselData.length<3){
        carouselData.push({imageDocumentId:""})
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
            <img width={1600} height={300} alt="example" src={carouselList[0].imageDocumentId} />
          </div>
          <div>
            <img width={1600} height={300} alt="example" src={carouselList[1].imageDocumentId} />
          </div>
          <div>
            <img width={1600} height={300} alt="example" src={carouselList[2].imageDocumentId} />
          </div>
        </Carousel>
        
      </span>
      <br></br>
    </>

  )
};

export default HeroCarousel;