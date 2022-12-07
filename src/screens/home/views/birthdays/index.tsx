import { Card, Divider, List, Avatar, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { getBirthdaysService } from "../../../../service/home-service";

type BirthDayType = {
    id?: number,
    name?: string,
    image?: string,
    date?: string
}

export const BirthDays = () => {

    const[birthdays, setbirthdays] = React.useState <BirthDayType[]>([]);

    const fetchBirthdays = async() =>{
        let resp = await getBirthdaysService();
        setbirthdays(resp.data)
    }

    React.useEffect(()=>{
        fetchBirthdays()
    },[])

    return (
        <>
            <Card className="home-card">
                <Meta title={<div><h4>Today's Birthday <video width="30" height="30" preload="none" src="https://cdn-icons-mp4.flaticon.com/512/8701/8701216.mp4" autoPlay loop={true} muted={true} playsInline></video></h4></div>} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography.Text disabled style={{ fontSize: "12px", width: '60%' }}>Click to wish them</Typography.Text>
                    <div style={{ width: '100%' }} >
                        <Divider />
                    </div>
                </div>
                <List
                    grid={{ gutter: 7, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
                    dataSource={birthdays}
                    renderItem={item => (
                        <List.Item key={item.name}>
                            <Card hoverable bodyStyle={{ padding: "15px" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                                        src={`data:image/png;base64,${item.image}`}
                                    />
                                    {item.name}
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>
        </>
    )
}