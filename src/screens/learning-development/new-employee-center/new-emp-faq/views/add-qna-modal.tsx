import { Button, Dropdown, Form, Input, Menu, Modal, Space, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import * as React from 'react'
import { useState } from 'react';
import menu from 'antd/lib/menu';
import UploadQNA from './upload-qna-modal';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose = {true}
      visible= {open}
      title="Add new Q&A"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
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

const AddQNAButton : React.FC = () => {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  const menu = (
    <Menu
      items={[
        {
          label: 'Upload Q&A via Excel',
          key: '1',
        }
      ]}
    />
  );

  return (
    <div>
        <Space wrap>
            <Dropdown.Button overlay={<UploadQNA></UploadQNA>} onClick={() => {
                    setOpen(true);
                }}>
            Add Q&A
            </Dropdown.Button>
        </Space>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default AddQNAButton;
// .collection-create-form_last-form-item {
//   margin-bottom: 0;
// }