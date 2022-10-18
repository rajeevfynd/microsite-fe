import * as React from 'react'
import { Button, Form, Menu, Modal, Upload,} from 'antd';
import { UploadOutlined} from '@ant-design/icons';
import { UploadQnaFormProps } from '../../../../../models/faq-qna-details';
import httpInstance from '../../../../../utility/http-client';


const UploadQnaForm = (props : {uploadQnaFormProps : UploadQnaFormProps}) => {
    const {uploadQnaFormProps} = props;
    const [form] = Form.useForm();

    const onFinish = (fileList: any) => {
        console.log(fileList)
        uploadQna(fileList)
    };

    const uploadQna = (fileList : any) => {
        const url = "/microsite/faq/upload-qna/"
        httpInstance.post(url, {"fileList" : fileList})
            .then(response => {
                console.log("upload called")
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <>
            <Modal
                destroyOnClose={true}
                visible={uploadQnaFormProps.isModalOpen}
                title="Upload Q&A via excel file"
                footer={null}
                onCancel={uploadQnaFormProps.onUploadQnaCancel}
            >

            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
                onFinish={onFinish}
                encType="multipart/form-data"
                >
                <Form.Item
                    label="Upload" valuePropName="fileList"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Upload name='file' accept='.xlsx' maxCount={1}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

    </Modal>
        </>
    )
}


export const UploadQNA = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
  
    const handleUploadSubmit = (fileList: any) => {
      console.log('Received values of form: ', fileList);
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
  