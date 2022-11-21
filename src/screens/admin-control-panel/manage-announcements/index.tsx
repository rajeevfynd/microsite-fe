import { Button, Form, Input, message, Modal, Radio, Upload, UploadProps } from 'antd';
import * as React from 'react';
import { UPLOAD_IMG } from '../../../constants/urls';
import { PlusOutlined } from '@ant-design/icons';
import { addAnnouncement } from '../../../service/announcment-service';
import { DeleteAnnouncement } from './delete-announcement';

interface announcementRequest {
    title?: string,
    description?: string,
    documentId?: number
}

export const AddAnnouncement = () =>{

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDocActive, setIsDocActive] = React.useState<boolean>(true);
    const [isTextActive, setIsTextActive] = React.useState(true);
    const [updatedprops, setupdatedprops] = React.useState("");
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        const s = prop.fileList.pop();
        console.log(s)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const prop: UploadProps = {
        name: 'file',
        action: UPLOAD_IMG,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setIsTextActive(false)
                setDocument(info.file.response.data.id);
            } else if (info.file.status === 'error') {
                console.log(info.file.response.data.message)
                message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
            }
        },
    };

    const onRemove = (file: any) =>{
        setDocument(null)
        setIsTextActive(true)
    }

    const [form] = Form.useForm();
    const [documentId, setDocument] = React.useState();

    const onFinish = async (values: any)=>{
        const body = {
            "title": values.title,
            "description": values.description,
            "documentId": documentId
        }
        const res = await addAnnouncement(body);
        if(res.data == true){
            message.success("Created Announcement")
            setIsModalOpen(false);
            setupdatedprops("updated")
            form.resetFields()
            //prop.fileList.pop()
        }

    }

    return (
        <>
        <Button  onClick={showModal}> Create Announcement</Button>
        <Modal title="Create Announcement" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer = {[]}>
            <Form 
            form = {form}
            layout = "vertical"
            onFinish={onFinish}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules= {[{required: true, message: 'Please enter the title '}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label='Announcement Document'
                >
                            <Upload {...prop} listType="picture-card" maxCount={1} onRemove={onRemove} disabled={isDocActive?false:true}>
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                </Form.Item>
                <Form.Item
                    name = "description"
                    label = "Announcement Description"
                >
                        <Input.TextArea placeholder='Description here' disabled={isTextActive?false:true} onChange={()=>{setIsDocActive(false)}} />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        <br/><br/>

        <DeleteAnnouncement {...{props:updatedprops}}/>
        </>
    )


}