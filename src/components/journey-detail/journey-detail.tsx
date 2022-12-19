import { Image, Row, Col, Progress, List } from 'antd'
import * as React from 'react'
import { PatchCheckFill,  Clock, ArrowRight } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { JourneyDetailPropsType } from '../../models/journey-details'
import { DEFAULT_LND_THUMBNAIL } from '../../constants/string-constants'

export const JourneyDetail = (props: JourneyDetailPropsType) => {

  return (
    <>
        <div className='details'>
            <Row>
                <Col span={7} style={{height:240}}>
                    <Image
                        src={`data:image/png;base64,${props.details.thumbnailLink}`}
                        fallback={DEFAULT_LND_THUMBNAIL}
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
                dataSource={props.details.programs}
                renderItem={item => (

                    <List.Item
                        extra={
                            <div style={{height:100, width:150}}>
                            <Image
                                width={'80%'}
                                height={'100%'}
                                fallback={DEFAULT_LND_THUMBNAIL}
                                src={`data:image/png;base64,${item.program.thumbnailLink}`}
                                preview={false}
                            /></div>}
                    >
                        <List.Item.Meta
                            title= {
                                <div>
                                    {item.program.title}
                                    <span className='certified'>{item.status == 'COMPLETED' && <PatchCheckFill color='green'/> }</span>
                                </div>
                            }
                            description={
                                <>
                                    <p style={{width : "90%"}}>
                                        {item.program.description}
                                    </p>  
                                    <p>
                                        {props.details.flow == 'NON_SEQUENCE' && <>
                                            <Link className='link' to={'/lnd/programs/'+item.program.id}><ArrowRight/> Go to Program </Link>
                                        </>}
                                        {props.details.flow == 'SEQUENCE' && <>
                                            {item.isActive && <Link className='link' to={'/lnd/programs/'+item.program.id}><ArrowRight/> Go to Program </Link>}
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
