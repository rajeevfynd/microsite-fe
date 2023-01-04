import { Row, Col, Image, Button, message, Result, Typography, Divider, Skeleton, Space, Card } from "antd"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { DEFAULT_LND_THUMBNAIL } from "../../../../constants/string-constants";
import { GET_LEADERS_DOWNLOADS } from "../../../../constants/urls";
import { LeadersDownloadType } from "../../../../models/download-center-type";
import { downloadDocument, getLeadersDownloads } from "../../../../service/download-center-service";
import { formatBase64 } from "../../../../utility/image-utils";
import { AddLeadersDownload } from "./add-leaders-download";
import { EditLeadersDownload } from "./edit-leaders-downloads";
import { ShowDeleteConfirm } from "./showDeleteConfirm";


const { Text } = Typography;

export const AdminLeadersDownloads = () => {

    const [leadersList, setLeadersList] = React.useState<LeadersDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)
    const [deleteUrl, setDeleteUrl] = React.useState<string>('')



    const loadMoreData = () => {
        if (loading) {
          return;
        }
        setLoading(true);
        getLeadersDownloads(GET_LEADERS_DOWNLOADS, pageNumber.toString())
            .then(response => {
                setLeadersList([...leadersList , ...response.data.content])
                setHasMore(!response.data.last)
                setLoading(false);
            })
            .catch((error) => {
                message.error(error);
                setLoading(false);
            });
        setPageNumber(pageNumber + 1);
      };

    
    const handleSubmit = () => {
        setPageNumber(1)
        getLeadersDownloads(GET_LEADERS_DOWNLOADS)
        .then(response => {
            setLeadersList(response.data.content)
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
        setDeleteUrl(GET_LEADERS_DOWNLOADS + "/delete/")
    }, [])

    const css = `
        .download-btn {
          width: 90%;
        }
        `

    return (
        <div className="body-container">
            <style>
                {css}
            </style>

            {
                (leadersList.length == 0) &&

                <Result
                    status="404"
                    title={<Text type='secondary'>No Downloads Found</Text>}
                />

            }

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingBottom: "60px"}}>
                <AddLeadersDownload onAddSubmit = {handleSubmit}/>
            </div>

            <InfiniteScroll
                dataLength={leadersList.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                {leadersList && leadersList.map(leader => (
                    <>
                        <Row>
                        <Col span={5}>
                            <div style={{marginBottom : 30}}>
                                <Card
                                    hoverable
                                    style={{ width: 300}}
                                    cover={<img src={formatBase64(leader.document.thumbnail)}/>}
                                    type="inner"
                                >
                                    <Button className="download-btn" type="text" onClick={() => downloadDocument(leader.document.id)}>
                                        Click to download
                                    </Button>
                                </Card>
                            </div>
                        </Col>
                        <Col span={17}>
                            <div>
                            <h5>{leader.name}</h5>
                            <p>{leader.designation }</p>
                            <p>{leader.description}</p>
                            </div>
                        </Col>
                        <Col span={2}>
                            <div>
                                <Space size={20}>
                                    <EditLeadersDownload downloadUrl={GET_LEADERS_DOWNLOADS} onFinish={handleSubmit} documentDetails={leader} />
                                    <ShowDeleteConfirm deleteUrl={deleteUrl} id={leader.id.toString()} onDeleteConfirm = {handleSubmit}/>
                                </Space>
                            </div>
                        </Col>
                </Row>
                    </>
            
            ))}


            </InfiniteScroll>
            
        </div>
    )
}

