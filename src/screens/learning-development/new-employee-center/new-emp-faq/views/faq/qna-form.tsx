import * as React from 'react'
import { Button, Form, Input, Select} from 'antd';
import { QnaFormPropsType } from '../../../../../../models/faq-qna-details';


const { Option } = Select;

const handleChange = (value: Array<string>) => {
    console.log(`selected ${value}`);
};


    export const QnaForm = (props: {qnaFormProps :QnaFormPropsType}) => {
    const {qnaFormProps} = props;
    const [form] = Form.useForm();
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value: Array<string>) => {
        console.log(`selected ${value}`);
    };

    React.useEffect(() => {
        setcurrentActiveCategory(qnaFormProps.currentActiveCategory)
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
                        name: ['category'],
                    },
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
                        value: [currentActiveCategory]
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
