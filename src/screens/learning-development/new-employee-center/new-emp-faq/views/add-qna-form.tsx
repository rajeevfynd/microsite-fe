import * as React from 'react'
import { Button, Col, Form, Input, message, Row, Select, Space, Upload, UploadProps} from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import { AddQnaFormPropsType } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';
import { FAQ_ADD_QNA_URL, UPLOAD_IMG } from '../../../../../constants/urls';


const { Option } = Select;

interface uploadAttachmentType  {
    uid : string,
    documentId : number
}

export const AddQnaForm = (props: {addQnaFormProps : AddQnaFormPropsType}) => {
    const {addQnaFormProps} = props;
    const [form] = Form.useForm();
    const [fileList, setFileList] = React.useState<uploadAttachmentType[]>([])

    const onFinish = (values: any) => {
        addQna(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const children: React.ReactNode[] = [];
        addQnaFormProps.faqCategoryList.map((categoryOptions) => (
            children.push(<Option key={categoryOptions.id}>{categoryOptions.category}</Option>)
    ))

    const getDocumentIdList = () => {
        let idList: number[] = []
        fileList.map((file) => {
            idList.push(file.documentId)
        })
        return idList
    }

    const handleRemove = (file: any) => {
        let removeindex = -1;

        for (let i = 0; i < fileList.length; i++) {
            if(fileList[i].uid == file.uid)
                removeindex = i;
        }

        if (removeindex > -1)
            fileList.splice(removeindex, 1)
    }

        const addQna = (values : any) => {
            const url = FAQ_ADD_QNA_URL
            httpInstance.post(url, 
                {
                    categoryList : values.category,
                    question : values.question,
                    answer : values.answer,
                    attachments : getDocumentIdList()
            })
                .then(response => {
                    addQnaFormProps.onAddQnaSubmit();
                })
                .catch((error) => {
                    message.error(error);
                });
        }


        const prop: UploadProps = {
            name: 'file',
            action: UPLOAD_IMG,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    let attachment: uploadAttachmentType = {
                        uid : info.file.uid,
                        documentId : info.file.response.data.id
                    }
                    fileList.push(attachment)
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
                }
            },
        };


    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={onFinish}
            >   
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >   
                    <Select 
                        mode="tags" 
                        style={{ width: '100%' }}
                        placeholder="Select the Category"
                        tokenSeparators={[',']}
                        >
                        {children}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="question"
                    label="Question"
                    rules={[{ required: true, message: 'Please input the Question!' }]}
                >
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item
                    name="answer"
                    label="Answer"
                    rules={[{ required: true, message: 'Please input the Answer!' }]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item 
                    name="attachments"
                    label="Upload Attachments"
                >
                    <Upload  listType="picture-card" {...prop}
                    onRemove={handleRemove}
                    >
                        <div>
                            <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
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
        </>
    )
}