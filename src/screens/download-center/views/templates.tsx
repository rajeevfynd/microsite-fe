import { message, Tabs } from "antd";
import * as React from "react"
import { ShadowSearchInput } from "../../../components/shadow-input-text";
import { GET_TEMPLATES } from "../../../constants/urls";
import { SubmenuTabsType } from "../../../models/download-center-type";
import { TemplatesSubmenu } from "../../../models/enums/templates-submenu";
import { DocumentsList } from "./documents-list";
import { DownloadsGallery } from "./downloads-gallery";

export const TemplatesDownload = () => {

    const [submenuItems, setSubmenuItems] = React.useState<SubmenuTabsType[]>([])
    const [downloadsUrl, setDownloadsUrl] = React.useState<string>("")
    const [keyState, setKeyState] = React.useState('')


    const createSubmenuList = ( )=> {
        for (let item in TemplatesSubmenu) {
            if (isNaN(Number(item))) {
                submenuItems.push({
                    key : item,
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


    React.useEffect(() => {
        createSubmenuList()
        setDownloadsUrl(GET_TEMPLATES + "/" + 1)
    }, [])

    return (
        
        <div className="body-container">
            
            <>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <ShadowSearchInput placeholder='Type in the document title you are looking for...'
                            size='large'
                            onChange={(e: { target: { value: string; }; }) => searchDownloads(e.target.value)}
                    />
                </div>

                <Tabs
                    defaultActiveKey="1"
                    type="card"
                    style={{marginTop:40}}
                    onChange = {onTabChange}
                >   

                    <>

                        {submenuItems.map(menu => (
                            <><Tabs.TabPane tab={menu.key.replace("_", " ")} key={menu.value}>
                                {(Number(menu.value) === 1 || Number(menu.value) === 2) && 
                                    <div><DocumentsList downloadsUrl={downloadsUrl} searchKey = {keyState}/></div>}
                                {(Number(menu.value) === 3 || Number(menu.value) === 4) && 
                                <div><DownloadsGallery downloadsUrl={downloadsUrl}/></div>}
                            </Tabs.TabPane></>
                        ))}
                    </>
                </Tabs>
            </>
        </div>
    )

}