import { Button, Card, Image, List, Result, Skeleton, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';
import { PencilSquare, PlusLg, Trash } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { ShadowSearchInput } from '../../../components/shadow-input-text';
import { DEFAULT_LND_THUMBNAIL } from '../../../constants/string-constants';
import { CourseListType } from '../../../models/course-type';
import { getCourses } from '../../../service/program-service';
import { debounce } from '../../../utility/debounce-utils';
import { formatBase64 } from '../../../utility/image-utils';
import './index.css';
const { Text } = Typography;

export const AdminCoursePage = () => {

    const [load, setLoad] = React.useState(false)
    const [courses, setCourses] = React.useState<CourseListType[]>([])
    const [page, setPage] = React.useState(0)
    const [hasMore, setHasMore] = React.useState(false)
    const [keyState, setKeyState] = React.useState('')
    const navigate = useNavigate()
    let key = ''

    const loadMoreData = () => {
        if (load) { return; }
        setLoad(false);
        getCourses(keyState, page.toString()).then(
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
        getCourses(key).then(
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
                <ShadowSearchInput placeholder='Type in the course title you are looking for...'
                    size='large'
                    onChange={(e: any) => { searchKey(e); }}
                />
                <Button style={{ borderRadius: 5 }} onClick={() => navigate("/admin/admin-lnds/courses/addCourse")} type='primary'><PlusLg style={{ marginRight: "5px" }} /> New Course</Button>
                <div style={{ width: "100%", height: '100%' }} >
                    {courses.length != 0 &&
                        <InfiniteScroll
                            dataLength={courses.length}
                            next={loadMoreData}
                            hasMore={hasMore}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            scrollableTarget="scrollableDiv"

                        >
                            <List
                                grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4 }}
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
                                                <Button onClick={() => { item.id && navigate(item.id.toString()) }} type='link' > <PencilSquare style={{ margin: '10%' }} /> </Button>
                                            ]}
                                        >
                                            <Meta
                                                title={item.title}
                                                description={<div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height: '20px' }}>{item.description}</div>}
                                            />
                                        </Card>

                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    }
                    {
                        courses.length == 0 &&
                        <Result
                            status="404"
                            title={<Text type='secondary'>No Courses Found</Text>}
                        />
                    }
                </div>

            </div>
        </>
    )
}