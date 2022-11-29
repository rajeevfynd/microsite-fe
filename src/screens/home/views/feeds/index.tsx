import { Card, Divider, List, Avatar, Typography, Input, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { ShadowSearchInput } from "../../../../components/shadow-input-text";
import "./index.css";
import { getUser } from "../../../../utility/user-utils";
import { User } from "../../../../models/user";
import InfiniteScroll from "react-infinite-scroll-component";

export const Feeds = () => {

    const user: any = getUser()
    const [firstName, setFirstName] = React.useState('');
    React.useEffect(() => {
        if (user) {
            setFirstName(user.firstName)
        }
    })

    return (
        <>
            <InfiniteScroll
                dataLength={10}
                next={() => {}}
                hasMore={false}
                loader={<Spin size="large" />}
                scrollThreshold="20%"
            >
                <div className="centered-container feed-container">
                    <div style={{ width: "90%" }}>
                        <Card className="home-card">
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '51px', height: '51px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                <Input className="text-input-post" placeholder={`What's on your mind, ${firstName}?`} />
                            </div>
                        </Card>
                        <Card className="home-card">
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                Sridhar has posted a Kudos
                            </div>
                            <div style={{ margin: "20px" }}>
                                <h5>Kudos to whole Microsite Team &#128585; &#128588; &#128640; &#128293;</h5>
                            </div>
                            <Divider />
                            Like Comment
                        </Card>
                        <Card className="home-card" >
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                Sridhar has posted a story.
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                                <img src="https://bl-i.thgim.com/public/todays-paper/tp-agri-biz-and-commodity/gtwmp4/article65807737.ece/alternates/FREE_1200/Reliance-Retail%2BGRHA6HSP8.4.jpg.jpg"
                                    style={{ width: "500px" }} />
                            </div>
                            <Divider />
                            Like Comment
                        </Card>
                        <Card className="home-card">
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                Sridhar has posted a story.
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                                <img src="https://pbs.twimg.com/media/EPhE1HGU4AAwAdO.jpg"
                                    style={{ width: "500px" }} />
                            </div>
                            <Divider />
                            Like Comment
                        </Card>
                        <Card className="home-card">
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                Sridhar has posted a story.
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                                <img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202210/ril_ma-sixteen_nine.jpg?size=948:533"
                                    style={{ width: "500px" }} />
                            </div>
                            <Divider />
                            Like Comment
                        </Card>
                        <Card className="home-card">
                            <div style={{ display: "flex" }}>
                                <Avatar style={{ marginRight: '10px', width: '25px', height: '25px' }}
                                    src="https://avatars.githubusercontent.com/u/20350203?v=4"
                                />
                                Sridhar has posted a story.
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "10px" }}>
                                <img src="https://pbs.twimg.com/media/EPhE1HGU4AAwAdO.jpg"
                                    style={{ width: "500px" }} />
                            </div>
                            <Divider />
                            Like Comment
                        </Card>
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}