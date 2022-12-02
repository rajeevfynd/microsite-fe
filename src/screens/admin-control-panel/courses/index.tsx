import { Button, Card, List, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { ShadowSearchInput } from '../../../components/shadow-input-text';
import { CourseListType } from '../../../models/course-type';
import { debounce, getCourses } from '../../../service/program-service';
import './index.css';

export const AdminCoursePage = () => {

    const [load, setLoad] = React.useState(false)
    const [courses, setCourses] = React.useState<CourseListType[]>([])
    const [page, setPage] = React.useState(0)
    const [hasMore, setHasMore ] = React.useState(false)
    const [keyState, setKeyState] = React.useState('')
    const navigate = useNavigate()
    let key = ''

    const loadMoreData = () => {
        if (load) { return; }
        setLoad(false);
        getCourses(keyState, page.toString()).then(
            resp => {
                console.log(resp.data.last)
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
        getCourses(key).then(
            resp => {
                console.log(resp.data.last)
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
        console.log(key)
        debounce(searchCourses, 500)
    }

    return (
        <>
            <h3>Manage Courses</h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <ShadowSearchInput placeholder='Search Course...'
                size='large'
                onChange={(e:any) => { console.log(e); searchKey(e); }}
                />
                <Button type="primary" style={{marginBottom: "30px"}} onClick={() => navigate("/admin/addCourse")}>Create new Course</Button>
                {courses.length != 0 &&
                    <InfiniteScroll
                        dataLength={courses.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        scrollableTarget="scrollableDiv"
                    >
                    <List
                        grid={{ gutter: 1, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
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
                                    cover={
                                        <img
                                            src={item.thumbnail}
                                        />
                                    }
                                >
                                    <Meta
                                        title={item.title}
                                        description={item.description}
                                    />
                                    <Button type='link'  onClick={()=>{navigate(item.id.toString())}} style={{ width: '100%' }} > Edit  </Button>
                                </Card>

                            </List.Item>
                        )}
                    />
                    </InfiniteScroll>
                }
            </div>
        </>
    )
}