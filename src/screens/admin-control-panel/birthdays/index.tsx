import { Button, DatePicker, Dropdown, Form, Input, Menu, message, Modal, Space } from 'antd';
import * as React from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import { Upload } from '../../../components/upload.component';
import { UploadProps } from '../../../models/upload-props';
import { addBirthday } from '../../../service/home-service';
import { BirthdayList } from './views/brthdayList';
import { Uploader } from './views/uploader';


export const ManageBirthdays = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [title, setTitle] = React.useState("")
    const [loadagain, setloadagain] = React.useState("");

    const showModal = (modalTitle: any) => {
        setIsModalOpen(true);
        setTitle(modalTitle);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields()
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
    const [documentId, setDocument] = React.useState<string>();

    const prop: UploadProps = {
        onDone(info) {
            setDocument(info.documentId);
        },
        onRemove() {
            setDocument(null)
        }
    };

    const onFinish = async (values: any) => {
        const date = values.birthday._d.getDate() < 10 ? `0${values.birthday._d.getDate()}` : `${values.birthday._d.getDate()}`
        const birthday = `${values.birthday._d.getFullYear()}-${values.birthday._d.getMonth() + 1}-` + date
        const body = {
            "name": values.name,
            "email": values.email,
            "documentId": documentId,
            "birthDay": birthday
        }
        const resp = await addBirthday(body);
        if (resp.data) {
            message.success(`${values.name} birthday created`);
        }
        setloadagain(values.name);
        setIsModalOpen(false);

    }

    function handleUploadQnaClick() {
        showModal("Upload Birthday")
    }

    return (
        <>
            <br></br>
            <Space wrap>
                <Dropdown.Button onClick={e => showModal('Create Birthday')}
                    overlay={<Menu onClick={() => { handleUploadQnaClick(); }}
                        items={[
                            {
                                label: 'Upload Birthdays via Excel',
                                key: '1',
                            }
                        ]}
                    />}>
                    Add Birthday <PlusLg style={{ marginRight: "5px" }} />
                </Dropdown.Button>
            </Space>
            {/* <Button onClick={showModal} type='primary'></Button> */}
            <Modal destroyOnClose={true} title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                {title == "Create Birthday" ?
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter the Title ' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Photo'
                        >
                            <Upload {...prop} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter the Email ' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="birthday"
                            label="Birthday"
                            rules={[{ required: true, message: 'Please enter the Birth Date' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form> :
                    <div>
                        <Uploader />
                    </div>
                }
            </Modal>
            <div>
                <BirthdayList load = {loadagain}/>
            </div>
            
        </>
    )

}