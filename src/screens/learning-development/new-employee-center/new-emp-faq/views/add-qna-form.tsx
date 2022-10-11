import * as React from 'react'
import { Button, Form, Input, Select} from 'antd';
import { AddQnaFormPropsType } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';


const { Option } = Select;


export const AddQnaForm = (props: {addQnaFormProps : AddQnaFormPropsType}) => {
    const {addQnaFormProps} = props;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value: Array<string>) => {
        console.log(`selected ${value}`);
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
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Please select the Category"
                        onChange={handleChange}
                        >

                        {addQnaFormProps.faqCategoryList.map((categoryOptions) => (
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