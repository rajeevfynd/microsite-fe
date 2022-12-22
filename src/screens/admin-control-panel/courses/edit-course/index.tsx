import { Button, Form, Input, Image, message, Select } from 'antd';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload } from '../../../../components/upload.component';
import { getCourseById } from '../../../../service/program-service';
import httpInstance from '../../../../utility/http-client';

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

type EditCourseRequest = {
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

type EditCourseDetail = {
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


export const EditCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [editCourse, setEditCourse] = React.useState<EditCourseDetail>({skills:[], roles:[], programs:[]})
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
        if(!urlReg.test(editCourse.rruDeepLink)){
            message.error("Deeplink should be valid url")
            return;
        }
        if(!stringReg.test(editCourse.rruCourseId)){
            message.error("RRU ID must be a string")
            return;
        }
        const editRequestBody: EditCourseRequest = {
            rruCourseId: editCourse.rruCourseId,
            title: editCourse.title,
            description: editCourse.description,
            duration: editCourse.duration,
            rruDeepLink: editCourse.rruDeepLink,
            thumbnailId: editCourse.thumbnailId,
            minCourseCoin: editCourse.minCourseCoin,
            courseCoin: editCourse.courseCoin,
            careerCoin: editCourse.careerCoin,
            skillIds: editCourse.skillIds,
            roleIds: editCourse.roleIds,
            programIds: editCourse.programIds
        }
        const resp = await httpInstance.put("/microsite/course?id=" + id, editRequestBody);
        if (resp.data) {
            message.success(`${editCourse.title} updated successfully`);
            navigate(-1)
        }
    }
    React.useEffect(() => {
        getCourseById(id).then(resp => {
            let response = resp.data;
            const s: Tags[] = []
            const sId: number[] = []
            const r: Tags[] = []
            const rId: number[] = []
            response.tags.forEach((t: Tags) => { if (t.type === 'SKILL') { s.push({ id: t.id, name: t.name }); sId.push(t.id) } })
            response.tags.forEach((t: Tags) => { if (t.type === 'ROLE') { r.push({ id: t.id, name: t.name }); rId.push(t.id) } })
            response.roles = r
            response.roleIds = rId
            response.skillIds = sId
            response.skills = s
            setEditCourse(response)
        })
    }, [])

    return (<>

        <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Go Back</Button></div>
        <div className='body-container' style={{ width: '60%' }}>
        <Form title='Edit Course' layout="vertical" onFinish={onFinish}>
            <h4>Edit Course</h4>
            <Form.Item>
            Thumbnail
            <Upload
              onDone={(info) => { setEditCourse({...editCourse, thumbnailId: info.documentId, thumbnail: info.file}); } }
              onRemove={() => setEditCourse({...editCourse, thumbnailId: '', thumbnail: ''})}
              file={editCourse.thumbnail}
              accept="image/png, image/jpeg, image/jpg"  />
            </Form.Item>
          
            <Form.Item>
                Title
                <Input value={editCourse.title} onChange={(e) => {
                    setEditCourse({
                        ...editCourse, title: e.target.value
                    })
                }} />

            </Form.Item>

            <Form.Item>
                RRU Course Id
                <Input value={editCourse.rruCourseId} onChange={(e) => {
                    setEditCourse({
                        ...editCourse, rruCourseId: e.target.value
                    })
                }} />
            </Form.Item>

            <Form.Item>
                Description
                <Input.TextArea value={editCourse.description} onChange={(e) => {
                    setEditCourse({
                        ...editCourse, description: e.target.value
                    })
                }} />

            </Form.Item>

            <Form.Item>
                RRU Deeplink
                <Input value={editCourse.rruDeepLink} onChange={(e) => {
                    setEditCourse({
                        ...editCourse, rruDeepLink: e.target.value
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
                        const remainingPrograms = editCourse.programs.filter((selectedPrograms) => e.indexOf(selectedPrograms.title)>-1 );
                        setEditCourse({
                            ...editCourse,
                            programs: remainingPrograms,
                            programIds: remainingPrograms.length ? remainingPrograms.map((program: { id: number; }) => program.id) : []
                        });
                    }}
                    value = {editCourse.programs.map((t)=>{return t.title})}
                    onSelect={(e)=>{
                        const addProgram: Program [] = dataProgram.filter((d)=> d.title==e)
                        setEditCourse({
                            ...editCourse,
                            programs: [{ id: addProgram[0].id, title: addProgram[0].title }].concat(...editCourse.programs),
                            programIds: [addProgram[0].id].concat(...editCourse.programIds)
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
                        const remainingSkills = editCourse.skills.filter((selectedSkill) => e.indexOf(selectedSkill.name)>-1 );
                        setEditCourse({
                            ...editCourse,
                            skills: remainingSkills,
                            skillIds: remainingSkills.length ? remainingSkills.map((skill: { id: number; }) => skill.id) : []
                        });
                    }}
                    value = {editCourse.skills.map((t)=>{return t.name})}
                    onSelect={(e)=>{
                        const addSkill: IntresnsicType [] = dataSkill.filter((d)=> d.name==e)
                        setEditCourse({
                            ...editCourse,
                            skills: [{ id: addSkill[0].id, name: addSkill[0].name }].concat(...editCourse.skills),
                            skillIds: [addSkill[0].id].concat(...editCourse.skillIds)
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
                        const remainingRoles = editCourse.roles.filter((selectedRole) => e.indexOf(selectedRole.name)>-1 );
                        setEditCourse({
                            ...editCourse,
                            roles: remainingRoles,
                            roleIds: remainingRoles.length ? remainingRoles.map((role: { id: number; }) => role.id) : []
                        });
                    }}
                    value = {editCourse.roles.map((t)=>{return t.name})}
                    onSelect={(e)=>{
                        const addRole: IntresnsicType [] = dataRole.filter((d)=> d.name==e)
                        setEditCourse({
                            ...editCourse,
                            roles: [{ id: addRole[0].id, name: addRole[0].name }].concat(...editCourse.roles),
                            roleIds: [addRole[0].id].concat(...editCourse.roleIds)
                        });
                        setRoleDrop(false)
                    }}
                >
                    {dataRole.map( d => { return (<Option key={d.name}>{d.name}</Option>)})}
                    </Select>

            </Form.Item>

            <Form.Item>
                Duration
                <Input value={editCourse.duration} type='number' onChange={(e) => {
                    setEditCourse({
                        ...editCourse, duration: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Minimum Course Coin
                <Input value={editCourse.minCourseCoin} type='number' onChange={(e) => {
                    setEditCourse({
                        ...editCourse, minCourseCoin: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Course Coin
                <Input value={editCourse.courseCoin} type='number' onChange={(e) => {
                    setEditCourse({
                        ...editCourse, courseCoin: Number(e.target.value)
                    })
                }} />

            </Form.Item>
            <Form.Item>
                Career Coin
                <Input value={editCourse.careerCoin} type='number' onChange={(e) => {
                    setEditCourse({
                        ...editCourse, careerCoin: Number(e.target.value)
                    })
                }} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
        </div>
    </>
    )

}