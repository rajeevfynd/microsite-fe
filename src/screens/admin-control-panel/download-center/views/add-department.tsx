import { Button, Modal, Input, Row, Col, Space, Form, message } from "antd";
import * as React from "react";
import { ADD_DEPARTMENT_DOWNLOAD_CENTER } from "../../../../constants/urls";
import httpInstance from "../../../../utility/http-client";

export const AddDepartment = (props : {onSubmit : any}) => {

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onReset = () => {
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleAddQnaClick = () => {
        setIsModalOpen(true);
    }

    const addDepartment = (values : any) => {
        const url = ADD_DEPARTMENT_DOWNLOAD_CENTER
        httpInstance.post(url, values)
            .then(response => {
                console.log("added")
                setIsModalOpen(false)
                props.onSubmit()
            })
            .catch((error) => {
                message.error(error);
            });
    }

    return (
        <>
        <Button type="primary" onClick={() => {handleAddQnaClick()}}>Add Department</Button>

        <Modal
            destroyOnClose={true}
            open={isModalOpen}
            title={"Add New Department"}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={addDepartment}
            >   

                <Form.Item
                    name="department"
                    label="Department Name"
                    rules={[{ required: true, message: 'Enter the document name' }]}
                >   
                    <Input/>
                </Form.Item>


                <Form.Item >
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Modal></>
      );

}