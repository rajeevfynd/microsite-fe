import { parseJwt } from './jwt-utils';
import { useCookies } from 'react-cookie';
import { AUTHORISATION_TOKEN_PARAM } from "../constants/global-constants";
import { User } from '../models/user';

export function getUser(): User {
    const [cookies] = useCookies([AUTHORISATION_TOKEN_PARAM]);
    return parseJwt(cookies[AUTHORISATION_TOKEN_PARAM]);
};