import * as React from 'react';
import { Card } from 'antd';
const { Meta } = Card;


export function CourseCard(props: { cardStyle: object, isHoverable: boolean, imageStyle: object, imageSource: string, metaStyle: object, title: string, description: string }) {
    const { cardStyle, isHoverable, imageStyle, imageSource, metaStyle, title, description } = props;

    return (
        <Card
            style={cardStyle}
            hoverable={isHoverable}
            cover={
                < img style={imageStyle}
                    alt="image"
                    src={imageSource}
                />
            }>

            <Meta
                style={metaStyle}
                title={title}
                description={description}
            />

        </Card >
    );
}
