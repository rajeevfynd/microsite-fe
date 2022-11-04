import * as React from 'react'
import { Row, PaginationProps, Pagination, Col } from 'antd';
import { FaqList } from './faq-list';
import { CategoryList } from './category-list';
import { AddQnaPropsType, FaqCategoryPropType, FaqCategoryType, FaqListPropsType } from '../../../../../models/faq-qna-details';
import { AddQNAButton } from './add-qna';


export const FAQ = () => {

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const [categoryList, setCategoryList] = React.useState(null);

    const [newQnaAdded, setNewQnaAdded] = React.useState(false);

    const onActiveCategoryUpdate = (activeCategory:string) => {
        setcurrentActiveCategory(activeCategory);
    }

    const handleCategoryList = (category : FaqCategoryType) => {
        setCategoryList(category)
    }

    const handleNewQnaAdd = () => {
        setNewQnaAdded(!newQnaAdded)
    }

    const categoryProps : FaqCategoryPropType = {
        onActiveCategoryUpdate : onActiveCategoryUpdate,
        onCategoryListUpdate : handleCategoryList,
        newQnaAdded:newQnaAdded,
    }

    const faqProps : FaqListPropsType = {
        activeCategory:currentActiveCategory,
        faqCategoryList:categoryList,
        newQnaAdded:newQnaAdded,
    }

    const addQnaProps : AddQnaPropsType = {
        faqCategoryList:categoryList,
        onNewQnaAdd:handleNewQnaAdd,
    }
    
    return (
        <div>

            <h1>FAQ</h1>
                <Row justify="end">
                        <div>
                            <AddQNAButton addQnaProps = {addQnaProps}/>
                        </div>
                </Row>
                <Row>
                    <Col span={24}>
                        <div>
                            <CategoryList categoryProps={categoryProps}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FaqList faqProps={faqProps}/>
                    </Col>
                </Row>
        </div>
    )
}

