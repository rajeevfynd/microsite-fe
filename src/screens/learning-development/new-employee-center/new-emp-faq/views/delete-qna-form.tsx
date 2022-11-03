import * as React from 'react'
import { Button, Checkbox, Col, Form, message, Row, Space } from 'antd';
import { DeleteFormPropsType} from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';
import { FAQ_DELETE_URL } from '../../../../../constants/urls';


export const DeleteQnaForm = (props: {deleteQnaFormProps :DeleteFormPropsType}) => {
    const {deleteQnaFormProps} = props;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        deleteQna(values);
        deleteQnaFormProps.onQnaDeleteOk();
    };

    const onReset = () => {
        form.resetFields();
    };


    const deleteQna = (values : any) => {
        const url = FAQ_DELETE_URL + deleteQnaFormProps.editQnaDetails.id
        httpInstance.put(url, {
            "categoryList" : values.category
        })
            .then(response => {
                deleteQnaFormProps.onQnaDeleteOk();
            })
            .catch((error) => {
                message.error(error);
            });
    }

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
                        name: ['category'],
                    },
                ]}
            >   
                <Form.Item
                    name="category"
                    label="Choose the categories"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Checkbox.Group>
                    <Row>

                        {deleteQnaFormProps.editQnaDetails.categoryList.map((categoryList) => (
                            <Col span={24}>
                                <Checkbox value={categoryList.id}>{categoryList.category}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                    </Checkbox.Group>
                </Form.Item>

                <Form.Item >
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Space>
                                <Button danger htmlType="submit">
                                    Delete
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

