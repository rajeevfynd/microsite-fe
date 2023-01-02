import { Space, message, Table, Button, Card, Input, Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { ColumnsType } from "antd/lib/table";
import * as moment from "moment";
import * as React from "react";
import { useVT } from "virtualizedtableforantd4";
import { GET_DOWNLOADS_DEPARTMENT_URL, GET_NEW_EMPLOYEE_DOWNLOADS } from "../../../../constants/urls";
import { DownloadDocumentType, DepartmentType } from "../../../../models/download-center-type";
import { getDownloadsList } from "../../../../service/download-center-service";
import httpInstance from "../../../../utility/http-client";
import { AddDepartment } from "./add-department";
import { AddNewEmployeeDownloads } from "./add-new-employee-downloads";
import { ShowDeleteConfirm } from "./showDeleteConfirm";

const { Option } = Select;


export const AdminNewEmployeeDownloads = () => {
    const [documentsList, setDocumentsList] = React.useState<DownloadDocumentType[]>([])
    const [departmentList, setDepartmentList] = React.useState<DepartmentType[]>([])
    const [load, setLoad] = React.useState(false) 
    const [pageNumber,setPageNumber ] = React.useState<number>(0)
    const [totalLength, setTotalLength] = React.useState<number>(0)
    const [initialLoad, setInitialLoad] = React.useState(false);
    const [keyState, setKeyState] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [department, setDepartment] = React.useState<number>(null);
    const [deleteUrl, setDeleteUrl] = React.useState<string>('');
    const [departmentOptionsList, createDepartmentOptionsList] = React.useState<DefaultOptionType[]>([])


    
    const searchDownloads = (key : string) => {
        setKeyState(key)
        setDepartment(null)
        if(load) { return ;}
        setLoad(false);
        getDownloads(key).then(
          response => {
            setDocumentsList(response.data.content)
            setTotalLength(response.data.totalElements)
          }
        )
        setPageNumber(1)
      }



      const loadMoreData = () => {
        console.log("Load MOre is called");
        getDownloadsList(department, keyState,pageNumber.toString()).then(res => {
            setDocumentsList([...documentsList, ...res.data.content])
            setTotalLength(res.data.totalElements)
            setInitialLoad(false)
          })
          .catch((err) => console.log(err.message));
          setPageNumber(pageNumber + 1);
      };



    function getDownloads(key:string = ''){
        return getDownloadsList(department, key.toString())
    }


    const downloadDocument =  async (documentId : number) => {
        let docUrl = (await httpInstance.get("/microsite/document/download/" + documentId))
        window.open(docUrl.data.url, '_blank')?.focus();
    }


    const getDepartmentStringList = (departmentIdList : number[]) => {
        let deptStringList : string = departmentList && departmentIdList.map(dept => (
            departmentList.find(obj => obj.id == dept)?.department
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
          key: 'actions',
          render: (_, record) => (
            <Space size="middle">
                <ShowDeleteConfirm deleteUrl={deleteUrl} id={record.id.toString()} onDeleteConfirm = {handleSubmit}></ShowDeleteConfirm>
            </Space>
          ),
        }
    ];


    const createDepartmentList = (departmentListArg: any[]) => {
      departmentListArg.map((department: any) => departmentOptionsList.push({
          value: department.id,
          label: department.department,
      }))
    }



    const handleDeptClick = (departmentId:any) => {
      setKeyState("")
      setPageNumber(1)
      setDepartment(departmentId)
      getDownloadsList(departmentId)
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

    const handleSubmit = () => {
      console.log("onDeleteConfirm")
      setPageNumber(1)
      getDownloadsList(department, keyState).then(res => {
        setDocumentsList(res.data.content)
        setTotalLength(res.data.totalElements)
        setInitialLoad(true);
      })
      .catch((err) => console.log(err.message));
    }



    const [vt] = useVT(
      () => ({
        onScroll: async ({ top, isEnd }) => {
          if (isEnd) {
            if(documentsList.length != totalLength){
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
        getDownloadsList(department, keyState, pageNumber.toString()).then(res => {
          setDocumentsList(res.data.content)
          setTotalLength(res.data.totalElements)
          setInitialLoad(true);
        })
        .catch((err) => console.log(err.message));
        setPageNumber(pageNumber + 1);
      
        setDeleteUrl(GET_NEW_EMPLOYEE_DOWNLOADS + "/delete/")
    }, [])
      

    return (
        <div className="body-container">  
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div style={{ width: "50%", marginBottom: "30px" }}>
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
                    <Space size="large">
                      <AddDepartment onSubmit={getDepartmentList}/>
                      <AddNewEmployeeDownloads departmentOptionsList={departmentOptionsList} onFinish={handleSubmit}></AddNewEmployeeDownloads>
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

        </div>
    )

}

