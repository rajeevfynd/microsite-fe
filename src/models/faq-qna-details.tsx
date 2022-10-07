export type QnaListType = {
    id?: number;
    faq?: QnaType[];
}

export type QnaType = {
    id?: number;
    question?: string;
    answer?: string;
    isActive?:boolean;
    updated_at?: any;
}

export type FaqCategoryPropType = {
    onActiveCategoryUpdate : any;
    onCategoryListUpdate : any;
}

export class FaqCategoryType  {
    id?: number;
    category?: string;
    priority?: number;
}

export type CornerIconsProps = {
    showEditModal?: any
    qnaId?: string;
    qnaDetails?: QnaType;
    onQnaUpdate : any;
    onEditQna:any;
}

export type FaqListPropsType = {
    activeCategory?: string;
    faqCategoryList?:FaqCategoryType[];
}

export type QnaModalPropsType = {
    isModalOpen?: boolean;
    handleCancel:any;
    editQnaDetails?:QnaType;
    categoryList?:FaqCategoryType[];
    currentActiveCategory?: string;
}

export type QnaFormPropsType = {
    editQnaDetails?:QnaType;
    categoryList?:FaqCategoryType[];
    currentActiveCategory?: string;
}