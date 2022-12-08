import { Avatar, Button, Card, DatePicker, Form, Input, List, Modal } from 'antd';
import * as React from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import { Upload } from '../../../components/upload.component';
import { UploadProps } from '../../../models/upload-props';
import { addBirthday, getAllBirthdaysService, getBirthdaysService } from '../../../service/home-service';

type BirthDayType = {
    id?: number,
    name?: string,
    image?: string,
    date?: string
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
        // console.log(values.birthday)
        // console.log(values.birthday._d.getDate())
        // console.log(values.birthday._d.getMonth()+1)
        // console.log(values.birthday._d.getFullYear())
        // console.log(values.birthday._d.toDateString())
        // console.log(values.birthday._d.toString())
        // console.log(documentId)
        const date = values.birthday._d.getDate()<10 ? `0${values.birthday._d.getDate()}`: `${values.birthday._d.getDate()}`
        const birthday = `${values.birthday._d.getFullYear()}-${values.birthday._d.getMonth()+1}-`+date
        const body = {
            "name":values.name,
            "email": values.email,
            "documentId": documentId,
            "birthDay" : birthday
        }
        const resp = await addBirthday(body);
        console.log(resp);


    }

    const [birthdays, setbirthdays] = React.useState<BirthDayType[]>([]);

    const fetchBirthdays = async () => {
        let resp = await getAllBirthdaysService();
        setbirthdays(resp.data)
    }

    React.useEffect(() => {
        fetchBirthdays()
    }, [])

    return (
        <>
            <br></br>
            <Button onClick={showModal} type='primary'><PlusLg style={{ marginRight: "5px" }} />Add Birthday</Button>
            <Modal title="Create Announcement" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
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
            <List
                grid={{ gutter: 7, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
                dataSource={birthdays}
                renderItem={item => (
                    <List.Item key={item.name}>
                        <Card hoverable bodyStyle={{ padding: "15px" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <img style={{ margin: 'auto', width: '51px', height: '51px' }}
                                    src={`data:image/png;base64,${item.image}`}
                                />
                                {item.name}
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </>
    )

}