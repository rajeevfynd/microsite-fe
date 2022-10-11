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
    const [course, setCourse] = React.useState({
        title: null,
        description: null,
        skills: [],
        roles: [],
        programs: [],
        rruDeepLink: null,
        programId: null,
        thumbnail: null,
        minCourseCoin: null,
        courseCoin: null,
        careerCoin: null,
        createdBy: null,
        updatedBy: null,
        status: true
    });
    const [buttonStatus, setButtonStatus] = React.useState(true);
    const [search, setSearch] = React.useState({
        text: "",
        type: "",
    });
    const [roleSearch, setRoleSearch] = React.useState({
        text: "",
        type: "",
        hasFeedback: false,
        validateStatus: validateStatus.validating,
        options: []
    });
    const [skillSearch, setSkillSearch] = React.useState({
        text: "",
        type: "",
        hasFeedback: false,
        validateStatus: validateStatus.validating,
        options: []
    });
    const [isLoading, setIsLoading] = React.useState(false);






    const onValuesChange = (changedValues: any, allValues: any) => {
        console.log(changedValues);
        const stringReg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");
        const integerReg = new RegExp("(?<!-)(?<!\d)[1-9][0-9]*");
        const urlReg = new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)");

        const key = Object.keys(changedValues)[0];
        switch (key) {
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
            case 'skills':
                const skills = changedValues[key];

                if (!skills) {
                    setSearch({ ...search, text: "", type: "" });
                    setSkillSearch({ ...skillSearch, options: [] });
                }

                if (stringReg.test(skills)) {
                    setSearch({ ...search, text: skills, type: Tagtype.skill });
                    setSkillSearch({ ...skillSearch, hasFeedback: true, validateStatus: validateStatus.validating });
                }
                break;
            case 'roles':
                const roles = changedValues[key];

                if (!roles) {
                    setSearch({ ...search, text: "", type: "" });
                    setRoleSearch({ ...roleSearch, options: [] });
                }

                if (stringReg.test(roles)) {
                    setSearch({ ...search, text: roles, type: Tagtype.role });
                    setRoleSearch({ ...roleSearch, hasFeedback: true, validateStatus: validateStatus.validating });
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
        console.log('Success:', values);
        console.log("courseState ->  ", course)
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

    const handlePlusIconClick = (tag: { id: number; name: string; type: string }) => {
        if (Tagtype.skill === tag.type) {
            const newSkill = course.skills.concat(tag);
            setCourse({ ...course, skills: newSkill });
            setSkillSearch({ ...skillSearch, options: newSkill });
        };

        if (Tagtype.role === tag.type) {
            const newRoles = course.roles.concat(tag);
            setCourse({ ...course, roles: newRoles });
            setRoleSearch({ ...roleSearch, options: newRoles });
        };
    }

    const handleMinusIconClick = (tag: { id: number; name: string; type: string }) => {
        if (Tagtype.skill === tag.type) {
            const newSkill = course.skills.filter((data) => data.id !== tag.id);
            setCourse({ ...course, skills: newSkill });
            setSkillSearch({ ...skillSearch, options: [] });
        };

        if (Tagtype.role === tag.type) {
            const newRole = course.roles.filter((data) => data.id !== tag.id);
            setCourse({ ...course, roles: newRole });
            setRoleSearch({ ...roleSearch, options: [] });
        }
    }

    const searchResult = (tags: { id: any; name: any; }[]) => {
        return tags.map((tag: { id: any; name: any; }, index) => {
            return {
                value: tag.name,
                label: <Row key={index} style={{ justifyContent: "space-between" }} onClick={() => handlePlusIconClick({ id: tag.id, name: tag.name, type: search.type })}>
                    <Col flex={1} style={{ textAlign: "start" }}><p>{tag.name}</p></Col>
                    <Col style={{ alignItems: "end" }} > <PlusCircleOutlined style={{ fontSize: 20 }} /></Col>
                </Row>
            }
        })
    }



    React.useEffect(() => {
        // search Api-> get tag by name 
        if (!search.text && !search.type) return;

        (() => {
            setIsLoading(true);
            httpInstance.get(`/microsite/tag/getTagsByName/?type=${search.type}&name=${search.text}`)
                .then((response) => {

                    const result = response.data || [];

                    if (!result.length) return;

                    if (Tagtype.role === search.type) {
                        setRoleSearch({ ...roleSearch, options: response.data.length ? searchResult(result) : [] });
                    }

                    if (Tagtype.skill === search.type) {
                        setSkillSearch({ ...skillSearch, options: response.data.length ? searchResult(result) : [] });
                    }

                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();

    }, [search])

    return (
        <Row style={{ justifyContent: "center" }}>
            <Card title="Create Course" bordered={true} style={{ width: 500, textAlign: "center" }}>
                <Form
                    layout="vertical"
                    name="courseForm"
                    initialValues={{
                        title: course.title,
                        rruDeepLink: course.rruDeepLink,
                        thumbnail: course.thumbnail,
                        minCourseCoin: course.minCourseCoin,
                        courseCoin: course.careerCoin,
                        careerCoin: course.careerCoin
                    }}
                    onValuesChange={onValuesChange}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input Title!' }, { type: "string", message: "Please input valid Title" }]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input description!' }, { type: "string", message: "Please input valid Description" }]}
                    >
                        <Input.TextArea placeholder="Description" showCount maxLength={200} />
                    </Form.Item>






                    <Form.Item
                        name="skills"
                        label="Skills"
                        validateStatus="validating"
                        hasFeedback={skillSearch.hasFeedback}
                    >
                        <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Skill Name or Keyword...'
                            allowClear
                            options={skillSearch.options}
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
                        validateStatus="validating"
                        hasFeedback={roleSearch.hasFeedback}
                    >
                        <AutoComplete
                            style={{ textAlign: "start" }}
                            placeholder='Start Typing Role Name or Keyword...'
                            allowClear
                            options={roleSearch.options}
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
                        rules={[{ required: true, message: 'Please input RRU Deep Link!' }, { type: "url", message: 'Please input valid RRU Deep Link!' }]}
                    >
                        <Input placeholder="https://rruDeepLink/" />
                    </Form.Item>

                    <Form.Item
                        name="thumbnail"
                        label="Thumbnail"
                        rules={[{ required: true, message: 'Please input Thumbnail!' }, { type: "url", message: 'Please input valid Thumbnail!' }]}
                    >
                        <Input placeholder="https://thumbnail/" />
                    </Form.Item>

                    {renderImage(course.thumbnail)}

                    <Form.Item
                        name="minCourseCoin"
                        label="Minimum Course Coin"
                        rules={[{ required: true, message: 'Please input Minimum Course Coin!', },]}
                    >
                        <Input type="number" placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        name="courseCoin"
                        label="Course Coin"
                        rules={[{ required: true, message: 'Please input course Coin!' }]}
                    >
                        <Input placeholder="0" />
                    </Form.Item>

                    <Form.Item
                        name="careerCoin"
                        label="Career Coin"
                        rules={[{ required: true, message: 'Please input career Coin!' }]}
                    >
                        <Input type="number" placeholder="0" />
                    </Form.Item>


                    <Form.Item>
                        <Button block type="primary" htmlType="submit" disabled={buttonStatus} >
                            Create Course
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row >
    )
}


