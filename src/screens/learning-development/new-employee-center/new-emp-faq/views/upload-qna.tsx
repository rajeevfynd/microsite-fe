import * as React from 'react'
import { Button, Col, Form, message, Row, Space, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';
import axios from 'axios';
import { FAQ_BULK_UPLOAD_URL } from '../../../../../constants/urls';
import { SAMPLE_FAQ_UPLOAD_URL } from '../../../../../constants/string-constants';


export const UploadQnaForm = (props : {uploadQnaFormProps : UploadQnaFormProps}) => {
    const {uploadQnaFormProps} = props;
    const [form] = Form.useForm();
    const [file, setFile] = React.useState();

    const onFinish = (fileList: any) => {
        handleUpload()
    };

    const handleBeforeUpload = (file: any, fileList: any) => {
        setFile(file)
        return false
    }

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append('file', file);
        const url = FAQ_BULK_UPLOAD_URL
        await axios.post(url, formData)
          .then((response) => {
            uploadQnaFormProps.onUploadQnaSubmit()
            message.info("File Uploaded Successfully")
            })
          .catch((e) => {
            message.error("File not uploaded due to " + e.response.data.data.message)
            uploadQnaFormProps.onUploadQnaSubmit()
          })
    };
      

    
    return (
        <>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                onFinish={onFinish}
                >
                <Form.Item
                    valuePropName="fileList"
                    rules={[{ required: true, message: 'Please select the file!' }]}
                >
                    <Upload name='file' accept='.xlsx' maxCount={1} beforeUpload={handleBeforeUpload}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <p>
                    <a href={SAMPLE_FAQ_UPLOAD_URL}>Sample Upload File</a>
                </p>
                <Form.Item >
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}

  