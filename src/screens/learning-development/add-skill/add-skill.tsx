import * as React from 'react';
import 'antd/dist/antd.css';
import { Col, Row, Card, List, Divider, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';




const AddSkill = () => {



    const jsonData = [

        {
            "id": "1",
            "skillGroup": "Communication",
            "skills": [
                { "id": "1", "name": "Email Writting" },
                { "id": "2", "name": "Body Language" },
                { "id": "2", "name": "Verbal Communication" }
            ]
        },
        {
            "id": "2",
            "skillGroup": "Selling Skills",
            "skills": [
                { "id": "1", "name": "Negotiation Skill" },
                { "id": "2", "name": "Sales Pitch Skill" }
            ]
        },
        {
            "id": "3",
            "skillGroup": "Emerging Communication",
            "skills": [
                { "id": "1", "name": "Machine Learning" },
                { "id": "2", "name": "Artificial Intelligence" }
            ]
        },
        {
            "id": 0,
            "addSkill": "Add Skill",
            "icon": "PlusCircleOutlined",
            "type": "Button"
        },
    ];

    const handleAddSkill = () => {
        console.log("add skill");
    }
    return (

        <div style={{
            margin: "auto",
            width: "50%",
            marginTop: 100
        }}>


            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={jsonData}

                renderItem={item => (

                    <List.Item>
                        {item.id != 0 ?


                            <Card bordered={true}
                                hoverable={true}
                                title={item.skillGroup}
                                style={{ textAlign: "center" }}
                            >

                                <p>{item.skills.map((Skill) => <p>{Skill.name}</p>)}</p>

                                {/* <Divider /> */}
                                <Button block>
                                    <Row justify="center" style={{ columnGap: 10 }}>
                                        <Col>
                                            <p>{"Add Course"}</p>
                                        </Col>
                                        <Col>
                                            <PlusCircleOutlined style={{ fontSize: 20 }} />
                                        </Col>
                                    </Row>
                                </Button>
                            </Card>
                            : <Card bordered={true}
                                hoverable={true}
                                onClick={() => handleAddSkill()}
                                style={{ height: 200 }}

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
                        }
                    </List.Item>
                )
                }
            />
        </div >
    )
}

export default AddSkill;