import * as React from 'react'
import { Button, Col, Form, Row, Space, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';


export const UploadQnaForm = (props : {uploadQnaFormProps : UploadQnaFormProps}) => {
    const {uploadQnaFormProps} = props;
    const [form] = Form.useForm();
    const [file, setFile] = React.useState();

    const onFinish = (fileList: any) => {
        uploadQnaFormProps.onUploadQnaSubmit()
        handleUpload()
    };

    const handleBeforeUpload = (file: any, fileList: any) => {
        setFile(file)
    }


    const handleUpload = () => {
        const formData = new FormData()
        formData.append('file', file);
        const url = "/microsite/faq/upload-qna/"
        fetch(url, {
          method: 'POST',
          body: formData,
          headers: {
            authorization: 'authorization-text',
        },
        })
          .then(res => res.json())
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

  