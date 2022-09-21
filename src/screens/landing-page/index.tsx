import { Layout } from 'antd/lib'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'
import * as React from 'react'
import { MenuRouter } from './menu-router'
import FooterHome from './views/footer-home'
import HeaderHome from './views/header-home'
import MenuHome from './views/menu-home'

const LandingPage = () => {
    return (
        <>
            <Layout>
                <Header className="header">
                    <HeaderHome></HeaderHome>
                </Header>
            </Layout>
            <Layout className='body'>
                <div>
                    <Sider width={0}>
                        <MenuHome></MenuHome>
                    </Sider>
                </div>
                <div className='content'>
                    <Content>
                        <MenuRouter></MenuRouter>
                    </Content>
                </div>
            </Layout>
            <Layout>
                <Footer className="footer">
                    <div className="footer">
                        <FooterHome></FooterHome>
                    </div>
                </Footer>
            </Layout>
        </>
    )
}

export default LandingPage