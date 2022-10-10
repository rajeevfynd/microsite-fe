import { Dropdown, Form, Input, Menu, Modal, Space } from 'antd';
import * as React from 'react'
import { AddQnaFormPropsType } from '../../../../../models/faq-qna-details';


export const AddQnaForm = (props : {addQnaFormProps : AddQnaFormPropsType}) => {
    const [form] = Form.useForm();
    const {addQnaFormProps} = props;
    return (
      <Modal
        destroyOnClose = {true}
        open= {addQnaFormProps.isAddQnaModalOpen}
        title="Add new Q&A"
        okText="Submit"
        cancelText="Cancel"
        onCancel={addQnaFormProps.onCancel}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              form.resetFields();
              addQnaFormProps.onCreate(values);
            })
            .catch(info => {
              console.log('Validate Failed:', info);
            });
        }}
      >
  
  
      <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please input the Question!' }]}
          >
            <Input type="textarea" />
          </Form.Item>
          <Form.Item 
              name="answer" 
              label="Answer"
              rules={[{ required: true, message: 'Please input the Answer!' }]}
          >
            <Input type="textarea" />
          </Form.Item>
        </Form>
  
      </Modal>
    );
  };