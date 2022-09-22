import * as React from 'react';
import Axios from 'axios';
import { Col, Row, Card, List, Divider, Button, Modal, Form, Input, Tag } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { TagStatus, Tagtype } from '../../../../constants/tag';
const { confirm } = Modal;



export const AddSkill = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [skillName, setSkillName] = React.useState("");
    const [skill, setSkill] = React.useState({});
    const [skillList, setSkillList] = React.useState([]);
    const [buttonStatus, setButtonStatus] = React.useState(true);



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

    function handleSkillChange(event: React.ChangeEvent<HTMLInputElement>) {
        const skillName = event.target.value;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(skillName)) {
            setSkillName(skillName);
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }





    const onFinish = (values: { skillName: string }) => {
        const { skillName } = values;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(skillName)) {
            setSkill({
                name: skillName,
                type: Tagtype.skill,
                status: TagStatus.active,
                addedBy: 1111
            });
            setButtonStatus(true);
            setIsModalOpen(false);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Skill Submission: ', errorInfo);
    };


    React.useEffect(() => {
        //Api -> getAllActiveSkillTags
        (() => {
            setIsLoading(true);
            const source = Axios.CancelToken.source();
            Axios.get(`http://localhost:8082/microsite/tag/?tagType=${Tagtype.skill}`, {
                cancelToken: source.token,
                headers: {},
                handlerEnabled: false
            })
                .then((response) => {

                    if (!!response.data.data.length && response.status === 200) {
                        setSkillList(response.data.data);
                        setIsLoading(false);
                    }
                    setIsLoading(false);
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




    React.useEffect(() => {
// Api-> createNewTag
        if (!Object.keys(skill).length) return;

        (() => {
            setIsLoading(true);

            const source = Axios.CancelToken.source();
            Axios.post(`http://localhost:8082/microsite/tag/`, skill, {
                cancelToken: source.token,
                headers: {},
                handlerEnabled: false,
            })
                .then((response) => {

                    if (!!Object.keys(response.data.data).length && response.status === 200) {
                        setSkillList(skillList => [...skillList, response.data.data]);
                        setIsLoading(false);
                        setSkill({});
                    }
                    setIsLoading(false);
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

    }, [skill])

    return (
        <>
            {isLoading ? "Loading" : <div style={{
                margin: "auto",
            }}>

                {skillList.map(data => <p key={data.id}>{data.name}</p>)}

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
                            <Input placeholder="Skill Name" value={skillName} onChange={(event) => handleSkillChange(event)} />
                        </Form.Item>

                        <Form.Item>
                            <Button disabled={buttonStatus} type="primary" htmlType="submit" block>
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






