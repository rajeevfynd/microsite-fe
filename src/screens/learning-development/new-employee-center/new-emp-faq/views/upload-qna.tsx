import * as React from 'react'
import { Button, Col, Form, message, Row, Space, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';
import axios from 'axios';


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
        const url = "/microsite/faq/upload-qna/"
        await axios.post(url, formData)
          .then((response) => {
            uploadQnaFormProps.onUploadQnaSubmit()
            message.info("File Uploaded Successfully")
            })
          .catch((e) => (message.info(e)))
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

  