import { ExclamationCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import { Button, Modal, Space, Tooltip } from 'antd';
import * as React from 'react'

const { confirm } = Modal;

const showDeleteConfirm = (event: { stopPropagation: () => void; }) => {
    event.stopPropagation();
  confirm({
    title: 'Are you sure you want to delete this question?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const DeleteButton = () => (
  <Space wrap>

    <Tooltip title="Delete">
        <Button type="default" shape = "circle" size = "small" icon={<DeleteOutlined />} onClick={showDeleteConfirm}/>
    </Tooltip>
  </Space>
);

export default DeleteButton;