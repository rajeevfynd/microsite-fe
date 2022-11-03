export type Program = {
    description: string;
    title: string;
    duration: number;
    thumbnailLink: string;
};

export type CourseListType = {
    id?: number;
    title?: string;
    description?: string;
    thumbnail?: string;
    minCourseCoin?: number;
    rruDeeplink?: string;
}