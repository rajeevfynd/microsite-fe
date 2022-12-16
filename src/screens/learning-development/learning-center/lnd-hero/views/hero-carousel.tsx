import { Carousel, Image, Modal, Skeleton } from 'antd';
import * as React from 'react';
import './index.css'
import 'antd/dist/antd.css';
import { getCarouselCourse, getCarouselData, getCarouselImageData } from '../../../../../service/program-service';
import { carouselFormtype } from '../../../../../models/carousel-form-type';
import { CourseDetails } from '../../../../../components/course-detail/course-details';


function HeroCarousel(props: any) {

  const [carouselList, setList] = React.useState<carouselFormtype[]>([{}, {}, {}])
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [courseDetails, setCourseDetails] = React.useState({});


  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModel = () => {
    setIsModalOpen(false);
  };

  const handleCourseDetailsClick = (d: carouselFormtype) => {
    setCourseDetails(d.courseDetail);
    console.log(courseDetails)

    showModal();
  }

  const fetchCarousel = React.useCallback(async () => {
    let resp = await getCarouselData();
    const carouselData: carouselFormtype[] = resp.data
    for (var d of carouselData) {
      let img_res = await getCarouselImageData(d);
      d.imageDocumentId = img_res.data.url
      let carouselCourse = await getCarouselCourse(d)
      d.courseDetail = carouselCourse.data
      console.log(d)

    }
    if (carouselData.length == 3) {
      setList(carouselData)
    }
    else if (carouselData.length < 3) {
      while (carouselData.length < 3) {
        carouselData.push({ imageDocumentId: "" })
      }
      setList(carouselData)
    }
  }, [])

  if (props.props) {
    fetchCarousel
  }

  React.useEffect(() => {
    fetchCarousel()
  }, [props.props, fetchCarousel]);

  const CarouselImage = (props: any) => {
    return (
      <div>
        <a onClick={() => { handleCourseDetailsClick(props.item); }}><Image width="100%" height={300} src={props.item.imageDocumentId} preview={false} placeholder={
          <Skeleton.Input active block style={{ height: "300px" }} />
        } /></a>
      </div>
    )
  }

  return (
    <>
      <span>
        <Carousel effect="fade" autoplay>
          <CarouselImage item={carouselList[0]} />
          <CarouselImage item={carouselList[1]} />
          <CarouselImage item={carouselList[2]} />
        </Carousel>

      </span>
      <br></br>
      <Modal
        title="Course Details"
        visible={isModalOpen}
        footer={null}
        onCancel={closeModel}
        width={1000}
        style={{ top: 100 }}>
        <CourseDetails course={courseDetails} />
      </Modal>
    </>

  )
};

export default HeroCarousel;