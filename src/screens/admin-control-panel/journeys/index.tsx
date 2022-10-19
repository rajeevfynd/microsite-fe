import { Button, Card, Input, List, Result, Skeleton, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { JourneyDetailType } from '../../../models/journey-details';
import { getMoreJourneys, filterJourneys, debounce } from '../../../service/journey-service';
import { PlusLg } from 'react-bootstrap-icons';
const { Text } = Typography;

export  const AdminJourneyList = () => {
  const navigate = useNavigate();
  const [load, setLoad] = React.useState(false)
  const[ journeys, setJourneys] = React.useState<JourneyDetailType[]>([])
  const [hasMore, setHasMore ] = React.useState(false)
  const [page,setPage ] = React.useState(0)
  const [keyState, setKeyState] = React.useState('')
  let key = ''

  const loadMoreData = () => {
    if (load) { return; }
    setLoad(false);
    getMoreJourneys(keyState,page.toString()).then(
      resp => {
        setJourneys([...journeys, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(page +1)
        setLoad(false)
      }
    )
  };

  const searchJourneys = () => {
    setKeyState(key)
    if(load) { return ;}
    setLoad(false);
    filterJourneys(key,page.toString()).then(
      resp => {
        setJourneys([...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(2)
        setLoad(false)
      }
    )
  }

  React.useEffect(() => {
    loadMoreData();
  }, []);

  const searchKey = (str: string) =>{
    key = str
    debounce(searchJourneys,500)
  }
 
  return (
    <>
    <h3>Journeys</h3>
    <div className='search-container'>
      <Input 
        size='large' 
        className='search-box' 
        suffix={<SearchOutlined/>} 
        onChange={(e) => {searchKey(e.target.value);} } 
    />
    <div style={{textAlign : 'right'}}>
        <Button onClick={()=>navigate('new')} type='primary'><PlusLg style={{marginRight:"5px"}}/> New Journey</Button>
    </div>
    </div>
    <div
      id="scrollableDiv"
    >
      { journeys.length != 0 &&
      <InfiniteScroll
        dataLength={journeys.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{gutter: 16, column: 4}}
          style={{padding : "1%"}}
          dataSource={journeys}
          renderItem={item => (
            <List.Item onClick={()=>{navigate(item.id.toString())}} key={item.title}>
              <Card 
                hoverable
                cover={
                  <img
                    src={item.thumbnailLink}
                  />
                }
              >
                <Meta
                  title={item.title}
                  description={<p style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>{item.description}</p>}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      }
      {
        journeys.length == 0 &&
        <Result
          status="404"
          title={<Text type='secondary'>No Journey Found</Text>}
        />
      }
    </div>
    </>
  );
};