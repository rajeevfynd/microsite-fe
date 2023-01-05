import { Image, Row, Col, Progress, List, Modal, Button, Card } from 'antd'
import * as React from 'react'
import { PatchCheckFill } from 'react-bootstrap-icons'
import { DEFAULT_LND_THUMBNAIL } from '../../constants/string-constants'
import { ProgramDetailPropsType } from '../../models/journey-details'
import { formatBase64 } from '../../utility/image-utils'
import { CourseDetails } from '../course-detail/course-details'
import { Tagtype } from '../../constants/tag'
import "antd/dist/antd.css";
import { ClockCircleOutlined } from '@ant-design/icons'
import { Flow } from '../../models/enums/flow'

export const ProgramDetail = (props: ProgramDetailPropsType) => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});
    const [courseDisable, setCourseDisable] = React.useState(true)
    const handleCourseDetailsClick = (course: any, disable: boolean) => {
        setCourseDetails(course);
        setCourseDisable(disable);
        setIsModalOpen(true);
    }
    const renderTags = (tagType: string) =>{
        let tags = props.details.tags.filter(tag=>tag.type == tagType).map( tag => tag.name ).toString() 
        return tags.length > 0 ? <i>{tagType}(S) : <i>{tags}</i> </i> : <></>
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
        <CourseDetails course={courseDetails} disable={courseDisable}/>
      </Modal>
        <div className='details'>
            <Row>
            <Col span={7} style={{height:240}}>
                    <Image
                        src={formatBase64(props.details.thumbnail)}
                        height={"100%"}
                        width={'80%'}
                        preview={false}
                        fallback={DEFAULT_LND_THUMBNAIL}
                    />
                </Col>
                <Col span={16}>
                    <h5>{props.details.title}</h5>
                    <p>{props.details.description}</p>
                    <p>{renderTags(Tagtype.skill)}</p>
                    <p>{renderTags(Tagtype.role)}</p>
                    <Progress type="line" percent={props.details.progress}></Progress>
                </Col>
              </Row>
        </div>
        <div style={{padding:'30px 100px'}}>
            {props.details.courses.map( item => {
                return <Card>
                            <Row>
                                <Col span={20}>
                                    <p>
                                        {item.course.title}
                                        <span className='certified'>{item.status == 'COMPLETED' && <PatchCheckFill color='green'/> }</span>
                                    </p>
                                    <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>
                                        {item.course.description}
                                    </p>
                                    <p><ClockCircleOutlined /> {item.course.duration} mins</p>
                                    <p>
                                        <Button type='link' onClick={()  => handleCourseDetailsClick(item.course, !(props.details.flow == Flow.NON_SEQUENCE || (props.details.flow == Flow.SEQUENCE && item.isActive) )) }> View Details </Button>
                                    </p>

                                </Col>
                                <Col span={4}>
                                <Image
                                    width={'80%'}
                                    height={'100%'}
                                    alt="logo"
                                    src={formatBase64(item.course.thumbnail)}
                                    fallback={DEFAULT_LND_THUMBNAIL}
                                    preview={false}
                                />
                                </Col>
                            </Row>
                </Card>
            })}
        </div>
    </>
  )
}
