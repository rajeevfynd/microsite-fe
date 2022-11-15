import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import * as React from 'react'

export const NewEmployeeDownloads = () => {


    interface DataType {
        name: string;
        description: string;
        department: string;
        date_modified: string;
      }
      
      const columns: ColumnsType<DataType> = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, record) => (
            <Space size="middle">
              <a>{record.name}</a>
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
          title: 'Date Modified',
          key: 'date_modified',
          dataIndex: 'date_modified',
        },
      ];

    const data: DataType[] = [
        {
            name: 'John Brown',
            description: 'desc 1',
            department: 'dept 1',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Jim Green',
            description: 'desc 2',
            department: 'dept 2',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Joe Black',
            description: 'desc 3',
            department: 'dept 3',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'John Brown',
            description: 'desc 1',
            department: 'dept 1',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Jim Green',
            description: 'desc 2',
            department: 'dept 2',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Joe Black',
            description: 'desc 3',
            department: 'dept 3',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'John Brown',
            description: 'desc 1',
            department: 'dept 1',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Jim Green',
            description: 'desc 2',
            department: 'dept 2',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Joe Black',
            description: 'desc 3',
            department: 'dept 3',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'John Brown',
            description: 'desc 1',
            department: 'dept 1',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Jim Green',
            description: 'desc 2',
            department: 'dept 2',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Joe Black',
            description: 'desc 3',
            department: 'dept 3',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'John Brown',
            description: 'desc 1',
            department: 'dept 1',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Jim Green',
            description: 'desc 2',
            department: 'dept 2',
            date_modified: '15 Nov 2022',
        },
        {
            name: 'Joe Black',
            description: 'desc 3',
            department: 'dept 3',
            date_modified: '15 Nov 2022',
        },
      ];
      

    return (
        <>  
            <h3>New Employee Downloads</h3>
            <Table columns={columns} dataSource={data} />
        </>
    )

}