import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Image, AutoComplete, Row, Col, message, Card, Select } from 'antd';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Tagtype } from '../../../../constants/tag';
import { getCourseById } from '../../../../service/program-service';
import httpInstance from '../../../../utility/http-client';

const { Option } = Select;

type tags = {
    id?: number,
    name?: string,
    type?: string
}

type program = {
    id?:number,
    title?: string
}

type intresnsicType = {
    id?: number,
    name?: string,
}

type editCourseRequest = {
    rruCourseId?: number,
    title?: string,
    description?: string,
    rruDeepLink?: string,
    thumbnail?: string,
    duration?: number,
    minCourseCoin?: number,
    courseCoin?: number,
    careerCoin?: number
    programIds?: number[],
    skillIds?: number[],
    roleIds?: number[]
}

type editCourseDetail = {
    rruCourseId?: number,
    title?: string,
    description?: string,
    rruDeepLink?: string,
    thumbnail?: string,
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
    tags?: tags[]
}


export const EditCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [editCourse, setEditCourse] = React.useState<editCourseDetail>({skills:[], roles:[], programs:[]})
    const [dataSkill, setDataSkill] = React.useState<intresnsicType[]>([])
    const [dataRole, setDataRole] = React.useState<intresnsicType[]>([])
    const [dataProgram, setDataProgram] = React.useState<program[]>([])
    const [skillDrop,setSkillDrop] = React.useState<boolean>(false)
    const [roleDrop,setRoleDrop] = React.useState<boolean>(false)
    const [programDrop,setProgramDrop] = React.useState<boolean>(false)
    
    let key = ''


    const onFinish = async () => {
        const editRequestBody: editCourseRequest = {
            rruCourseId: editCourse.rruCourseId,
            title: editCourse.title,
            description: editCourse.description,
            duration: editCourse.duration,
            rruDeepLink: editCourse.rruDeepLink,
            thumbnail: editCourse.thumbnail,
            minCourseCoin: editCourse.minCourseCoin,
            courseCoin: editCourse.courseCoin,
            careerCoin: editCourse.careerCoin,
            skillIds: editCourse.skillIds,
            roleIds: editCourse.roleIds,
            programIds: editCourse.programIds
        }
        console.log(editRequestBody)
        const resp = await httpInstance.put("/microsite/course?id=" + id, editRequestBody);
        if (resp.data) {
            message.success(`${editCourse.title} updated successfully`);
            navigate(-1)
        }
    }

    const renderImage = (imageUrl: string) => {
        if (!imageUrl)
            return;

        return <>
            <Image src={imageUrl} height={200} width={450} />
        </>
    }
    React.useEffect(() => {
        getCourseById(id).then(resp => {
            let response = resp.data;
            const s: tags[] = []
            const sId: number[] = []
            const r: tags[] = []
            const rId: number[] = []
            response.tags.forEach((t: tags) => { if (t.type === 'SKILL') { s.push({ id: t.id, name: t.name }); sId.push(t.id) } })
            response.tags.forEach((t: tags) => { if (t.type === 'ROLE') { r.push({ id: t.id, name: t.name }); rId.push(t.id) } })
            response.roles = r
            response.roleIds = rId
            response.skillIds = sId
            response.skills = s
            console.log(response)
            setEditCourse(response)
        })
    }, [])

    return (<>

        <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Go Back</Button></div>
        <h4>Edit Course</h4>
        <Form title='Edit Course' style={{ width: '60%' }} layout="horizontal" onFinish={onFinish}>
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
                        ...editCourse, rruCourseId: Number(e.target.value)
                    })
                }} />
            </Form.Item>

            <Form.Item>
                Description
                <Input value={editCourse.description} onChange={(e) => {
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
                {/* <AutoComplete
                    style={{ textAlign: "start" }}
                    placeholder='Start Typing Program Name or Keyword...'
                    allowClear
                    options={search.type === "PROGRAM" ? search.options : []}
                    value={search.type === "PROGRAM" ? search.text : ""}
                    onChange={(e) => {
                        setSearch({ ...search, text: e, type: "PROGRAM", hasFeedback: true })
                    }}
                /> */}
                <Select
                    mode="multiple"
                    showSearch
                    onSearch={(e) => {
                        console.log(e)
                        setProgramDrop(e!='')
                        httpInstance.get(`/microsite/lnd/programs/programs-by-title/?title=${e}`)
                            .then((response) => {
                                console.log(response)
                                const result = response.data || [];
                                if (!result.length) return;
                                let programs: any[] = []
                                result.forEach((d:any) => programs.push({id:d.id, title: d.title}))
                                setDataProgram(programs)
                            })
                            .catch((error) => {
                                console.log(error.message);
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Program Name or Keyword...'
                    open= {programDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        console.log(e.target.value,"blur")
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
                        console.log(e)
                        const addProgram: program [] = dataProgram.filter((d)=> d.title==e)
                        console.log(addProgram)
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

            {/* {editCourse.programs ? editCourse.programs
                .map((data, index) => <>
                    <Row key={index} style={{ justifyContent: "space-between" }}>
                        <Col flex={1 / 10} style={{ textAlign: "start" }}><h6 style={{ color: "red" }}>{data.title}</h6></Col>
                        <Col flex={9 / 10} style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.title, type: "PROGRAM" })} /></Col>
                    </Row>
                </>
                ) : <></>
            } */}

            <Form.Item
                // hasFeedback={search.hasFeedback}
            >
                Skills
                <Select
                    mode="multiple"
                    showSearch
                    onSearch={(e) => {
                        console.log(e)
                        setSkillDrop(e!='')
                        httpInstance.get(`/microsite/tag/tags-by-name/?tagType=SKILL&name=${e}`)
                            .then((response) => {
                                console.log(response)
                                const result = response.data || [];
                                if (!result.length) return;
                                let skills: any[] = []
                                result.forEach((d:any) => skills.push({id:d.id, name: d.name}))
                                setDataSkill(skills)
                            })
                            .catch((error) => {
                                console.log(error.message);
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Skill Name or Keyword...'
                    open= {skillDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        console.log(e.target.value,"blur")
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
                        console.log(e)
                        const addSkill: intresnsicType [] = dataSkill.filter((d)=> d.name==e)
                        console.log(addSkill)
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
                        console.log(e);
                        httpInstance.get(`/microsite/tag/tags-by-name/?tagType=ROLE&name=${e}`)
                            .then((response) => {
                                console.log(response)
                                const result = response.data || [];
                                if (!result.length) return;
                                let roles: any[] = []
                                result.forEach((d:any) => roles.push({id:d.id, name: d.name}))
                                setDataRole(roles)
                            })
                            .catch((error) => {
                                console.log(error.message);
                                window.alert(`${error.message}`);
                            });
                    }}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Role Name or Keyword...'
                    open= {roleDrop}
                    onFocus = {(e: React.FocusEvent<HTMLInputElement, Element>)=>{
                        console.log(e.target.value,"blur")
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
                        console.log(e)
                        const addRole: intresnsicType [] = dataRole.filter((d)=> d.name==e)
                        console.log(addRole)
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

            {/* {editCourse.roles ? editCourse.roles
                .map((data, index) => <>
                    <Row key={index} style={{ justifyContent: "space-between" }}>
                        <Col flex={1 / 10} style={{ textAlign: "start" }}><h6 style={{ color: "red" }}>{data.name}</h6></Col>
                        <Col flex={9 / 10} style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: Tagtype.role })} /></Col>
                    </Row>
                </>
                ) : <></>
            } */}

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
                Thumbnail

                <Input value={editCourse.thumbnail} onChange={(e) => {
                    setEditCourse({
                        ...editCourse, thumbnail: e.target.value
                    })
                }} />

            </Form.Item>
            {renderImage(editCourse.thumbnail)}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>


    </>
    )

}