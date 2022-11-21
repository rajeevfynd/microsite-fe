import { notification, Button, Card, List, Skeleton, Spin } from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { ShadowSearchInput } from "../../../components/shadow-input-text";
import { SurveyDto } from "../../../models/survey";
import "../new-survey/views/questionForm.css";
import SurveyList from "./views/SurveyList";
import { useNavigate } from "react-router-dom";
import { getAllSurveys, assignSurveyToUserId, deleteSurveyById, searchSurvey, } from "../../../service/survey-service";
import { formatBase64 } from "../../../utility/image-utils";
import { DeleteOutlined, DownloadOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { showNotification } from "../../../components/snackbar";
import InfiniteScroll from "react-infinite-scroll-component";

export const CreatedSurvey = () => {
  const [surveys, setSurvey] = React.useState<SurveyDto[]>([]);
  let navigate = useNavigate();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [initialLoad, setInitialLoad] = React.useState(false);

  const assigneeSurvey = (id: string) => {
    let userId = prompt("Please Enter User Id", "22");
    if (userId != null) {
      assignSurveyToUserId(userId, id)
        .then((res) => {
          console.log("Response", res);
          showNotification("success", `Survey assigneed to ${userId}`);
        })
        .catch((err) => {
          showNotification("error", err.data.data.message);
        });
    }
  };

  const deleteSurvey = (id: string) => {
    if (confirm("Do you really want to delete Survey")) {
      deleteSurveyById(id)
        .then((res) => {
          showNotification("success", "successfuly deleted");
          setPageNumber(0);
          refreshPage(searchKeyword);
        })
        .catch((err) => {
          showNotification("error", err.data.message);
        });
    }
  };

  const loadMore = () => {
    getSurveys(searchKeyword, pageNumber)
      .then(data => {
        console.log(data);
        setSurvey([...surveys, ...data.content]);
        setHasMore(!data.last);
        setPageNumber(pageNumber + 1);
      })
  }

  const getSurveys = async (key: string, page: number) => {
    try {
      const res = await searchSurvey(key, page);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
    return [];
  };

  const refreshPage = (value: string) => {
    setSearchKeyword(value);
    setPageNumber(0)
    getSurveys(value, 0)
      .then(data => {
        console.log("from search changed")
        console.log(data);
        setSurvey(data.content)
        setHasMore(!data.last)
      })
  }

  React.useEffect(() => {
    !initialLoad && getSurveys(searchKeyword, pageNumber)
      .then(data => {
        console.log(data);
        setSurvey(data.content);
        setHasMore(!data.last);
        setPageNumber(pageNumber + 1);
        setInitialLoad(true);
      });
  }, [])


  return (
    <>
      <InfiniteScroll
        dataLength={surveys.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Spin size="large" />}
        scrollThreshold="20%"
      >
        <h3>Surveys</h3>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <ShadowSearchInput placeholder='Type in the survey title you are looking for...' onChange={refreshPage} />
          <Button type="primary" style={{marginBottom: "30px"}} onClick={() => navigate("/admin/new-survey")}>Create new survey</Button>
          <List
            grid={{ gutter: 1, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
            style={{ width: "100%" }}
            dataSource={surveys}
            renderItem={item => (
              <List.Item key={item.surveyTitle}>
                <Card
                  hoverable
                  style={{
                    width: "250px",
                  }}
                  cover={
                    <img
                      src={formatBase64(item.imgUrl)}
                    />
                  }
                  actions={[
                    <DeleteOutlined
                      style={{ color: "red" }}
                      onClick={(e) => deleteSurvey(item.id)}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={(e) =>
                        navigate(`/admin/created-surveys/edit/${item.id}`)
                      }
                    />,
                    <EllipsisOutlined
                      key="ellipsis"
                      onClick={(e) => assigneeSurvey(item.id)}
                    />
                  ]}>
                  <Meta
                    title={item.surveyTitle}
                    description={item.description}
                  />
                </Card>

              </List.Item>
            )}
          />
        </div>
      </InfiniteScroll>
    </>
  );
}

