import * as React from 'react'
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import { QnaForm } from './qna-form';
import { DeleteFormPropsType, DeleteQnaModalPropsType, QnaFormPropsType, QnaModalPropsType } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';



export const DeletePopup = (props:{deleteProps: DeleteQnaModalPropsType}) => {
    const { deleteProps} = props;


    const handleQnaDelete = () => {
        deleteProps.onQnaDeleteOk()
    } 

    const deleteFormProps : DeleteFormPropsType = {
        editQnaDetails:deleteProps.editQnaDetails,
        onQnaDeleteOk : handleQnaDelete
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={deleteProps.isDeleteModalOpen}
            title="Are you sure you want to delete this question?"
            footer={null}
            onCancel={deleteProps.handleCancel}
        >

            <DeleteQnaForm deleteQnaFormProps={deleteFormProps}/>

        </Modal>

    )
}




export const DeleteQnaForm = (props: {deleteQnaFormProps :DeleteFormPropsType}) => {
    const {deleteQnaFormProps} = props;
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        // console.log(values);
        deleteQna(values);
        console.log(values.category)
        deleteQnaFormProps.onQnaDeleteOk();

    };

    const onReset = () => {
        form.resetFields();
    };

    const onChange = (list: CheckboxValueType[]) => {
        console.log(list)
    };


    const deleteQna = (values : any) => {
        const url = "/microsite/faq/delete-qna/" + deleteQnaFormProps.editQnaDetails.id
        httpInstance.put(url, {
            "categoryList" : values.category
        })
            .then(response => {
                console.log("editt called")
                deleteQnaFormProps.onQnaDeleteOk();
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
                fields={[
                    {
                        name: ['category'],
                    },
                ]}
            >   
                <Form.Item
                    name="category"
                    label="Choose the categories from which question needs to be deleted"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Checkbox.Group  onChange={onChange}>
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

