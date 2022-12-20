import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, message, Row, Space, Upload } from 'antd';
import * as React from 'react';
import { uploadBirthday } from '../../../../service/home-service';

export const Uploader = () => {
    const [form] = Form.useForm();
    const [file, setFile] = React.useState();
    const handleBeforeUpload = (file: any) => {
        setFile(file)
        return false
    }
    const onUploadFinish = async (values: any) => {
        const formData = new FormData()
        formData.append('file', file);
        const resp = await uploadBirthday(formData);
        console.log(resp);
        if (resp.data == true) {
            message.success("Created Birthdays")
            form.resetFields()
            setFile(null)
            //prop.fileList.pop()
        }
    }

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onUploadFinish}
        >
            <Form.Item>
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

    )
}