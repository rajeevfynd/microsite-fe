import { Dropdown, Modal, Space } from 'antd';
import * as React from 'react'
import { AddQnaFormPropsType, AddQnaPopupPropsType, AddQnaPropsType } from '../../../../../models/faq-qna-details';
import { AddQnaForm } from './add-qna-form';
import { UploadQNA } from './upload-qna';

const AddQnaPopup = (props:{addQnaPopupProps : AddQnaPopupPropsType}) => {
    const { addQnaPopupProps} = props;

    const handleAddQnaSubmit = () => {
        addQnaPopupProps.onAddQnaSubmit();
    }

    const addQnaFormProps : AddQnaFormPropsType = {
        faqCategoryList : addQnaPopupProps.faqCategoryList,
        onAddQnaSubmit : handleAddQnaSubmit,
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={addQnaPopupProps.isModalOpen}
            title="Add Q&A"
            footer={null}
            onCancel={addQnaPopupProps.onAddQnaCancel}
        >

            <AddQnaForm addQnaFormProps={addQnaFormProps}/>

        </Modal>

    )
}

export const AddQNAButton = (props : {addQnaProps : AddQnaPropsType}) => {
    const {addQnaProps} = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleQnaEditOk = () => {
        setIsModalOpen(false);
        console.log('handleQnaEditOk')
        addQnaProps.onNewQnaAdd()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const addQnaPopupProps : AddQnaPopupPropsType = {
        isModalOpen: isModalOpen,
        faqCategoryList : addQnaProps.faqCategoryList,
        onAddQnaSubmit:handleQnaEditOk,
        onAddQnaCancel:handleCancel
    }
  
    return (
      <div>
          <Space wrap>
              <Dropdown.Button overlay={<UploadQNA></UploadQNA>}
              onClick={() => setIsModalOpen(true)}>
              Add Q&A
              </Dropdown.Button>
          </Space>
        <AddQnaPopup addQnaPopupProps={addQnaPopupProps}/>
      </div>
    );
  };