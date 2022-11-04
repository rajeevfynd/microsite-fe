import { Image, Row, Col, Progress, List } from 'antd'
import * as React from 'react'
import { ArrowRight, Clock, PatchCheckFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { ProgramDetailPropsType } from '../../models/journey-details'

export const ProgramDetail = (props: ProgramDetailPropsType) => {

  return (
    <>
        <div className='details'>
            <Row>
                <Col span={7}>
                    <Image
                        src={`data:image/png;base64,${props.details.thumbnailLink}`}
                        width={400}
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
        <div className='programs-list'>
            <List
                itemLayout="horizontal"
                dataSource={props.details.courses}
                renderItem={item => (
                    
                    <List.Item
                        extra={
                            <img
                                width={136}
                                alt="logo"
                                src={`data:image/png;base64,${item.course.thumbnailLink}`}
                            />}
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
                                            <Link className='link' to={'/lnd/courses/'+item.course.id}><ArrowRight/> Go to course </Link>
                                        </>}
                                        {props.details.flow == 'SEQUENCE' && <>
                                            {item.isActive && <Link className='link' to={'/lnd/courses/'+item.course.id}><ArrowRight/> Go to course </Link>}
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
