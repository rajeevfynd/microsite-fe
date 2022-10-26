import * as React from 'react';
import { List, Button } from 'antd';
import { CourseCard } from '../../../../../components/cards/content-configuration-card';


export function CourseList(props: { courseList: any }) {

    const { courseList } = props;


    return (
        <List
            grid={{ gutter: 32 }}
            dataSource={courseList}
            renderItem={({ course }) => (<List.Item key={course.id}>

                <CourseCard
                    key={course.id}
                    cardStyle={{ width: 255 }}
                    isHoverable={true}
                    imageStyle={{
                        width: 255,
                        height: 154
                    }}
                    imageSource={course.thumbnail}
                    metaStyle={{ justifyContent: "center" }}
                    title={course.title}
                    description={course.description}
                />

                <Button type="primary" block href={course.rruDeepLink} target="_blank" rel="noopener noreferrer"> Start Course </Button>

            </List.Item>)
            }
        />
    );
}
