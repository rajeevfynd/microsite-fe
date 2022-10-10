import { Dropdown, Form, Input, Menu, Modal, Space } from 'antd';
import * as React from 'react'
import { useState } from 'react';
import { AddQnaFormPropsType } from '../../../../../models/faq-qna-details';
import { AddQnaForm } from './add-qna-form';
import UploadQNA from './upload-qna-modal';


const AddQNAButton = () => {
  const [isAddQnaModalOpen, setQnaModalOpen] = React.useState(false);
  
  const handleCancel = () => {
    setQnaModalOpen(false);
  }

  const handleCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setQnaModalOpen(false);
  };

  const handleAddQnaButtonClick = () => {
    setQnaModalOpen(true);
  }

  // const menu = (
  //   <Menu
  //     items={[
  //       {
  //         label: 'Upload Q&A via Excel',
  //         key: '1',
  //       }
  //     ]}
  //   />
  // );

  const addQnaFormProps : AddQnaFormPropsType =  {
      isAddQnaModalOpen : isAddQnaModalOpen,
      onCreate:{handleCreate},
      onCancel:{handleCancel}
  }


  return (
    <div>
        <Space wrap>
            <Dropdown.Button overlay={<UploadQNA></UploadQNA>} onClick={handleAddQnaButtonClick}>
            Add Q&A
            </Dropdown.Button>
        </Space>
      <AddQnaForm addQnaFormProps={addQnaFormProps}/>
    </div>
  );
};

export default AddQNAButton;