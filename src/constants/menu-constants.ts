import { MenuProps } from "antd";
import { MenuRoute } from "../models/menu-route";


export const menuRoutes: MenuRoute[] = [
    {
        key: 'induction',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/induction'
    },
    {
        key: 'new-emp-survey',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/new-emp-survey'
    },
    {
        key: 'new-emp-faq',
        isExternalLink: false,
        navigateTo: '/lnd/new-emp-center/new-emp-faq'
    },
    {
        key: 'lnd-hero',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/lnd-hero'
    },
    {
        key:'skill',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/skill'
    },
    {
        key:'role',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/role'
    },
    {
        key:'academy',
        isExternalLink: false,
        navigateTo: '/lnd/learning-center/academy'
    },
    {
        key:'learning-passport',
        isExternalLink: false,
        navigateTo: '/lnd/learning-passport'
    },
    {
        key:'learning-journey',
        isExternalLink: false,
        navigateTo: '/lnd/learning-journey'
    },
    {
        key:'r-samman',
        isExternalLink: true,
        navigateTo: 'https://r-sammaan.ril.com/Pages/r-sammaan.aspx'
    },
    {
        key:'rnr-placeholder',
        isExternalLink: false,
        navigateTo: '/rnr/placeholder'
    }
]

export const menuItems:MenuProps['items'] = [
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
                        key:'lnd-hero',
                        label:'L&D Hero'
                    },
                    {
                        key:'skill',
                        label:'Skill'
                    },
                    {
                        key:'role',
                        label:'Role'
                    },
                    {
                        key:'academy',
                        label:'Academy'
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
    }
]