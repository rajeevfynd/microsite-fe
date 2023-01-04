import { List, Avatar, message, Divider, Skeleton, Modal } from "antd"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component";
import { FileTextTwoTone } from "@ant-design/icons";
import { PolicyDownloadType, SubmenuTabsType } from "../../../../models/download-center-type";
import { getDocumentsList } from "../../../../service/download-center-service";
import httpInstance from "../../../../utility/http-client";
import { ShowDeleteConfirm } from "./showDeleteConfirm";
import { EditPolicyTemplates } from "./edit-policy-templates";
import { HRPoliciesSubmenu } from "../../../../models/enums/hr-policies-submenu";
import { DownloadDocumentType } from "../../../../models/enums/download-document-type";
import { TemplatesSubmenu } from "../../../../models/enums/templates-submenu";


export const AdminDocumentsList = (props : {downloadsUrl : string, searchKey : string, deleteUrl : string, 
    categoryList : SubmenuTabsType[], downloadType: DownloadDocumentType, editUrl : string, addNew : boolean}) => {
    const [data, setData] = React.useState<any[]>([])
    const [downloadsList, setDownloadsList] = React.useState<PolicyDownloadType[]>([])
    const [loading, setLoading] = React.useState(false);
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [hasMore, setHasMore] = React.useState<boolean>(false)

    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
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
                    category : props.downloadType == DownloadDocumentType.HR_POLICIES ? HRPoliciesSubmenu[doc.category as keyof typeof HRPoliciesSubmenu]
                                : TemplatesSubmenu[doc.category as keyof typeof TemplatesSubmenu]
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

    const handleSubmit = () => {
        console.log(props.downloadsUrl)
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
        handleSubmit();
    }, [props.downloadsUrl, props.addNew])

    React.useEffect(() => {
        createDataList()
    }, [downloadsList])

    React.useEffect(() => {
        searchDownloads()
    }, [props.searchKey])

    return (
        <div className="body-container" id="scrollableDiv">
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={hasMore}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
                height={600}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item
                        actions={[
                        <EditPolicyTemplates categoryList={props.categoryList} downloadUrl={props.editUrl} onFinish={handleSubmit} documentDetails={item} />,
                        <ShowDeleteConfirm deleteUrl={props.deleteUrl} id={item.key} onDeleteConfirm = {handleSubmit}></ShowDeleteConfirm>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar icon={<FileTextTwoTone />} onClick={() => downloadDocument(item.documentId)} style={{cursor:"pointer"}}/>}
                            title={<span onClick={() => downloadDocument(item.documentId)} style={{cursor:"pointer"}}>{item.title}</span>}
                            description={item.description}
                        />
                    </List.Item>
                    )}
                />
            </InfiniteScroll>

        </div>
    )

}
