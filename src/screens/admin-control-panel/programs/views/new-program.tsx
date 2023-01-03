import { Button, Form, Input, List, message, Select, Switch } from 'antd';
import { PlusOutlined, HolderOutlined } from '@ant-design/icons';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { removeCourseHandler, handleProgramFormSubmit, onCourseSelectHandler } from '../../../../service/program-service';
import { CourseMapType, ProgramMapType } from '../../../../models/journey-details';
import { CourseSearchInput } from '../../../../components/search-course-input/search-course-input';
import { formatBase64 } from '../../../../utility/image-utils';
import { Upload } from '../../../../components/upload.component';
import ReactDragListView from "react-drag-listview";
import { arrayMove } from '../../../../utility/array-utils';
import httpInstance from '../../../../utility/http-client';


type editProgramDetails = {
  id?: string,
  title?: string,
  description?: string,
  sequence?: boolean,
  issueCertificate?: boolean,
  skills: any[],
  roles: any[]
}

export const NewProgram: React.FC = () => {

  const navigate = useNavigate()
  const [courses, setCourses] = React.useState<CourseMapType[]>([])
  const [thumbnail, setThumbnail] = React.useState('')
  const [thumbnailUrl, setThumbnailUrl] = React.useState('')
  const [program, setProgram] = React.useState<editProgramDetails>({ sequence: true, issueCertificate: false, skills: [], roles : [] })
  const [skillDrop,setSkillDrop] = React.useState<boolean>(false)
  const [roleDrop,setRoleDrop] = React.useState<boolean>(false)
  const [dataSkill, setDataSkill] = React.useState<any[]>([])
  const [dataRole, setDataRole] = React.useState<any[]>([])

  const { Option } = Select;

  const onFinish = () => {
    if(program.title != null && program.title.trim() != '') {
      let resp = handleProgramFormSubmit(program, courses, thumbnail)
      if(resp)
        resp.then(resp => {
          if (resp.data) {
            message.success('Program added successfully');
            navigate("/admin/programs");
          }
    })
  }
  else{
    setProgram({
      ...program, title: '',
    })
  }
  };

  const addCourse = () => {
    setCourses([...courses, { course: null, courseName: undefined }])
  }

  const removeCourse = (index: number) => {
    setCourses(removeCourseHandler(index, courses))
  }

  const handleOnSelect = (e: any, index: number) => {
    setCourses(onCourseSelectHandler(index, e, courses))
  }

  const onDragEnd = (fromIndex: number, toIndex: number) => {
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    let sortedCourses = arrayMove(courses, fromIndex, toIndex);
    return setCourses(sortedCourses);
  };

  return (<>
    <React.Fragment>
      <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Back</Button></div>
      <div className='body-container' style={{width:'60%'}}>
        <h4>Create Program</h4>
        <Form layout='vertical' onFinish={onFinish}>
            <Form.Item>
              Thumbnail
              <Upload
                //fileType='image'
                onDone={(info) => { setThumbnail(info.documentId); setThumbnailUrl(info.file) }}
                onRemove={() => { setThumbnail(''); setThumbnailUrl('') }}
                file={thumbnailUrl}
                accept="image/png, image/jpeg, image/jpg"  />
            </Form.Item>

            <Form.Item>
            Title<span style={{color: 'red'}}>* { program.title != undefined && program.title.trim() == '' && <>Title Cannot be Blank</>}</span>
            <Input value={program.title} 
              onChange={(e) => {
              setProgram({
                ...program, title: e.target.value,
              })
            }} />
          </Form.Item>

          <Form.Item label='Description'>

            <Input.TextArea value={program.description} onChange={(e) => {
              setProgram({
                ...program, description: e.target.value,
              })
            }} />
          </Form.Item>

          <Form.Item>
            Sequencial <Switch checked={program.sequence} defaultChecked onChange={(e) => {
              setProgram({
                ...program, sequence: !program.sequence,
              })
            }} />
          </Form.Item>

          <Form.Item>
            Issue Certificate <Switch checked={program.issueCertificate} onChange={(e) => {
              setProgram({
                ...program, issueCertificate: !program.issueCertificate,
              })
            }} />
          </Form.Item>

          <Form.Item
            >
                Skills
                <Select
                    mode="multiple"
                    showSearch
                    onSearch={(e) => {
                        setSkillDrop(e!='')
                        httpInstance.get(`/microsite/tag/tags-by-name/?tagType=SKILL&name=${e}`)
                            .then((response) => {
                                const result = response.data || [];
                                if (!result.length) return;
                                let skills: any[] = []
                                result.forEach((d:any) => skills.push({id:d.id, name: d.name}))
                                setDataSkill(skills)
                            })
                            .catch((error) => {
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Skill Name or Keyword...'
                    open= {skillDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        setSkillDrop(e.target.value!='')
                    }}
                    onChange={(e)=>{
                        const remainingSkills = program.skills.filter((selectedSkill) => e.indexOf(selectedSkill.name)>-1 );
                        setProgram({
                            ...program,
                            skills: remainingSkills,
                        });
                    }}
                    onSelect={(e)=>{
                        const addSkill: any [] = dataSkill.filter((d)=> d.name==e)
                        setProgram({
                            ...program,
                            skills: [{ id: addSkill[0].id, name: addSkill[0].name }].concat(...program.skills),
                        });
                        setSkillDrop(false)
                    }}
                >
                    {dataSkill.map( d => { return (<Option key={d.name}>{d.name}</Option>)})}
                    </Select>

            </Form.Item>

            <Form.Item>
                Roles
                <Select
                    mode="multiple"
                    showSearch
                    onSearch={(e) => {
                        setRoleDrop(e!='')
                        httpInstance.get(`/microsite/tag/tags-by-name/?tagType=ROLE&name=${e}`)
                            .then((response) => {
                                const result = response.data || [];
                                if (!result.length) return;
                                let roles: any[] = []
                                result.forEach((d:any) => roles.push({id:d.id, name: d.name}))
                                setDataRole(roles)
                            })
                            .catch((error) => {
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Role Name or Keyword...'
                    open= {roleDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        setRoleDrop(e.target.value!='')
                    }}
                    onChange={(e)=>{
                        const remainingRoles = program.roles.filter((selectedRole) => e.indexOf(selectedRole.name)>-1 );
                        setProgram({
                            ...program,
                            roles: remainingRoles});
                    }}
                    onSelect={(e)=>{
                        const addRole: any[] = dataRole.filter((d)=> d.name==e)
                        setProgram({
                            ...program,
                            roles: [{ id: addRole[0].id, name: addRole[0].name }].concat(...program.roles),
                        });
                        setRoleDrop(false)
                    }}
                >
                    {dataRole.map( d => { return (<Option key={d.name}>{d.name}</Option>)})}
                    </Select>

            </Form.Item>


          <Form.Item >
            Courses
            <div style={{ width: "325px" }}>
              <ReactDragListView
                nodeSelector=".ant-list-item.draggable-item"
                lineClassName="dragLine"
                onDragEnd={(fromIndex, toIndex) =>
                  onDragEnd(fromIndex, toIndex)
                }
              >
                {courses
                  .map((course: CourseMapType, index) => (
                    <List.Item key={course.courseName ? index+course.courseName : index} className="draggable-item">
                      <div>
                        <HolderOutlined style={{ cursor: 'grab' }} />
                        <CourseSearchInput
                          defaultValue={course.courseName}
                          onSelect={(e: any) => { handleOnSelect(e, index) }}
                          placeholder='Select Course'
                          style={{ width: "250px" }}
                        />
                        <Button danger className='remove-btn' type='primary' onClick={() => { removeCourse(index) }} style={{ marginLeft: "5px" }}>-</Button>
                      </div>
                    </List.Item>
                  ))}
              </ReactDragListView>
              <Button disabled={! (courses.filter(p => p.courseName == undefined).length == 0)} type='dashed'
                onClick={() => { addCourse() }
                }>
                <PlusOutlined /> Add Course
              </Button>
            </div>
          </Form.Item>

          <Form.Item>
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