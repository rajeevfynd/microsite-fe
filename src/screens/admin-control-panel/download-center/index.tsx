import { Tabs } from "antd";
import * as React from "react";
import { AdminHRPolicies } from "./views/admin-hr-policies";
import { AdminLeadersDownloads } from "./views/admin-leaders-downloads";
import { AdminNewEmployeeDownloads } from "./views/admin-new-employees.tsx";
import { AdminTemplates } from "./views/admin-templates";


const items = [
    {
        label: `New Employee`,
        key: 'new-employee',
        children: <AdminNewEmployeeDownloads />,
    },{
        label: `HR Policies`,
        key: 'policies',
        children: <AdminHRPolicies />,
    },
    {
        label: `Templates`,
        key: 'templates',
        children: <AdminTemplates />,
    },{
        label: `Our Leaders`,
        key: 'our-leaders',
        children: <AdminLeadersDownloads />,
    }
];

export const DownloadTabs = () => {
    return (
        <div className="card-container">
            <Tabs items={items} centered/>
        </div>
    )
}