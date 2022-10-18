import * as React from 'react'
import { Button, Col, Form, Row, Space, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';


export const UploadQnaForm = (props : {uploadQnaFormProps : UploadQnaFormProps}) => {
    const {uploadQnaFormProps} = props;
    const [form] = Form.useForm();

    const onFinish = (fileList: any) => {
        uploadQnaFormProps.onUploadQnaSubmit()
        uploadQna(fileList)
    };

    const uploadQna = (fileList : any) => {
        const url = "/microsite/faq/upload-qna/"
        httpInstance.post(url, {
            
        })
            .then(response => {
                
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <>

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                onFinish={onFinish}
                encType="multipart/form-data"
                >
                <Form.Item
                    valuePropName="fileList"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Upload name='file' accept='.xlsx' maxCount={1}>
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

  