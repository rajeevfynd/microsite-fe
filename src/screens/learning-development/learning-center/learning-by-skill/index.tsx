import * as React from 'react';
import httpInstance from '../../../../utility/http-client';
import { Layout, Button, message, List, Card, Image, Skeleton, Result, Typography } from 'antd';

const { Content, Sider } = Layout;

import { SkillList } from './views/skill-list';
import { ProgramList } from './views/skill-courses';
import { Tagtype } from '../../../../constants/tag';
import { getFormattedDataForMenuItems } from './views/helper';
import { Footer } from 'antd/lib/layout/layout';

export function LearningBySkill() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuItemChanged, setIsMenuItemChanged] = React.useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const [skillList, setSkillList] = React.useState([]);
  const [programList, setProgramList] = React.useState<any[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    offset: 0,
    pageSize: 4
  });


  const handleViewMoreClick = () => {
    console.log('hi')
    setPagination({ ...pagination, offset: pagination.offset + 1 });
    setButtonStatus(true);
  }


  React.useEffect(() => {
    //Api -> get AllActive Skill Tags

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/tag/?tagType=${Tagtype.skill}`)
        .then(  (response) => {
          if (!!getFormattedDataForMenuItems(response.data).length) {
            setSkillList(getFormattedDataForMenuItems(response.data));
            setSelectedMenuItem([response.data[0].id]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          message.error("Something went wrong, Please try after sometime");
        });
    })();

  }, []);

  React.useEffect(() => {
    //Api -> get Courses By TagId
    if (!selectedMenuItem.length) return;

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/program-tag/programs-by-tag-id/?tagId=${Number(selectedMenuItem[0])}&offset=${pagination.offset}&pageSize=${pagination.pageSize}`)
        .then((response) => {
          if (!response.data.content.length) {
            setButtonStatus(true);
          }

          if (response.data.content.length) {
            setProgramList([...programList, response.data.content]);
          }

          if (response.data.content.length < 10) {
            setButtonStatus(true);
          } else {
            setButtonStatus(false);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          setButtonStatus(true);
          setIsLoading(false);
          message.error("Something went wrong, Please try after sometime");

        });
    })();

  }, [pagination.offset, isMenuItemChanged]);


  React.useEffect(() => {
    if (!selectedMenuItem.length) return;

    setProgramList([]);
    setPagination({ ...pagination, offset: 0 });
    setIsMenuItemChanged(!isMenuItemChanged);
  }, [selectedMenuItem]);


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
          <Button block style={{ background: "#001529", color: "#f5f5f5" }}>
            Skills
          </Button>

          <SkillList items={skillList}
            selectedMenuItem={selectedMenuItem}
            handleSelectedMenuItem={setSelectedMenuItem}
          />
        </Sider>

        <Layout
          style={{
            background: '#fff',
            height: '80vh',
          }}
        >
          <Content style={{
            overflow: 'auto',
            margin: '2px 16px 0',
            height: '80vh',
            textAlign: 'center',
            background: '#fff'
          }}>
            { programList ? <ProgramList programs={programList} hasMore={false} loadMoreData = {()=>handleViewMoreClick()} /> : null }
          </Content>
        </Layout>
      </Layout >}
    </>
  )
};


