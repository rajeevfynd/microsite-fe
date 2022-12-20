import { Result } from 'antd';
import * as React from 'react'
import { isAdmin } from '../../utility/user-utils'
export const ProtectedComponent = (props: any) => {
  return (
    <>
        { isAdmin() ?
        <>
            {props.children}
        </>
        :
        <>
            <Result
                title="UNAUTHORIZED"
                subTitle="Sorry your are not authorized to access this page."
            />
        </>
        }
    </>
  )
}