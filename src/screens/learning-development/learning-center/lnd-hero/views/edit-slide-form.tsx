// import { Button, Form, message, Space } from 'antd';
// import Upload from 'antd/lib/upload/Upload';
// import type { UploadProps } from 'antd';
// import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
// import Search from 'antd/lib/input/Search';
// import * as React from 'react';
// import { resolve } from '../../../../../../webpack.config';
// import httpInstance from '../../../../../utility/http-client';
// import { editCarousel } from '../../../../../service/program-service';

// function form_slide() {
//     //console.log(position);
//     console.log

//     const prop: UploadProps = {
//         name: 'file',
//         action: '/microsite/upload',
//         headers: {
//           authorization: 'authorization-text',
//         },
//         onChange(info) {
//             console.log(info.file.response)
//           if (info.file.status !== 'uploading') {
//             console.log(info.file, info.fileList);
//           }
//           if (info.file.status === 'done') {
//             message.success(`${info.file.name} file uploaded successfully`);
//             setFormFile(info.file.response);
//           } else if (info.file.status === 'error') {
//             message.error(`${info.file.name} file upload failed.`);
//           }
//         },
//       };

//     const [file, setFormFile] = React.useState({})
//     const [stringValue, setFormString] = React.useState({ Slide: "" })

//     const onSearch = (value: any) => {
//         setFormString(value)
//         return value;
//     }

//     const handleSubmit = () => {
//         console.log(file);
//         console.log(stringValue);
//     }

//     return (
//         <Form name='Slide1'>
//             <Form.Item label="Upload" valuePropName="fileList">
//                 <Upload {...prop} listType="picture-card" maxCount={1} >
//                     {/* customRequest={(e) => { handleUpload(e) }}> */}
//                     <div>
//                         <PlusOutlined />
//                         <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                 </Upload>
//             </Form.Item>
//             <Form.Item>
//                 <Space direction="vertical">
//                     <Search placeholder="input search text" onSearch={onSearch} enterButton />
//                 </Space>
//             </Form.Item>
//             <Form.Item>
//                 <Button onClick={handleSubmit} type="primary">Submit</Button>
//             </Form.Item>
//         </Form>
//     );
// }

// export default form_slide;