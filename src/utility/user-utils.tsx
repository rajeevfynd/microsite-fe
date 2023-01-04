import { parseJwt } from './jwt-utils';
import { useCookies } from 'react-cookie';
import { AUTHORISATION_TOKEN_PARAM } from "../constants/global-constants";
import { User } from '../models/user';
import { Role } from '../models/enums/roles';

export function getUser(): User {
    const [cookies] = useCookies([AUTHORISATION_TOKEN_PARAM]);
    return parseJwt(cookies[AUTHORISATION_TOKEN_PARAM]);
};

export const isAdmin = () => {
    const user = getUser();
    if(user){
        return user.role == Role.ADMIN || user.role == Role.SUPER_ADMIN
    } 
    return false
}

export const isSuperAdmin = () => {
    const user = getUser();
    if(user){
        return user.role == Role.SUPER_ADMIN
    }
    return false
}