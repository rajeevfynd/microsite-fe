import * as React from 'react';
import httpInstance from '../../../../utility/http-client';
import { Layout, Button, message } from 'antd';

const { Content, Sider } = Layout;

import { SkillList } from './views/skill-list';
import { CourseList } from './views/skill-courses';
import { Tagtype } from '../../../../constants/tag';
import { getFormattedDataForMenuItems } from './views/helper';
import { Footer } from 'antd/lib/layout/layout';

type skillDescListType = {
  id?: number,
  name?: string,
  description?: string
}

export function LearningBySkill() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isMenuItemChanged, setIsMenuItemChanged] = React.useState(false);
  const [buttonStatus, setButtonStatus] = React.useState(true);
  const [skillList, setSkillList] = React.useState([]);
  const [skillDescList, setSkillDescList] = React.useState<skillDescListType[]>([]);
  const [currentSkillName,setCurrentSkillName] = React.useState("")
  const [currentSkillDesc, setCurrentSkillDesc] = React.useState("")
  const [courseList, setCourseList] = React.useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    offset: 0,
    pageSize: 10
  });


  const handleViewMoreClick = () => {
    setPagination({ ...pagination, offset: pagination.offset + 1 });
    setButtonStatus(true);
  }


  React.useEffect(() => {
    //Api -> get AllActive Skill Tags

    (() => {
      setIsLoading(true);
      httpInstance.get(`/microsite/tag/?tagType=${Tagtype.skill}`)
        .then((response) => {
          if (!!getFormattedDataForMenuItems(response.data).length) {
            setSkillList(getFormattedDataForMenuItems(response.data));
            setSkillDescList(response.data)
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
      httpInstance.get(`/microsite/course-tag/courses-by-tag-id/?tagId=${Number(selectedMenuItem[0])}&offset=${pagination.offset}&pageSize=${pagination.pageSize}`)
        .then((response) => {
          if (!response.data.length) {
            setButtonStatus(true);
          }

          if (response.data.length) {
            setCourseList(courseList.concat(response.data));
          }

          if (response.data.length < 10) {
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

    setCourseList([]);
    setPagination({ ...pagination, offset: 0 });
    let name = skillDescList.find(e=>e.id == selectedMenuItem[0])?.name
    let desc = skillDescList.find(e=>e.id == selectedMenuItem[0])?.description
    setCurrentSkillName(name)
    setCurrentSkillDesc(desc)
    setIsMenuItemChanged(!isMenuItemChanged);
  }, [selectedMenuItem]);


  const addSkill = () => {
    return <Button block style={{ background: "#001529", color: "#f5f5f5" }}>
      Skills Category
    </Button>
  }

  return (
    <>
      {isLoading ? "Loading" : <Layout hasSider={true} style={{
        height: '90vh'
      }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '90vh',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          {addSkill()}

          <SkillList items={skillList}
            selectedMenuItem={selectedMenuItem}
            handleSelectedMenuItem={setSelectedMenuItem}
          />
        </Sider>

        <Layout
          style={{
            background: '#fff',
            height: '90vh',
          }}
        >
          <Content style={{
            overflow: 'auto',
            margin: '2px 16px 0',
            height: '90vh',
            textAlign: 'center',
            background: '#fff'
          }}>

            <div>
              <br></br>
              <h4 style={{fontWeight:"bold", textAlign:"left"}}>{currentSkillName}</h4>
              <p style={{textAlign:"left"}}>{currentSkillDesc}</p>
              <br></br>
            </div>

            {courseList.length ? <CourseList courseList={courseList} /> : null}

          </Content>

          <Footer style={{ backgroundColor: "white" }}>
            <Button block type='primary' disabled={buttonStatus} onClick={() => handleViewMoreClick()} >View More</Button>
          </Footer>
        </Layout>
      </Layout >}
    </>
  )
};


