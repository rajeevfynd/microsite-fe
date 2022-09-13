import * as React from 'react'
import { Dropdown, Menu, Space,} from 'antd';

const handleButtonClick = (e: any) => {
  console.log('click left button', e);
};

const handleMenuClick = (e: any) => {
  console.log('click', e);
};

const menu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: 'Upload Q&A via Excel',
        key: '1',
      }
    ]}
  />
);

const AddQnADropdown = () => (
  <Space wrap>
    <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
      Add Q&A
    </Dropdown.Button>
  </Space>
);

export default AddQnADropdown;