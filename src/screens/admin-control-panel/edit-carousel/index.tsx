import { Button, Collapse, UploadProps, message, Form, Upload, Space } from 'antd';
import * as React from 'react';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';
import HeroCarousel from '../../learning-development/learning-center/lnd-hero/views/hero-carousel';
import { editCarouselSlide } from '../../../service/program-service';
import { UPLOAD_IMG } from '../../../constants/urls';


const { Panel } = Collapse;

interface carouselFormtype {
    fileId?: number
    value?: string
}

const EditCarousal = () => {

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
                let updatedForm: carouselFormtype = {
                    fileId: info.file.response.data.id,
                    value: form[Number(active)].value ? form[Number(active)].value : ""
                }
                let updatedFormList = form
                updatedFormList.splice(Number(active), 1, updatedForm)
                setFormFile(updatedFormList);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
            }
        },
    };
    const [form, setFormFile] = React.useState<carouselFormtype[]>([
        {}, {}, {}
    ]);
    const [active, setActive] = React.useState("1")

    const [update , setupdate ]= React.useState("")

    const onSearch = (val: any) => {
        let updatedForm: carouselFormtype = {
            fileId: form[Number(active)].fileId ? form[Number(active)].fileId : 0,
            value: val
        }

        let updatedFormList = [...form]
        updatedFormList.splice(Number(active), 1, updatedForm);
        setFormFile(updatedFormList);
    }

    const handleSubmit = async (e: any) => {
        const body = {
            "positionValue": Number(active) + 1,
            "courseHyperlink": form[Number(active)].value,
            "imageDocumentId": form[Number(active)].fileId
        }
        const res = await editCarouselSlide(body);
        setupdate("is_updated "+Number(active) + 1)
    }

    return (
        <>
        <h2>Edit Carousel</h2>
        <br></br>
            <Collapse accordion onChange={(e) => {if(e!=undefined){setActive(e.toString())}}}>
                <Panel header="Slide 1" key={0}>
                    <Form.Provider
                        onFormChange={name => {
                        }}
                    >
                        <Form name='Slide 1' onFinish={handleSubmit} >
                            <Form.Item label="Upload" valuePropName="fileList">
                                <Upload {...prop} listType="picture-card" maxCount={1} >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Space direction="vertical">
                                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                                </Space>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Form.Provider>
                </Panel>
                <Panel header="Slide 2" key={1}>
                    <Form.Provider
                        onFormChange={name => {
                        }}
                    >
                        <Form name='Slide 2' onFinish={handleSubmit}>
                            <Form.Item label="Upload" valuePropName="fileList">
                                <Upload {...prop} listType="picture-card" maxCount={1} >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Space direction="vertical">
                                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                                </Space>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Form.Provider>
                </Panel>
                <Panel header="Slide 3" key={2}>
                    <Form.Provider
                        onFormChange={name => {
                        }}
                    >
                        <Form name='Slide 3' onFinish={handleSubmit}>
                            <Form.Item label="Upload" valuePropName="fileList">
                                <Upload {...prop} listType="picture-card" maxCount={1} >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Space direction="vertical">
                                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                                </Space>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Form.Item>
                        </Form>
                    </Form.Provider>
                </Panel>
            </Collapse>
            <br></br>
            <h3>Preview</h3>
            <HeroCarousel {...{props:update}}></HeroCarousel>
        </>
    );
};

export default EditCarousal;