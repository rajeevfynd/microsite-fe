import * as React from 'react';

import type { MenuProps } from 'antd';
import { Layout, List, Card, Menu, Button, Badge } from 'antd';

const { Content, Sider } = Layout;
const { Meta } = Card;

export function LearningBySkill() {


  const [isModalOpen, setIsModalOpen] = React.useState(false);


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




  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const myButton = () => {
    return <Button type="primary" block >View Course Details</Button>

  }

  return (
    <Layout hasSider={true} style={{
      height: '80vh'
    }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '80vh',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout
        style={{
          background: '#fff',
          height: '80vh',
          overflow: 'auto',
        }}

      >
        <Content style={{ margin: '2px 16px 0', height: '80vh' }}>
          <div style={{ textAlign: 'center', background: '#fff', height: '80vh', }}>

            <List
              grid={{ gutter: 32 }}
              dataSource={itemList}
              renderItem={itemList => itemList.id <= 50 ? <List.Item>

                {itemList.isCompleted ? <Badge.Ribbon color="green" text="Certified"> <Card
                  style={{ width: 255, }}
                  hoverable={true}
                  cover={
                    <img
                      style={{ width: 255, height: 154 }}
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                >

                  <Meta
                    style={{ justifyContent: "center" }}
                    title="Course title Course titleCourse titleCourse title "
                    description="Course description Course titleCourse titleCourse titleCourse title jay "

                  />

                </Card>
                  <Button block>View Course Details</Button>
                </Badge.Ribbon>
                  : <>  <Card
                    style={{ width: 255, }}
                    hoverable={true}
                    cover={
                      <img
                        style={{ width: 255, height: 154 }}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                  >

                    <Meta
                      style={{ justifyContent: "center" }}
                      title="Course title Course titleCourse titleCourse title "
                      description="Course description Course titleCourse titleCourse titleCourse title jay "
                    />

                  </Card>

                    <Button type="primary" block onClick={() => showModal()}>View Course Details</Button>
                  </>}

              </List.Item> : null}
            />

            <div style={{ textAlign: 'center' }}> <Button block type='primary'>View More</Button></div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};

