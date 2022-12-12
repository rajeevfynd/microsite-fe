import { DeleteTwoTone, ExclamationCircleFilled } from "@ant-design/icons";
import { Space, message, Table, Button, Modal, SelectProps, Card, Input, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import * as moment from "moment";
import * as React from "react";
import { GET_DOWNLOADS_DEPARTMENT_URL } from "../../../../constants/urls";
import { DownloadListPropsType, DownloadDocumentType, AddDocumentPropsType, DepartmentType } from "../../../../models/download-center-type";
import { deleteDocument, getDownloadsList } from "../../../../service/download-center-service";
import httpInstance from "../../../../utility/http-client";
import { AddDepartment } from "./add-department";
import { AddDownloadDocument } from "./add-document";
import { EditDownloadDocument } from "./edit-document";
import { useVT } from "virtualizedtableforantd4";


const { confirm } = Modal;
const { Option } = Select;


export const DownloadsList = (props:{downloadListProps: DownloadListPropsType}) => {
    const { downloadListProps} = props;
    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>([])
    const [departmentList, setDepartmentList] = React.useState<DepartmentType[]>([])
    const [downloadCategoryList, setDownloadCategoryList] = React.useState<SelectProps['options']>([])
    const [departmentOptionsList, setDepartmentOptionslist] = React.useState<SelectProps['options']>([])
    const [load, setLoad] = React.useState(false) 
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [totalLength, setTotalLength] = React.useState<number>(0)
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [keyState, setKeyState] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [department, setDepartment] = React.useState<number>(null);


    
    const searchDownloads = (key : string) => {
        setKeyState(key)
        setDepartment(null)
        if(load) { return ;}
        setLoad(false);
        getDownloads(key).then(
          response => {
            setDocumentsList(response.data.content)
            setPageNumber(1)
            setTotalLength(response.data.totalElements)
          }
        )
      }



      const loadMoreData = () => {
        console.log("Load MOre is called");
        getDownloadsList(downloadListProps.categoryId, department, keyState,pageNumber.toString()).then(res => {
            setDocumentsList([...documentsList, ...res.data.content])
            setTotalLength(res.data.totalElements)
            setInitialLoad(false)
          })
          .catch((err) => console.log(err.message));
          setPageNumber(pageNumber + 1);
      };



    function getDownloads(key:string = ''){
        return getDownloadsList(downloadListProps.categoryId, department, key.toString())
    }


    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
        window.open(docUrl.data.url, '_blank').focus();
    }


    const getDepartmentStringList = (departmentIdList : number[]) => {
        let deptStringList : string = departmentList && departmentIdList.map(dept => (
            departmentList.find(obj => obj.id == dept).department
            )).join(' | ')
        return deptStringList
    }
    

    const columns: ColumnsType<DownloadDocumentType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <Space size="middle">
                <Button type="link" onClick={() => {downloadDocument(record.document.id)}}>{record.name}</Button>
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
            <div>
                {record.department && getDepartmentStringList(record.department)}
            </div>
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

      deleteDocument(id)
            .then(response => {
              handleSubmit()
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


    const handleDeptClick = (departmentId:any) => {
      console.log(departmentId)
      setKeyState("")
      setPageNumber(1)
      setDepartment(departmentId)
      getDownloadsList(downloadListProps.categoryId, departmentId)
          .then(response => {
              setDocumentsList(response.data.content)
              setTotalLength(response.data.totalElements)
          })
          .catch((error) => {
              message.error(error);
          });
    }

    const getDepartmentList = () => {
        httpInstance.get(GET_DOWNLOADS_DEPARTMENT_URL)
            .then(response => {
                setDepartmentList(response.data)
                createDepartmentList(response.data)
            })
            .catch((error) => {
                message.error(error);
            });
    }

    const createDepartmentList = (departmentListArg: any[]) => {
      departmentListArg.map((department: any) => departmentOptionsList.push({
          value: department.id,
          label: department.department,
      }))
    }

  const handleAddDepartment = () => {
      getDepartmentList()
  }

    const handleSubmit = () => {
        setPageNumber(1)
        getDownloadsList(downloadListProps.categoryId, department, keyState.toString()).then(res => {
          setDocumentsList(res.data.content)
          setTotalLength(res.data.totalElements)
        })
        .catch((err) => console.log(err.message));
    }

    const addDocumentProps : AddDocumentPropsType = {
        departmentOptionsList: departmentOptionsList,
        downloadCategoryList : downloadCategoryList,
        downloadCategoryId : downloadListProps.categoryId,
        onFinish : handleSubmit,
    }



    const [vt] = useVT(
      () => ({
        onScroll: async ({ top, isEnd }) => {
          if (isEnd) {
            if(documentsList.length != totalLength){
              console.log("VT is called");
              console.log("pageNumber in VT ", pageNumber)
              loadMoreData()
            }
          }
        },
        scroll: {
          y: 500
        },
        debug: false
      }),
      [documentsList]
    );


    React.useEffect(() => {
        getDepartmentList();
        console.log("pageNumber initially ", pageNumber)
        !initialLoad &&
        getDownloadsList(downloadListProps.categoryId, department, keyState, pageNumber.toString()).then(res => {
          setDocumentsList(res.data.content)
          setTotalLength(res.data.totalElements)
          setInitialLoad(true);
        })
        .catch((err) => console.log(err.message));
        setPageNumber(pageNumber + 1);

    }, [])
      

    return (
        <>  

                <h3>{props.downloadListProps.title}</h3>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <div style={{ width: "50%", marginTop: "30px", marginBottom: "30px" }}>
                    <Card className='home-card search-card' bodyStyle={{ padding: "12px" }}>
                        <Input.Group compact >
                            <Select defaultValue="Department" bordered={false} style={{ width: '20%' }} onChange={(id) =>handleDeptClick(id)}>
                                <Option >All</Option>
                                {departmentList && departmentList.map(department => (
                                    <Option value={department.id}>{department.department}</Option>
                                ))}
                            </Select>
                            <Input allowClear style={{ width: '80%' }} placeholder='Type in the document title you are looking for...' 
                                bordered={false} onChange={(e) => searchDownloads(e.target.value)}/>
                        </Input.Group>
                    </Card>
                </div>
                    
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Space size={40}>
                        <AddDownloadDocument {...addDocumentProps}></AddDownloadDocument>
                        <AddDepartment onSubmit={handleAddDepartment}></AddDepartment>
                    </Space>
                </div>

                  <Table 
                      columns={columns}
                      dataSource={documentsList}
                      style= {{padding : 20}}
                      components={vt}
                      pagination={false}
                      loading={loading}
                      scroll={{
                          scrollToFirstRowOnChange: false,
                          y: 450,
                      }}
                  />

        </>
    )

}

