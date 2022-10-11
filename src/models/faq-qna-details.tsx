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
    onQnaDelete : any;
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
    onQnaEditOk:any;
}

export type QnaFormPropsType = {
    editQnaDetails?:QnaType;
    categoryList?:FaqCategoryType[];
    currentActiveCategory?: string;
    onQnaEditOk : any,
}

export type AddQnaPropsType = {
    faqCategoryList?:FaqCategoryType[];
}

export type AddQnaPopupPropsType = {
    isModalOpen?: boolean;
    faqCategoryList?:FaqCategoryType[];
    onAddQnaSubmit:any;
    onAddQnaCancel:any;
}

export type AddQnaFormPropsType = {
    faqCategoryList?:FaqCategoryType[];
}

export type UploadQnaFormProps = {
    isModalOpen?: boolean;
    onUploadQnaSubmit:any;
    onUploadQnaCancel:any;
}