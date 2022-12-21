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
    return(<>
    <Card 
      style={{
        width: 340,
        height: 350
      }}
      cover={
        <Image
          style={{
            width: 340,
            height: 195
          }}
          src={formatBase64(props.thumbnail)}
          fallback={DEFAULT_LND_THUMBNAIL}
          preview={false}
        />
      }
      actions={[
        <Button type='link' style={{width:'100%'}} onClick={()=>{navigate('/lnd/programs/'+props.id.toString())}}> Go to Program <ArrowRight /> </Button>
      ]}
    >
      <Meta
        title={props.title}
        description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{props.description}</div>}
      />
    </Card>
    </>
      )
};

export default Programs;