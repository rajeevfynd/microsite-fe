import * as React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Tagtype } from '../../../../../constants/tag';
import httpInstance from '../../../../../utility/http-client';

export const RoleForm = (props: any) => {
    const { handleModal, handleLoading } = props;


    const [roleName, setRoleName] = React.useState("");
    const [role, setRole] = React.useState({});
    const [buttonStatus, setButtonStatus] = React.useState(true);


    function handleRoleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const roleName = event.target.value;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(roleName)) {
            setRoleName(roleName);
            setButtonStatus(false);
        } else {
            setButtonStatus(true);
        }
    }



    const onFinish = (values: { roleName: string }) => {
        const { roleName } = values;

        const reg = new RegExp("^[0-9]*[a-zA-Z]+[a-zA-Z0-9]*");

        if (reg.test(roleName)) {
            setRole({
                name: roleName,
                type: Tagtype.role,
                isActive: true,
                addedBy: 1111
            });
            setButtonStatus(true);
            handleModal(false);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed Role Submission: ', errorInfo);
    };


    React.useEffect(() => {
        // Api-> createNewTag
        if (!Object.keys(role).length) return;

        (() => {
            handleLoading(true);

            httpInstance.post(`/microsite/tag/`, role)
                .then((response) => {

                    if (!!Object.keys(response.data).length) {
                        handleLoading(false);
                        setRole({});
                        console.log(response.data)
                    }
                    handleLoading(false);
                    message.success('Role successfully Created');

                })
                .catch((error) => {
                    console.log(error.message);
                    handleLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();
    }, [role])





    return (
        <>
            <Form
                layout={'vertical'}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <Form.Item
                    name="roleName"
                    rules={[{ required: true, message: 'Please enter new role!' }]}
                >
                    <Input placeholder="Role Name" value={roleName} onChange={(event) => handleRoleChange(event)} />
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






