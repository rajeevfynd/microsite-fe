import {Layout, Menu } from "antd/lib";
import * as React from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom" ;
import "antd/dist/antd.css";
import HeaderHome from "./screens/landing-page/views/header-home";
const {Header, Footer, Sider, Content} = Layout;
import { getMenuItems, navigateOnMenuSelect } from './service/landing-page-service'
import FooterHome from "./screens/landing-page/views/footer-home";

export default class App extends React.Component{
    render() {
    return (
        <>
            <BrowserRouter>
            <Layout>
                <Header className="header">
                    <HeaderHome></HeaderHome>
                </Header>
            </Layout>
            <Layout style={{padding: '1% 4%'}}>
                <Sider width={400}>
                    <Menu theme='light' mode='inline' style={{padding:'1%',height:'100%'}} items={getMenuItems()} onSelect={e => navigateOnMenuSelect(e)}/>
                </Sider>
                <Content>
                    <div style={{margin:'0 0 0 1%', padding:'1%', height:'100%', background:'white'}}>
                        <Routes>
                            <Route path='/head' element={<FooterHome></FooterHome>}></Route>
                        </Routes>
                    </div>
                </Content>
            </Layout>
            <Layout>
                <Footer className="footer">
                    <div style={{margin:'1%', padding:'1%', height:'100%', background:'white'}}>
                        <FooterHome></FooterHome>
                    </div>
                </Footer>
            </Layout>
            </BrowserRouter>
        </>
    )
  }
}