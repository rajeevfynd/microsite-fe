import { message, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import * as React from 'react'
import { Link } from 'react-router-dom';
import { GET_NEW_EMPLOYEE_DOWNLOADS_URL } from '../../../constants/urls';
import { DownloadDocumentType } from '../../../models/download-center-type';
import httpInstance from '../../../utility/http-client';

export const NewEmployeeDownloads = () => {

    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>()
    const [documentLink, setDocumentLink] = React.useState(null)


    const downloadDocument = async (documentId : number) => {
        let docUrl = await httpInstance.get("/microsite/document/download/" + documentId)
        setDocumentLink(docUrl.data.url)
        console.log(docUrl.data.url)
    }

    const css = `
    
    span:hover{color:blue;
        cursor: pointer;
    }
span:active {color:green}
        `

    const columns: ColumnsType<DownloadDocumentType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <Space size="middle">
                <Link to={''} download>
                    <span onClick={() => {downloadDocument(record.documentId)}}>{record.name}</span>
                    </Link>
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
        const url = GET_NEW_EMPLOYEE_DOWNLOADS_URL
        httpInstance.get(url)
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
    }, [])
      

    return (
        <>  

        <style>
            {css}
        </style>

            <h3>New Employee Downloads</h3>
            <Table columns={columns} dataSource={documentsList} />
        </>
    )

}
