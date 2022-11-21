import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Card, Row, Button, Image, Form, Input, AutoComplete, SelectProps, Col, } from 'antd'
import * as React from 'react'
import { Tagtype } from '../../../../../constants/tag';
import httpInstance from '../../../../../utility/http-client';

const validateStatus = {
    validating: "validating",
    success: "success"
}

export default function CourseForm() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [course, setCourse] = React.useState({
        rruCourseId: null,
        title: null,
        description: null,
        programs: [],
        programIds: [],
        skills: [],
        skillIds: [],
        roles: [],
        roleIds: [],
        rruDeepLink: null,
        thumbnail: null,
        duration: null,
        minCourseCoin: null,
        courseCoin: null,
        careerCoin: null,
        createdBy: null,
        updatedBy: null,
        isActive: true
    });
    const [buttonStatus, setButtonStatus] = React.useState(true);
    const [search, setSearch] = React.useState({
        text: "",
        type: "",
        hasFeedback: false,
        validateStatus: "",
        options: []
    });






    const onValuesChange = (changedValues: any, allValues: any) => {
        const stringReg = new RegExp("[a-zA-Z0-9]*");
        const integerReg = new RegExp("(?<!-)(?<!\d)[1-9][0-9]*");
        const urlReg = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");

        const key = Object.keys(changedValues)[0];
        switch (key) {
            case 'rruCourseId':
                const rruCourseId = changedValues[key];

                if (stringReg.test(rruCourseId)) {
                    setCourse({ ...course, rruCourseId: rruCourseId });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'title':
                const title = changedValues[key];

                if (stringReg.test(title)) {
                    setCourse({ ...course, title: title });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'description':
                const description = changedValues[key];

                if (stringReg.test(description)) {
                    setCourse({ ...course, description: description });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'programs':
                const program = changedValues[key];

                if (!program) {
                    setSearch({ ...search, text: "", type: "", hasFeedback: false, options: [] });
                }

                if (stringReg.test(program)) {
                    setSearch({ ...search, text: program.toLowerCase(), type: "PROGRAM", hasFeedback: true, validateStatus: validateStatus.validating, options: [] });
                }
                break;

            case 'skills':
                const skill = changedValues[key];

                if (!skill) {
                    setSearch({ ...search, text: "", type: "", hasFeedback: false, options: [] });
                }

                if (stringReg.test(skill)) {
                    setSearch({ ...search, text: skill.toLowerCase(), type: Tagtype.skill, hasFeedback: true, validateStatus: validateStatus.validating, options: [] });
                }
                break;

            case 'roles':
                const role = changedValues[key];

                if (!role) {
                    setSearch({ ...search, text: "", type: "", hasFeedback: false, options: [] });
                }

                if (stringReg.test(role)) {
                    setSearch({ ...search, text: role.toLowerCase(), type: Tagtype.role, hasFeedback: true, validateStatus: validateStatus.validating, options: [] });
                }
                break;

            case 'rruDeepLink':
                const rruDeepLink = changedValues[key];

                if (urlReg.test(rruDeepLink)) {
                    setCourse({ ...course, rruDeepLink: rruDeepLink });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'thumbnail':
                const thumbnail = changedValues[key];

                if (urlReg.test(thumbnail)) {
                    setCourse({ ...course, thumbnail: thumbnail });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'duration':
                const duration = changedValues[key];

                if (integerReg.test(duration)) {
                    setCourse({ ...course, duration: Number(duration) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'minCourseCoin':
                const minCourseCoin = changedValues[key];

                if (integerReg.test(minCourseCoin)) {
                    setCourse({ ...course, minCourseCoin: Number(minCourseCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                }
                break;

            case 'courseCoin':
                const courseCoin = changedValues[key];

                if (integerReg.test(courseCoin)) {
                    setCourse({ ...course, courseCoin: Number(courseCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);

                }
                break;

            case 'careerCoin':
                const careerCoin = changedValues[key];

                if (courseCoin >= 1) {
                    return
                }

                if (integerReg.test(careerCoin)) {
                    setCourse({ ...course, careerCoin: Number(careerCoin) });
                    setButtonStatus(false);
                } else {
                    setButtonStatus(true);
                    console.log(careerCoin);
                }
                break;

            default:
                break;
        }

    };

    const onFinish = (values: any) => {
        console.log(course)
        // setIsLoading(true);
        httpInstance.post(`/microsite/course`, course)
            .then((response) => {
                if (!response.data.error) {
                    setCourse({
                        rruCourseId: null,
                        title: null,
                        description: null,
                        programIds: [],
                        skills: [],
                        skillIds: [],
                        roles: [],
                        roleIds: [],
                        programs: [],
                        rruDeepLink: null,
                        thumbnail: null,
                        duration: null,
                        minCourseCoin: null,
                        courseCoin: null,
                        careerCoin: null,
                        createdBy: null,
                        updatedBy: null,
                        isActive: true
                    });

                    setSearch({
                        text: "",
                        type: "",
                        hasFeedback: false,
                        validateStatus: "",
                        options: []
                    });
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                window.alert(`${error}`);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const renderImage = (imageUrl: string) => {
        if (!imageUrl) return;

        return <>
            <Image src={course.thumbnail} height={200} width={450} />
        </>
    }

    const handlePlusIconClick = (data: { id: number; name: string; type: string }) => {


        if (data.type === Tagtype.skill) {
            if (course.skills.length) {
                const alreadyExists = course.skills.find(selectedSkill => selectedSkill.id === data.id);

                if (alreadyExists) return;
            }

            setCourse({
                ...course,
                skills: [...course.skills, { id: data.id, name: data.name }],
                skillIds: [...course.skillIds, data.id]
            });
        }

        if (data.type === Tagtype.role) {
            if (course.roles.length) {
                const alreadyExists = course.roles.find(selectedRole => selectedRole.id === data.id);

                if (alreadyExists) return;
            }

            setCourse({
                ...course,
                roles: [...course.roles, { id: data.id, name: data.name }],
                roleIds: [...course.roleIds, data.id]

            });

        }

        if (data.type === "PROGRAM") {
            if (course.programs.length) {
                const alreadyExists = course.programs.find(selectedProgram => selectedProgram.id === data.id);

                if (alreadyExists) return;
            }

            setCourse({
                ...course,
                programs: [...course.programs, { id: data.id, name: data.name }],
                programIds: [...course.programIds, data.id]

            });

        }
    }

    const handleMinusIconClick = (data: { id: number; name: string; type: string }) => {
        if (Tagtype.skill === data.type) {
            const remainingSkills = course.skills.filter((selectedSkill) => selectedSkill.id !== data.id);

            setCourse({
                ...course,
                skills: remainingSkills,
                skillIds: remainingSkills.length ? remainingSkills.map((skill: { id: number; }) => skill.id) : []
            });
        };

        if (Tagtype.role === data.type) {
            const remainingRoles = course.roles.filter((selectedRole) => selectedRole.id !== data.id);
            setCourse({
                ...course,
                roles: remainingRoles,
                skillIds: remainingRoles.length ? remainingRoles.map((role: { id: number; }) => role.id) : []
            });
        }

        if ("PROGRAM" === data.type) {
            const remainingPrograms = course.programs.filter((selectedProgram) => selectedProgram.id !== data.id);
            setCourse({
                ...course,
                programs: remainingPrograms,
                programIds: remainingPrograms.length ? remainingPrograms.map((program: { id: number; }) => program.id) : []
            });
        }
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


    const handleValidationStatus = () => {
        return search.options.length ? "success" : "validating";
    }

    return (
        <>{isLoading ? "Loading..." : <Row style={{ justifyContent: "center" }}>
            <Card title="Create Course" bordered={true} style={{ width: 500, textAlign: "center" }}>
                <Form
                    layout="vertical"
                    name="courseForm"
                    initialValues={{
                        rruCourseId: course.rruCourseId,
                        title: course.title,
                        description: course.description,
                        rruDeepLink: course.rruDeepLink,
                        thumbnail: course.thumbnail,
                        duration: course.duration,
                        minCourseCoin: course.minCourseCoin,
                        courseCoin: course.careerCoin,
                        careerCoin: course.careerCoin,
                        skills: search.type === Tagtype.skill ? search.text : "",
                        roles: search.type === Tagtype.role ? search.text : ""
                    }}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="rruCourseId"
                        label="RRU Course Id"
                        rules={[{ required: true, message: 'Please enter RRU-Course-Id!' }, { type: "string", message: "Please enter valid RRU-Course-Id" }]}
                    >
                        <Input placeholder="RRU-course-Id" />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter Title!' }, { type: "string", message: "Please enter valid Title" }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter description!' }, { type: "string", message: "Please enter valid Description" }]}
                    >
                        <Input.TextArea placeholder="Description" showCount maxLength={200} />
                    </Form.Item>

                    <Form.Item
                        name="programs"
                        label="Programs"
                        validateStatus={search.type === "PROGRAM" ? handleValidationStatus() : ""}
                        hasFeedback={search.hasFeedback}
                        rules={course.programs.length ? [{ required: false }] : [{ required: true, message: 'Please select at least one program!' }]}
                    >
                        <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Program Name or Keyword...'
                            allowClear
                            options={search.type === "PROGRAM" ? search.options : []}
                            value={search.type === "PROGRAM" ? search.text : ""}
                        />
                    </Form.Item>


                    {course.programs.map((data, index) => <>
                        <Row key={index} style={{ justifyContent: "space-between" }}>
                            <Col flex={1} style={{ textAlign: "start" }}><h6>{data.name}</h6></Col>
                            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: "PROGRAM" })} /></Col>
                        </Row>
                    </>
                    )}

                    <Form.Item
                        name="skills"
                        label="Skills"
                        validateStatus={search.type === Tagtype.skill ? handleValidationStatus() : ""}
                        hasFeedback={search.hasFeedback}
                        rules={course.skills.length || course.roles.length ? [{ required: false }] : [{ required: true, message: 'Please select at least one skill or role!' }]}
                    >
                        <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Skill Name or Keyword...'
                            allowClear
                            options={search.type === Tagtype.skill ? search.options : []}
                            value={search.type === Tagtype.skill ? search.text : ""}
                        />
                    </Form.Item>


                    {course.skills.map((data, index) => <>
                        <Row key={index} style={{ justifyContent: "space-between" }}>
                            <Col flex={1} style={{ textAlign: "start" }}><h6>{data.name}</h6></Col>
                            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: Tagtype.skill })} /></Col>
                        </Row>
                    </>
                    )}


                    <Form.Item
                        name="roles"
                        label="Roles"
                        validateStatus={search.type === Tagtype.role ? handleValidationStatus() : ""}
                        hasFeedback={search.hasFeedback}
                        rules={course.skills.length || course.roles.length ? [{ required: false }] : [{ required: true, message: 'Please select at least one role or skill!' }]}
                    >
                        <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Role Name or Keyword...'
                            allowClear
                            options={search.type === Tagtype.role ? search.options : []}
                            value={search.type === Tagtype.role ? search.text : ""}
                        />
                    </Form.Item>


                    {course.roles.map((data, index) => <>
                        <Row key={index} style={{ justifyContent: "space-between" }}>
                            <Col flex={1} style={{ textAlign: "start" }}><h6>{data.name}</h6></Col>
                            <Col style={{ alignItems: "end" }}> <MinusCircleOutlined style={{ fontSize: 20 }} onClick={() => handleMinusIconClick({ id: data.id, name: data.name, type: Tagtype.role })} /></Col>
                        </Row>
                    </>
                    )}

                    <Form.Item
                        name="rruDeepLink"
                        label="RRU Deep Link"
                        rules={[{ required: true, message: 'Please enter RRU Deep Link!' }, { type: "url", message: 'Please enter valid RRU Deep Link!' }]}
                    >
                        <Input placeholder="https://rruDeepLink/" />
                    </Form.Item>

                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        rules={[{ required: true, message: 'Please enter Thumbnail URL!' }, { type: "url", message: 'Please enter valid Thumbnail URL!' }]}
                    >
                        <Input placeholder="https://thumbnail/" />
                    </Form.Item>

                    {renderImage(course.thumbnail)}

                    <Form.Item
                        name="duration"
                        label="Duration"
                        rules={[{ required: true, message: 'Please enter Duration!', }]}
                    >
                        <Input type="number" placeholder="10" />
                    </Form.Item>

                    <Form.Item
                        name="minCourseCoin"
                        label="Minimum Course Coin"
                        rules={[{ required: true, message: 'Please enter Minimum Course Coin!', },]}
                    >
                        <Input type="number" placeholder="100" />
                    </Form.Item>

                    <Form.Item
                        name="courseCoin"
                        label="Course Coin"
                        rules={[{ required: true, message: 'Please enter course Coin!' }]}
                    >
                        <Input placeholder="200" />
                    </Form.Item>

                    <Form.Item
                        name="careerCoin"
                        label="Career Coin"
                        rules={[{ required: true, message: 'Please enter career Coin!' }]}
                    >
                        <Input type="number" placeholder="300" />
                    </Form.Item>


                    <Form.Item>
                        <Button block type="primary" htmlType="submit" disabled={buttonStatus} >
                            Create Course
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>}</>
    )
}


