import { Tabs } from "antd";
import * as React from "react"
import { ShadowSearchInput } from "../../../components/shadow-input-text";
import { GET_HR_POLICIES } from "../../../constants/urls";
import { SubmenuTabsType } from "../../../models/download-center-type";
import { HRPoliciesSubmenu } from "../../../models/enums/hr-policies-submenu";
import { DocumentsList } from "./documents-list";

export const HRPolicies = () => {

    const [submenuItems, setSubmenuItems] = React.useState<SubmenuTabsType[]>([])
    const [downloadsUrl, setDownloadsUrl] = React.useState<string>("")
    const [keyState, setKeyState] = React.useState('')


    const createSubmenuList = ( )=> {
        for (let item in HRPoliciesSubmenu) {
            if (isNaN(Number(item))) {
                submenuItems.push({
                    key : item.replace("_", " "),
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


    React.useEffect(() => {
        setDownloadsUrl(GET_HR_POLICIES + "/" + 1)
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
                                    <div><DocumentsList downloadsUrl={downloadsUrl} searchKey = {keyState}/></div>
                                }
                            </Tabs.TabPane></>
                        ))}
                    </>
                </Tabs>

                {keyState.length > 0 && 
                    <div><DocumentsList downloadsUrl={downloadsUrl} searchKey = {keyState}/></div>
                }

            </>
        </div>
    )

}