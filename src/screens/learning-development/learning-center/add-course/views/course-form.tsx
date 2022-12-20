import { Button, Image, Form, Input, message, Select } from 'antd'
import * as React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { Upload } from '../../../../../components/upload.component';
import httpInstance from '../../../../../utility/http-client';

const validateStatus = {
    validating: "validating",
    success: "success"
}

const { Option } = Select;

type Tags = {
    id?: number,
    name?: string,
    type?: string
}

type Program = {
    id?:number,
    title?: string
}

type IntresnsicType = {
    id?: number,
    name?: string,
}

type CourseRequest = {
    rruCourseId?: string,
    title?: string,
    description?: string,
    rruDeepLink?: string,
    thumbnailId?: string,
    duration?: number,
    minCourseCoin?: number,
    courseCoin?: number,
    careerCoin?: number
    programIds?: number[],
    skillIds?: number[],
    roleIds?: number[]
}

type CourseDetail = {
    rruCourseId?: string,
    title?: string,
    description?: string,
    rruDeepLink?: string,
    thumbnail?: string,
    thumbnailId?: string,
    duration?: number,
    minCourseCoin?: number,
    courseCoin?: number,
    careerCoin?: number
    isActive?: true,
    programs?: { id: number, title: string }[],
    programIds?: number[],
    skills?: { id: number, name: string }[],
    skillIds?: number[],
    roles?: { id: number, name: string }[],
    roleIds?: number[],
    tags?: Tags[]
}

