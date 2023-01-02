import { Row, Col, Image, Button, message, Result, Typography, Divider, Skeleton } from "antd"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { DEFAULT_LND_THUMBNAIL } from "../../../constants/string-constants"
import { GET_LEADERS_DOWNLOADS } from "../../../constants/urls"
import { LeadersDownloadType } from "../../../models/download-center-type"
import { getLeadersDownloads } from "../../../service/download-center-service"
import httpInstance from "../../../utility/http-client"
import { formatBase64 } from "../../../utility/image-utils"


const { Text } = Typography;

export const LeadersDownloads = () => {

    const [leadersList, setLeadersList] = React.useState<LeadersDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)


    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
        window.open(docUrl.data.url, '_blank')?.focus();
    }


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


    React.useEffect(() => {
        loadMoreData();
    }, [])

    const css = `
    .wrapper {
        position: relative;
        }
        .download-btn {
          position: absolute; /* becomes a layer */
          left: 0; /* relative to its parent wrapper */
          bottom:0; /* relative to its parent wrapper */
          z-index: 2;
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
                        <Row >
                        <Col span={5} style={{height:320}}>
                            <div className="wrapper">
                                <Image
                                    src={formatBase64(leader.document.thumbnail)}
                                    fallback={DEFAULT_LND_THUMBNAIL}
                                    width={'90%'}
                                    preview={false}
                                />
                                <Button className="download-btn" onClick={() => downloadDocument(leader.document.id)}>Click to download</Button>
                            </div>
                        </Col>
                        <Col span={16}>
                            <div>
                            <h5>{leader.name}</h5>
                            <p>{leader.designation }</p>
                            <p>{leader.description}</p>
                            </div>
                        </Col>
                </Row>
                    </>
            
            ))}


            </InfiniteScroll>


            
        </div>
    )
}

