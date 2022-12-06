import { Card, Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import * as React from 'react';
import { BookHalf, ListColumns } from 'react-bootstrap-icons';
import "./index.scss";

interface EventType {
    icon: React.ReactElement<any, any> | null,
    src?: string
    message: string,
    navigation?: string
    type: "SURVEY" | "COURSE_IN_PROGRESS"
}

export const Events = () => {
    return (
        <>
            <Card className="home-card">
                <Carousel autoplay>
                    <div>
                        <h1>Hi</h1>
                    </div>
                    <div>
                        <h2>Hello</h2>
                    </div>
                </Carousel>
            </Card >
        </>
    )
}