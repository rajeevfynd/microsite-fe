import * as React from 'react';
import { Col, Row, Card, List } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';



export const AddSkillCard = (props: any) => {
    const { handleShowModel } = props

    const [helperData, setHelperData] = React.useState([{
        id: 0,
        name: "Add Skill",
        isActive: true,
        type: Tagtype.skill,
    }])




    const handleOnClick = () => {
        handleShowModel();
    }


    return (
        < List
            grid={{ gutter: 16, column: 3 }}
            dataSource={helperData}
            renderItem={item => (

                <List.Item>
                    <Card bordered={true}
                        hoverable={true}
                        onClick={() => handleOnClick()}
                        style={{ height: 110 }}

                    >
                        <Row justify='center' >
                            <Col>
                                <b>{"Add Skill"}</b>
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col>
                                <PlusCircleOutlined style={{ fontSize: 30 }} />
                            </Col>
                        </Row>
                    </Card>
                </List.Item>
            )
            }
        />

    )
}