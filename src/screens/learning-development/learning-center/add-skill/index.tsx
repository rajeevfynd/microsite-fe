import * as React from 'react';
import { Divider, Modal } from 'antd';
import { AddSkillCard } from './views/add-skill-card';
import { SkillList } from '../add-skill/views/skill-list';
import { SkillForm } from './views/skill-form';



export const AddSkill = () => {

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
                    marginLeft:"2em", marginRight: "2em",marginTop: "2em"
                }}>
                    <AddSkillCard handleShowModel={showModal} />

                    <SkillList />

                    <Modal title="Add New Skill" visible={isModalOpen} footer={null} onCancel={handleCancel}>
                        <SkillForm handleModal={setIsModalOpen} handleLoading={setIsLoading} />
                        <Divider />
                    </Modal>
                </div>
            }
        </>
    )
}






