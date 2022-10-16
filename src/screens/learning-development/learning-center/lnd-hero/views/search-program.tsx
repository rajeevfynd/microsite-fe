import Search from 'antd/lib/input/Search';
import * as React from 'react';

const SearchProgram = () => {

    const onSearch =(e:any) =>{
        console.log(e);
    }

    return (
        <>
            <Search style={{ width: 500 }} placeholder="Search Programs and Courses" onSearch={onSearch} enterButton />
        </>
    )
}
export default SearchProgram;