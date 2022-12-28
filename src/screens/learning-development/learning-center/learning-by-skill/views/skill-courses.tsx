import * as React from 'react';
import { List, Button, Card, Image } from 'antd';
import { CourseCard } from '../../../../../components/cards/content-configuration-card';
import Modal from 'antd/lib/modal/Modal';
import { CourseDetails } from '../../../../../components/course-detail/course-details';
import Meta from 'antd/lib/card/Meta';
import { formatBase64 } from '../../../../../utility/image-utils';
import { DEFAULT_LND_THUMBNAIL } from '../../../../../constants/string-constants';


export function CourseList(props: { courseList: any }) {

    const { courseList } = props;

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});


    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModel = () => {
        setIsModalOpen(false);
    };


    const handleCourseDetailsClick = (course: any) => {

        setCourseDetails(course);

        showModal();
    }

    return (
        <>
            <List
                grid={{ gutter: 16 }}
                dataSource={courseList}
                renderItem={({ course }) => (<List.Item key={course.id}>

                    <Card
                        style={{ width: 255 }}
                        hoverable={true}
                        cover={
                            < Image style={{
                                width: 255,
                                height: 154
                            }}
                                alt="image"
                                src={formatBase64(course.thumbnail)}
                                fallback={DEFAULT_LND_THUMBNAIL}
                                preview={false}
                            />
                        }
                        actions={[<Button onClick={()  => handleCourseDetailsClick(course) } type='link' >Go to course</Button>]}
                        >

                        <Meta
                            style={{ justifyContent: "center", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                            title={course.title}
                            description={course.description}
                        />

                    </Card >


                </List.Item>)
                }
            />

            <Modal
                title="Course Details"
                visible={isModalOpen}
                footer={null}
                onCancel={closeModel}
                width={1000}
                style={{ top: 100 }}>
                <CourseDetails course={courseDetails} />
            </Modal>
        </>
    );
}
