import { Card, Divider, List, Avatar, Modal, Radio, Space, Button, RadioChangeEvent, message } from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getBirthdayCards, getBirthdaysService, getBirthdayWishes, sendWish } from "../../../../service/home-service";

type BirthDayType = {
    id?: number,
    name?: string,
    email?: string,
    image?: string,
    birthDay?: string
}

export const BirthDays = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalName, setModalName] = React.useState("")
    const [modalEmail, setModalEmail] = React.useState("")
    const [modalBirthday, setModalBirthday] = React.useState("")
    const [birthDayCards, setBirthDayCards] = React.useState<string[]>([])
    const [birthDayWishes, setBirthDayWishes] = React.useState<string[]>([])
    const [card, setCard] = React.useState()
    const [wish, setWish] = React.useState()
    const fetchBirthDayCards = async () => {
        let resp = await getBirthdayCards()
        const cards = resp.data.map((item: string) => item.link)
        console.log(cards)
        setBirthDayCards(cards)
    }
    const fetchBirthDayWishes = async () => {
        let resp = await getBirthdayWishes()
        const wishes = resp.data.map((item: {wish: string}) => item.wish)
        console.log(wishes)
        setBirthDayWishes(wishes)
    }
    //const options = ['1','2','3']
    const showModal = (name: any, email: any, birthDay: any) => {
        setIsModalOpen(true);
        setModalName(name)
        setModalEmail(email)
        setModalBirthday(birthDay)
        fetchBirthDayCards()
        fetchBirthDayWishes()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = async () => {
        const body = {
            receiverEmail:modalEmail,
            receiverBirthday:modalBirthday,
            card:card,
            wish:wish
        }
        const resp = await sendWish(body);
        message.info(resp.data);
        setCard(undefined);
        setWish(undefined);
        setIsModalOpen(false);
    };

    const [birthdays, setbirthdays] = React.useState<BirthDayType[]>([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [pageNumber, setPageNumber] = React.useState(0);

    const loadMore = async () => {
        let resp = await getBirthdaysService(pageNumber.toString(), '4');
        setbirthdays([...birthdays, ...resp.data.content])
        setHasMore(!resp.data.last)
        setPageNumber(pageNumber + 1)

    }

    React.useEffect(() => {
        loadMore()
    }, [])

    const handleOnChangeCard = (e: RadioChangeEvent) => {
        setCard(e.target.value)
    }

    const handleOnChangeWishes = (e: RadioChangeEvent) => {
        setWish(e.target.value)
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
                                    <div onClick={e => showModal(item.name, item.email,item.birthDay)}>
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
                        <Modal width={"900px"} title={`Send Wishes to ${modalName}`}
                            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
                            footer={[<Button key="submit" type="primary" onClick={handleOk}>
                                Send The Wish!!
                            </Button>]}>
                            <div>
                                <h5>Select Card:</h5>
                                <Radio.Group name="Cards" onChange={handleOnChangeCard} value={card} >
                                    <Space direction="horizontal">
                                        {birthDayCards.map(ele => <Radio value={ele}><img style={{ width: "100%", height: "100%" }} src={ele}></img></Radio>)}
                                    </Space>
                                </Radio.Group>
                            </div>
                            <br></br>
                            <div>
                                <h5>Select Wish:</h5>
                                <Radio.Group name="Wishes" onChange={handleOnChangeWishes} value={wish} >
                                    <Space direction="vertical">
                                        {birthDayWishes.map(ele => <Radio value={ele}><h6>{ele}</h6></Radio>)}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Modal>
                    </InfiniteScroll>
                </div>
            </Card>
        </>
    )
}