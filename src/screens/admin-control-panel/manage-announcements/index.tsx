import { Button, Form, Input, message, Modal } from 'antd';
import * as React from 'react';
import { addAnnouncement } from '../../../service/announcment-service';
import { DeleteAnnouncement } from './delete-announcement';
import { Upload } from '../../../components/upload.component'


export const AddAnnouncement = () =>{

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isDocActive, setIsDocActive] = React.useState<boolean>(true);
    const [isTextActive, setIsTextActive] = React.useState(true);
    const [updatedprops, setupdatedprops] = React.useState("");
    const [file, setFile] = React.useState("")
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
    const [documentId, setDocument] = React.useState<string| null >();

    const onFinish = async (values: any)=>{
        if(values.description == null && (documentId == null || documentId === '' )){
            message.error("Either Document or Description must be present in Announcements ")
            return
        }
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
            setFile("")
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
            onAbort = {()=>{
                console.log("close")
            }}
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
                            <Upload
                                file = {file}
                             onDone={(info) => {
                                setIsTextActive(false)
                                setDocument(info.documentId);   
                                setFile(info.file)
                                }}
                                onRemove={()=>{
                                    setDocument("")
                                    setIsTextActive(true)
                                    setFile("")
                                }}
                                />
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