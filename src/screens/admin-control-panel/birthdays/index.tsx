import { Avatar, Button, Card, DatePicker, Form, Input, List, message, Modal } from 'antd';
import * as React from 'react';
import { PlusLg, Trash } from 'react-bootstrap-icons';
import { Upload } from '../../../components/upload.component';
import { UploadProps } from '../../../models/upload-props';
import { addBirthday, deleteBirthdayService, getAllBirthdaysService, getBirthdaysService } from '../../../service/home-service';

type BirthDayType = {
    id?: number,
    name?: string,
    image?: string,
    birthDay?: string
}

export const ManageBirthdays = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
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

    const [birthdays, setbirthdays] = React.useState<BirthDayType[]>([]);
    const [loadagain, setloadagain] = React.useState("");

    const fetchBirthdays = React.useCallback(async () => {
        let resp = await getAllBirthdaysService();
        console.log(resp)
        setbirthdays(resp.data)
    }, [])

    React.useEffect(() => {
        fetchBirthdays()
    }, [loadagain, fetchBirthdays])

    const handleDelete = async (id: string, title: any) => {
        let resp = await deleteBirthdayService(id)
        if (resp.data) {
            message.success(`${title} birthday deleted`)
        }
        setloadagain(id)
    }

    return (
        <>
            <br></br>
            <Button onClick={showModal} type='primary'><PlusLg style={{ marginRight: "5px" }} />Add Birthday</Button>
            <Modal title="Create Birthday" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
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
                </Form>
            </Modal>
            <div>
                <br></br>
                <List
                    grid={{ gutter: 7, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
                    dataSource={birthdays}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Card hoverable //bodyStyle={{ padding: "15px" }}
                                actions={[
                                    <Button onClick={() => handleDelete(item.id.toString(), item.name)} type='link' danger> Delete <Trash style={{ margin: '5%' }} /> </Button>
                                ]}
                            >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <img style={{ margin: 'auto', width: '100px', height: '100px' }}
                                        src={`data:image/png;base64,${item.image}`}
                                    />
                                    {item.name}
                                </div>
                                <div style={{ opacity: 0.5, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    {item.birthDay}
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </>
    )

}