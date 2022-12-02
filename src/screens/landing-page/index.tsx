import { Layout } from 'antd/lib'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import * as React from 'react'
import { MenuRouter } from './menu-router'
import FooterHome from './views/footer-home'
import HeaderHome from './views/header-home'
import MenuHome from './views/menu-home'

const LandingPage = () => {
    return (
        <>
            <Layout className='body'>
                <div className='menu'>
                    <MenuHome></MenuHome>
                </div>
                <Layout>
                    <Header className="header">
                        <HeaderHome></HeaderHome>
                    </Header>
                    <Content className='content'>
                        <MenuRouter></MenuRouter>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default LandingPage