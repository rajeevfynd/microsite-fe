import * as React from 'react';
import Axios from 'axios';
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

  const myButton = () => {
    return <Button type="primary" block >View Course Details</Button>

  }


  React.useEffect(() => {
    (() => {
      const source = Axios.CancelToken.source();
      Axios.get(`http://localhost:8082/microsite/tag/?tagType=${Tagtype.skill}`, {
        cancelToken: source.token,
        headers: {},
        handlerEnabled: false
      })
        .then((response) => {

          if (!!response.data.data.length && response.status === 200) {
            if (!!getFormattedDataForMenuItems(response.data.data).length) {
              setSkillList(getFormattedDataForMenuItems(response.data.data));
            }
            setIsLoading(false);
          }
        })
        .catch((error) => {
          if (Axios.isCancel(error)) {
          } else if (error.response) {
            console.log(error.response.data.error);
            window.alert(`${error.response.data.error.message}`);
          } else {
            console.log(error.message);
            window.alert(`${error.message}`);
          }
        });

      return () => {
        source.cancel("Cancelling in cleanup");
      };
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


