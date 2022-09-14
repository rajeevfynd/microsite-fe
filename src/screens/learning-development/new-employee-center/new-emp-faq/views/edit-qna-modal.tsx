import { Button, Form, Input, Modal, Radio, Tooltip } from 'antd';
import { EditTwoTone, DeleteTwoTone, EditOutlined, ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import * as React from 'react'
import { useState } from 'react';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onSubmit: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      destroyOnClose = {true}
      visible= {open}
      title="Edit the question or answer"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSubmit(values);
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

const EditQNAButton : React.FC = () => {
  const [open, setOpen] = useState(false);

  const onSubmit = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Edit">
                <Button type="default" shape = "circle" size = "small" icon={<EditOutlined />} onClick={(event: { stopPropagation: () => void; }) => {
                    event.stopPropagation();
                    setOpen(true);
                }}/>
        </Tooltip>
      <CollectionCreateForm
        open={open}
        onSubmit={onSubmit}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default EditQNAButton;
// .collection-create-form_last-form-item {
//   margin-bottom: 0;
// }