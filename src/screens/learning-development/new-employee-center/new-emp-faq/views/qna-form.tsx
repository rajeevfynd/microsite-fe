import * as React from 'react'
import { Button, Col, Form, Input, message, Row, Select, Space, Upload, UploadProps} from 'antd';
import { QnaFormPropsType } from '../../../../../models/faq-qna-details';
import { PlusOutlined, MinusOutlined} from '@ant-design/icons';
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
        console.log(values);
        updateQna(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value: Array<string>) => {
        console.log(`selected ${value}`);
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
            fileList.splice(removeindex)
    }

    const updateQna = (values : any) => {
        console.log(currentActiveCategory)
        const url = "/microsite/faq/edit-qna/" + editQnaId
        httpInstance.put(url, {
            "updatedCategoryList" : values.category,
            "qnaDetails" : {
                "id" : editQnaId,
                "question" : values.question,
                "answer" : values.answer,
                "files" : [],
            }
        })
            .then(response => {
                qnaFormProps.onQnaEditOk();
            })
            .catch((error) => {
                console.log(error);
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
        defaultFileList: [
            {
              uid: '1',
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              thumbUrl : 'data:image/png;base64,${qnaFormProps.editQnaDetails.attachmentDetails[0].thumbnailUrl}',
              url: 'http://www.google.com/',
            },
            {
              uid: '2',
              name: 'yyy.png',
              status: 'done',
              thumbUrl: "",
              url: 'http://www.google.com/',
            },
            {
              uid: '3',
              name: 'zzz.png',
              status: 'error',
              response: 'Server Error 500', // custom error message to show
              thumbUrl: "",
              url: 'http://www.google.com/',
            },
          ],
          showUploadList: {
            showDownloadIcon: false,
            // downloadIcon: 'Download',
            showRemoveIcon: true,
            removeIcon: <MinusOutlined onClick={e => console.log(e, 'custom removeIcon event')} />,
          },
    };


    React.useEffect(() => {
        console.log(qnaFormProps.editQnaDetails)
        handleActiveCategoryList()
        setEditQnaId(qnaFormProps.editQnaDetails.id)
        console.log(qnaFormProps.editQnaDetails)
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
                        onChange={handleChange}
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
