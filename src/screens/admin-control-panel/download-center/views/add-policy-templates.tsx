import { Button, Col, Form, Input, message, Modal, Row, Select, Space } from "antd";
import * as React from "react";
import { Upload } from "../../../../components/upload.component";
import { SubmenuTabsType } from "../../../../models/download-center-type";
import { DownloadDocumentType } from "../../../../models/enums/download-document-type";
import { HRPoliciesSubmenu } from "../../../../models/enums/hr-policies-submenu";
import { TemplatesSubmenu } from "../../../../models/enums/templates-submenu";
import { UploadOnDoneParams, UploadProps } from "../../../../models/upload-props";
import { addDownloadDocument } from "../../../../service/download-center-service";

const { Option } = Select;

export const AddDownloadDocument = (props : {addUrl : string, downloadType : DownloadDocumentType, onAddSubmit : any}) => {
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

    const handleAddQnaClick = () => {
        setIsModalOpen(true);
    }

    const addDocument = (values : any) => {
        
        addDownloadDocument(props.addUrl, values)
            .then(response => {
                console.log("added")
                setIsModalOpen(false)
                props.onAddSubmit(categoryId)
            })
            .catch((error) => {
                message.error(error);
            });
    }

    const createCategoriesList = ( )=> {
        let categories : any = []

        if(props.downloadType === DownloadDocumentType.HR_POLICIES)
            categories = HRPoliciesSubmenu

        if(props.downloadType === DownloadDocumentType.TEMPLATES)
            categories = TemplatesSubmenu

        for (let item in categories) {
            if (isNaN(Number(item))) {
                categoryList.push({
                    key : item,
                    value : categories[item]
                })
            }
        }
    }

    const onCategoryChange = (value: string) => {
        setCategoryId(value)
    }

    const prop: UploadProps = {
        onRemove(){
            form.setFieldValue("documentId", null)
        },
        onDone(info: UploadOnDoneParams){
            form.setFieldValue("documentId" , info.documentId)
        },
        file : ""
    };


    React.useEffect(() => {
        createCategoriesList()
    }, [])


    return (
        <>
        <Button type="primary" onClick={() => {handleAddQnaClick()}}>Add Document</Button>

        <Modal
            destroyOnClose={true}
            open={isModalOpen}
            title={"Add New Document"}
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public'}}
                onFinish={addDocument}
                fields={[
                    {
                        name: ['department'],
                        value: [],
                    },
                ]}
            >   

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Enter the Name' }]}
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
                            <Option key={menu.value}>{menu.key}</Option>
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