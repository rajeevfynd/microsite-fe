import { Button, Card, Input, List, Modal, Result, Skeleton, Typography, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { ProgramDetailType } from '../../../models/journey-details';
import { deleteProgram } from '../../../service/program-service';
import { PlusLg, Trash, PencilSquare } from 'react-bootstrap-icons';
import { getPrograms } from '../../../service/program-service';
import { debounce } from '../../../utility/debounce-utils';
import { DEFAULT_LND_THUMBNAIL } from '../../../constants/string-constants';
const { Text } = Typography;

export  const AdminProgramList = () => {
  const navigate = useNavigate();
  const [load, setLoad] = React.useState(false)
  const[ programs, setPrograms] = React.useState<ProgramDetailType[]>([])
  const [hasMore, setHasMore ] = React.useState(false)
  const [page,setPage ] = React.useState(0)
  const [keyState, setKeyState] = React.useState('')
  let key = ''

  const loadMoreData = () => {
    if (load) { return; }
    setLoad(false);
    getPrograms(keyState,page.toString()).then(
      resp => {
        setPrograms([...programs, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPage(page+1)
        setLoad(false)
      }
    )
  };

  const searchPrograms = () => {
    setKeyState(key)
    if(load) { return ;}
    setLoad(false);
    getPrograms(key).then(
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

  const searchKey = (str: string) =>{
    key = str
    debounce(searchPrograms,500)
  }

  const handleDelete = (id: string, title: string) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete '+title,
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
          deleteProgram(id).then( res => { if(res.data == 'success') { searchPrograms() } }) 
      }
    });
  }
 
  return (
    <>
    <h3>Programs</h3>
    <div className='search-container'>
      <Input 
        size='large' 
        className='home-card search-card search-box' 
        style={{padding:15}}
        suffix={<SearchOutlined/>} 
        placeholder='Search Programs...'
        allowClear
        onChange={(e) => {searchKey(e.target.value);} } 
    />
    <div>
        <Button style={{borderRadius: 5}} onClick={()=>navigate('new')} type='primary'><PlusLg style={{marginRight:"5px"}}/> New Program</Button>
    </div>
    </div>
    <div
      id="scrollableDiv"
    >
      { programs.length != 0 &&
      <InfiniteScroll
        dataLength={programs.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{gutter: 16, column: 4}}
          style={{padding : "1%"}}
          dataSource={programs}
          renderItem={item => (
            <List.Item key={item.title}>
              <Card 
                hoverable
                cover={
                  < Image
                    width='150' height='250'
                    src={`data:image/png;base64,${item.thumbnailLink}`}
                    fallback={DEFAULT_LND_THUMBNAIL}
                  />
                }
                actions={[
                    <Button onClick={()=>{navigate(item.id.toString())}} style={{width: '100%'}} type='link' > Edit <PencilSquare style={{margin:'5%'}}/> </Button>,
                    <Button onClick={()=>handleDelete(item.id.toString(), item.title)} type='link' danger> Delete <Trash style={{margin:'5%'}}/> </Button>
                ]}
              >
                <Meta
                  title={item.title}
                  description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{item.description}</div>}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      }
      {
        programs.length == 0 &&
        <Result
          status="404"
          title={<Text type='secondary'>No Program Found</Text>}
        />
      }
    </div>
    </>
  );
};