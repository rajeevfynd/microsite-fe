export type Program = {
    description: string;
    title: string;
    duration: number;
    thumbnail: string;
};

export type CourseListType = {
    id?: number;
    title?: string;
    description?: string;
    thumbnail?: string;
    minCourseCoin?: number;
    rruDeeplink?: string;
}