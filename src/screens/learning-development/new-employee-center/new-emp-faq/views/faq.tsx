import * as React from 'react'
import { Row, PaginationProps, Menu, MenuProps } from 'antd';
import AddQNAButton from './add-qna-modal';
import { FaqList } from './faq/faq-list';
import { CategoryList } from './faq/category-list';


export const FAQ = () => {
    const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const onActiveCategoryUpdate = (activeCategory:string) => {
        setcurrentActiveCategory(activeCategory);
    }

    return (
        <div>

            <h1>FAQ</h1>
                <Row justify="end">
                    <div>
                        <AddQNAButton />
                    </div>
                </Row>
                <Row>
                    <div>
                        <CategoryList onActiveCategoryUpdate = {onActiveCategoryUpdate}/>
                    </div>
                </Row>
            <p></p>
            <FaqList activeId={currentActiveCategory}/>
        </div>
    )
}

