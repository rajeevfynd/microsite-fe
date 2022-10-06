import { Avatar, Card, Divider, Input, List, Skeleton } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Navigate, useNavigate } from 'react-router-dom';
import { JourneyDetailType } from '../../../../models/journey-details'; 
import httpInstance from '../../../../utility/http-client';
import './../index.css'


interface JourneyPage {
  content ?: Array<JourneyDetailType>,
  empty ?: boolean,
  first ?: true,
  last ?: true,
  number ?: number,
  numberOfElements ?: number,
  size ?: number,
  totalElements ?: number,
}

export  const LearningJourneyList = () => {
    const navigate = useNavigate();
  const [load, setLoad] = React.useState(false)
  const[ journeys, setJourneys] = React.useState<JourneyDetailType[]>([])
  const [hasMore, setHasMore ] = React.useState(false)
  const [page,setPage ] = React.useState(1)
  
  let key = ''

  const loadMoreData = () => {
    if (load) {
      return;
    }
    setLoad(false);

    httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+page.toString()+'&size=8').then(
      resp => {
        setJourneys([...journeys, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(page +1)
        setLoad(false)
      }
    )
  };

  const searchJourneys = () => {
    if(load) {
      return ;
    }
    setLoad(false);

    httpInstance.get('/microsite/lnd/journeys/search?key='+key.toString()+'&page='+'&size=8').then(
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
    handleSearch()
  }

  const handleSearch = () => {
    debounce(searchJourneys,500)
  }

let debounceTimer:any;
 
const debounce = (callback:any, time:any) => {
  window.clearTimeout(debounceTimer);
  debounceTimer = window.setTimeout(callback, time);
};
 

  return (
    <>
    <h3>Learning Journey</h3>
    <div className='search-container'>
      <Input size='large' className='search-box' suffix={<SearchOutlined/>} onChange={(e) => {searchKey(e.target.value);} } />
    </div>
    <div
      id="scrollableDiv"
      style={{
        height: '60vh',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={journeys.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{gutter: 16, column: 4}}
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
                  description={item.description}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
    </>
  );
};