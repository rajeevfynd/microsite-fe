import * as React from 'react'
import { Button, Col, Input, Row , Collapse} from 'antd';
import { isUserAuthorized } from '../../../../../service/user-service';
import AddQnADropdown from './add-qna';
import { FAQCollapse } from './faq-collapse';


export const FAQ = () => {
  return (
        <div>

            <h1>FAQ</h1>
            <Row justify="end">
                    { isUserAuthorized (['ADMIN-LND','ADMIN-GLOBAL']) && <>
                        <div className='update-welcome'>
                            <AddQnADropdown ></AddQnADropdown>
                        </div>
                        </>
                    }
            </Row>
            
            <p></p>
            <FAQCollapse></FAQCollapse>

        </div>
  )
}
