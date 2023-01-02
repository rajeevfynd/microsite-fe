// import { EditTwoTone} from "@ant-design/icons/lib/icons";
// import { Button, Col, Divider, Form, Input, message, Modal, Row, Select, Space } from "antd";
// import * as React from "react";
// import { Upload } from "../../../../components/upload.component";
// import { EditDocumentsPropsType } from "../../../../models/download-center-type";
// import { UploadOnDoneParams, UploadProps } from "../../../../models/upload-props";
// import { editDocument } from "../../../../service/download-center-service";


// export const EditDownloadDocument = () => {
//     const [form] = Form.useForm();
//     const [isModalOpen, setIsModalOpen] = React.useState(false);

//     const onReset = () => {
//         form.resetFields();
//     };

//     const handleCancel = () => {
//         setIsModalOpen(false);
//     };

//     const handleAddQnaClick = () => {
//         setIsModalOpen(true);
//     }

//     const editDownloadDocument = (values : any) => {
//         editDocument(props.documentDetails.id, values)
//             .then(response => {
//                 setIsModalOpen(false)
//                 props.onFinish()
//             })
//             .catch((error) => {
//                 message.error(error);
//             });
//     }

//     const prop: UploadProps = {
//         onRemove(){
//             form.setFieldValue("documentId", null)
//         },
//         onDone(info: UploadOnDoneParams){
//             form.setFieldValue("documentId" , info.documentId)
//         },
//         file : props.documentDetails.document.thumbnail
//     };


//     React.useEffect(() => {
//         form.setFieldValue("documentId", props.documentDetails.document.id)
//     }, [])

//     return (
//         <>

//         <EditTwoTone onClick={() => {handleAddQnaClick()}}></EditTwoTone>
//         <Modal
//             destroyOnClose={true}
//             open={isModalOpen}
//             title={"Edit Document"}
//             footer={null}
//             onCancel={handleCancel}
            
//         >   
            
//             <Form
//                 form={form}
//                 layout="vertical"
//                 name="form_in_modal"
//                 initialValues={{ modifier: 'public'}}
//                 onFinish={editDownloadDocument}
//                 fields={[

//                     {
//                         name: ['name'],
//                         value: props.documentDetails.name,
//                     },

//                     {
//                         name: ['description'],
//                         value: props.documentDetails.description,
//                     },
//                     {
//                         name: ['department'],
//                         value: props.documentDetails.department && props.documentDetails.department,
//                     },
//                 ]}
//             >   

//                 <Form.Item
//                     name="name"
//                     label="Name"
//                     rules={[{ required: true, message: 'Enter the document name' }]}
//                 >   
//                     <Input/>
//                 </Form.Item>

//                 <Form.Item
//                     name="description"
//                     label="Description"
//                     rules={[{ required: true, message: 'Enter the description' }]}
//                 >
//                     <Input.TextArea/>
//                 </Form.Item>

//                 <Form.Item
//                     name="department"
//                     label="Department"
//                 >   
//                     <Select 
//                         mode="multiple"
//                         style={{ width: '100%' }}
//                         placeholder="Select the Department(s)"
//                         tokenSeparators={[',']}
//                         options={props.departmentOptionsList}
//                         >
//                     </Select>
//                 </Form.Item>

//                 <Form.Item 
//                     name="documentId"
//                     label="Document"
//                     rules={[{ required: true, message: 'Choose a document!' }]}
//                 >
//                     <Upload {...prop}></Upload>
//                 </Form.Item>

//                 <Divider />

//                 <Form.Item >
//                     <Row>
//                         <Col span={24} style={{ textAlign: 'right' }}>
//                             <Space>
//                                 <Button type="primary" htmlType="submit">
//                                     Submit
//                                 </Button>
//                                 <Button htmlType="button" onClick={onReset}>
//                                     Reset
//                                 </Button>
//                             </Space>
//                         </Col>
//                     </Row>
//                 </Form.Item>
//             </Form>
//         </Modal></>
//       );

// }