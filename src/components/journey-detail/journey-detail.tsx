import { Image, Row, Col, Progress, List } from 'antd'
import * as React from 'react'
import { PatchCheckFill, Clock } from 'react-bootstrap-icons'
import { JourneyDetailPropsType } from '../../models/journey-details'

export const JourneyDetail = (props: JourneyDetailPropsType) => {

  return (
    <>
        <div className='details'>
            <Row>
                <Col span={8}>
                    <Image
                        src={props.details.thumbnailLink}
                        width={400}
                        preview={false}
                    />
                </Col>
                <Col span={14}>
                    <div>
                    <h5>{props.details.title}</h5>
                    <p>{props.details.description}</p>
                    </div>
                    <Progress type="line" percent={props.details.progress}></Progress>
                </Col>
              </Row>
        </div>
        <div className='list-scrollable'>
            <List
                itemLayout="horizontal"
                dataSource={props.details.programs}
                renderItem={item => (
                    <List.Item
                        extra={
                            <img
                                width={136}
                                alt="logo"
                                src={item.program.thumbnailLink}
                            />}
                    >
                        <List.Item.Meta
                            title= {
                                <div>
                                    {props.details.flow == 'NON_SEQUENCE' && <>
                                        <a className="link" href={item.program.rruDeeplink} target="_blank">{item.program.title}</a>
                                    </>}
                                    {props.details.flow == 'SEQUENCE' && <>
                                        {item.isActive && <a className="link" href={item.program.rruDeeplink} target="_blank">{item.program.title}</a>}
                                        {!item.isActive && <span className='li-incomplete'>{item.program.title}</span>}
                                    </>}
                                    <span className='certified'>{item.status == 'COMPLETED' && <PatchCheckFill color='green'/> }</span>
                                </div>
                            }
                            description={
                                <>
                                    <div>
                                        {item.program.description}
                                    </div>  
                                    <div>
                                        <Clock/> {item.program.duration} hrs
                                    </div>
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
