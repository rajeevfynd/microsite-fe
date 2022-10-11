import * as React from 'react'
import { Button, Form, Input, Select} from 'antd';
import { QnaFormPropsType } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';


const { Option } = Select;

const handleChange = (value: Array<string>) => {
    console.log(`selected ${value}`);
};


    export const QnaForm = (props: {qnaFormProps :QnaFormPropsType}) => {
    const {qnaFormProps} = props;
    const [form] = Form.useForm();
    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);
    const [editQnaId, setEditQnaId] = React.useState(null);

    const onFinish = (values: any) => {
        console.log(values);
        updateQna(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const handleChange = (value: Array<string>) => {
        console.log(`selected ${value}`);
    };

    const updateQna = (values : any) => {
        console.log(values.category)
        const url = "/microsite/faq/edit-qna/" + editQnaId
        httpInstance.put(url, {
            "faqCategory" : {
                "prevCategoryId" : currentActiveCategory,
                "updatedCategoryList" : values.category
            },
            "qnaDetails" : {
                "id" : editQnaId,
                "question" : values.question,
                "answer" : values.answer,
                "files" : [],
            }
        })
            .then(response => {
                console.log("editt called")
                qnaFormProps.onQnaEditOk();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        setcurrentActiveCategory(qnaFormProps.currentActiveCategory)
        setEditQnaId(qnaFormProps.editQnaDetails.id)
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
