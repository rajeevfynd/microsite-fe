import Input from 'antd/lib/input';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseListType } from '../../../../../models/course-type';
import { debounce, getCourses } from '../../../../../service/program-service';
import { Button, Card, List, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ArrowRight } from 'react-bootstrap-icons';
import './index.css'

const SearchProgram = () => {
    const navigate = useNavigate();
    const [load, setLoad] = React.useState(false)
    const [courses, setCourses] = React.useState<CourseListType[]>([])
    const [page, setPage] = React.useState(0)
    const [keyState, setKeyState] = React.useState('')
    let key = ''

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

                <List
                    grid={{ gutter: 1, column: 3 }}
                    style={{ padding: "1%" }}
                    dataSource={courses}
                    renderItem={item => (
                        <List.Item key={item.title}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        src={item.thumbnailLink}
                                    />
                                }
                                actions={[
                                    <Button type='link' style={{ width: '100%' }} onClick={() => { navigate(item.id.toString()) }}> Go to Course <ArrowRight /> </Button>
                                ]}
                            >
                                <Meta
                                    title={item.title}
                                    description={<p style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.description}</p>}
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </>
    )
}
export default SearchProgram;