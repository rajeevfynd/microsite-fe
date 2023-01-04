import { Card, Divider, List, message, Skeleton, Space } from 'antd'
import * as React from 'react'
import {DownloadOutlined} from '@ant-design/icons';
import { PolicyDownloadType } from '../../../models/download-center-type';
import { downloadDocument, getDocumentsList } from '../../../service/download-center-service';
import httpInstance from '../../../utility/http-client';
import { formatBase64 } from '../../../utility/image-utils';
import InfiniteScroll from 'react-infinite-scroll-component';

export const DownloadsGallery = (props:{downloadsUrl : string, searchKey : string}) => {
    const { Meta } = Card;

    const [data, setData] = React.useState<any[]>([])
    const [downloadsList, setDownloadsList] = React.useState<PolicyDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)


    const createDataList = () => {
        let tempList : any[] = []
            downloadsList.map(doc => (
                tempList.push({
                    id : doc.id,
                    documentId : doc.document.id,
                    thumbnail : doc.document.thumbnail,
                    title: doc.name,
                    description : doc.description,
                })
            ))
        setData(tempList)
    }

    const loadMoreData = () => {
        console.log("loadMoreData")
        if (loading) {
            return;
          }
        setLoading(true);
        console.log(loading)
        getDocumentsList(props.downloadsUrl, "", pageNumber.toString())
            .then(response => {
                setDownloadsList([...downloadsList , ...response.data.content])
                setHasMore(!response.data.last)
                setLoading(false);
            })
            .catch((error) => {
                message.error(error);
                setLoading(false);
            });
        setLoading(false);
        setPageNumber(pageNumber + 1);
    }


    React.useEffect(() => {
        loadMoreData();
    }, [])

    React.useEffect(() => {
        createDataList()
    }, [downloadsList])


    return (
        <>

            {props.searchKey.length <= 0 && 

                <div className='body-container' id="scrollableDiv">
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={hasMore}
                        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                        scrollThreshold={1}
                        height={600}
                    >


                        <List
                            grid={{gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4}}
                            dataSource={data}
                            renderItem={(item) => (
                            <List.Item>
                                <Card style={{ width: 300 }}
                                            hoverable
                                            cover={
                                                
                                                <img 
                                                onClick={() => downloadDocument(item.documentId)} 
                                                src={formatBase64(item.thumbnail)}/>
                                            }
                                            actions={[
                                                <>
                                                    <Space size={20}>

                                                        <DownloadOutlined onClick={() => downloadDocument(item.documentId)}></DownloadOutlined>
                                                    </Space>
                                                </>
                                            ]}
                                    >
                                            <Meta
                                                title= {item.title}
                                                description={item.description}
                                            />
                                </Card>
                            </List.Item>
                            )}
                            
                        />   

                    </InfiniteScroll>
                </div>

            }
        </>
    )

}
