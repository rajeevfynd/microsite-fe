import { Button, Col, Form, Input, message, Modal, Row, Select, Space } from "antd";
import * as React from "react";
import { Upload } from "../../../../components/upload.component";
import { GET_NEW_EMPLOYEE_DOWNLOADS } from "../../../../constants/urls";
import { AddDocumentPropsType } from "../../../../models/download-center-type";
import { UploadOnDoneParams, UploadProps } from "../../../../models/upload-props";
import { addDownloadDocument } from "../../../../service/download-center-service";


export const AddNewEmployeeDownloads = (props: AddDocumentPropsType) => {
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

    const addDocument = (values : any) => {
        addDownloadDocument(GET_NEW_EMPLOYEE_DOWNLOADS , values)
            .then(response => {
                console.log("added")
                setIsModalOpen(false)
                props.onFinish()
            })
            .catch((error) => {
                message.error(error);
            });
    }

    const prop: UploadProps = {
        onRemove(){
            form.setFieldValue("documentId", null)
        },
        onDone(info: UploadOnDoneParams){
            form.setFieldValue("documentId" , info.documentId)
        },
        file : ""
    };


    return (
        <>
        <Button type="primary" onClick={() => {handleAddQnaClick()}}>Add Document</Button>

        <Modal
            destroyOnClose={true}
            open={isModalOpen}
            title={"Add New Document"}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={addDocument}
                fields={[
                    {
                        name: ['department'],
                        value: [],
                    },
                ]}
            >   

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Enter the document name' }]}
                >   
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Enter the description' }]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    name="department"
                    label="Department"
                >   
                    <Select 
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select the Department(s)"
                        tokenSeparators={[',']}
                        options = {props.departmentOptionsList}
                        >
                    </Select>
                </Form.Item>

                <Form.Item 
                    name="documentId"
                    label="Document"
                    rules={[{ required: true, message: 'Choose a document!' }]}
                >
                    <Upload {...prop}></Upload>
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