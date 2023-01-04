import * as React from 'react';
import { Col, Row, Card, List, Divider, Button, Modal, Tag, message, } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';
import { ProgramList } from './../../add-role/views/course-list';
import httpInstance from '../../../../../utility/http-client';
import { SkillEditForm } from './skill-edit-form';
import { editTagType } from '../../../../../models/tag-type';
import { ProgramSearch } from '../../add-role/views/course-search';
const { confirm } = Modal;


export const SkillList = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [skillList, setSkillList] = React.useState([]);
    const [skillId, setSkillId] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
    const [editSkill, setEditSkill] = React.useState<editTagType>();
    
    const [programTagMapping, setProgramTagMapping] = React.useState({
        programIds: [],
        tagIds: [],
        tagType: Tagtype.skill,
        isActive: true
    });
    const [mappingStatus, setMappingStatus] = React.useState(false);


    const showEditModal = (id:number, name:string, description:string) => {
        const skill:editTagType = {
            tagId:id,
            tagName:name,
            tagDescription:description
        }
        setEditSkill(skill)
        console.log("test")
        setIsEditModalOpen(true);
    };
    const closeEditModel = () => {
        setIsEditModalOpen(false);
    };


    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModel = () => {
        setIsModalOpen(false);
    };



    const showConfirm = (skillId: number, skillName: string, skillType: string) => {
        confirm({
            title: `Do you Want to delete this "${skillName}" ${skillType === "SKILL" ? "Skill" : "Program"}? `,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setSkillId(skillId);
            },
            onCancel() {
                setSkillId(null);
            },
        });
    };

    const handleAddProgramModel = (tagId: number, tagType: string) => {

        setProgramTagMapping({ ...programTagMapping, tagIds: [tagId], tagType: tagType });
        showModal()

    };

    React.useEffect(() => {
        //Api -> get tags and programs
        (() => {
            setIsLoading(true);
            httpInstance.get(`/microsite/tag/tags-and-programs-by-tag-type/?tagType=${Tagtype.skill}`)
                .then((response) => {
                    console.log(response)
                    if (!!response) {
                        setSkillList(response.data);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [skillId, mappingStatus,isEditModalOpen])


    React.useEffect(() => {
        // Api-> deleteTag

        if (!skillId) return;

        (() => {
            setIsLoading(true);

            httpInstance.delete(`/microsite/tag/?tagId=${skillId}`)
                .then((response) => {
                    if (!!Object.keys(response.data).length) {
                        setSkillId(null);
                    }
                    setIsLoading(false);
                    message.success('Skill successfully Deleted');

                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [skillId])



    React.useEffect(() => {
        // Api-> create programs tag mapping

        if (!programTagMapping.tagIds.length || !programTagMapping.programIds.length) return;

        (() => {
            setIsLoading(true);

            httpInstance.post(`/microsite/program-tag/`, programTagMapping)
                .then((response) => {

                    if (response.data) {
                        setProgramTagMapping({ ...programTagMapping, tagIds: [], programIds: [] })
                        setIsModalOpen(false);
                        setMappingStatus(!mappingStatus);

                    }
                    setIsLoading(false);
                    message.success('Program successfully Added');
                })
                .catch((error) => {
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [programTagMapping])


    return (

        <>
            {isLoading ? "Loading" :
                <> {!!skillList.length ?
                    <List
                        grid={{ gutter: 16, column: 3 }}
                        dataSource={skillList}
                        renderItem={item => (

                            <List.Item>
                                <Card bordered={true}
                                    hoverable={true}
                                    style={{ textAlign: "center" }}

                                >
                                    <div><Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h5>{item.name}</h5></Col>
                                        <Col style={{ alignItems: "end" }} >
                                            <EditOutlined style={{ fontSize: 20 }} onClick={()=>{showEditModal(item.id, item.name, item.description)}}/>
                                        </Col>
                                        <Col style={{ alignItems: "end" }}>
                                            <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.id, item.name, Tagtype.skill)} />
                                        </Col>
                                        </Row>
                                        <Row >
                                            <Col flex={1}> 
                                                <p>{item.description}</p> 
                                            </Col> 
                                        </Row>
                                    </div>
                                    <Divider />

                                    <ProgramList programTagList={item.programs} handleMappingStatus={setMappingStatus} mappingStatus={mappingStatus} />

                                    <Divider />
                                    <Button block>
                                        <Row justify="center" style={{ columnGap: 10 }} onClick={() => handleAddProgramModel(item.id, Tagtype.skill)}>
                                            <Col>
                                                <p>{"Add Programs"}</p>
                                            </Col>
                                            <Col>
                                                <PlusCircleOutlined style={{ fontSize: 20 }} />
                                            </Col>
                                        </Row>
                                    </Button>

                                </Card>
                            </List.Item>
                        )
                        }
                    />

                    : null
                }
                    <Modal title="Search & Add Programs" visible={isModalOpen} footer={null} onCancel={closeModel}>
                        <ProgramSearch handleProgramTagMapping={setProgramTagMapping} programTagMapping={programTagMapping} />
                    </Modal>

                    <Modal title="Update Skill" open={isEditModalOpen} footer={null} onCancel={closeEditModel} >
                        <SkillEditForm props={{skill:editSkill, handleSubmit:closeEditModel}}/>
                    </Modal>
                </>
            }
        </>
    );
}






