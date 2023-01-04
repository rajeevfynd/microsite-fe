import * as React from 'react';
import { Program } from '../../../../../models/course-type';
import { getProgramFts } from '../../../../../service/program-service';
import { Button, Card, Divider, Image, List, Modal, Spin } from 'antd';
import Meta from 'antd/lib/card/Meta';
import './index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import { debounce } from '../../../../../utility/debounce-utils';
import { DEFAULT_LND_THUMBNAIL } from '../../../../../constants/string-constants';
import { formatBase64 } from '../../../../../utility/image-utils';
import { ShadowSearchInput } from '../../../../../components/shadow-input-text';
import { useNavigate, useParams } from 'react-router-dom';

const SearchPrograms = () => {
    const [load, setLoad] = React.useState(false)
    const [programs, setPrograms] = React.useState<Program[]>([])
    const [page, setPage] = React.useState(0)
    const [hasMore, setHasMore ] = React.useState(false)
    const [keyState, setKeyState] = React.useState(' ')
    const { id } = useParams<string>();
    const navigate = useNavigate();
    let key = ''


    const handleProgramDetailsClick = (program: any) => {
        console.log(program)
        navigate('/lnd/programs/'+program.id)
    }

    const loadMoreData = () => {
        if (load) { return; }
        setLoad(false);
        getProgramFts(keyState, page.toString()).then(
            resp => {
                setPrograms([...programs, ...resp.data.content])
                setHasMore(!resp.data.last)
                setPage(page + 1)
                setLoad(false)
            }
        )
    };

    const searchPrograms = () => {
        setKeyState(key)
        if (load) { return; }
        setLoad(false);
        getProgramFts(key).then(
            resp => {
                setPrograms([...resp.data.content])
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
        debounce(searchPrograms, 500)
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <ShadowSearchInput 
                size='large' 
                placeholder='Search Programs...'
                onChange={(e:string) => {searchKey(e);} } 
            />
            </div>
            
            {programs.length != 0 &&

                <InfiniteScroll
                    dataLength={programs.length}
                    next={loadMoreData}
                    hasMore = {hasMore}
                    loader={<>&nbsp; <Spin size="large" /></>}
                    scrollThreshold="20%"
                    endMessage={<Divider plain></Divider>}
                >
                    <div><List
                    grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
                    style={{ padding: "1%" }}
                    dataSource={programs}
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
                                        <Button onClick={()  => handleProgramDetailsClick(item) } type='link' >Go to program</Button>
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
        </>
    )
}
export default SearchPrograms;
