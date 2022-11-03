import * as React from 'react'
import { Button, Col, Form, Input, message, Row, Select, Space, Upload, UploadFile, UploadProps} from 'antd';
import { QnaFormPropsType } from '../../../../../models/faq-qna-details';
import { PlusOutlined, DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import httpInstance from '../../../../../utility/http-client';


const { Option } = Select;

interface uploadAttachmentType  {
    uid : string,
    documentId : number
}

export const QnaForm = (props: {qnaFormProps :QnaFormPropsType}) => {
    const {qnaFormProps} = props;
    const [form] = Form.useForm();
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);
    const [editQnaId, setEditQnaId] = React.useState(null);
    const [fileList, setFileList] = React.useState<uploadAttachmentType[]>([])

    const onFinish = (values: any) => {
        updateQna(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleActiveCategoryList = () => {
        let result = qnaFormProps.editQnaDetails.categoryList.map(a => a.id.toString());
        setcurrentActiveCategory(result)
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

    const getDocumentIdList = () => {
        let idList: number[] = []
        fileList.map((file) => {
            idList.push(file.documentId)
        })
        return idList
    }

    const getDefaultFileList = () : UploadFile[]=> {
        let defaultFileList : UploadFile[] = [];
        let qnaDetails = qnaFormProps.editQnaDetails
        qnaDetails.attachmentDetails.forEach((element: any) => {
            defaultFileList.push({
                "uid" : element.documentId ,
                "name" : "xyz.png",
                "status" : 'done',
                "thumbUrl" : `data:image/png;base64,${element.thumbnailUrl}`,
                "url" : ""
                })
        });
        return defaultFileList
    }

    const updateQna = (values : any) => {
        const url = "/microsite/faq/edit-qna/" + editQnaId
        httpInstance.put(url, {
            "updatedCategoryList" : values.category,
            "qnaDetails" : {
                id : editQnaId,
                question : values.question,
                answer : values.answer,
                attachments : getDocumentIdList(),
            }
        })
            .then(response => {
                qnaFormProps.onQnaEditOk();
            })
            .catch((error) => {
                message.error(error);
            });
    }


    const prop: UploadProps = {
        name: 'file',
        action: "/microsite/document/upload",
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
        defaultFileList: getDefaultFileList(),
        showUploadList: {
            showDownloadIcon: false,
            showRemoveIcon: true,
            removeIcon: <DeleteOutlined onClick={e => console.log(e)} />,
            previewIcon: <EyeOutlined  onClick={e => console.log(e, 'custom previewIcon event')} />
        },
    };


    const setInitialFileList = () => {
        qnaFormProps.editQnaDetails.attachmentDetails.forEach((file: any) => {
            fileList.push({
                uid : file.documentId,
                documentId : file.documentId
            })
        });
    }

    React.useEffect(() => {
        handleActiveCategoryList()
        setEditQnaId(qnaFormProps.editQnaDetails.id)
        setInitialFileList()
    }, [qnaFormProps.currentActiveCategory])

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={onFinish}
                fields={[
                    {
                        name: ['question'],
                        value: qnaFormProps.editQnaDetails.question,
                    },
                    {
                        name: ['answer'],
                        value: qnaFormProps.editQnaDetails.answer,
                    },
                    {
                        name: ['category'],
                        value: currentActiveCategory
                    }
                ]}
            >   
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select the Category"
                        >

                        {qnaFormProps.categoryList.map((categoryOptions) => (
                            <Option key={categoryOptions.id}>{categoryOptions.category}</Option>
                        ))}
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
                <Form.Item ></Form.Item>

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
