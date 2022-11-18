import { Space, message, Table, Layout, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import * as React from "react";
import { GET_NEW_EMPLOYEE_DOWNLOADS_URL } from "../../../constants/urls";
import { DownloadDocumentType, DownloadListPropsType } from "../../../models/download-center-type";
import httpInstance from "../../../utility/http-client";


export const DownloadsList = (props:{downloadListProps: DownloadListPropsType}) => {
    const { downloadListProps} = props;
    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>()
    const [documentLink, setDocumentLink] = React.useState(null)


    function forceDownload(blob: string, filename: string) {
        var a = document.createElement('a');
        a.download = filename;
        a.rel = "noopener noreferrer"
        a.target = "_blank"
        a.href = blob;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
        // setDocumentLink(docUrl.data.url)
        console.log(docUrl.data.url)
        forceDownload(docUrl.data.url, "xyz.jpg")

        // fetch(docUrl.data.url, 
        //     {
        //     headers: new Headers({
        //         'Origin': location.origin,
        //         'Access-Control-Allow-Origin' : '*',
        //     //     'Access-Control-Allow-Credentials' : 'true'
        //     //     // 'conte'
        //     }),
        //     // mode: 'cors'
        //     }
        //     )
        //     .then(response => {
        //         console.log(response)
        //         return response.blob()
        //     })
        //     .then(blob => {
        //     let blobUrl = window.URL.createObjectURL(blob);
        //     forceDownload(blobUrl, "");
        //     })
        //     .catch(e => console.error(e));

    }




    const css = `
    span:hover{color:blue;
        cursor: pointer;
    }
    span:active {color:green}
    .downloads-table {
        margin-top : 50px
    }
        `

    const columns: ColumnsType<DownloadDocumentType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <Space size="middle">
                <Button type="link" onClick={() => {downloadDocument(record.documentId)}}>{record.name}</Button>
            </Space>
          ),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Department',
          dataIndex: 'department',
          key: 'department',
        },
        {
          title: 'Last Modified',
          key: 'date_modified',
          dataIndex: 'date_modified',
        },
    ];

    const getNewEmployeeDownloads = () => {
        httpInstance.get(downloadListProps.url)
            .then(response => {
                setDocumentsList(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                message.error(error);
            });
    }

    React.useEffect(() => {
        getNewEmployeeDownloads();
        console.log("downloadList")
    }, [])
      

    return (
        <>  

        <style>
            {css}
        </style>

            <h3>{downloadListProps.title}</h3>
            <Table columns={columns} dataSource={documentsList} className="downloads-table"/>
        </>
    )

}