export type editTagType={
    tagId: number,
    tagName: string,
    tagDescription?: string
}
export type editTagPropType={
    tag: editTagType,
    handleSubmit: any
}