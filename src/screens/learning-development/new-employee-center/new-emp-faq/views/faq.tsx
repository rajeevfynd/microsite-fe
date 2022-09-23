import * as React from 'react'
import { Row, PaginationProps } from 'antd';
import AddQNAButton from './add-qna-modal';
import { FaqList } from './faq/faq-list';


export const FAQ = () => {
    const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;
    return (
        <div>

            <h1>FAQ</h1>
            <Row justify="end">
                <div>
                    <AddQNAButton ></AddQNAButton>
                </div>
            </Row>

            <p></p>
            <FaqList />
        </div>
    )
}
