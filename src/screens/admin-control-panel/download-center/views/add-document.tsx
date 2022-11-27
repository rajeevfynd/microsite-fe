import { PlusCircleOutlined } from "@ant-design/icons/lib/icons";
import { Button, Col, Form, Input, message, Modal, Row, Select, Space } from "antd";
import * as React from "react";
import { Upload } from "../../../../components/upload.component";
import { ADD_DOWNLOAD_CENTER_DOCUMENT } from "../../../../constants/urls";
import { AddDocumentPropsType } from "../../../../models/download-center-type";
import { UploadOnDoneParams, UploadProps } from "../../../../models/upload-props";
import httpInstance from "../../../../utility/http-client";


export const AddDownloadDocument = (props: AddDocumentPropsType) => {
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
        const url = ADD_DOWNLOAD_CENTER_DOCUMENT
        console.log(values)
        httpInstance.post(url, values)
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
        <Button shape="round" onClick={() => {handleAddQnaClick()}}>Add Document</Button>

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
                    name="downloadCategoryId"
                    label="Download Category"
                    rules={[{ required: true, message: 'Please select the download category' }]}
                >   
                    <Select 
                        style={{ width: '100%' }}
                        placeholder="Select the Category"
                        defaultActiveFirstOption = {false}
                        options={props.downloadCategoryList}
                        >
                    </Select>
                </Form.Item>

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
                        mode="tags"
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