import Search from 'antd/lib/input/Search';
import * as React from 'react';

const SearchProgram = () => {

    const [searchAns,setSearch] = React.useState([""])

    const answerlist = ["grow","growing"]

    const onSearch =(e:any) =>{
        return setSearch(answerlist);
    }

    return (
        <>
            <div className='search-container'>
                <Search style={{ width: 500 }} placeholder="Search Programs and Courses" onSearch={onSearch} enterButton="Search" />
            </div>
            <div>
                
            </div>
        </>
    )
}
export default SearchProgram;