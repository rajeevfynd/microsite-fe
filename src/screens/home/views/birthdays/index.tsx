import { Card, Divider, List, Avatar, Typography, Modal, Spin, Skeleton, Radio, Space, Button, RadioChangeEvent } from "antd";
import Meta from "antd/lib/card/Meta";
import Item from "antd/lib/list/Item";
import { opacity } from "html2canvas/dist/types/css/property-descriptors/opacity";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBirthdayCards, getBirthdaysService } from "../../../../service/home-service";

type BirthDayType = {
    id?: number,
    name?: string,
    image?: string,
    birthDay?: string
}

export const BirthDays = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalName, setModalName] = React.useState("")
    const [birthDayCards, setBirthDayCards] = React.useState<string[]>([])
    const [card, setCard] = React.useState()
    const fetchBirthDayCards = async () => {
        let resp = await getBirthdayCards()
        const cards = resp.data.map((item: string) => item.link)
        console.log(cards)
        setBirthDayCards(cards)
    }
    //const options = ['1','2','3']
    const showModal = (name: any) => {
        setIsModalOpen(true);
        setModalName(name)
        fetchBirthDayCards()
        // React.useEffect(()=>{
        //     fetchBirthDayCards()
        // },[])
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const [birthdays, setbirthdays] = React.useState<BirthDayType[]>([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [initialLoad, setInitialLoad] = React.useState(false);

    const loadMore = async () => {
        let resp = await getBirthdaysService(pageNumber.toString(), '4');
        setbirthdays([...birthdays, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPageNumber(pageNumber + 1)

    }

    // const fetchBirthdays = async () => {
    //     let resp = await getBirthdaysService(pageNumber.toString(), '4');
    //     setbirthdays(resp.data.content)
    //     setHasMore(!resp.data.last)
    //     setPageNumber(pageNumber + 1)
    //     setInitialLoad(true)
    // }

    React.useEffect(() => {
        loadMore()
    }, [])

    const handleOnChange = (e: RadioChangeEvent) =>{
        console.log(e.target.value)
        setCard(e.target.value)
    }

    return (
        <>
            <Card className="home-card">
                <Meta title={<div><h4>Today's Birthday <video width="30" height="30" preload="none" src="https://cdn-icons-mp4.flaticon.com/512/8701/8701216.mp4" autoPlay loop={true} muted={true} playsInline></video></h4></div>} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Typography.Text style={{ fontSize: "12px", width: '60%',opacity:"40%" }}>Click to wish them</Typography.Text> */}
                    <p style={{ opacity: '50%' }}>ScrollHere</p>
                    <div style={{ width: '100%' }} >
                        <Divider />
                    </div>
                </div>
                <div id="scroll" style={{ height: "150px", overflowY: "scroll" }}>
                    <InfiniteScroll
                        dataLength={birthdays.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<></>}
                    >
                        <List
                            grid={{ gutter: 7, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }}
                            dataSource={birthdays}
                            renderItem={item => (
                                <List.Item key={item.name}>
                                    <div onClick={e => showModal(item.name)}>
                                        <Card hoverable bodyStyle={{ padding: "15px" }} >
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                                <Avatar style={{ margin: 'auto', width: '51px', height: '51px' }}
                                                    src={`data:image/png;base64,${item.image}`}
                                                />
                                                {item.name}
                                            </div>
                                        </Card>
                                    </div>

                                </List.Item>
                            )}
                        />
                        <Modal title={`Send Wishes to ${modalName}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <Radio.Group onChange={handleOnChange} >
                                {birthDayCards.map(ele => <Radio value= {ele}><img style={{width:"50%", height:"50%"}} src={ele}></img></Radio>)}
                            </Radio.Group>
                        </Modal>
                    </InfiniteScroll>
                </div>
            </Card>
        </>
    )
}