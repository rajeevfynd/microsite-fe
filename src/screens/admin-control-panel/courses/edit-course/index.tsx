import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Image, AutoComplete, Row, Col, message, Card, Select } from 'antd';
import * as React from 'react';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { Tagtype } from '../../../../constants/tag';
import { getCourseById } from '../../../../service/program-service';
import httpInstance from '../../../../utility/http-client';

const { Option } = Select;

const validateStatus = {
    validating: "validating",
    success: "success"
}

type tags = {
    id?: number,
    name?: string,
    type?: string
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

type coursePrograms = {
    program?: []
}

export const EditCourse = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const [editCourse, setEditCourse] = React.useState<editCourseDetail>({})
    const [programs, setPrograms] = React.useState<coursePrograms>()
    const [buttonStatus, setButtonStatus] = React.useState(true);
    const [search, setSearch] = React.useState({
        text: "",
        type: "",
        hasFeedback: false,
        validateStatus: "",
        options: []
    });


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

    const getEditCourse = async () => {
        let resp = await getCourseById(id)//.then(resp=>{
        console.log(resp.data)
        setEditCourse(resp.data)

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
        //getEditCourse()
    }, [])

    const handlePlusIconClick = (data: { id: number; name: string; type: string }) => {


        if (data.type === Tagtype.skill) {
            if (editCourse.skills) {
                const alreadyExists = editCourse.skills.find(selectedSkill => selectedSkill.id === data.id);

                if (alreadyExists) return;
            }

            setEditCourse({
                ...editCourse,
                skills: [{ id: data.id, name: data.name }].concat(...editCourse.skills),
                skillIds: [data.id].concat(...editCourse.skillIds)
            });
        }

        if (data.type === Tagtype.role) {
            if (editCourse.roles) {
                const alreadyExists = editCourse.roles.find(selectedRole => selectedRole.id === data.id);

                if (alreadyExists) return;
            }

            setEditCourse({
                ...editCourse,
                roles: [{ id: data.id, name: data.name }].concat(...editCourse.roles),
                roleIds: [data.id].concat(...editCourse.roleIds)

            });

        }

        if (data.type === "PROGRAM") {
            if (editCourse.programs) {
                const alreadyExists = editCourse.programs.find(selectedProgram => selectedProgram.id === data.id);

                if (alreadyExists) { console.log("already exists"); return };
            }

            setEditCourse({
                ...editCourse,
                programs: [{ id: data.id, title: data.name }].concat(...editCourse.programs),
                programIds: [data.id].concat(...editCourse.programIds)

            });

        }
    }

    const handleMinusIconClick = (data: { id: number; name: string; type: string }) => {
        if (Tagtype.skill === data.type) {
            const remainingSkills = editCourse.skills.filter((selectedSkill) => selectedSkill.id !== data.id);
            console.log(remainingSkills)
            setEditCourse({
                ...editCourse,
                skills: remainingSkills,
                skillIds: remainingSkills.length ? remainingSkills.map((skill: { id: number; }) => skill.id) : []
            });
            console.log(editCourse)
        };

        if (Tagtype.role === data.type) {
            const remainingRoles = editCourse.roles.filter((selectedRole) => selectedRole.id !== data.id);
            setEditCourse({
                ...editCourse,
                roles: remainingRoles,
                roleIds: remainingRoles.length ? remainingRoles.map((role: { id: number; }) => role.id) : []
            });
        }

        if ("PROGRAM" === data.type) {
            const remainingPrograms = editCourse.programs.filter((selectedProgram) => selectedProgram.id !== data.id);
            setEditCourse({
                ...editCourse,
                programs: remainingPrograms,
                programIds: remainingPrograms.length ? remainingPrograms.map((program: { id: number }) => program.id) : []
            });
        }
        console.log(editCourse)
    }

    const searchResult = (searchResult: { id: number; name: string; title: string; }[]) => {
        return searchResult.map((result: { id: number; name: string; title: string; }, index) => {
            return {
                value: result.name || result.title,
                label: <Row key={index} style={{ justifyContent: "space-between" }} onClick={() => handlePlusIconClick({ id: result.id, name: result.name || result.title, type: search.type })}>
                    <Col flex={1} style={{ textAlign: "start" }}><p>{result.name || result.title}</p></Col>
                    <Col style={{ alignItems: "end" }} > <PlusCircleOutlined style={{ fontSize: 20 }} /></Col>
                </Row>
            }
        })
    }

    React.useEffect(() => {
        // search Api-> get tag by name 
        if (!search.text && !search.type) return;

        if (search.type === "PROGRAM") return;

        (() => {
            httpInstance.get(`/microsite/tag/tags-by-name/?tagType=${search.type}&name=${search.text}`)
                .then((response) => {

                    const result = response.data || [];

                    if (!result.length) return;

                    setSearch({
                        ...search,
                        hasFeedback: true,
                        validateStatus: validateStatus.success,
                        options: response.data.length ? searchResult(result) : []
                    });

                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();

    }, [search.text, search.type])


    React.useEffect(() => {
        // search Api-> get programs by name 
        console.log("inside search")
        if (!search.text && !search.type) return;

        if (search.type !== "PROGRAM") return;

        (() => {
            httpInstance.get(`/microsite/lnd/programs/programs-by-title/?title=${search.text}`)
                .then((response) => {

                    const result = response.data || [];

                    if (!result.length) return;

                    setSearch({
                        ...search,
                        hasFeedback: true,
                        options: response.data.length ? searchResult(result) : []
                    });

                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();

    }, [search.text, search.type])

    return (<>

        <div><Button type='link' onClick={() => { navigate(-1) }}>< ArrowLeft /> Go Back</Button></div>
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

            <Form.Item
                hasFeedback={search.hasFeedback}
            >
                Programs
                <AutoComplete
                    style={{ textAlign: "start" }}
                    placeholder='Start Typing Program Name or Keyword...'
                    allowClear
                    options={search.type === "PROGRAM" ? search.options : []}
                    value={search.type === "PROGRAM" ? search.text : ""}
                    onChange={(e) => {
                        setSearch({ ...search, text: e, type: "PROGRAM", hasFeedback: true })
                    }}
                />

            </Form.Item>

            {editCourse.programs ? editCourse.programs
                .map((data, index) => <>
                    <Row key={index} style={{ justifyContent: "space-between" }}>
                        <Col flex={1 / 10} style={{ textAlign: "start" }}><h6 style={{ color: "red" }}>{data.title}</h6></Col>
                        <Col flex={9 / 10} style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.title, type: "PROGRAM" })} /></Col>
                    </Row>
                </>
                ) : <></>
            }

            <Form.Item
                hasFeedback={search.hasFeedback}
            >
                Skills
                {/* <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Program Name or Keyword...'
                            allowClear
                            options={search.type === Tagtype.skill ? search.options : []}
                            value={search.type === Tagtype.skill ? search.text : ""}
                            onChange = {(e)=>{
                                setSearch({...search, text: e, type:Tagtype.skill, hasFeedback: true})
                            }}
                    /> */}
                <Select
                    mode="multiple"
                    // showSearch
                    // onSearch={(e)=>{(() => {
                    //     httpInstance.get(`/microsite/lnd/programs/programs-by-title/?title=${e}`)
                    //         .then((response) => {
            
                    //             const result = response.data || [];
            
                    //             if (!result.length) return;
            
                    //             setSearch({
                    //                 ...search,
                    //                 hasFeedback: true,
                    //                 options: response.data.length ? searchResult(result) : []
                    //             });
            
                    //         })
                    //         .catch((error) => {
                    //             console.log(error.message);
                    //             window.alert(`${error.message}`);
                    //         });
                    // })}}
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Start Typing Program Name or Keyword...'
                    onChange={(e)=>{
                        console.log(e)
                        //setSearch({...search, text: e, type:Tagtype.skill, hasFeedback: true})
                    }}
                    defaultValue = {editCourse.skills?editCourse.skills.map((t)=>{t.name}):[]}
                    options={search.options}
                >
                    {search.options.map( d => { return (<Option key={d.text}>{d.text}</Option>)})}
                    </Select>

            </Form.Item>

            {/* {editCourse.skills?editCourse.skills
            .map((data, index) => <>
                        <Row key={index} style={{ justifyContent: "space-between" }}>
                            <Col flex={1/10} style={{ textAlign: "start" }}><h6 style={{color:"red"}}>{data.name}</h6></Col>
                            <Col flex={9/10} style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: Tagtype.skill })} /></Col>
                        </Row>
                    </>
                ): <></>
            } */}

            <Form.Item
                hasFeedback={search.hasFeedback}
            >
                Roles
                <AutoComplete
                    style={{ textAlign: "start" }}
                    placeholder='Start Typing Program Name or Keyword...'
                    allowClear
                    options={search.type === Tagtype.role ? search.options : []}
                    value={search.type === Tagtype.role ? search.text : ""}
                    onChange={(e) => {
                        setSearch({ ...search, text: e, type: Tagtype.role, hasFeedback: true })
                    }}
                />

            </Form.Item>

            {editCourse.roles ? editCourse.roles
                .map((data, index) => <>
                    <Row key={index} style={{ justifyContent: "space-between" }}>
                        <Col flex={1 / 10} style={{ textAlign: "start" }}><h6 style={{ color: "red" }}>{data.name}</h6></Col>
                        <Col flex={9 / 10} style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: Tagtype.role })} /></Col>
                    </Row>
                </>
                ) : <></>
            }

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