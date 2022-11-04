import { Button, Form, Input, message, Select, Switch, Upload, UploadProps } from 'antd';
import {  PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { SortableElement,SortableContainer, SortableContainerProps, SortableElementProps } from 'react-sortable-hoc'
import { handleProgramFormSubmit, onCourseSelectHandler, removeCourseHandler, courseSortEndHandler } from '../../../../service/journey-service';
import { CourseMapType } from '../../../../models/journey-details';
import { CourseSearchInput } from '../../../../components/search-course-input/search-course-input';


export const NewProgram: React.FC = () => {

  const navigate = useNavigate()
  const [courses, setCourses] = React.useState<CourseMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')

  const { Option } = Select;

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = (values: any) => {
    handleProgramFormSubmit(values,courses,thumbnail).then(resp => {
      if(resp.data){
        message.success('Journey added successfully');
      }
    })
  };

  const addCourse = () =>{
    setCourses([...courses, {index:courses.length, courseId: undefined, courseName: undefined}])
  }

  const onSortEnd = ( index: {oldIndex:any, newIndex:any} ) =>{
    setCourses(courseSortEndHandler(index, courses))
  }

  const removeCourse = (index: number) =>{
    setCourses(removeCourseHandler(index, courses))
  }

  const handleOnCourseSelect = (e:any,index:number) =>{
    setCourses(onCourseSelectHandler(index,e,courses))
  }
  const prop: UploadProps = {
    name: 'file',
    action: "/microsite/document/upload",
    onChange(info) {
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setThumbnail(info.file.response.data.id)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed due to ${info.file.response.data.message}.`);
        }
    },
};

  const SortableItem : any = SortableElement( (data: { item: CourseMapType}) => {return (
  <li key={data.item.index}>
    <HolderOutlined style={{width:50, cursor: 'grab'}}/>
    <CourseSearchInput 
      defaultValue={data.item.courseId}
      onSelect={(e: any) => { handleOnCourseSelect(e,data.item.index) }}
      placeholder='Select Course' 
      style={{ width: 250 }} 
  />
    <Button danger className='remove-btn' type='primary' onClick={() =>{removeCourse(data.item.index)}}>-</Button>
    </li>
  )})

  const SortableList : any = SortableContainer( (data: {courses: CourseMapType[]}) => (<div>
    {data.courses
      .sort( (a:CourseMapType ,b:CourseMapType) => { return a.index - b.index;} )
      .map( (course:CourseMapType, index:number) => (
         <div><SortableItem item={course} index={index} key={course.index}/></div>
      ))}
  </div>) );

  return (    <>
    <React.Fragment>
      <div><Button type='link' onClick={()=>{navigate(-1)}}>< ArrowLeft/> Back</Button></div>

      <h4>Create New Program</h4>

      <div className='scroll-container'>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            
          <Form.Item label='Thumbnail'>
            <Upload  listType="picture-card" {...prop} maxCount = {1} onRemove={()=>setThumbnail('')}>
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                </div>
            </Upload>

          </Form.Item>

          <Form.Item name={['program', 'title']} label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name={['program', 'description']} label="Description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item name={['program','sequencial']} label="Sequencial">
            <Switch defaultChecked/>
          </Form.Item>

          <Form.Item name={['program','issueCertificate']} label="Issue Certificate">
            <Switch defaultChecked/>
          </Form.Item>

          <Form.Item label="Courses">
            <SortableList 
            helperClass="helper"
            courses={courses} 
            axis='y' 
            onSortEnd={onSortEnd} />
            <Button type='dashed' 
              onClick={()=> {addCourse()}
            }> 
            <PlusOutlined /> Add Course
          </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
            <Button type="primary" htmlType="submit">
              Create Program
            </Button>
          </Form.Item>

        </Form>
      </div>
      </React.Fragment>
    </>
  );
};
