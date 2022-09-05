import {Layout } from "antd/lib";
import * as React from "react";
import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom" ;
import "antd/dist/antd.css";
import "./index.css";
import HeaderHome from "./screens/landing-page/views/header-home";
const {Header, Footer, Sider, Content} = Layout;
import FooterHome from "./screens/landing-page/views/footer-home";
import MenuHome from "./screens/landing-page/views/menu-home";

function abc(){
    console.log('abc')
}
const App = () => {
    return (
        <>
            <BrowserRouter>
            <Layout>
                <Header className="header">
                    <HeaderHome></HeaderHome>
                </Header>
            </Layout>
            <Layout className="menu">
                <Sider width={400}>
                    <MenuHome></MenuHome>
                </Sider>
                <Content>
                    <div className="content">
                        <Routes>
                            <Route path='/head' element={<FooterHome></FooterHome>}></Route>
                        </Routes>
                    </div>
                </Content>
            </Layout>
            <Layout>
                <Footer className="footer">
                    <div className="footer">
                        <FooterHome></FooterHome>
                    </div>
                </Footer>
            </Layout>
            </BrowserRouter>
        </>
    )
}
export default App;