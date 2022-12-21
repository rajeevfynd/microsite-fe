import * as React from 'react';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Image } from 'antd';

const { Meta } = Card;

import { Program } from '../../../../../models/course-type'
import { DEFAULT_LND_THUMBNAIL } from '../../../../../constants/string-constants';
import { ArrowRight } from 'react-bootstrap-icons';
import { formatBase64 } from '../../../../../utility/image-utils';

function Programs (props: Program){
  const navigate = useNavigate();
    return(
  <Card
    hoverable
    style={{
      width: 340,
      height: 300
    }}
    cover={<Image src={formatBase64(props.thumbnail)} fallback={DEFAULT_LND_THUMBNAIL} preview={false}/>}
  >
    <Meta title={props.title} description={props.description}  />
    <Button type='link' style={{ width: '100%' }} onClick={() => { navigate('/lnd/programs/'+props.id.toString()) }}> Go to Program <ArrowRight /> </Button>
  </Card>)
};

export default Programs;