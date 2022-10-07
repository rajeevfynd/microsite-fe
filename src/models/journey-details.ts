export type JourneyDetailPropsType = {
    details?: JourneyDetailType
}
export type JourneyDetailType = {
    title?: string;
    id?: number;
    description?: string;
    thumbnailLink?: string;
    flow?:string;
    programs?: ProgramType[];
    progress?: number;
}
export type ProgramType = {
    program: ProgramDetailType;
    isActive: boolean;
    status: string;
}
export type ProgramDetailType = {
    id?: number;
    title?: string;
    description?: string;
    thumbnailLink?: string;
    duration?: number;
    rruDeeplink?: string;
    rruProgramID?: string;
}