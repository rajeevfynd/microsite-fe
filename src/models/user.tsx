import { Role } from "./enums/roles"

export type User = {
    domainId?: string,
    email?: string,
    exp?: number,
    firstName?: string,
    lastName?: string,
    role?: Role,
    scopeExpression?: string,
    userId?: number
}