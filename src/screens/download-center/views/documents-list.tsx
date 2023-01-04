import { List, Avatar, message, Divider, Skeleton } from "antd"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { PolicyDownloadType } from "../../../models/download-center-type";
import { downloadDocument, getDocumentsList } from "../../../service/download-center-service";
import { FileTextTwoTone } from "@ant-design/icons";



export const DocumentsList = (props : {downloadsUrl : string, searchKey : string}) => {
    const [data, setData] = React.useState<any[]>([])
    const [downloadsList, setDownloadsList] = React.useState<PolicyDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)

    const createDataList = () => {
        let tempList : any[] = []
            downloadsList.map(doc => (
                tempList.push({
                    key : doc.document.id,
                    avatar : doc.document.thumbnail,
                    title: doc.name,
                    description : doc.description,
                })
            ))
        setData(tempList)
    }

    const loadMoreData = () => {
        if (loading) {
          return;
        }
        setLoading(true);
          getDocumentsList(props.downloadsUrl, props.searchKey, pageNumber.toString())
            .then(response => {
                setDownloadsList([...downloadsList , ...response.data.content])
                setHasMore(!response.data.last)
                setLoading(false);
            })
            .catch((error) => {
                message.error(error);
                setLoading(false);
            });
        setPageNumber(pageNumber + 1);
      };

    const searchDownloads = () => {
        if(loading) { return ;}
        setLoading(false);
        setPageNumber(1)
        getDocumentsList(props.downloadsUrl, props.searchKey)
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


    React.useEffect(() => {
        loadMoreData();
    }, [])

    React.useEffect(() => {
        createDataList()
    }, [downloadsList])

    React.useEffect(() => {
        searchDownloads()
    }, [props.searchKey])

    return (
        <><div className="body-container" id="scrollableDiv">
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
                scrollThreshold={1}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<FileTextTwoTone />} onClick={() => downloadDocument(item.key)} style={{ cursor: "pointer" }} />}
                                title={<span onClick={() => downloadDocument(item.key)} style={{ cursor: "pointer" }}>{item.title}</span>}
                                description={item.description} />
                        </List.Item>
                    )} />
            </InfiniteScroll>

        </div></>
    )

}