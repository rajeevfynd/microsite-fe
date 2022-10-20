import * as React from 'react';
import 'antd/dist/antd.css';

import { Card } from 'antd';

const { Meta } = Card;

import { Program } from '../../../../../models/course-type'
import { ALT_THUMBNAIL } from '../../../../../constants/string-constants';

function Programs (props: Program){
    return(
  <Card
    hoverable
    style={{
      width: 340,
      height: 300
    }}
    cover={<img alt={ALT_THUMBNAIL} src={props.thumbnailLink} />}
  >
    <Meta title={props.title} description={props.description} />
    <p>Program Duration: {props.duration} days</p>
  </Card>)
};

export default Programs;