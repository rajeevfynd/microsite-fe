import { Card } from "antd";
import * as React from "react";
import CompletedSurveyList from "./CompletedSurveyList";
import SurveyList from "./SurveyList";

const tabListNoTitle = [
  {
    key: "survyes",
    tab: "My survyes",
  },
  {
    key: "app",
    tab: "Completed surveys",
  },
];

const contentListNoTitle: Record<string, React.ReactNode> = {
  survyes: <SurveyList />,
  app: <CompletedSurveyList />,
};

const Tab: React.FC = () => {
  const [activeTabKey2, setActiveTabKey2] = React.useState<string>("survyes");

  const onTab2Change = (key: string) => {
    setActiveTabKey2(key);
  };
  return (
    <>
      <Card
        style={{ width: "100%" }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={(key) => {
          onTab2Change(key);
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>
    </>
  );
};

export default Tab;
