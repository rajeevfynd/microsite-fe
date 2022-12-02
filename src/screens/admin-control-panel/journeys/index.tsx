import { Button, Card, Input, List, Modal, Result, Skeleton, Typography } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { JourneyDetailType } from '../../../models/journey-details';
import { getJourneys, debounce, deleteJourney } from '../../../service/journey-service';
import { PencilSquare, PlusLg, Trash } from 'react-bootstrap-icons';
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
    getJourneys(keyState,page.toString()).then(
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
    getJourneys(key).then(
      resp => {
        setJourneys([...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(1)
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

  const handleDelete = (id: string, title: string) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete '+title,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
          deleteJourney(id).then( res => { if(res.data == 'success') { searchJourneys() } }) 
      }
    });
  }
 
  return (
    <>
    <h3>Journeys</h3>
    <div className='search-container'>
      <Input 
        size='large' 
        className='home-card search-card search-box' 
        style={{padding:15}}
        suffix={<SearchOutlined/>} 
        placeholder='Search Journeys...'
        allowClear
        onChange={(e) => {searchKey(e.target.value);} } 
    />
    <div>
        <Button style={{borderRadius: 5}} onClick={()=>navigate('new')} type='primary'><PlusLg style={{marginRight:"5px"}}/> New Journey</Button>
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
            <List.Item key={item.title}>
              <Card 
                hoverable
                cover={
                  <img
                    width='150' height='250'
                    src={`data:image/png;base64,${item.thumbnailLink}`}
                  />
                }
                actions={[
                  <Button onClick={()=>{navigate(item.id.toString())}} style={{width: '100%'}} type='link' > Edit <PencilSquare style={{margin:'5%'}}/> </Button>,
                  <Button onClick={()=>handleDelete(item.id.toString(), item.title)} style={{width: '100%'}} type='link' danger> Delete <Trash style={{margin:'5%'}} /> </Button>
              ]}
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