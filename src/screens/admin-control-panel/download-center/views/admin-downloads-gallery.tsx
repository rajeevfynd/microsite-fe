import { Card, Divider, List, message, Skeleton, Space } from 'antd'
import * as React from 'react'
import {DownloadOutlined} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PolicyDownloadType } from '../../../../models/download-center-type';
import { getDocumentsList } from '../../../../service/download-center-service';
import httpInstance from '../../../../utility/http-client';
import { formatBase64 } from '../../../../utility/image-utils';
import { ShowDeleteConfirm } from './showDeleteConfirm';

export const AdminDownloadsGallery = (props:{downloadsUrl : string, deleteUrl : string}) => {
    const { Meta } = Card;

    const [data, setData] = React.useState<any[]>([])
    const [downloadsList, setDownloadsList] = React.useState<PolicyDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)

    const handleImgClick = async (documentId : number) => {
        let docUrl = await httpInstance.get("/microsite/document/download/" + documentId)
        window.open(docUrl.data.url, '_blank')?.focus();
    }


    const createDataList = () => {
        let tempList : any[] = []
            downloadsList.map(doc => (
                tempList.push({
                    key : doc.id,
                    documentId : doc.document.id,
                    thumbnail : doc.document.thumbnail,
                    title: doc.name,
                    description : doc.description,
                })
            ))
        setData(tempList)
    }

    const onDeleteConfirm = () => {
        console.log("onDeleteConfirm")
        setPageNumber(1)
        getDocumentsList(props.downloadsUrl, "")
        .then(response => {
            setDownloadsList(response.data.content)
            setHasMore(!response.data.last)
            setLoading(false);
        })
        .catch((error) => {
            message.error(error);
            setLoading(false);
        });

    }

    const loadMoreData = () => {
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

        <div className='body-container' id="scrollableDiv">
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >


                <List
                    grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3}}
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item>
                        <Card style={{ width: 300 }}
                                    hoverable
                                    cover={
                                        
                                        <img 
                                        onClick={() => handleImgClick(item.documentId)} 
                                        src={formatBase64(item.thumbnail)}/>
                                    }
                                    actions={[
                                        <>
                                            <Space size={20}>

                                                <DownloadOutlined onClick={() => handleImgClick(item.documentId)}></DownloadOutlined>
                                                <ShowDeleteConfirm deleteUrl={props.deleteUrl} id={item.key} onDeleteConfirm = {onDeleteConfirm}></ShowDeleteConfirm>
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
        </>
    )

}
