import * as React from 'react'
import { Button, Col, Input, Row , Collapse} from 'antd';
import { isUserAuthorized } from '../../../../../service/user-service';
import AddQnADropdown from './upload-qna-modal';
import { FAQCollapse } from './faq-collapse';
import AddQNAButton from './add-qna-modal';
import App from './delete-confirm-modal';
import EditQNA from './edit-qna-modal';


export const FAQ = () => {
  return (
        <div>

            <h1>FAQ</h1>
            <Row justify="end">
                    { isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && <>
                        <div className='update-welcome'>
                            <AddQNAButton ></AddQNAButton>
                        </div>
                        </>
                    }
            </Row>
            
            <p></p>
            <FAQCollapse></FAQCollapse>

        </div>
  )
}
