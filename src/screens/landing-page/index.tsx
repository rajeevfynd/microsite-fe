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
        <Layout>
            <Header className="header">
                <HeaderHome></HeaderHome>
            </Header>
        </Layout>
        <div className='menu'>
            <MenuHome></MenuHome>
        </div>
        <Layout className='body'>
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