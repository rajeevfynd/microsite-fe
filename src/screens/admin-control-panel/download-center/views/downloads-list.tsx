import { CaretDownFilled, DeleteTwoTone, ExclamationCircleFilled, PlusCircleOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Space, message, Table, Button, Row, Col, Dropdown, Menu, Modal, SelectProps, MessageArgsProps, Input } from "antd";
import Search from "antd/lib/input/Search";
import { ColumnsType } from "antd/lib/table";
import * as moment from "moment";
import * as React from "react";
import { SearchInput } from "../../../../components/search-input/search-input";
import { DELETE_DOWNLOAD_CENTER_DOCUMENT, GET_DOWNLOAD_CATEGORIES_URL } from "../../../../constants/urls";
import { DownloadListPropsType, DownloadDocumentType, AddDocumentPropsType, EditDocumentsPropsType } from "../../../../models/download-center-type";
import { debounce } from "../../../../service/program-service";
import httpInstance from "../../../../utility/http-client";
import { AddDownloadDocument } from "./add-document";
import { EditDownloadDocument } from "./edit-document";


const { confirm } = Modal;


export const DownloadsList = (props:{downloadListProps: DownloadListPropsType}) => {
    const { downloadListProps} = props;
    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>()
    const [departmentList, setDepartmentList] = React.useState<string[]>([])
    const [downloadCategoryList, setDownloadCategoryList] = React.useState<SelectProps['options']>([])
    const [departmentOptionsList, setDepartmentOptionslist] = React.useState<SelectProps['options']>([])
    const [load, setLoad] = React.useState(false) 
    const [keyState, setKeyState] = React.useState('')
    let key = ''
    
    const searchDownloads = () => {
        setKeyState(key)
        if(load) { return ;}
        setLoad(false);
        getDownloads(key).then(
          response => {
            setDocumentsList(response.data.downloadDocumentsList)
            setDepartmentList(response.data.departmentList)
                console.log(response.data)
          }
        )
      }

      const searchKey = (str: string) =>{
        key = str
        debounce(searchDownloads,500)
      }

    function getDownloads(key:string = ''){
        return httpInstance.get(downloadListProps.url+'/search?key='+key.toString())
    }

    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
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
          render: (_, record) => (
            <Space size="middle">
                <div >{record.department.toString().replace(",", " | ")}</div>
            </Space>
          ),
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
        {
          title: 'Actions',
          dataIndex: 'actions',
          key: 'actions',
          render: (_, record) => (
            <Space size="middle">
                <EditDownloadDocument  
                    departmentOptionsList={departmentOptionsList}
                    departmentList = {departmentList} 
                    onFinish={handleSubmit}
                    documentDetails = {record}
                />
                <DeleteTwoTone onClick={() => showDeleteConfirm(record.id)}/>
            </Space>
          ),
        },
    ];


    const handleDeleteDocument = (id : number) => {
        httpInstance.put(DELETE_DOWNLOAD_CENTER_DOCUMENT + id, {})
            .then(response => {
                getNewEmployeeDownloads(downloadListProps.url);
            })
            .catch((error) => {
                message.error(error);
        });
    }
    
    const showDeleteConfirm = (id : number) => {
        confirm({
          title: 'Are you sure delete this document?',
          icon: <ExclamationCircleFilled />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            handleDeleteDocument(id)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };


    const handleDeptClick = (department : string) => {
        const url = downloadListProps.url + "?department=" + department
        getNewEmployeeDownloads(url)
    }

    const getNewEmployeeDownloads = (url : string) => {
        httpInstance.get(url)
            .then(response => {
                console.log(response.data)
                setDocumentsList(response.data.downloadDocumentsList)
                setDepartmentList(response.data.departmentList)
                createDepartmentList(response.data.departmentList)
            })
            .catch((error: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | MessageArgsProps) => {
                message.error(error);
            });
    }

    const getDownloadsCategoryList = () => {
        httpInstance.get(GET_DOWNLOAD_CATEGORIES_URL)
            .then(response => {
                console.log(response.data)
                response.data.map((category: any) => downloadCategoryList.push({
                    value: category.id,
                    label: category.category,
                }))

            })
            .catch((error) => {
                message.error(error);
            });
    }

    const createDepartmentList = (departmentListArg: any[]) => {
        departmentListArg.map((department: any) => departmentOptionsList.push({
            value: department,
            label: department,
        }))
    }

    const handleSubmit = () => {
        getNewEmployeeDownloads(downloadListProps.url)
    }

    const addDocumentProps : AddDocumentPropsType = {
        departmentOptionsList: departmentOptionsList,
        downloadCategoryList : downloadCategoryList,
        onFinish : handleSubmit,
    }

    const departments = (
        <Menu>
            {departmentList != undefined && departmentList.map((department: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal) => (
                <Menu.Item onClick={() => handleDeptClick(department.toString())}>{department}</Menu.Item>
            ))}
        </Menu>
    );

    React.useEffect(() => {
        getNewEmployeeDownloads(downloadListProps.url);
        getDownloadsCategoryList();
    }, [])
      

    return (
        <>  

        <style>
            {css}
        </style>
            <h3>{downloadListProps.title}</h3>
            <br />
            <Row>
                <Col span={18} >
                    <Input 
                        size='large' 
                        className='search-box' 
                        suffix={<SearchOutlined/>} 
                        onChange={(e) => {searchKey(e.target.value);} } 
                    />
                </Col>
                <Col span={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <AddDownloadDocument {...addDocumentProps}></AddDownloadDocument>
                </Col>
                <Col span={3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Dropdown overlay={departments}>
                        <Button shape="round">Department <CaretDownFilled /></Button>
                    </Dropdown>
                </Col>
            </Row>
            <Table columns={columns} pagination={{ pageSize: 6}} dataSource={documentsList} className="downloads-table"/>
        </>
    )

}

