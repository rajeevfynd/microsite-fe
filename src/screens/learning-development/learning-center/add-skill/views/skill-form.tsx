import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Tagtype } from '../../../../../constants/tag';
import httpInstance from '../../../../../utility/http-client';

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
                isActive: true,
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

            httpInstance.post(`/microsite/tag/`, skill)
                .then((response) => {

                    if (!!Object.keys(response.data).length) {
                        handleLoading(false);
                        setSkill({});
                    }
                    handleLoading(false);
                    message.success('Skill successfully Created');
                })
                .catch((error) => {
                    handleLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
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






