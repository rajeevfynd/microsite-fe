import * as React from 'react';
import 'antd/dist/antd.css';
import { Col, Row, Card, List, Divider, Button, Modal, Checkbox, Form, Input, Select } from 'antd';
import { PlusCircleOutlined, LockOutlined, UserOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;




const AddSkill = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(true);

    const [newSkillGroup, setNewSkillGroup] = React.useState(true);
    const [selectSkillGroup, setSelectSkillGroup] = React.useState(true);



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




    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };


    // const handleNewSkillGroupName = (event.target) => {
    //     console.log(event.target.value);
    // }

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


            <Modal visible={isModalOpen} footer={null} onCancel={handleCancel}>
                <Divider />
                <Form
                    layout={'vertical'}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="Create New Skill Group"
                        label="Create New Skill Group"
                        rules={[{ required: true, message: 'Please enter new skill group!' }]}
                    >
                        <Input placeholder="Skill Group Name" />
                    </Form.Item>

                    {/*  */}
                    <Form.Item name="Skill Group" label="Skill Group" rules={[{ required: true, message: 'Please select existing skill group!' }]}>
                        <Select
                            placeholder="Select An Existing Skill Group"
                        // onChange={onGenderChange}
                        >
                            <Option value="male">male</Option>
                            <Option value="female">female</Option>
                            <Option value="other">other</Option>
                        </Select>
                    </Form.Item>

                    {/*  */}
                    <Form.List
                        name="Skills"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(new Error('At least 2 skills'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label="Skill"
                                        name="Skill"
                                        required={true}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please enter skill's name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input placeholder="Skill Name" style={{ width: '90%' }} />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                style={{
                                                    margin: "0 8px",
                                                    fontSize: "24px",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}

                                    >
                                        Add Skill Field
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    {/*  */}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
                <Divider />
            </Modal>
        </div >
    )
}

export default AddSkill;