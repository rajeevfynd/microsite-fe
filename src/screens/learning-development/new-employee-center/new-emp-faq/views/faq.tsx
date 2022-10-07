import * as React from 'react'
import { Row, PaginationProps } from 'antd';
import AddQNAButton from './add-qna-modal';
import { FaqList } from './faq/faq-list';
import { CategoryList } from './faq/category-list';
import { FaqCategoryPropType, FaqCategoryType, FaqListPropsType } from '../../../../../models/faq-qna-details';


export const FAQ = () => {
    const showTotal: PaginationProps['showTotal'] = total => `Total ${total} items`;

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const [categoryList, setCategoryList] = React.useState(null);

    const onActiveCategoryUpdate = (activeCategory:string) => {
        setcurrentActiveCategory(activeCategory);
    }

    const handleCategoryList = (category : FaqCategoryType) => {
        setCategoryList(category)
    }

    const categoryProps : FaqCategoryPropType = {
        onActiveCategoryUpdate : onActiveCategoryUpdate,
        onCategoryListUpdate : handleCategoryList
    }

    const faqProps : FaqListPropsType = {
        activeCategory:currentActiveCategory,
        faqCategoryList:categoryList
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
                        <CategoryList categoryProps={categoryProps}/>
                    </div>
                </Row>
            <p></p>
            <FaqList faqProps={faqProps}/>
        </div>
    )
}

