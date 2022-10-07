// it is type used for specifying menu key to route it should navigate
export type MenuRoute = {
    key: string,
    isExternalLink: boolean,
    navigateTo: string,
    accessList: Array<'PUBLIC'|'ADMIN-GLOBAL'|'ADMIN-LND'|'ADMIN-EMPLOYEE-ENGAGEMENT'|'LEADER'>
    parents?: Array<string>
    children?: Array<string>
}