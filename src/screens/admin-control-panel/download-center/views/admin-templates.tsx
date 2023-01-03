import { Tabs } from "antd";
import * as React from "react"
import { ShadowSearchInput } from "../../../../components/shadow-input-text";
import { GET_TEMPLATES } from "../../../../constants/urls";
import { SubmenuTabsType } from "../../../../models/download-center-type";
import { DownloadDocumentType } from "../../../../models/enums/download-document-type";
import { TemplatesSubmenu } from "../../../../models/enums/templates-submenu";
import { AddDownloadDocument } from "./add-policy-templates";
import { AdminDocumentsList } from "./admin-documents-list";
import { AdminDownloadsGallery } from "./admin-downloads-gallery";

export const AdminTemplates = () => {

    const [submenuItems, setSubmenuItems] = React.useState<SubmenuTabsType[]>([])
    const [downloadsUrl, setDownloadsUrl] = React.useState<string>("")
    const [keyState, setKeyState] = React.useState('')
    const [deleteUrl, setDeleteUrl] = React.useState<string>('')




    const createSubmenuList = ( )=> {
        for (let item in TemplatesSubmenu) {
            if (isNaN(Number(item))) {
                submenuItems.push({
                    key : item.replace('_', ' '),
                    value : TemplatesSubmenu[item]
                })
            }
        }
        console.log(submenuItems)
    }

    const searchDownloads = (key : string) => {
        setKeyState(key)
      }

    const onTabChange = (key: string) => {
        setDownloadsUrl(GET_TEMPLATES + "/" + Number(key))
    };

    const onAddSubmit = (categoryId : string) => {
        console.log("onAddSubmit")
        console.log(categoryId)
        setDownloadsUrl(GET_TEMPLATES + "/" + categoryId)
    }


    React.useEffect(() => {
        createSubmenuList()
        setDownloadsUrl(GET_TEMPLATES + "/" + 1)
        setDeleteUrl(GET_TEMPLATES + "/delete/")
    }, [])

    return (
        
        <div className="body-container">
            
            <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <ShadowSearchInput placeholder='Type in the document title you are looking for...'
                            size='large'
                            onChange={(e: { target: { value: string; }; }) => searchDownloads(e.target.value)}
                    />
                    <AddDownloadDocument addUrl={GET_TEMPLATES} categoryList = {submenuItems} downloadType = {DownloadDocumentType.TEMPLATES} onAddSubmit = {onAddSubmit}/>
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
                                {(Number(menu.value) === 1 || Number(menu.value) === 2) && 
                                    <div><AdminDocumentsList downloadsUrl={downloadsUrl} categoryList = {submenuItems} 
                                    searchKey = {keyState} deleteUrl = {deleteUrl} downloadType = {DownloadDocumentType.TEMPLATES}
                                    editUrl = {GET_TEMPLATES}/></div>}
                                {(Number(menu.value) === 3 || Number(menu.value) === 4) && 
                                <div><AdminDownloadsGallery downloadsUrl={downloadsUrl} deleteUrl = {deleteUrl}
                                categoryList = {submenuItems} downloadType = {DownloadDocumentType.TEMPLATES}
                                editUrl = {GET_TEMPLATES}/></div>}
                            </Tabs.TabPane></>
                        ))}
                    </>
                </Tabs>
            </>
        </div>
    )

}