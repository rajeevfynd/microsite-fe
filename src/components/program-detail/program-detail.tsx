import { Image, Row, Col, Progress, List, Modal, Button } from 'antd'
import * as React from 'react'
import { ArrowRight, Clock, PatchCheckFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { ProgramDetailPropsType } from '../../models/journey-details'
import { CourseDetails } from '../course-detail/course-details'

export const ProgramDetail = (props: ProgramDetailPropsType) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});
    const handleCourseDetailsClick = (course: any) => {
        setCourseDetails(course.course);
        setIsModalOpen(true);
    }

  return (
    <>
        <Modal
            title="Course Details"
            visible={isModalOpen}
            footer={null}
            onCancel={()=>{setIsModalOpen(false)}}
            width={1000}
            style={{ top: 100 }}>
        <CourseDetails course={courseDetails} />
      </Modal>
        <div className='details'>
            <Row>
            <Col span={7} style={{height:240}}>
                    <Image
                        src={`data:image/png;base64,${props.details.thumbnailLink}`}
                        height={"100%"}
                        width={'80%'}
                        preview={false}
                    />
                </Col>
                <Col span={15}>
                    <div>
                    <h5>{props.details.title}</h5>
                    <p>{props.details.description}</p>
                    </div>
                    <Progress type="line" percent={props.details.progress}></Progress>
                </Col>
              </Row>
        </div>
        <div style={{padding:'0 50px'}}>
            <List
                itemLayout="horizontal"
                dataSource={props.details.courses}
                renderItem={item => (
                    
                    <List.Item
                        extra={
                            <div style={{height:100, width:150}}>
                            <img
                                width={'80%'}
                                height={'100%'}
                                alt="logo"
                                src={item.course.thumbnail}
                            /></div>}
                    >
                        <List.Item.Meta
                            title= {
                                <div>
                                    {item.course.title}
                                    <span className='certified'>{item.status == 'COMPLETED' && <PatchCheckFill color='green'/> }</span>
                                </div>
                            }
                            description={
                                <>
                                    <p style={{width : "90%"}}>
                                        {item.course.description}
                                    </p>
                                    <p><Clock /> {item.course.duration} mins</p>
                                    <p>
                                        {props.details.flow == 'NON_SEQUENCE' && <>
                                            <Button type='link' onClick={()  => handleCourseDetailsClick(item.course) }><ArrowRight/> View Details </Button>
                                        </>}
                                        {props.details.flow == 'SEQUENCE' && <>
                                            {item.isActive && <Button type='link' onClick={()  => handleCourseDetailsClick(item) }><ArrowRight/> View Details </Button>}
                                        </>}
                                        
                                    </p>
                                </>
                                
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    </>
  )
}
