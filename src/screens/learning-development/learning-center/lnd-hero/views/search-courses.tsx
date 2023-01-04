import Input from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import { CourseListType } from '../../../../../models/course-type';
import { getCoursesFts } from '../../../../../service/program-service';
import { Button, Card, Divider, Image, List, Modal, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ArrowRight } from 'react-bootstrap-icons';
import './index.css'
import { CourseDetails } from '../../../../../components/course-detail/course-details';
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from '../../../../../utility/debounce-utils';
import { DEFAULT_LND_THUMBNAIL } from '../../../../../constants/string-constants';
import { formatBase64 } from '../../../../../utility/image-utils';
import { ShadowSearchInput } from '../../../../../components/shadow-input-text';

const SearchCourses = () => {
    const [load, setLoad] = React.useState(false)
    const [courses, setCourses] = React.useState<CourseListType[]>([])
    const [page, setPage] = React.useState(0)
    const [hasMore, setHasMore ] = React.useState(false)
    const [keyState, setKeyState] = React.useState(' ')
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [courseDetails, setCourseDetails] = React.useState({});
    let key = ''

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

    const loadMoreData = () => {
        if (load) { return; }
        setLoad(false);
        getCoursesFts(keyState, page.toString()).then(
            resp => {
                setCourses([...courses, ...resp.data.content])
                setHasMore(!resp.data.last)
                setPage(page + 1)
                setLoad(false)
            }
        )
    };

    const searchCourses = () => {
        setKeyState(key)
        if (load) { return; }
        setLoad(false);
        getCoursesFts(key).then(
            resp => {
                setCourses([...resp.data.content])
                setHasMore(!resp.data.last)
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

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <ShadowSearchInput 
                size='large' 
                placeholder='Search Courses...'
                onChange={(e:string) => {searchKey(e);} } 
            />
            </div>
            
            {courses.length != 0 &&

                <InfiniteScroll
                    dataLength={courses.length}
                    next={loadMoreData}
                    hasMore = {hasMore}
                    loader={<>&nbsp; <Spin size="large" /></>}
                    scrollThreshold="20%"
                    endMessage={<Divider plain></Divider>}
                >
                    <div><List
                    grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
                    style={{ padding: "1%" }}
                    dataSource={courses}
                    renderItem={item => (
                        <List.Item key={item.title}>
                            <Card
                                    hoverable
                                    style={{
                                        width: 340,
                                        height: 350
                                    }}
                                    cover={
                                        <Image
                                        src={formatBase64(item.thumbnail)}
                                            style={{
                                                width: 340,
                                                height: 195
                                            }}
                                            fallback={DEFAULT_LND_THUMBNAIL}
                                            preview={false}
                                        />
                                    }
                                    actions={[
                                        <Button onClick={()  => handleCourseDetailsClick(item) } type='link' >Show course</Button>
                                    ]}
                                >
                                    <Meta
                                        title={item.title}
                                        description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{item.description}</div>}
                                    />
                                </Card>

                        </List.Item>
                    )} /></div></InfiniteScroll>
            }
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
    )
}
export default SearchCourses;
