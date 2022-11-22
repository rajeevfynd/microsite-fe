import { CaretDownFilled } from "@ant-design/icons";
import { Space, message, Table, Layout, Button, Row, Col, Dropdown, Menu } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import * as moment from "moment";
import * as React from "react";
import { DownloadDocumentType, DownloadListPropsType } from "../../../models/download-center-type";
import httpInstance from "../../../utility/http-client";


export const DownloadsList = (props:{downloadListProps: DownloadListPropsType}) => {
    const { downloadListProps} = props;
    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>()
    const [departmentList, setDepartmentList] = React.useState<string[]>() 

    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
        console.log(docUrl.data.url)
        window.open(docUrl.data.url, '_blank').focus();
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
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          render: (_, record) => (
            <Space size="middle">
                <div><small><i className='text-muted'>{moment(record.updatedAt).fromNow()}</i></small></div>
            </Space>
          ),
        },
    ];

    const handleDeptClick = (department : string) => {
        const url = downloadListProps.url + "?department=" + department
        getNewEmployeeDownloads(url)
    }

    const getNewEmployeeDownloads = (url : string) => {
        httpInstance.get(url)
            .then(response => {
                setDocumentsList(response.data.downloadDocumentsList)
                setDepartmentList(response.data.departmentList)
                console.log(response.data)
            })
            .catch((error) => {
                message.error(error);
            });
    }

    const departments = (
        <Menu>
            {departmentList != undefined && departmentList.map(department => (
                <Menu.Item onClick={(event) => handleDeptClick(department)}>{department}</Menu.Item>
            ))}
        </Menu>
    );

    const onSearch = (value: string) => console.log(value);

    React.useEffect(() => {
        getNewEmployeeDownloads(downloadListProps.url);
        console.log("downloadList")
    }, [])
      

    return (
        <>  

        <style>
            {css}
        </style>
            <h3>{downloadListProps.title}</h3>
            <br />
            <Row>
                <Col span={16} >
                    <Search  placeholder="Search Document" size="middle" onSearch={onSearch} enterButton />
                </Col>
                <Col span={8} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Dropdown overlay={departments}>
                        <Button shape="round">Department <CaretDownFilled /></Button>
                    </Dropdown>
                </Col>
            </Row>
            <Table columns={columns} dataSource={documentsList} className="downloads-table"/>
        </>
    )

}

function styled(Search: any) {
    throw new Error("Function not implemented.");
}
