import * as React from 'react';

import type { MenuProps } from 'antd';
import { Layout, List, Card, Button, Badge } from 'antd';

const { Content, Sider } = Layout;
const { Meta } = Card;

import { SkillList } from './views/skill-list';
import { CourseList } from './views/skill-courses';

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
        <SkillList items={items}></SkillList>
      </Sider>
      <Layout
        style={{
          background: '#fff',
          height: '80vh',
          overflow: 'auto',
        }}

      >
        <Content style={{ margin: '2px 16px 0', height: '80vh', textAlign: 'center', background: '#fff' }}>

          <CourseList itemList={itemList} showModal={showModal}></CourseList>

          <div style={{ textAlign: 'center' }}> <Button block type='primary'>View More</Button></div>
        </Content>
      </Layout>
    </Layout >
  )
};

