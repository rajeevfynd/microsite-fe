import { Button, Col, List, Row, Skeleton, Image, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react'
import { ArrowRight } from 'react-bootstrap-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate, useParams } from 'react-router-dom'
import { DEFAULT_LND_THUMBNAIL } from '../../../../constants/string-constants';
import { Tagtype } from '../../../../constants/tag';
import httpInstance from '../../../../utility/http-client';
import { formatBase64 } from '../../../../utility/image-utils';

type tagType = {
    name: string,
    description: string,
    id: string
}

export const LearningBy = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [tags,setTags] = React.useState<any[]>([])
    const [selected, setSelected] = React.useState()
    const [programs, setPrograms] = React.useState<any[]>([])
    const [hasMore, setHasMore] = React.useState(false)
    const [page,setPage ] = React.useState(0)
    const [load,setLoad] = React.useState(false)

    const getTags = (tag: string) => {
        
        httpInstance.get(`/microsite/tag/?tagType=${tag}`).then( resp => {
            setTags([...resp.data])
            if(resp.data.length > 0)
                setSelected(resp.data[0].id)
                getPrograms(resp.data[0].id)
        }) ;
    }

    const getPrograms = (id: string|undefined ) => {
            if(id){
                httpInstance.get(`/microsite/program-tag/programs-by-tag-id/?tagId=${id}&offset=${0}&pageSize=${8}`).then(resp => {
                    console.log(resp.data.content)
                    setPrograms(resp.data.content)
                    setHasMore(!resp.data.last)
                    setPage(1)
                })
            }
    }

    const loadMoreData = (id: string|undefined) => {
        if (load) { return; }
        setLoad(false);
        httpInstance.get(`/microsite/program-tag/programs-by-tag-id/?tagId=${id}&offset=${page}&pageSize=${8}`).then(
          resp => {
            setPrograms([...programs, ...resp.data.content])
            setHasMore(!resp.data.last)
            setPage(page +1)
            setLoad(false)
          }
        )
      };

    React.useEffect(()=>{
        if(params.tag){
            let tag = params.tag.toUpperCase() == Tagtype.role ? Tagtype.role : Tagtype.skill;
            getTags(tag)
        }
    },[params])
    
  return (
    <>
       <Row >
            <Col span={3}> 
                <div style={{width:'100%', textAlign:'center'}}>
                    <h3 style={{padding: '10%'}}>{params.tag?.toUpperCase()} CATEGORY</h3>
                    <div style={{overflow: 'scroll'}}>
                    {tags.map( (tag) =>
                        <Row key={tag.id}>
                            <Button type={selected == tag.id ? 'primary' : 'link' } style={{width:'100%', textAlign:'left'}} onClick={()=>{setSelected(tag.id); getPrograms(tag.id)}}>{tag.name}</Button>
                        </Row>)}
                    </div>
                </div>
            </Col>
            <Col span={21}>
                {tags.length > 0 && tags.map( (tag) => tag.id == selected && 
                    <div style={{padding: '10px 50px'}}>
                        <h1>{tag.name.toUpperCase()}</h1>
                        <p>
                            {tag.description}
                        </p>
                    </div>)
                }
            <div
                style={{
                    width: '100%',
                    overflow: 'scroll',
                }}
                id="scrollableTagDiv"
                >
                { programs.length != 0 &&
                <InfiniteScroll
                    dataLength={programs.length}
                    next={()=>{loadMoreData(selected)}}
                    hasMore={hasMore}
                    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                    scrollableTarget="scrollableTagDiv"
                >
                    <List
                        grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
                        style={{padding : "1%"}}
                        dataSource={programs}
                        renderItem={item => (
                            <List.Item key={item.program.id}>
                            <Card 
                                hoverable
                                style={{
                                width: 340,
                                height: 350
                                }}
                                cover={
                                <Image
                                    style={{
                                    width: 340,
                                    height: 195
                                    }}
                                    src={formatBase64(item.program.thumbnail)}
                                    fallback={DEFAULT_LND_THUMBNAIL}
                                    preview={false}
                                />
                            }
                            actions={[
                                <Button type='link' style={{width:'100%'}} onClick={()=>{navigate('/lnd/programs/'+item.program.id.toString())}}> Go to Program </Button>
                            ]}
                        >
                            <Meta
                            title={item.program.title}
                            description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{item.program.description}</div>}
                            />
                        </Card>
                        </List.Item>
                    )}
                    />
                </InfiniteScroll>
                }
                </div>
            </Col>
        </Row>
        
    </>
  )
}
