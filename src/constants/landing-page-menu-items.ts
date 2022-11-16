import { MenuProps } from "antd";
import { MenuRoute } from "../models/menu-route";

// menu item and its route link will be specified in this constant 
export const menuRoutes: MenuRoute[] = [
    {
        key:'home',
        isExternalLink: false,
        navigateTo: '/home',
        accessList: ['PUBLIC','ADMIN-LND','ADMIN-EMPLOYEE-ENGAGEMENT','ADMIN-GLOBAL','LEADER'],
        parents: []
    },
    {
        key: 'induction',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/induction/welcome',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'new-employee-center'],
        children: []
    },
    {
        key: 'new-emp-survey',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/new-emp-survey',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'new-employee-center'],
    },
    {
        key: 'new-emp-faq',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/new-emp-faq',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'new-employee-center'],
    },
    {
        key: 'learning-center',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/lnd-hero',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development'],
    },
    {
        key: 'skill',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/skill',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'learning-center'],
    },
    {
        key:'role',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/role',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'learning-center'],
    },
    {
        key: 'academy',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/academy',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development', 'learning-center'],
    },
    {
        key: 'learning-passport',
        isExternalLink: false,
        navigateTo: '/lnd/learning-passport',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development']
    },
    {
        key: 'learning-journey',
        isExternalLink: false,
        navigateTo: '/lnd/learning-journey',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['learning-and-development']
    },
    {
        key: 'r-samman',
        isExternalLink: true,
        navigateTo: 'https://r-sammaan.ril.com/Pages/r-sammaan.aspx',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['rnr-section'],
    },
    {
        key: 'rnr-placeholder',
        isExternalLink: false,
        navigateTo: '/rnr/placeholder',
        accessList: ['PUBLIC', 'ADMIN-LND', 'ADMIN-EMPLOYEE-ENGAGEMENT', 'ADMIN-GLOBAL', 'LEADER'],
        parents: ['rnr-section']
    }
]

// menu props is interface for antd menu for accepting menu items
// all menu items will be listed in this constant
export const menuItems: MenuProps['items'] = [
    {
        key: 'learning-and-development',
        label: 'Learning and Development',
        children: [
            {
                key: 'new-employee-center',
                label: 'New Employee Center',
                children: [
                    {
                        key: 'induction',
                        label: 'Induction'
                    },
                    {
                        key: 'new-emp-survey',
                        label: '30 Days Survey'
                    },
                    {
                        key: 'new-emp-faq',
                        label: 'New Employee Help Center (FAQ)'
                    }
                ]
            },
            {
                key: 'learning-center',
                label: 'Learning Center',
                children: [
                    {
                        key: 'lnd-hero',
                        label: 'L&D Hero'
                    },
                    {
                        key: 'addCourse',
                        label: 'Add Course'
                    },
                    {
                        key: 'addSkill',
                        label: 'Add Skill'
                    },
                    {
                        key: 'skill',
                        label: 'Skill'
                    },
                    {
                        key: 'role',
                        label: 'Role'
                    },
                    {
                        key: 'role',
                        label: 'Role'
                    },
                    {
                        key: 'academy',
                        label: 'Academy'
                    }
                ]
            },
            {
                key: 'learning-passport',
                label: 'Learning Passport'
            },
            {
                key: 'learning-journey',
                label: 'Learning Journey',
            }
        ]
    },
    {
        key: 'manager-section',
        label: "Manage Section"
    },
    {
        key: 'rnr-section',
        label: 'R&R Section',
        children: [
            {
                key: 'r-samman',
                label: 'R Samman',
            },
            {
                key: 'leaders-appreciation-center',
                label: 'Leaders Appreciation Center'
            },
            {
                key: 'rnr-placeholder',
                label: 'R&R Placeholder'
            }

        ]
    },
    {
        key: 'employee-engagement-center',
        label: 'Employee Engagement Center'
    },
    {
        key: 'download-center',
        label: 'Download Center'
    },
    {
        key: 'information-center',
        label: '3P Information Center'
    }
]