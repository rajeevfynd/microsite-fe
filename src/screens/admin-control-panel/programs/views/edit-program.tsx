import { Button, Form, Input, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { SortableElement, SortableContainer, SortableContainerProps, SortableElementProps } from 'react-sortable-hoc'
import { courseSortEndHandler, getJourneyDetails, handleFormSubmit, handleProgramFormSubmit, onCourseSelectHandler, onSelectHandler, removeCourseHandler, removeProgramHadler, sortEndHandler } from '../../../../service/journey-service';
import { CourseMapType, ProgramMapType } from '../../../../models/journey-details';
import { SearchInput } from '../../../../components/search-input/search-input';
import { Flow } from '../../../../models/enums/flow';
import { getProgramDetails } from '../../../../service/program-service';
import { CourseSearchInput } from '../../../../components/search-course-input/search-course-input';
import { formatBase64 } from '../../../../utility/image-utils';
import { UploadProps } from '../../../../models/upload-props';
import { Upload } from '../../../../components/upload.component';

type editProgramDetails = {
  title?: string,
  description?: string,
  sequence?: boolean,
  issueCertificate?: boolean
}

export const EditProgram = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [courses, setCourses] = React.useState<CourseMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')
  const [thumbnailUrl, setThumbnailUrl] = React.useState('');
  const [program, setProgram] = React.useState<editProgramDetails>({})
  const { Option } = Select;

  React.useEffect(() => {
    getProgramDetails(id).then(res => {
      processCourses(res.data.courses);
      processProgram(res.data);
    })
  }, [])

  const processProgram = (data: any) => {
    setProgram({
      title: data.title,
      description: data.description,
      sequence: data.flow == Flow.SEQUENCE,
      issueCertificate: data.issueCertificate
    })
    setThumbnailUrl(data.thumbnailLink);
  }

  const processCourses = (courses: any[]) => {
    let processedCourses: CourseMapType[] = []
    courses.forEach((c: any, index: number) => {
      processedCourses = [...processedCourses, {
        course: c.course.id.toString(),
        courseName: c.course.title,
        index: index
      }]
    })
    setCourses(processedCourses)
  }

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = () => {
    handleProgramFormSubmit(program, courses, thumbnail, id).then(resp => {
      if (resp.data) {
        message.success('Program updated successfully');
        navigate("/admin/programs");
      }
    })
  };

  const addCourse = () => {
    setCourses([...courses, { index: courses.length, course: undefined, courseName: undefined }])
  }

  const onSortEnd = (index: { oldIndex: any, newIndex: any }) => {
    setCourses(courseSortEndHandler(index, courses))
  }

  const removeCourse = (index: number) => {
    setCourses(removeCourseHandler(index, courses))
  }

  const handleOnSelect = (e: any, index: number) => {
    setCourses(onCourseSelectHandler(index, e, courses))
  }

  const SortableItem: any = SortableElement((data: { item: CourseMapType }) => {
    return (
      <li key={data.item.index}>
        <HolderOutlined style={{ width: 50, cursor: 'grab' }} />
        <CourseSearchInput
          defaultValue={data.item.courseName}
          onSelect={(e: any) => { handleOnSelect(e, data.item.index) }}
          placeholder='Select Course'
          style={{ width: 250 }}
        />
        <Button danger className='remove-btn' type='primary' onClick={() => { removeCourse(data.item.index) }}>-</Button>
      </li>
    )
  })

  const SortableList: any = SortableContainer((data: { courses: CourseMapType[] }) => (<div>
    {data.courses
      .sort((a: CourseMapType, b: CourseMapType) => { return a.index - b.index; })
      .map((course: CourseMapType, index: number) => (
        <div><SortableItem item={course} index={index} key={course.index} /></div>
      ))}
  </div>));

  return (<>
    <React.Fragment>
      <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Back</Button></div>

      <h4>Edit Program</h4>

      <div className='scroll-container'>
        <Form onFinish={onFinish} validateMessages={validateMessages}>

          <Form.Item>
            <Upload
              onDone={(info) => setThumbnail(info.documentId)}
              onRemove={() => setThumbnail('')}
              file={thumbnailUrl} />

          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            Title
            <Input value={program.title} onChange={(e) => {
              setProgram({
                title: e.target.value,
                description: program.description,
                sequence: program.sequence,
                issueCertificate: program.issueCertificate
              })
            }} />
          </Form.Item>

          <Form.Item>
            Description
            <Input.TextArea value={program.description} onChange={(e) => {
              setProgram({
                title: program.title,
                description: e.target.value,
                sequence: program.sequence,
                issueCertificate: program.issueCertificate
              })
            }} />
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={program.sequence} onClick={() => {
              setProgram({
                title: program.title,
                description: program.description,
                sequence: !program.sequence,
                issueCertificate: program.issueCertificate
              })
            }} />
          </Form.Item>

          <Form.Item>
            Issue Certificate <Switch checked={program.issueCertificate} onClick={() => {
              setProgram({
                title: program.title,
                description: program.description,
                sequence: program.sequence,
                issueCertificate: !program.issueCertificate
              })
            }} />
          </Form.Item>

          <Form.Item >
            Courses
            <SortableList
              helperClass="helper"
              courses={courses}
              axis='y'
              onSortEnd={onSortEnd} />
            <Button type='dashed'
              onClick={() => { addCourse() }
              }>
              <PlusOutlined /> Add Course
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>

        </Form>
      </div>
    </React.Fragment>
  </>
  );
};