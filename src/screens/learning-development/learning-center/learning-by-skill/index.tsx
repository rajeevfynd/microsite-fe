import * as React from 'react';
import httpInstance from '../../../../utility/http-client';
import { Layout, Button } from 'antd';

const { Content, Sider } = Layout;

import { SkillList } from './views/skill-list';
import { CourseList } from './views/skill-courses';
import { Tagtype } from '../../../../constants/tag';
import { itemList, getFormattedDataForMenuItems } from './views/helper';

export function LearningBySkill() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  const [skillList, setSkillList] = React.useState([])




  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addSkill = () => {
    return <Button block style={{ background: "#001529", color: "#f5f5f5" }}>
      Add Skill
    </Button>

  }


  React.useEffect(() => {
    //Api -> getAllActiveSkillTags

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/tag/?tagType=${Tagtype.skill}`)
        .then((response) => {
          if (!!response.data.length) {
            if (!!getFormattedDataForMenuItems(response.data).length) {
              setSkillList(getFormattedDataForMenuItems(response.data));
            }
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          window.alert(`${error.message}`);
        });
    })();

  }, [])


  return (
    <>
      {isLoading ? "Loading" : <Layout hasSider={true} style={{
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
          {addSkill()}
          <SkillList items={skillList}></SkillList>
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
      </Layout >}
    </>
  )
};


