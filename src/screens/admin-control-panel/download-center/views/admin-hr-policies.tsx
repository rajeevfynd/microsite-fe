import { Tabs } from "antd";
import * as React from "react"
import { ShadowSearchInput } from "../../../../components/shadow-input-text";
import { GET_HR_POLICIES } from "../../../../constants/urls";
import { SubmenuTabsType } from "../../../../models/download-center-type";
import { DownloadDocumentType } from "../../../../models/enums/download-document-type";
import { HRPoliciesSubmenu } from "../../../../models/enums/hr-policies-submenu";
import { AddDownloadDocument } from "./add-policy-templates";
import { AdminDocumentsList } from "./admin-documents-list";

export const AdminHRPolicies = () => {

    const [submenuItems, setSubmenuItems] = React.useState<SubmenuTabsType[]>([])
    const [downloadsUrl, setDownloadsUrl] = React.useState<string>("")
    const [keyState, setKeyState] = React.useState<string>('')
    const [deleteUrl, setDeleteUrl] = React.useState<string>('')


    const createSubmenuList = ( )=> {
        for (let item in HRPoliciesSubmenu) {
            if (isNaN(Number(item))) {
                submenuItems.push({
                    key : item.replace('_', ' '),
                    value : HRPoliciesSubmenu[item]
                })
            }
        }
    }

    const onTabChange = (key: string) => {
        setDownloadsUrl(GET_HR_POLICIES + "/" + Number(key))
    };

    const searchDownloads = (key : string) => {
        setKeyState(key)
      }

    const onAddSubmit = (categoryId : string) => {
        setDownloadsUrl(GET_HR_POLICIES + "/" + categoryId)
    }


    React.useEffect(() => {
        setDownloadsUrl(GET_HR_POLICIES + "/" + 1)
        setDeleteUrl(GET_HR_POLICIES + "/delete/")
        createSubmenuList()
    }, [])

    return (
        
        <div className="body-container">
            
            <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <ShadowSearchInput placeholder='Type in the document title you are looking for...'
                            size='large'
                            onChange={searchDownloads}
                    />

                    <AddDownloadDocument addUrl={GET_HR_POLICIES} categoryList = {submenuItems} downloadType={DownloadDocumentType.HR_POLICIES} onAddSubmit = {onAddSubmit}/>
                </div>

                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    style={{marginTop:40}}
                    onChange = {onTabChange}
                >   

                    <>
                        {submenuItems.map(menu => (
                            <><Tabs.TabPane tab={menu.key} key={menu.value}>
                                {keyState.length == 0 && 
                                    <div><AdminDocumentsList downloadsUrl={downloadsUrl} searchKey = {keyState} editUrl = {GET_HR_POLICIES}
                                    deleteUrl = {deleteUrl} categoryList = {submenuItems} downloadType = {DownloadDocumentType.HR_POLICIES}/></div>
                                }
                            </Tabs.TabPane></>
                        ))}
                    </>
                </Tabs>

                {keyState.length > 0 && 
                    <div>
                        Search Results
                        <div><AdminDocumentsList downloadsUrl={downloadsUrl} searchKey = {keyState} editUrl = {GET_HR_POLICIES}
                            deleteUrl = {deleteUrl} categoryList = {submenuItems} downloadType = {DownloadDocumentType.HR_POLICIES}/></div>
                    </div>
                }
            </>
        </div>
    )

}