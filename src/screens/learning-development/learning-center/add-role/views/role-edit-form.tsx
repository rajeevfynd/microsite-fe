import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Tagtype } from '../../../../../constants/tag';
import httpInstance from '../../../../../utility/http-client';

export const RoleEditForm = (props: any) => {
    console.log(props.props.role.tagId, props.props.role.tagName, props.props.role.tagDescription)
    const [name,setName] = React.useState<string>(props.props.role.tagName)
    const [description,setDescription] = React.useState<string>(props.props.role.tagDescription)
    
    const onFinish = (values: { roleName: string, roleDescription: string }) => {
        const { roleName, roleDescription } = values;
        let body = {
            name: roleName ? roleName : name,
            type: Tagtype.role,
            description: roleDescription ? roleDescription : description
        }
        httpInstance.put(`/microsite/tag?tagId=${props.props.role.tagId}`, body)
            .then((response) => {
                message.success('Role successfully Updated');
                props.props.handleSubmit();

            })

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Role Submission: ', errorInfo);
    };

    return (
        <>
            <Form
                layout={'vertical'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    name="roleName"
                >
                    <Input placeholder="Role Name" defaultValue={props.props.role.tagName} onChange={(e)=>{setName(e.target.value)}}/>
                </Form.Item>

                <Form.Item
                    name="description"
                >
                    <Input.TextArea placeholder='Role Description' defaultValue={props.props.role.tagDescription} onChange={(e)=>{setDescription(e.target.value)}} />
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






