import * as React from 'react'
import "./index.css"
import { Layout, Menu, MenuProps } from 'antd';
import { SelectInfo } from 'rc-menu/lib/interface';
import { AdminInduction } from '../induction';
import { AdminCoursePage } from '../courses';
import { Routes, Route } from 'react-router-dom';
import { EditCourse } from '../courses/edit-course';
import EditCarousal from '../edit-carousel';
import { AdminJourneyList } from '../journeys';
import { EditJourney } from '../journeys/views/edit-journey';
import { NewJourney } from '../journeys/views/new-jounrey';
import { AdminProgramList } from '../programs';
import { EditProgram } from '../programs/views/edit-program';
import { NewProgram } from '../programs/views/new-program';
import { useNavigate } from 'react-router-dom';
import { AddSkill } from '../../learning-development/learning-center/add-skill';
import { AddRole } from '../../learning-development/learning-center/add-role';
import { AddCourse } from '../../learning-development/learning-center/add-course';
import { ProtectedComponent } from '../../../components/protected/protected-component';

const { Content, Sider } = Layout;
const items: MenuProps['items'] = [
    "Induction",
    "Carousel",
    "Programs",
    "Journeys",
    "Courses",
    "Skills",
    "Roles"

].map((item, index) => ({
    key: String(item),
    label: item,
}));

export const AdminLnd = () => {
    const navigate = useNavigate()

    function handleMenuItemSelection(event: SelectInfo) {
        const { key } = event;

        if (key === "Induction") {
            navigate("/admin/admin-lnds/induction");
        }
        if (key === "Carousel") {
            navigate("/admin/admin-lnds/edit-carousel");
        }
        if (key === "Programs") {
            navigate("/admin/admin-lnds/programs");
        }
        if (key === "Journeys") {
            navigate("/admin/admin-lnds/journeys");
        }
        if (key === "Courses") {
            navigate("/admin/admin-lnds/courses");
        }
        if (key === "Skills") {
            navigate("/admin/admin-lnds/skills");
        }
        if (key === "Roles") {
            navigate("/admin/admin-lnds/roles");
        }
    }

    React.useEffect(() => {
        navigate("/admin/admin-lnds/induction");
    }, [])

    return (
        <>
            <Layout hasSider={true} style={{
                height: '90vh'
            }}>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '90vh',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['Induction']}
                        items={items}
                        onSelect={(event) => handleMenuItemSelection(event)} />

                </Sider>

                <Layout
                    style={{
                        height: '90vh',
                    }}
                >
                    <Content style={{
                        overflow: 'auto',
                        margin: '0px 0px 0',
                        height: '90vh'
                    }}>
                        <ProtectedComponent>
                            <Routes>
                                <Route path="/edit-carousel/*" element={<EditCarousal></EditCarousal>}></Route>
                                <Route path="/induction/*" element={<AdminInduction />}></Route>
                                <Route path="/journeys/*" element={<AdminJourneyList />}></Route>
                                <Route path="/journeys/new" element={<NewJourney />} />
                                <Route path="/journeys/:id" element={<EditJourney />} />
                                <Route path="/programs/*" element={<AdminProgramList />}></Route>
                                <Route path="/programs/new" element={<NewProgram />}></Route>
                                <Route path="/programs/:id" element={<EditProgram />}></Route>
                                <Route path="/courses/*" element={<AdminCoursePage />} />
                                <Route path="/courses/addCourse" element={<AddCourse />} />
                                <Route path="/courses/:id" element={<EditCourse />} />
                                <Route path="/skills/*" element={<AddSkill />}></Route>
                                <Route path="/roles/*" element={<AddRole />}></Route>
                            </Routes>
                        </ProtectedComponent>
                    </Content>
                </Layout>
            </Layout>
        </>

    )
}

