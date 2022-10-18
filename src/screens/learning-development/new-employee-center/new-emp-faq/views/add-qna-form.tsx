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
        addQna(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value: Array<string>) => {
        console.log(`selected ${value}`);
    };

    const children: React.ReactNode[] = [];
        addQnaFormProps.faqCategoryList.map((categoryOptions) => (
            children.push(<Option key={categoryOptions.id}>{categoryOptions.category}</Option>)
        ))


        const addQna = (values : any) => {
            console.log(values.category)
            const url = "/microsite/faq/add-qna/"
            httpInstance.post(url, 
                {
                    categoryList : values.category,
                    question : values.question,
                    answer : values.answer
            })
                .then(response => {
                    console.log("addQna called")
                    addQnaFormProps.onAddQnaSubmit();
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
                initialValues={{ modifier: 'public'}}
                onFinish={onFinish}
            >   
                <Form.Item
                    name="category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >   
                    <Select 
                        mode="tags" 
                        style={{ width: '100%' }}
                        placeholder="Select the Category"
                        onChange={handleChange} 
                        tokenSeparators={[',']}
                        >
                        {children}
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