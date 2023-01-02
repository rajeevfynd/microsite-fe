import * as React from 'react';
import { List, Button, Card, Image, Empty, Skeleton } from 'antd';
import { CourseCard } from '../../../../../components/cards/content-configuration-card';
import Modal from 'antd/lib/modal/Modal';
import { CourseDetails } from '../../../../../components/course-detail/course-details';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ProgramDetailType } from '../../../../../models/journey-details';
import { DEFAULT_LND_THUMBNAIL } from '../../../../../constants/string-constants';
import { formatBase64 } from '../../../../../utility/image-utils';
import Meta from 'antd/lib/card/Meta';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

export function ProgramList(props: { programs: { program: ProgramDetailType }[], hasMore: boolean, loadMoreData:any }) {

    const navigate = useNavigate();
    const { programs, hasMore, loadMoreData } = props;

    return (
        <>
        <div
      style={{
        width: '100%',
        height: '100%'
      }}
    >
            { programs.length != 0 &&
      <InfiniteScroll
        dataLength={programs.length}
        next={()=>{props.loadMoreData()}}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="scrollableDiv"
      >
        <List
          grid={{ gutter: 10, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
          style={{padding : "1%"}}
          dataSource={programs}
          renderItem={item => (
            <List.Item key={item.program.id}>
              <Card 
                hoverable
                style={{
                  width: 306,
                  height: 330
                }}
                cover={
                  <Image
                    style={{
                      width: 306,
                      height: 175.5
                    }}
                    src={formatBase64(item.program.thumbnail)}
                    fallback={DEFAULT_LND_THUMBNAIL}
                    preview={false}
                  />
                }
                actions={[
                  <Button type='link' style={{width:'100%'}} onClick={()=>{navigate(item.program.id.toString())}}> Go to Program <ArrowRight /> </Button>
                ]}
              >
                <Meta
                  title={item.program.title}
                  description={<div style={{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", height:'20px'}}>{item.program.description}</div>}
                />
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      }
      {
        programs.length == 0 &&
        <Empty
          description='No programs found'
        />
      }
      </div>
        </>
    );
}
