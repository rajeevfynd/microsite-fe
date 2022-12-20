import { Button, Card, List, message } from 'antd';
import * as React from 'react';
import { Trash } from 'react-bootstrap-icons';
import { deleteBirthdayService, getAllBirthdaysService } from '../../../../service/home-service';

type BirthDayType = {
    id?: number,
    name?: string,
    image?: string,
    birthDay?: string
}

export const BirthdayList = (load: any) =>{
    const [birthdays, setbirthdays] = React.useState<BirthDayType[]>([]);
    const [loadagain, setloadagain] = React.useState("");



    const fetchBirthdays = React.useCallback(async () => {
        let resp = await getAllBirthdaysService();
        console.log(resp)
        setbirthdays(resp.data)
    }, [])

    React.useEffect(() => {
        fetchBirthdays()
    }, [load,loadagain, fetchBirthdays])

    const handleDelete = async (id: string, title: any) => {
        let resp = await deleteBirthdayService(id)
        if (resp.data) {
            message.success(`${title} birthday deleted`)
        }
        setloadagain(id)
    }
    return(
        <div>
                <br></br>
                <List
                    grid={{ gutter: 7, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
                    dataSource={birthdays}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Card hoverable //bodyStyle={{ padding: "15px" }}
                                actions={[
                                    <Button onClick={() => handleDelete(item.id.toString(), item.name)} type='link' danger> Delete <Trash style={{ margin: '5%' }} /> </Button>
                                ]}
                            >
                                <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    <img style={{ margin: 'auto', width: '100px', height: '100px' }}
                                        src={`data:image/png;base64,${item.image}`}
                                    />
                                    {item.name}
                                </div>
                                <div style={{ opacity: 0.5, display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                    {item.birthDay}
                                </div>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
    )
}