import * as React from 'react';
import Axios from 'axios';
import { Col, Row, Card, List, Divider, Button, Modal, Form, Input, Tag } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined, MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { CardHelperData, TagStatus, Tagtype } from '../../../../constants/tag';
const { confirm } = Modal;



export const AddSkill = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [skillName, setSkillName] = React.useState("");
    const [skill, setSkill] = React.useState({});
    const [skillList, setSkillList] = React.useState([]);
    const [skillId, setSkillId] = React.useState(null);
    const [buttonStatus, setButtonStatus] = React.useState(true);



    const showConfirm = (skillId: number, skillName: string, skillType: string) => {
        confirm({
            title: `Do you Want to delete this "${skillName}" ${skillType === "SKILL" ? "Skill" : "Course"}? `,
            icon: <ExclamationCircleOutlined />,
            // content: <p>{name}</p>,
            onOk() {
                setSkillId(skillId);
            },
            onCancel() {
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

    }, [skillId])




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


    React.useEffect(() => {
        // Api-> deleteTag

        if (!skillId) return;

        (() => {
            setIsLoading(true);

            const source = Axios.CancelToken.source();
            Axios.delete(`http://localhost:8082/microsite/tag/?tagId=${skillId}`, {
                cancelToken: source.token,
                headers: {},
                handlerEnabled: false,
            })
                .then((response) => {
                    if (!!Object.keys(response.data.data).length && response.status === 200) {
                        setSkillId(null);
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

    }, [skillId])

    return (
        <>
            {isLoading ? "Loading" : <div style={{
                margin: "auto",
            }}>
                < List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={CardHelperData}
                    renderItem={item => (

                        <List.Item>
                            <Card bordered={true}
                                hoverable={true}
                                onClick={() => showModal()}
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


                <List
                    grid={{ gutter: 16, column: 2 }}
                    dataSource={skillList}
                    renderItem={item => (

                        <List.Item>
                            {item.id !== 0 ? <Card bordered={true}
                                hoverable={true}
                                style={{ textAlign: "center" }}

                            >
                                <div><Row style={{ justifyContent: "space-between" }}>
                                    <Col flex={1} ><h5>{item.name}</h5></Col>
                                    <Col style={{ alignItems: "end" }}>
                                        <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.id, item.name, Tagtype.skill)} />
                                    </Col>
                                </Row>
                                </div>
                                <Divider />

                                {/* Course List */}
                                {/* <div>{item.courses.map((course) => <Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h6>{course.name}</h6></Col>
                                        <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} /></Col>
                                    </Row>)}
                                    </div> */}

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
            </ div >}
        </>
    )
}






