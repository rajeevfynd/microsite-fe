import * as React from 'react'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import httpInstance from '../../../../../../utility/http-client';
import { FaqCategoryPropType } from '../../../../../../models/faq-qna-details';


export const CategoryList = (props : FaqCategoryPropType) => {

    const [categoryList, setCategoryList] = React.useState([]);

    const [currentActiveCategory, setcurrentActiveCategory] = React.useState(null);

    const [activeCategoryName, setActiveCategoryName] = React.useState(null);


    const onClick: MenuProps['onClick'] = e => {
        updateActiveCategory(e.key.toString());
    };

    const updateActiveCategory = (key: String) => {
        setcurrentActiveCategory(key);
    }

    const updateCategoryList = (data : any) => {
        setCategoryList(data);
    }

    const handleMenuItemChange = (category:String) => {
        setActiveCategoryName(category);
    }

    const getCategoryList = () => {

        const url = "/microsite/faq"
        httpInstance.get(url)
            .then(response => {
                setCategoryList(response.data.data)
                updateActiveCategory(response.data.data[0].id.toString());
                handleMenuItemChange(response.data.data[0].category)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    React.useEffect(() => {
        getCategoryList();
    }, [])

    React.useEffect(() => {
        props.onActiveCategoryUpdate(currentActiveCategory, activeCategoryName);
    }, [currentActiveCategory, activeCategoryName])

    return (<>
        <Menu onClick={onClick} selectedKeys={[currentActiveCategory]} mode="horizontal">
            {categoryList.map((categoryList) => (
                <MenuItem key={categoryList.id} onClick={() => handleMenuItemChange(categoryList.category)}  > 
                    {categoryList.category}
                </MenuItem>
            ))}
        </Menu>

    </>);
};

