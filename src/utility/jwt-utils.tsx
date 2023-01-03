import jwt from 'jwt-decode'

export function parseJwt(token: string) {
    if (!token) {
        return null;
    }
    return jwt(token);
};