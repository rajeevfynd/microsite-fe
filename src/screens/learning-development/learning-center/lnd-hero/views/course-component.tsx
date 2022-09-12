import * as React from 'react';
import 'antd/dist/antd.css';

import { Card } from 'antd';

const { Meta } = Card;

import { Courses } from '../../../../../models/course-type'

function Courses (props: Courses){
    console.log(props)
    return(
  <Card
    hoverable
    style={{
      width: 340,
    }}
    cover={<img alt="example" src="https://www.raisin.digital/wp-content/uploads/placeholder.svg" />}
  >
    <Meta title={props.programTitle} description={props.programDescription} />
    <p>Course Duration: {props.programDuration} days</p>
  </Card>)
};

export default Courses;