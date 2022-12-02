import * as React from 'react';
import { Col, Row, Card, List } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';



export const AddRoleCard = (props: any) => {
    const { handleShowModel } = props

    const [helperData, setHelperData] = React.useState([{
        id: 0,
        name: "Add Role",
        isActive: true,
        type: Tagtype.role,
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
                                <b>{"Add Role"}</b>
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