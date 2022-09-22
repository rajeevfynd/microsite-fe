import * as React from 'react';
import Axios from 'axios';
import { Col, Row, Card, List, Divider, Button, Modal, Form, Input, Tag } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { TagStatus, Tagtype } from '../../../../constants/tag';
const { confirm } = Modal;



const AddSkill = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const [newSkillGroup, setNewSkillGroup] = React.useState(true);
    const [selectSkillGroup, setSelectSkillGroup] = React.useState(true);
    const [skill, setSkill] = React.useState({
        name: "",
        type: Tagtype.skill,
        status: TagStatus.active,
        addedBy: 1111
    });


    const jsonData = [

        {
            "id": "1",
            "name": "Communication",
            "courses": [
                { "id": "1", "name": "Email Writting" },
                { "id": "2", "name": "Body Language" },
                { "id": "2", "name": "Verbal Communication" }
            ]
        },
        {
            "id": "2",
            "name": "Selling Skills",
            "courses": [
                { "id": "1", "name": "Negotiation Skill" },
                { "id": "2", "name": "Sales Pitch Skill" }
            ]
        },
        {
            "id": "3",
            "name": "Emerging Communication",
            "courses": [
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




    const showConfirm = (name: string, type: string) => {
        confirm({
            title: `Do you Want to delete this "${name}" ${type === "SKILL" ? "Skill" : "Course"}? `,
            icon: <ExclamationCircleOutlined />,
            // content: <p>{name}</p>,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    React.useEffect(() => {
        (() => {
            const source = Axios.CancelToken.source();
            Axios.post(`http://localhost:8082/microsite/tag/`, {
                cancelToken: source.token,
                headers: {},
                handlerEnabled: false
            })
                .then((response) => {

                    if (!!response.data.data.length && response.status === 200) {
                        // if (!!getFormattedDataForMenuItems(response.data.data).length) {
                        //     setSkillList(getFormattedDataForMenuItems(response.data.data));
                        // }
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    if (Axios.isCancel(error)) {
                    } else if (error.response) {
                        console.log(error.response.data.error);
                        window.alert(`${error.response.data.error.message}`);
                    } else {
                        console.log(error.message);
                        window.alert(`${error.message}`);
                    }
                });

            return () => {
                source.cancel("Cancelling in cleanup");
            };
        })();

    }, [])





    function handleSkillChange(event: React.ChangeEvent<HTMLInputElement>) {
        const skillName = event.target.value;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*$");

        if (reg.test(skillName)) {
            setSkill({
                name: skillName,
                type: skill.type,
                status: skill.status,
                addedBy: skill.addedBy
            });
        }
    }

    const onFinish = (values: { skillName: string }) => {
        const { skillName } = values;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*$");

        if (reg.test(skillName)) {
            console.log(skillName);

            setSkill({
                name: skillName,
                type: Tagtype.skill,
                status: TagStatus.active,
                addedBy: 1111
            });
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Skill Submission: ', errorInfo);
    };


    return (
        <>
            {isLoading ? "Loading" : <div style={{
                margin: "auto",
            }}>
                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={jsonData}
                    renderItem={item => (

                        <List.Item>
                            {item.id != 0 ?


                                <Card bordered={true}
                                    hoverable={true}
                                    style={{ textAlign: "center" }}

                                >
                                    <div><Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h5>{item.name}</h5></Col>
                                        <Col style={{ alignItems: "end" }}>
                                            <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.name, "SKILL")} />
                                        </Col>
                                    </Row>
                                    </div>
                                    <Divider />

                                    <div>{item.courses.map((Skill) => <Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h6>{Skill.name}</h6></Col>
                                        <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(Skill.name, "COURSE")} /></Col>
                                    </Row>)}
                                    </div>

                                    <Divider />
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
                                    onClick={() => showModal()}
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


                <Modal title="Add New Skill" visible={isModalOpen} footer={null} onCancel={handleCancel}>
                    {/* <Divider /> */}
                    <Form
                        layout={'vertical'}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}

                    >
                        <Form.Item
                            name="skillName"
                            // label="Create New Skill"
                            rules={[{ required: true, message: 'Please enter new skill!' }]}
                        >
                            <Input placeholder="Skill Name" value={skill.name} onChange={(event) => handleSkillChange(event)} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                </Modal>
            </div >}
        </>
    )
}

export default AddSkill;



