import { Button, Collapse, UploadProps, message, Form, Space } from 'antd';
import * as React from 'react';
import HeroCarousel from '../../learning-development/learning-center/lnd-hero/views/hero-carousel';
import { editCarouselSlide } from '../../../service/program-service';
import { UPLOAD_IMG } from '../../../constants/urls';
import { CourseSearchInput } from '../../../components/search-course-input/search-course-input';
import { CourseMapType } from '../../../models/journey-details';
import { Upload } from "../../../components/upload.component"


const { Panel } = Collapse;

interface carouselFormtype {
    fileId?: string
    value?: string
}

const EditCarousal = () => {

    const [form, setFormFile] = React.useState<carouselFormtype[]>([
        {}, {}, {}
    ]);
    const [active, setActive] = React.useState("1")

    const [update, setupdate] = React.useState("")

    const handleRemove = () => {
        let updatedForm: carouselFormtype = {
            fileId: null,
            value: form[Number(active)].value ? form[Number(active)].value : ""
        }
        let updatedFormList = form
        updatedFormList.splice(Number(active), 1, updatedForm)
        setFormFile(updatedFormList);
        setupdate("is modified")
    }

    const handleSubmit = async (e: any) => {
        if (form[Number(active)].fileId === "" || form[Number(active)].fileId == null ) {
            message.error("please upload an image to carousel form");
            return
        }
        const body = {
            "positionValue": Number(active) + 1,
            "courseHyperlink": form[Number(active)].value,
            "imageDocumentId": form[Number(active)].fileId
        }
        const res = await editCarouselSlide(body);
        if (res.data == true) {
            message.success("Updated Successfully")
        }
        setupdate("is_updated " + Number(active) + 1)
    }

    const [courses, setCourse] = React.useState<CourseMapType>()

    const handleOnSelect = (e: any) => {
        setCourse(e.key)
        let updatedForm: carouselFormtype = {
            fileId: form[Number(active)].fileId ? form[Number(active)].fileId : "",
            value: e.key
        }

        let updatedFormList = [...form]
        updatedFormList.splice(Number(active), 1, updatedForm);
        setFormFile(updatedFormList);
    }

    return (
        <>
            <h2>Edit Carousel</h2>
            <br></br>
            <Collapse accordion onChange={(e) => { if (e != undefined) { setActive(e.toString()) } }}>
                <Panel header="Slide 1" key={0}>
                    <Form.Provider
                        onFormChange={name => {
                        }}
                    >
                        <Form name='Slide 1' onFinish={handleSubmit} >
                            <Form.Item label="Upload" valuePropName="fileList">
                                <Upload
                                //fileType='image'
                                accept="image/png, image/jpeg, image/jpg"
                                onDone={(info) => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: info.documentId,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                }} onRemove={() => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: null,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                    setupdate("is modified")
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="Course">
                                <CourseSearchInput defaultValue={""} onSelect={(e: any) => { handleOnSelect(e) }}
                                    placeholder='Select Course' style={{ width: 250 }} />
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
                            <Upload 
                            //fileType='image'
                            accept="image/png, image/jpeg, image/jpg"
                            onDone={(info) => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: info.documentId,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                }} onRemove={() => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: null,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                    setupdate("is modified")
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="Course">
                                <CourseSearchInput defaultValue={""} onSelect={(e: any) => { handleOnSelect(e) }}
                                    placeholder='Select Course' style={{ width: 250 }} />
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
                            <Upload 
                            //fileType='image'
                            accept="image/png, image/jpeg, image/jpg"
                            onDone={(info) => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: info.documentId,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                }} onRemove={() => {
                                    let updatedForm: carouselFormtype = {
                                        fileId: null,
                                        value: form[Number(active)].value ? form[Number(active)].value : ""
                                    }
                                    let updatedFormList = form
                                    updatedFormList.splice(Number(active), 1, updatedForm)
                                    setFormFile(updatedFormList);
                                    setupdate("is modified")
                                }}
                                />
                            </Form.Item>
                            <Form.Item label="Course">
                                <CourseSearchInput defaultValue={""} onSelect={(e: any) => { handleOnSelect(e) }}
                                    placeholder='Select Course' style={{ width: 250 }} />
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
            <HeroCarousel {...{ props: update }}></HeroCarousel>
        </>
    );
};

export default EditCarousal;

function onCourseSelectHandler(index: number, e: any, courses: CourseMapType[]): React.SetStateAction<CourseMapType[]> {
    throw new Error('Function not implemented.');
}
