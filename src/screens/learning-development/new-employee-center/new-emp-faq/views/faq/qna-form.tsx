import * as React from 'react'
import { Button, Form, Input } from 'antd';
import { QnaType } from '../../../../../../models/faq-qna-details';



export const QnaForm = (props: {editQnaDetails:QnaType, activeCategoryName:string}) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };


    const onReset = () => {
        form.resetFields();
    };

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
                        value: props.activeCategoryName,
                    },
                    {
                        name: ['question'],
                        value: props.editQnaDetails.question,
                    },
                    {
                        name: ['answer'],
                        value: props.editQnaDetails.answer,
                    }
                ]}
            >   
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please input the Category!' }]}
                >
                    <Input type="textarea"/>
                </Form.Item>

                <Form.Item
                    name="question"
                    label="Question"
                    rules={[{ required: true, message: 'Please input the Question!' }]}
                >
                    <Input type="textarea"/>
                </Form.Item>
                <Form.Item
                    name="answer"
                    label="Answer"
                    rules={[{ required: true, message: 'Please input the Answer!' }]}
                >
                    <Input type="textarea"/>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
