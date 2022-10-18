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
    categoryList?: FaqCategoryType[];
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
    newQnaAdded?:boolean;
}

export type QnaModalPropsType = {
    isEditModalOpen?: boolean;
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
    onNewQnaAdd:any
}

export type AddQnaPopupPropsType = {
    isModalOpen?: boolean;
    faqCategoryList?:FaqCategoryType[];
    onAddQnaSubmit:any;
    onAddQnaCancel:any;
}

export type AddQnaFormPropsType = {
    faqCategoryList?:FaqCategoryType[];
    onAddQnaSubmit : any;
}

export type UploadQnaFormProps = {
    isModalOpen?: boolean;
    onUploadQnaSubmit:any;
    onUploadQnaCancel:any;
}

export type DeleteQnaModalPropsType = {
    isDeleteModalOpen?: boolean;
    handleCancel:any;
    editQnaDetails?:QnaType;
    onQnaDeleteOk:any;
}

export type DeleteFormPropsType = {
    editQnaDetails?:QnaType,
    onQnaDeleteOk : any
}