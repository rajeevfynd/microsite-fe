import * as React from 'react'
import { Divider, MenuProps, message } from 'antd';
import { Menu } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import httpInstance from '../../../../../utility/http-client';
import { FaqCategoryPropType } from '../../../../../models/faq-qna-details';


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
                setCategoryList(response.data)
                updateActiveCategory(response.data[0].id.toString());
            })
            .catch((error) => {
                message.error(error);
            });
    }

    React.useEffect(() => {
        getCategoryList();
    }, [categoryProps.newQnaAdded])

    React.useEffect(() => {
        categoryProps.onActiveCategoryUpdate(currentActiveCategory);
    }, [currentActiveCategory])

    React.useEffect(() => {
        categoryProps.onCategoryListUpdate(categoryList);
    }, [categoryList])

    const css = `
    #wrapper{overflow:hidden;height:48px;}

    #scrollmenu {
        overflow: auto;
        white-space: nowrap;
    }
    
    .menu-item {
        display: inline-block;
        text-align: center;
        padding: 14px;
        text-decoration: none;
    }
    
    div.scrollmenu a:hover {
        background-color: #777;
    }
        `

    return (<>
        <style>
            {css}
        </style>
    
        
        <div id="wrapper">
            <Menu onClick={onClick} selectedKeys={[currentActiveCategory]} id="scrollmenu"> 
                {categoryList.map((categoryList) => (
                    <MenuItem key={categoryList.id} className="menu-item"> 
                        {categoryList.category}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    </>);
};

