import Input from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseListType } from '../../../../../models/course-type';
import { debounce, getCourses } from '../../../../../service/program-service';
import { Button, Card, List, Typography, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ArrowRight } from 'react-bootstrap-icons';
import './index.css'
import { CourseDetails } from '../../../../../components/course-detail/course-details';

const SearchProgram = () => {
    const navigate = useNavigate();
    const [load, setLoad] = React.useState(false)
    const [courses, setCourses] = React.useState<CourseListType[]>([])
    const [page, setPage] = React.useState(0)
    const [keyState, setKeyState] = React.useState(' ')
    let key = ' '

    const loadMoreData = () => {
        if (load) { return; }
        setLoad(false);
        getCourses(keyState, page.toString()).then(
            resp => {
                setCourses([...courses, ...resp.data.content])
                setPage(page + 1)
                setLoad(false)
            }
        )
    };

    const searchCourses = () => {
        setKeyState(key)
        if (load) { return; }
        setLoad(false);
        getCourses(key).then(
            resp => {
                setCourses([...resp.data.content])
                setPage(1)
                setLoad(false)
            }
        )
    }

    React.useEffect(() => {
        loadMoreData();
    }, []);

    const searchKey = (str: string) => {
        key = str
        debounce(searchCourses, 500)
    }
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
            <div className='search-container'>
                <Input
                    size='large'
                    placeholder='Search courses'
                    className='search-box'
                    suffix={<SearchOutlined />}
                    onChange={(e) => { searchKey(e.target.value); }}
                />
            </div>
            {courses.length != 0 &&

                <><List
                    grid={{ gutter: 1, column: 3 }}
                    style={{ padding: "1%" }}
                    dataSource={courses}
                    renderItem={item => (
                        <List.Item key={item.title}>
                            <Card
                                hoverable
                                style={{
                                    width: 340,
                                    height: 300
                                }}
                                cover={<img
                                    src={item.thumbnail} />}
                            >
                                <Meta
                                    title={item.title}
                                    description={item.description} />
                                <Button type='link' style={{ width: '100%' }} onClick={() => { handleCourseDetailsClick(item); } }> Go to Course <ArrowRight /> </Button>
                            </Card>
                        </List.Item>
                    )} /><Modal
                        title="Course Details"
                        visible={isModalOpen}
                        footer={null}
                        onCancel={closeModel}
                        width={1000}
                        style={{ top: 100 }}>
                        <CourseDetails course={courseDetails} />
                    </Modal></>
            }
        </>
    )
}
export default SearchProgram;
