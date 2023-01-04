import { EditFilled} from "@ant-design/icons/lib/icons";
import { Button, Col, Divider, Form, Input, message, Modal, Row, Select, Space } from "antd";
import * as React from "react";
import { Upload } from "../../../../components/upload.component";
import { EditPolicyPropsType, SubmenuTabsType } from "../../../../models/download-center-type";
import { UploadOnDoneParams, UploadProps } from "../../../../models/upload-props";
import { editDownloadDocument } from "../../../../service/download-center-service";

const { Option } = Select;

export const EditPolicyTemplates = (props: EditPolicyPropsType) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [categoryList, setCategoryList] = React.useState<SubmenuTabsType[]>([])
    const [categoryId, setCategoryId] = React.useState<string>('')

    const onReset = () => {
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmitClick = () => {
        setIsModalOpen(true);
    }

    const editDocument = (values : any) => {
        console.log(values)
        editDownloadDocument(props.downloadUrl, props.documentDetails.key, values)
            .then(response => {
                setIsModalOpen(false)
                props.onFinish()
            })
            .catch((error) => {
                message.error(error);
            });
    }

    const onCategoryChange = (value: string) => {
        console.log(value)
        setCategoryId(value)
    }

    const prop: UploadProps = {
        onRemove(){
            form.setFieldValue("documentId", null)
        },
        onDone(info: UploadOnDoneParams){
            form.setFieldValue("documentId" , info.documentId)
        },
        file : props.documentDetails.thumbnail
    };


    React.useEffect(() => {
        form.setFieldValue("documentId", props.documentDetails.documentId)
        setCategoryList(props.categoryList)
        console.log(typeof(props.documentDetails.category))
    }, [])

    return (
        <>

        <Button type="text" onClick={() => {handleSubmitClick()}}><EditFilled /></Button>
        
        <Modal
            destroyOnClose={true}
            open={isModalOpen}
            title={"Edit Document"}
            footer={null}
            onCancel={handleCancel}
            
        >   
            
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={editDocument}
                fields={[

                    {
                        name: ['name'],
                        value: props.documentDetails.title,
                    },

                    {
                        name: ['description'],
                        value: props.documentDetails.description,
                    },

                    {
                        name: ['categoryId'],
                        value: props.documentDetails.category,
                    },
                ]}
            >   

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Enter the document name' }]}
                >   
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Enter the description' }]}
                >
                    <Input.TextArea/>
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Category"
                    rules={[{ required: true, message: 'Please select the Category!' }]}
                >
                    <Select
                        style={{ width: '100%' }}
                        placeholder="Please select the Category"
                        onChange={onCategoryChange}
                        >

                        {categoryList.map((menu) => (
                            <Option key={Number(menu.value)}>{menu.key}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item 
                    name="documentId"
                    label="Document"
                    rules={[{ required: true, message: 'Choose a document!' }]}
                >
                    <Upload {...prop}></Upload>
                </Form.Item>

                <Divider />

                <Form.Item >
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Modal></>
      );

}