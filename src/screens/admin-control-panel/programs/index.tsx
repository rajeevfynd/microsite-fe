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
import { ShadowSearchInput } from '../../../components/shadow-input-text';
import { formatBase64 } from '../../../utility/image-utils';
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ShadowSearchInput 
        size='large' 
        placeholder='Type in the program title you are looking for...'
        onChange={(e:string) => {searchKey(e);} } 
    />
    <Button style={{borderRadius: 5}} onClick={()=>navigate('new')} type='primary'><PlusLg style={{marginRight:"5px"}}/> New Program</Button>
    <div
      id="scrollableDiv"
      style={{
        width: '100%',
        height: '100%'
      }}
    >{ programs.length != 0 &&
      <InfiniteScroll
        dataLength={programs.length}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
          style={{padding : "1%"}}
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
                  < Image
                    style={{
                      width: 340,
                      height: 195
                    }}
                    src={formatBase64(item.thumbnail)}
                    fallback={DEFAULT_LND_THUMBNAIL}
                    preview={false}
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

    </div>
    </>
  );
};