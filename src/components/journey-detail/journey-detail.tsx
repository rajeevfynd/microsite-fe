import { Image, Row, Col, Progress, Card } from 'antd'
import * as React from 'react'
import { PatchCheckFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import { JourneyDetailPropsType } from '../../models/journey-details'
import { DEFAULT_LND_THUMBNAIL } from '../../constants/string-constants'
import { formatBase64 } from '../../utility/image-utils'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Flow } from '../../models/enums/flow'

export const JourneyDetail = (props: JourneyDetailPropsType) => {

  return (
    <>
        <div className='details'>
            <Row>
                <Col span={7} style={{height:240}}>
                    <Image
                        src={formatBase64(props.details.thumbnail)}
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
        <div style={{padding:'30px 100px'}}>
            {props.details.programs.map( item => {
                return <Card>
                            <Row>
                                <Col span={20}>
                                    <p>
                                        {item.program.title}
                                        <span className='certified'>{item.status == 'COMPLETED' && <PatchCheckFill color='green'/> }</span>
                                    </p>
                                    <p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width:'90%', height:'20px'}}>
                                        {item.program.description}
                                    </p>
                                    <p>{ ( props.details.flow == Flow.NON_SEQUENCE || (props.details.flow == Flow.SEQUENCE && item.isActive) ) && 
                                            <Link className='link' to={'/lnd/programs/'+item.program.id}><ArrowRightOutlined/> Go to Program </Link>
                                    }</p>

                                </Col>
                                <Col span={4}>
                                <Image
                                    width={'80%'}
                                    height={100}
                                    alt="logo"
                                    src={formatBase64(item.program.thumbnail)}
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
