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
    thumbnail?: string;
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
    thumbnail?: string;
    duration?: number;
    rruDeeplink?: string;
    rruProgramID?: string;
    progress?: number
    courses?: any[]
    flow?: string
    tags?: any[]
}
export type ProgramMapType = {
    program: string |null,
    programName?: string,
}
export type CourseMapType = {
    course: string | null,
    courseName?: string
}