export default function CourseForm() {

    const navigate = useNavigate()
    const [course, setCourse] = React.useState<CourseDetail>({skills:[], roles:[], programs:[]})
    const [dataSkill, setDataSkill] = React.useState<IntresnsicType[]>([])
    const [dataRole, setDataRole] = React.useState<IntresnsicType[]>([])
    const [dataProgram, setDataProgram] = React.useState<Program[]>([])
    const [skillDrop,setSkillDrop] = React.useState<boolean>(false)
    const [roleDrop,setRoleDrop] = React.useState<boolean>(false)
    const [programDrop,setProgramDrop] = React.useState<boolean>(false)
    
    let key = ''
    const stringReg = new RegExp("[a-zA-Z0-9]*");
    // const integerReg = new RegExp("(?<!-)(?<!\d)[1-9][0-9]*");
    const urlReg = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");


    const onFinish = async () => {
        if(!urlReg.test(course.rruDeepLink)){
            message.error("Deeplink should be valid url")
            return;
        }
        if(!stringReg.test(course.rruCourseId)){
            message.error("RRU Course ID must be a string")
            return;
        }
        const RequestBody: CourseRequest = {
            rruCourseId: course.rruCourseId,
            title: course.title,
            description: course.description,
            duration: course.duration,
            rruDeepLink: course.rruDeepLink,
            thumbnailId: course.thumbnailId,
            minCourseCoin: course.minCourseCoin,
            courseCoin: course.courseCoin,
            careerCoin: course.careerCoin,
            skillIds: course.skillIds,
            roleIds: course.roleIds,
            programIds: course.programIds
        }
        const resp = await httpInstance.post("/microsite/course", RequestBody);
        if (resp.data) {
            message.success(`${course.title} created successfully`);
            navigate(-1)
        }
    }

    return (<>

        <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Go Back</Button></div>
        <h4>Create Course</h4>

            <Form.Item>
            Thumbnail
            <Upload
              onDone={(info) => { setCourse({...course, thumbnailId: info.documentId, thumbnail : info.file});} }
              onRemove={() => setCourse({...course, thumbnailId: '', thumbnail: ''})}
              file={course.thumbnail}
              accept="image/png, image/jpeg, image/jpg"  />
             </Form.Item>
            <Form title='Create Course' style={{ width: '60%' }} layout="horizontal" onFinish={onFinish}>
            <Form.Item>
                Title
                <Input onChange={(e) => {
                    setCourse({
                        ...course, title: e.target.value
                    })
                }} />

            </Form.Item>

            <Form.Item>
                RRU Course Id
                <Input onChange={(e) => {
                    setCourse({
                        ...course, rruCourseId: e.target.value
                    })
                }} />
            </Form.Item>

            <Form.Item>
                Description
                <Input.TextArea onChange={(e) => {
                    setCourse({
                        ...course, description: e.target.value
                    })
                }} />

            </Form.Item>

            <Form.Item>
                RRU Deeplink
                <Input onChange={(e) => {
                    setCourse({
                        ...course, rruDeepLink: e.target.value
                    })
                }} />
            </Form.Item>

            <Form.Item>
                Programs
                <Select
                    mode="multiple"
                    showSearch
                    onSearch={(e) => {
                        setProgramDrop(e!='')
                        httpInstance.get(`/microsite/lnd/programs/programs-by-title/?title=${e}`)
                            .then((response) => {
                                const result = response.data || [];
                                if (!result.length) return;
                                let programs: any[] = []
                                result.forEach((d:any) => programs.push({id:d.id, title: d.title}))
                                setDataProgram(programs)
                            })
                            .catch((error) => {
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Program Name or Keyword...'
                    open= {programDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        setProgramDrop(e.target.value!='')
                    }}
                    onChange={(e)=>{
                        const remainingPrograms = course.programs.filter((selectedPrograms) => e.indexOf(selectedPrograms.title)>-1 );
                        setCourse({
                            ...course,
                            programs: remainingPrograms,
                            programIds: remainingPrograms.length ? remainingPrograms.map((program: { id: number; }) => program.id) : []
                        });
                    }}
                    onSelect={(e)=>{
                        const addProgram: Program [] = dataProgram.filter((d)=> d.title==e)
                        setCourse({
                            ...course,
                            programs: [{ id: addProgram[0].id, title: addProgram[0].title }].concat(...course.programs),
                            programIds: [addProgram[0].id].concat(...course.programIds)
                        });
                        setProgramDrop(false)
                    }}
                >
                    {dataProgram.map( d => { return (<Option key={d.title}>{d.title}</Option>)})}
                    </Select>


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
                        const remainingSkills = course.skills.filter((selectedSkill) => e.indexOf(selectedSkill.name)>-1 );
                        setCourse({
                            ...course,
                            skills: remainingSkills,
                            skillIds: remainingSkills.length ? remainingSkills.map((skill: { id: number; }) => skill.id) : []
                        });
                    }}
                    onSelect={(e)=>{
                        const addSkill: IntresnsicType [] = dataSkill.filter((d)=> d.name==e)
                        setCourse({
                            ...course,
                            skills: [{ id: addSkill[0].id, name: addSkill[0].name }].concat(...course.skills),
                            skillIds: [addSkill[0].id].concat(...course.skillIds)
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
                        const remainingRoles = course.roles.filter((selectedRole) => e.indexOf(selectedRole.name)>-1 );
                        setCourse({
                            ...course,
                            roles: remainingRoles,
                            roleIds: remainingRoles.length ? remainingRoles.map((role: { id: number; }) => role.id) : []
                        });
                    }}
                    onSelect={(e)=>{
                        const addRole: IntresnsicType [] = dataRole.filter((d)=> d.name==e)
                        setCourse({
                            ...course,
                            roles: [{ id: addRole[0].id, name: addRole[0].name }].concat(...course.roles),
                            roleIds: [addRole[0].id].concat(...course.roleIds)
                        });
                        setRoleDrop(false)
                    }}
                >
                    {dataRole.map( d => { return (<Option key={d.name}>{d.name}</Option>)})}
                    </Select>

            </Form.Item>

            <Form.Item>
                Duration
                <Input type='number' onChange={(e) => {
                    setCourse({
                        ...course, duration: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Minimum Course Coin
                <Input type='number' onChange={(e) => {
                    setCourse({
                        ...course, minCourseCoin: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Course Coin
                <Input type='number' onChange={(e) => {
                    setCourse({
                        ...course, courseCoin: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Career Coin
                <Input type='number' onChange={(e) => {
                    setCourse({
                        ...course, careerCoin: Number(e.target.value)
                    })
                }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>


    </>
    )
}