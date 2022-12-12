import * as React from 'react';
import { Col, Row, Card, List, Divider, Button, Modal, Tag, message, } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';
import { CourseList } from './course-list';
import httpInstance from '../../../../../utility/http-client';
import { CourseSearch } from './course-search';
const { confirm } = Modal;



export const RoleList = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [roleList, setRoleList] = React.useState([]);
    const [roleId, setRoleId] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseTagMapping, setCourseTagMapping] = React.useState({
        courseIds: [],
        tagIds: [],
        tagType: Tagtype.role,
        isActive: true
    });
    const [mappingStatus, setMappingStatus] = React.useState(false);




    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModel = () => {
        setIsModalOpen(false);
    };



    const showConfirm = (roleId: number, roleName: string, roleType: string) => {
        confirm({
            title: `Do you Want to delete this "${roleName}" ${roleType === "ROLE" ? "Role" : "Course"}? `,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                setRoleId(roleId);
            },
            onCancel() {
                setRoleId(null);
            },
        });
    };

    const handleAddCourseModel = (tagId: number, tagType: string) => {

        setCourseTagMapping({ ...courseTagMapping, tagIds: [tagId], tagType: tagType });
        showModal()

    };

    React.useEffect(() => {
        //Api -> get tags and courses
        (() => {
            setIsLoading(true);
            httpInstance.get(`/microsite/tag/tags-and-courses-by-tag-type/?tagType=${Tagtype.role}`)
                .then((response) => {
                    if (!!response.data.length) {
                        setRoleList(response.data);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log(error.message);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [roleId, mappingStatus])


    React.useEffect(() => {
        // Api-> deleteTag

        if (!roleId) return;

        (() => {
            setIsLoading(true);

            httpInstance.delete(`/microsite/tag/?tagId=${roleId}`)
                .then((response) => {
                    if (!!Object.keys(response.data).length) {
                        setRoleId(null);
                    }
                    setIsLoading(false);
                    message.success('Role successfully Deleted');

                })
                .catch((error) => {
                    console.log(error.message);
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [roleId])



    React.useEffect(() => {
        // Api-> create course tag mapping

        if (!courseTagMapping.tagIds.length || !courseTagMapping.courseIds.length) return;

        (() => {
            setIsLoading(true);

            httpInstance.post(`/microsite/course-tag/`, courseTagMapping)
                .then((response) => {

                    if (response.data) {
                        setCourseTagMapping({ ...courseTagMapping, tagIds: [], courseIds: [] })
                        setIsModalOpen(false);
                        setMappingStatus(!mappingStatus);

                    }
                    setIsLoading(false);
                    message.success('Course successfully Added');

                })
                .catch((error) => {
                    console.log(error.message);
                    setIsLoading(false);
                    message.error("Something went wrong, Please try after sometime");
                });
        })();

    }, [courseTagMapping])


    return (

        <>
            {isLoading ? "Loading" :
                <> {!!roleList.length ?
                    <List
                        grid={{ gutter: 16, column: 2 }}
                        dataSource={roleList}
                        renderItem={item => (

                            <List.Item>
                                <Card bordered={true}
                                    hoverable={true}
                                    style={{ textAlign: "center" }}

                                >
                                    <div><Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h5>{item.name}</h5></Col>
                                        <Col style={{ alignItems: "end" }}>
                                            <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.id, item.name, Tagtype.role)} />
                                        </Col>
                                    </Row>
                                    </div>
                                    <Divider />

                                    <CourseList courseList={item.courses} handleMappingStatus={setMappingStatus} mappingStatus={mappingStatus} />

                                    <Divider />
                                    <Button block>
                                        <Row justify="center" style={{ columnGap: 10 }} onClick={() => handleAddCourseModel(item.id, Tagtype.role)}>
                                            <Col>
                                                <p>{"Add Course"}</p>
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
                    <Modal title="Search & Add Courses" visible={isModalOpen} footer={null} onCancel={closeModel}>
                        <CourseSearch handleCourseTagMapping={setCourseTagMapping} courseTagMapping={courseTagMapping} />
                        <Divider />
                    </Modal>
                </>
            }
        </>
    );
}






