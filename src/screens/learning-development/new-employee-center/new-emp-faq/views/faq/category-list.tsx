import * as React from 'react'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import httpInstance from '../../../../../../utility/http-client';
import { FaqCategoryPropType } from '../../../../../../models/faq-qna-details';


export const CategoryList = (props : {categoryProps : FaqCategoryPropType}) => {
    const {categoryProps} = props
    const [categoryList, setCategoryList] = React.useState([]);

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);


    const onClick: MenuProps['onClick'] = e => {
        updateActiveCategory(e.key.toString());
    };

    const updateActiveCategory = (key: String) => {
        setcurrentActiveCategory(key);
    }

    const getCategoryList = () => {

        const url = "/microsite/faq"
        httpInstance.get(url)
            .then(response => {
                setCategoryList(response.data.data)
                updateActiveCategory(response.data.data[0].id.toString());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getCategoryList();
    }, [])

    React.useEffect(() => {
        categoryProps.onActiveCategoryUpdate(currentActiveCategory);
    }, [currentActiveCategory])

    React.useEffect(() => {
        categoryProps.onCategoryListUpdate(categoryList);
    }, [categoryList])


    return (<>
        <Menu onClick={onClick} selectedKeys={[currentActiveCategory]} mode="horizontal">
            {categoryList.map((categoryList) => (
                <MenuItem key={categoryList.id} > 
                    {categoryList.category}
                </MenuItem>
            ))}
        </Menu>

    </>);
};

