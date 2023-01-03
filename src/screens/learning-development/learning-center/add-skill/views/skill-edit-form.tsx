import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Tagtype } from '../../../../../constants/tag';
import httpInstance from '../../../../../utility/http-client';

export const SkillEditForm = (props: any) => {
    console.log(props.props.skill.tagId, props.props.skill.tagName, props.props.skill.tagDescription)
    const [name,setName] = React.useState<string>(props.props.skill.tagName)
    const [description,setDescription] = React.useState<string>(props.props.skill.tagDescription)
    
    const onFinish = (values: { skillName: string, skillDescription: string }) => {
        const { skillName, skillDescription } = values;
        let body = {
            name: skillName ? skillName : name,
            type: Tagtype.skill,
            description: skillDescription ? skillDescription : description
        }
        httpInstance.put(`/microsite/tag?tagId=${props.props.skill.tagId}`, body)
            .then((response) => {
                message.success('Skill successfully Updated');
                props.props.handleSubmit();

            })

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Skill Submission: ', errorInfo);
    };

    return (
        <>
            <Form
                layout={'vertical'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    name="skillName"
                >
                    <Input placeholder="Skill Name" defaultValue={props.props.skill.tagName} onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <Input.TextArea placeholder='Skill Description' defaultValue={props.props.skill.tagDescription} onChange={(e)=>{setDescription(e.target.value)}} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Edit
                    </Button>

                </Form.Item>
            </Form>
        </>
    )
}






