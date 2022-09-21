import * as React from 'react';
import type { MenuProps } from 'antd';
import { List, Card, Button, Badge } from 'antd';
import { CourseCard } from '../../../../../components/cards/content-configuration-card';

const { Meta } = Card;


export function CourseList(props: { itemList: { id: number, name: string, isCompleted: boolean }[]; showModal: () => void; }) {

    const itemList: { id: number, name: string, isCompleted: boolean }[] = new Array(50);
    for (let i = 0; i < itemList.length; i++) {
        itemList[i] = {
            id: i + 1,
            name: 'Skill',
            isCompleted: i % 2 === 0 ? true : false
        }
    };


    const items: MenuProps['items'] = itemList.map((data, index) => ({
        key: String(data.id),
        label: `${data.name} ${data.id}`,

    }));


    return (
        <List
            grid={{ gutter: 32 }}
            dataSource={props.itemList}
            renderItem={itemList => itemList.id <= 50 ? <List.Item>

                {itemList.isCompleted ?
                    <Badge.Ribbon color="green" text="Certified">

                        <CourseCard
                            cardStyle={{ width: 255 }}
                            isHoverable={true}
                            imageStyle={{
                                width: 255,
                                height: 154
                            }}
                            imageSource="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            metaStyle={{ justifyContent: "center" }}
                            title="Course title Course titleCourse titleCourse title"
                            description="Course description Course titleCourse titleCourse titleCourse title"
                        />

                        <Button block>View Course Details</Button>

                    </Badge.Ribbon> : <>
                        <CourseCard
                            cardStyle={{ width: 255 }}
                            isHoverable={true}
                            imageStyle={{
                                width: 255,
                                height: 154
                            }}
                            imageSource="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            metaStyle={{ justifyContent: "center" }}
                            title="Course title Course titleCourse titleCourse title"
                            description="Course description Course titleCourse titleCourse titleCourse title"
                        />

                        <Button type="primary" block onClick={() => props.showModal()}>View Course Details</Button>
                    </>}

            </List.Item> : null} />
    );
}
