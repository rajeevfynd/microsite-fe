import { Anchor, Layout } from 'antd/lib'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import * as React from 'react'
import { MenuRouter } from './menu-router'
import HeaderHome from './views/header-home'
import MenuHome from './views/menu-home'
import './index.css';

const LandingPage = () => {
    return (
        <>
            <Layout className='body'>
                <Header className="header">
                    <HeaderHome />
                </Header>
                <Content className='content'>
                    <MenuRouter></MenuRouter>
                </Content>
            </Layout>
        </>
    )
}

export default LandingPage