export type JourneyDetailPropsType = {
    details?: JourneyDetailType
}

export type ProgramDetailPropsType = {
    details?: ProgramDetailType
}
export type JourneyDetailType = {
    title?: string;
    id: number;
    description?: string;
    thumbnailLink?: string;
    flow?:string;
    programs?: ProgramType[];
    progress?: number;
    duration?: number;
}
export type ProgramType = {
    program: ProgramDetailType;
    isActive: boolean;
    status: string;
}
export type ProgramDetailType = {
    id: number;
    title: string;
    description?: string;
    thumbnailLink?: string;
    duration?: number;
    rruDeeplink?: string;
    rruProgramID?: string;
    progress?: number
    courses?: any[]
    flow?: string
}
export type ProgramMapType = {
    program: string |null,
    programName?: string,
}
export type CourseMapType = {
    course: string | null,
    courseName?: string
}