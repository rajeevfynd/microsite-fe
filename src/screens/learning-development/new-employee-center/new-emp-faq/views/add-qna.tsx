import { Dropdown, Menu, Modal, Space } from 'antd';
import * as React from 'react'
import { AddQnaOption } from '../../../../../models/enums/faq-add-options';
import { AddQnaFormPropsType, AddQnaPopupPropsType, AddQnaPropsType, UploadQnaFormProps } from '../../../../../models/faq-qna-details';
import { AddQnaForm } from './add-qna-form';
import { UploadQnaForm } from './upload-qna';




export const AddQnaPopup = (props:{addQnaProps : AddQnaPopupPropsType}) => {
    const { addQnaProps} = props;

    const handleAddQnaSubmit = () => {
        addQnaProps.onAddQnaSubmit();
    }

    const addQnaFormProps : AddQnaFormPropsType = {
        faqCategoryList : addQnaProps.faqCategoryList,
        onAddQnaSubmit : handleAddQnaSubmit,
    }

    const uploadQnaFormProps : UploadQnaFormProps = {
        onUploadQnaSubmit : handleAddQnaSubmit,
    }

    return (
        <Modal
            destroyOnClose={true}
            open={addQnaProps.isModalOpen}
            title={addQnaProps.modalTitle}
            footer={null}
            onCancel={addQnaProps.onAddQnaCancel}
        >
             {addQnaProps.addQnaOption == AddQnaOption.SINGLE_UPLOAD? <AddQnaForm addQnaFormProps={addQnaFormProps}/> : 
                <UploadQnaForm uploadQnaFormProps={uploadQnaFormProps}/>
            }

        </Modal>
    )
}


export const AddQNAButton = (props : {addQnaProps : AddQnaPropsType}) => {
    const {addQnaProps} = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [addQnaOption, setAddQnaOption] = React.useState(null);
    const [modalTitle, setModalTitle] = React.useState(null);

    const addQnaTitle = "Add Q&A"
    const uploadQnaTitle = "Upload Q&A list via excel file"

    const handleQnaEditOk = () => {
        setIsModalOpen(false);
        addQnaProps.onNewQnaAdd()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleUploadQnaSubmit = () => {
        setIsModalOpen(false);
    };

    const addQnaPopupProps : AddQnaPopupPropsType = {
        isModalOpen: isModalOpen,
        faqCategoryList : addQnaProps.faqCategoryList,
        onAddQnaSubmit:handleQnaEditOk,
        onUploadQnaSubmit:handleUploadQnaSubmit,
        onAddQnaCancel:handleCancel,
        modalTitle:modalTitle,
        addQnaOption:addQnaOption
    }

    const handleAddQnaClick = () => {
        setIsModalOpen(true);
        setAddQnaOption(AddQnaOption.SINGLE_UPLOAD)
        setModalTitle(addQnaTitle)
    }

    const handleUploadQnaClick = () => {
        setIsModalOpen(true);
        setAddQnaOption(AddQnaOption.BULK_UPLOAD)
        setModalTitle(uploadQnaTitle)
    }
  
    return (
      <div>
          <Space wrap>
                <Dropdown.Button  
                    onClick={() => handleAddQnaClick()}  
                    overlay= {<Menu onClick={() => { handleUploadQnaClick();}}
                        items={[
                        { 
                            label: 'Upload Q&A via Excel',
                            key: '1',
                        }
                        ]}
                    />}>

                    Add Q&A
                </Dropdown.Button>
          </Space>
        <AddQnaPopup addQnaProps={addQnaPopupProps}/>
      </div>
    );
  };