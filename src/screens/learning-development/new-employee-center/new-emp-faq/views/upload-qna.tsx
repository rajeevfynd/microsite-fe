import * as React from 'react'
import { Button, Form, Menu, Modal, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';


const UploadQnaForm = (props : {uploadQnaFormProps : UploadQnaFormProps}) => {
    const {uploadQnaFormProps} = props;
    const [form] = Form.useForm();
    
    return (
        <>
            <Modal
                destroyOnClose={true}
                visible={uploadQnaFormProps.isModalOpen}
                title="Edit the question or answer"
                footer={null}
                onCancel={uploadQnaFormProps.onUploadQnaCancel}
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
        </>
    )
}


export const UploadQNA = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
    const handleUploadSubmit = (values: any) => {
      console.log('Received values of form: ', values);
      setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const uploadQnaFormProps : UploadQnaFormProps = {
        isModalOpen : isModalOpen,
        onUploadQnaSubmit : handleUploadSubmit,
        onUploadQnaCancel:handleCancel,
    }
  
    return (
      <div>
            <Menu onClick={() => { setIsModalOpen(true);}}
                items={[
                { 
                    label: 'Upload Q&A via Excel',
                    key: '1',
                }
                ]}
            />
            <UploadQnaForm uploadQnaFormProps = {uploadQnaFormProps}/>
      </div>
    );
  };
  