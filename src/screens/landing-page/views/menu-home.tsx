import * as React from "react";
import { Button, Menu } from "antd/lib";
import { getMenuRouteKeyByPath } from '../../../service/landing-page-service';
import { useLocation, useNavigate } from 'react-router-dom';
import './../index.css'
import { Award, BookHalf, PersonWorkspace, People, Download, InfoCircle, ListColumns, Gear } from "react-bootstrap-icons";
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined } from '@ant-design/icons';

import Sider from 'antd/lib/layout/Sider';

function OutsideClick(ref: any) {
    const [isClicked, setIsClicked] = React.useState<boolean>();

    return isClicked;
}

export default function MenuHome() {
    const navigate = useNavigate();
    const location = useLocation();

    const [collapsed, setCollapsed] = React.useState(true);
    const boxRef = React.useRef(null);

    const navigateTo = (url: string, collapse: boolean = true) => {
        navigate(url);
        setCollapsed(collapse);
    }
    const navigateToExternal = (url: string) => {
        window.open(url, '_blank')
        setCollapsed(true);
    }

    React.useEffect(() => {
        function handleClickOutside(event: any) {
            if (boxRef.current && !boxRef.current.contains(event.target)) {
                setCollapsed(true);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [boxRef]);
    const boxOutsideClick = OutsideClick(boxRef);

    return (
        <>
            <div ref={boxRef}>
                <div className='menu-list'>
                    <Sider theme='light' collapsed={collapsed} width={300}
                        onMouseEnter={() => setCollapsed(false)}
                        onMouseLeave={() => setCollapsed(true)}>
                        <Menu
                            mode="inline"
                            selectedKeys={getMenuRouteKeyByPath(location.pathname)}
                        >
                            <Menu.Item key="home" onClick={() => navigateTo('/home')} icon={<HomeOutlined />}>Home</Menu.Item>
                            <Menu.SubMenu key='learning-and-development' title='Learning and Development' icon={<BookHalf />}>
                                <Menu.SubMenu title='New Employee Center'>
                                    <Menu.Item
                                        key='induction'
                                        onClick={() => navigateTo('/lnd/new-emp-center/induction/welcome')}>
                                        Induction</Menu.Item>
                                    <Menu.Item
                                        key='new-emp-survey'
                                        onClick={() => navigateTo('/lnd/new-emp-center/new-emp-survey')}>
                                        New Employee Survey</Menu.Item>
                                    <Menu.Item
                                        key='new-emp-faq'
                                        onClick={() => navigateTo('/lnd/new-emp-center/new-emp-faq')}>
                                        New Employee FAQ</Menu.Item>
                                </Menu.SubMenu>
                                <Menu.SubMenu
                                    key='learning-center'
                                    onTitleClick={() => navigateTo('/lnd/learning-center/lnd-hero', false)}
                                    title='Learning Center'>
                                    <Menu.Item key='skill'
                                        onClick={() => navigateTo('/lnd/learning-center/skill')}>
                                        Skill
                                    </Menu.Item>


                                    <Menu.Item
                                        key='role'
                                        onClick={() => navigateTo('/lnd/learning-center/role')}>
                                        Role
                                    </Menu.Item>
                                    <Menu.Item
                                        key='academy'
                                        onClick={() => navigateTo('/lnd/learning-center/academy')}>
                                        Academy</Menu.Item>
                                </Menu.SubMenu>
                                <Menu.Item>Learning Passport</Menu.Item>
                                <Menu.Item onClick={() => navigateTo('/lnd/learning-journey')}>Learning Journey</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item icon={<PersonWorkspace />}>Manager Section</Menu.Item>
                            <Menu.Item
                                icon={<ListColumns />}
                                key="my-surveys"
                                onClick={() => navigateTo("/survey/my-surveys")}>
                                My Surveys
                            </Menu.Item>
                            <Menu.SubMenu title='R&R Section' icon={<Award />}>
                                <Menu.Item
                                    onClick={() => navigateToExternal('https://r-sammaan.ril.com/Pages/r-sammaan.aspx')}>R-Samman Portal</Menu.Item>
                                <Menu.Item disabled={true}>Leaders Appreciation Center</Menu.Item>
                                <Menu.Item>R&R placeholder</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item icon={<People />}>Employee Engagement Center</Menu.Item>
                            <Menu.SubMenu icon={<Download/>} title = 'Download Center'>
                                <Menu.Item
                                    key='new-employee-downloads'
                                    onClick={()=>navigateTo('/download-center/new-employees/')}>
                                    New Employee Downloads
                                </Menu.Item>
                                <Menu.Item
                                    key='templates'
                                    onClick={()=>navigateTo('/download-center/templates/')}>
                                    Templates
                                </Menu.Item>
                                <Menu.Item
                                    key='leaders-gallery'
                                    onClick={()=>navigateTo('/download-center/leaders-gallery/')}>
                                    Leaders' Gallery
                                </Menu.Item>
                                <Menu.Item
                                    key='logo'
                                    onClick={()=>navigateTo('')}>
                                    Logo
                                </Menu.Item>
                                <Menu.Item
                                    key='policies'
                                    onClick={()=>navigateTo('/download-center/policies/')}>
                                    Frequently Used Policies
                                </Menu.Item>
                            </Menu.SubMenu>

                            <Menu.Item icon={<InfoCircle />}>Information Center</Menu.Item>
                            <Menu.SubMenu title='Admin Control Panel' icon={<Gear />}>
                                <Menu.Item onClick={() => navigateTo('/admin/manage-announcement')}>Announcements</Menu.Item>
                                <Menu.SubMenu key='admin-lnd' title='Learning and Development'>
                                    <Menu.Item onClick={() => navigateTo('/admin/edit-carousel')}>Carousel</Menu.Item>
                                    <Menu.Item key='admin-induction' onClick={() => navigateTo('/admin/induction')}>Induction</Menu.Item>
                                    <Menu.Item key='admin-programs' onClick={() => navigateTo('/admin/programs')}>Programs</Menu.Item>
                                    <Menu.Item key='admin-journeys' onClick={() => navigateTo('/admin/journeys')}>Journeys</Menu.Item>
                                    <Menu.Item key='admin-courses' onClick={() => navigateTo('/admin/courses')}>Courses</Menu.Item>
                                    <Menu.Item
                                        key='addCourse'
                                        onClick={() => navigateTo('/lnd/learning-center/addCourse')}>
                                        Course</Menu.Item>
                                    <Menu.Item
                                        key='addSkill'
                                        onClick={() => navigateTo('/lnd/learning-center/addSkill')}>
                                        Skill</Menu.Item>
                                    <Menu.Item
                                        key='addRole'
                                        onClick={() => navigateTo('/lnd/learning-center/addRole')}>
                                        Role</Menu.Item>
                                </Menu.SubMenu>
                                <Menu.Item
                                    key="created-surveys"
                                    onClick={() => navigateTo("/admin/created-surveys")}
                                >Surveys</Menu.Item>

                                <Menu.SubMenu key="admin-download-center" title="Download Center">
                                    <Menu.Item key='admin-new-emp-downloads' onClick={() => navigateTo('/admin/new-employee-downloads')}>New Employee Downloads</Menu.Item>
                                    <Menu.Item key='admin-templates' onClick={() => navigateTo('/admin/templates')}>Templates</Menu.Item>
                                    <Menu.Item key='admin-leaders-gallery' onClick={() => navigateTo('/admin/leaders-gallery')}>Leaders' Gallery</Menu.Item>
                                    <Menu.Item key='admin-logo' onClick={() => navigateTo('/admin/logo')}>Logo</Menu.Item>
                                    <Menu.Item key='admin-policies' onClick={() => navigateTo('/admin/policies')}>Frequently Used Policies</Menu.Item>
                                </Menu.SubMenu>
                            </Menu.SubMenu>
                        </Menu>
                    </Sider>
                </div>
            </div>
        </>
    )
}
