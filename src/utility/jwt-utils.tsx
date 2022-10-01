import { useJwt } from 'react-jwt';

export function parseJwt(token: string) {
    if (!token) {
        return null;
    }
    const { decodedToken } = useJwt(token);
    return decodedToken;
};