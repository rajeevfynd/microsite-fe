import { AddQnaOption } from "./enums/faq-add-options";
import { EditQnaOption } from "./enums/qna-edit-options";

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
    newQnaAdded?:boolean
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
    onUploadQnaSubmit:any;
    modalTitle?:String;
    addQnaOption?:AddQnaOption
}

export type AddQnaFormPropsType = {
    faqCategoryList?:FaqCategoryType[];
    onAddQnaSubmit : any;
}

export type UploadQnaFormProps = {
    onUploadQnaSubmit:any;
}

export type DeleteFormPropsType = {
    editQnaDetails?:QnaType,
    onQnaDeleteOk : any
}

export type QnaPopupPropsType = {
    isModalOpen?: boolean;
    handleCancel:any;
    editQnaDetails?:QnaType;
    onQnaEditDeleteOk:any;
    categoryList?:FaqCategoryType[];
    currentActiveCategory?: string;
    modalTitle?: string,
    editQnaOption?: EditQnaOption
}