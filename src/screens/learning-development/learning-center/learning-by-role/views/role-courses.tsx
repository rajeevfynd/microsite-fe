import * as React from 'react';
import { List, Button, Modal } from 'antd';
import { CourseCard } from '../../../../../components/cards/content-configuration-card';
import { CourseDetails } from '../../../../../components/course-detail/course-details';


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
        <List
            grid={{ gutter: 32 }}
            dataSource={courseList}
            renderItem={({ course }) => (<List.Item key={course.id}>

                <CourseCard
                    key={course.id}
                    cardStyle={{ width: 255 }}
                    isHoverable={true}
                    imageStyle={{
                        width: 255,
                        height: 154
                    }}
                    imageSource={course.thumbnail}
                    metaStyle={{ justifyContent: "center", whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    title={course.title}
                    description={course.description}
                />


                <Button type="primary" block onClick={() => handleCourseDetailsClick(course)}> View Course Details </Button>


                <Modal
                    title="Course Details"
                    visible={isModalOpen}
                    footer={null}
                    onCancel={closeModel}
                    width={1000}
                    style={{ top: 100 }}>
                    <CourseDetails course={courseDetails} />
                </Modal>

            </List.Item>
            )
            }
        />

    );
}
