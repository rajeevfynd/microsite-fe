import { Button, Form, Input, message, Modal, Radio } from 'antd';
import * as React from 'react';
import { addAnnouncement } from '../../../service/announcment-service';
import { DeleteAnnouncement } from './delete-announcement';
import { Upload } from '../../../components/upload.component';
import { UploadProps } from '../../../models/upload-props';
import { PlusLg } from 'react-bootstrap-icons';


export const AddAnnouncement = () => {

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

    const prop: UploadProps = {
        onDone(info) {
            setIsTextActive(false)
            setDocument(info.documentId);
        },
        onRemove() {
            setDocument(null)
            setIsTextActive(true)
        }
    };

    const onRemove = (file: any) => {
        setDocument(null)
        setIsTextActive(true)
    }

    const [form] = Form.useForm();
    const [documentId, setDocument] = React.useState<string>();

    const onFinish = async (values: any) => {
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
        if (res.data == true) {
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
            <h3>Manage Annoucements</h3>
            <Button onClick={showModal} type='primary'><PlusLg style={{marginRight:"5px"}}/>Create Announcement</Button>
            <Modal title="Create Announcement" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter the title ' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Announcement Document'
                    >
                        <Upload {...prop} />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Announcement Description"
                    >
                        <Input.TextArea placeholder='Description here' disabled={isTextActive ? false : true} onChange={() => { setIsDocActive(false) }} />
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <br /><br />

            <DeleteAnnouncement {...{ props: updatedprops }} />
        </>
    )


}