import * as React from 'react';
import { Divider, Modal } from 'antd';
import { AddRoleCard } from './views/add-role-card';
import { RoleList } from '../add-role/views/role-list';
import { RoleForm } from './views/role-form';



export const AddRole = () => {

    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);





    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            {isLoading ? "Loading" :
                <div style={{
                    margin: "auto",
                }}>
                    <AddRoleCard handleShowModel={showModal} />

                    <RoleList />

                    <Modal title="Add New Role" visible={isModalOpen} footer={null} onCancel={handleCancel}>
                        <RoleForm handleModal={setIsModalOpen} handleLoading={setIsLoading} />
                        <Divider />
                    </Modal>
                </div>
            }
        </>
    )
}






