import * as React from 'react';
import { Col, Row, Card, List } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';



export const AddSkillCard = (props: any) => {
    const { handleShowModel } = props

    const [helperData, setHelperData] = React.useState([{
        id: 0,
        name: "Add Skill",
        status: "ACTIVE",
        type: "SKILL",
    }])




    const handleOnClick = () => {
        handleShowModel();
    }


    return (
        < List
            grid={{ gutter: 16, column: 2 }}
            dataSource={helperData}
            renderItem={item => (

                <List.Item>
                    <Card bordered={true}
                        hoverable={true}
                        onClick={() => handleOnClick()}
                        style={{ height: 150 }}

                    >
                        <Row justify='center' >
                            <Col>
                                <b>{"Add Skill"}</b>
                            </Col>
                        </Row>
                        <Row justify='center'>
                            <Col>
                                <PlusCircleOutlined style={{ fontSize: 50 }} />
                            </Col>
                        </Row>
                    </Card>
                </List.Item>
            )
            }
        />

    )
}