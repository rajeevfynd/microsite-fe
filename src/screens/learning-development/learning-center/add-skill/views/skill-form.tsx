import * as React from 'react';
import Axios from 'axios';
import { Button, Form, Input } from 'antd';
import { TagStatus, Tagtype } from '../../../../../constants/tag';

export const SkillForm = (props: any) => {
    const { handleModal, handleLoading } = props;


    const [skillName, setSkillName] = React.useState("");
    const [skill, setSkill] = React.useState({});
    const [buttonStatus, setButtonStatus] = React.useState(true);


    function handleSkillChange(event: React.ChangeEvent<HTMLInputElement>) {
        const skillName = event.target.value;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(skillName)) {
            setSkillName(skillName);
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }



    const onFinish = (values: { skillName: string }) => {
        const { skillName } = values;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(skillName)) {
            setSkill({
                name: skillName,
                type: Tagtype.skill,
                status: TagStatus.active,
                addedBy: 1111
            });
            setButtonStatus(true);
            handleModal(false);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Skill Submission: ', errorInfo);
    };


    React.useEffect(() => {
        // Api-> createNewTag
        if (!Object.keys(skill).length) return;

        (() => {
            handleLoading(true);

            const source = Axios.CancelToken.source();
            Axios.post(`http://localhost:8082/microsite/tag/`, skill, {
                cancelToken: source.token,
                headers: {},
                handlerEnabled: false,
            })
                .then((response) => {

                    if (!!Object.keys(response.data.data).length && response.status === 200) {
                        handleLoading(false);
                        setSkill({});
                    }
                    handleLoading(false);
                })
                .catch((error) => {
                    if (Axios.isCancel(error)) {
                    } else if (error.response) {
                        console.log(error.response.data.error);
                        window.alert(`${error.response.data.error.message}`);
                    } else {
                        console.log(error.message);
                        window.alert(`${error.message}`);
                    }
                });

            return () => {
                source.cancel("Cancelling in cleanup");
            };
        })();

    }, [skill])





    return (
        <>
            <Form
                layout={'vertical'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    name="skillName"
                    rules={[{ required: true, message: 'Please enter new skill!' }]}
                >
                    <Input placeholder="Skill Name" value={skillName} onChange={(event) => handleSkillChange(event)} />
                </Form.Item>

                <Form.Item>
                    <Button disabled={buttonStatus} type="primary" htmlType="submit" block>
                        Create
                    </Button>

                </Form.Item>
            </Form>
        </>
    )
}






