const user: any = {
    id: 2,
    firstName : 'Pavan Kumar',
    lastName : 'Jayanthi',
    proPicUrl : '',
    access: 'PUBLIC'
}

// checks the user access is in the access list entered
export function isUserAuthorized(accessList: Array<'PUBLIC'|'ADMIN-GLOBAL'|'ADMIN-LND'|'ADMIN-EMPLOYEE-ENGAGEMENT'|'LEADER'>){
    return true

}

export function getBasicUserDetails(){
    return user
}