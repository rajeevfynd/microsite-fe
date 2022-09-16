import * as React from 'react'
import { Button, Form, Menu, Modal,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import Upload from 'antd/lib/upload/Upload';


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
      title="Upload Q&A via excel file"
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
        <Form.Item>
          <Upload name='file' accept='.xlsx' maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>

    </Modal>
  );
};



const UploadQNA : React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div>
        <Menu
      onClick={() => {
        setOpen(true);
      }}
      items={[
        { 
          label: 'Upload Q&A via Excel',
          key: '1',
        }
      ]}
    />
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



export default UploadQNA;