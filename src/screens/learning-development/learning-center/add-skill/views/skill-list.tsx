"strict"
import * as React from 'react';
import Axios from 'axios';
import { Col, Row, Card, List, Divider, Button, Modal, } from 'antd';
import { PlusCircleOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Tagtype } from '../../../../../constants/tag';
import { CourseList } from './course-list';
import httpInstance from '../../../../../utility/http-client';
const { confirm } = Modal;



export const SkillList = (props: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [skillList, setSkillList] = React.useState([]);
    const [skillId, setSkillId] = React.useState(null);




    const showConfirm = (skillId: number, skillName: string, skillType: string) => {
        confirm({
            title: `Do you Want to delete this "${skillName}" ${skillType === "SKILL" ? "Skill" : "Course"}? `,
            icon: <ExclamationCircleOutlined />,
            // content: <p>{name}</p>,
            onOk() {
                setSkillId(skillId);
            },
            onCancel() {
                setSkillId(null);
            },
        });
    };

    React.useEffect(() => {
        //Api -> getAllActiveSkillTags
        (() => {
            setIsLoading(true);
            httpInstance.get(`/microsite/tag/?tagType=${Tagtype.skill}`)
                .then((response) => {
                    if (!!response.data.length) {
                        setSkillList(response.data);
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();

    }, [skillId])


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
                })
                .catch((error) => {
                    console.log(error.message);
                    window.alert(`${error.message}`);
                });
        })();

    }, [skillId])




    return (

        <>
            {isLoading ? "Loading" :
                <> {!!skillList.length ?
                    <List
                        grid={{ gutter: 16, column: 2 }}
                        dataSource={skillList}
                        renderItem={item => (

                            <List.Item>
                                <Card bordered={true}
                                    hoverable={true}
                                    style={{ textAlign: "center" }}

                                >
                                    <div><Row style={{ justifyContent: "space-between" }}>
                                        <Col flex={1} ><h5>{item.name}</h5></Col>
                                        <Col style={{ alignItems: "end" }}>
                                            <DeleteOutlined style={{ fontSize: 20 }} onClick={() => showConfirm(item.id, item.name, Tagtype.skill)} />
                                        </Col>
                                    </Row>
                                    </div>
                                    <Divider />

                                    <CourseList courseList={skillList} />

                                    <Divider />
                                    <Button block>
                                        <Row justify="center" style={{ columnGap: 10 }}>
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
                </>
            }
        </>
    );
}






