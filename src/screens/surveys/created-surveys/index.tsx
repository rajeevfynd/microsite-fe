import {
  Form,
  Button,
  Card,
  List,
  Spin,
  Modal,
  Input,
  DatePicker,
  Cascader,
} from "antd";
import Meta from "antd/lib/card/Meta";
import * as React from "react";
import { ShadowSearchInput } from "../../../components/shadow-input-text";
import {
  SurveyDto,
  AssigneeSurveyDto,
  assigneModelData,
  UserType,
} from "../../../models/survey";
import "../new-survey/views/questionForm.css";
import { useNavigate } from "react-router-dom";
import {
  assignSurveyToUserId,
  deleteSurveyById,
  searchSurvey,
} from "../../../service/survey-service";
import dayjs from "dayjs";
import { formatBase64 } from "../../../utility/image-utils";
import moment from "moment";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { showNotification } from "../../../components/snackbar";
import InfiniteScroll from "react-infinite-scroll-component";
import AssigneSearch from "./assigne-search";
import { RangePickerProps } from "antd/lib/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const CreatedSurvey = () => {
  const [surveys, setSurvey] = React.useState<SurveyDto[]>([]);
  const [assigneData, setAssigneData] = React.useState<assigneModelData[]>([]);
  //let modelData : {[key:string]:assigneModelData}
  const dateFormat = "YYYY/MM/DD";
  let navigate = useNavigate();
  const [pageNumber, setPageNumber] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [initialLoad, setInitialLoad] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [users, SetUsers] = React.useState<UserType[]>([]);

  const [surveyId, setSurveyId] = React.useState("");

  const now = new Date();
  const [expireData, setExpireDate] = React.useState(
    now.toISOString().slice(0, 10)
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    const reqBody = {
      surveyId,
      assigneeId: users,
      expireDate: expireData,
    };
    if (users.length >= 1) {
      assignSurveyToUserId(reqBody)
        .then((res) => {
          console.log("Response", res);
          showNotification("success", `Survey assigneed to ${users}`);
          setExpireDate("");
          setSurveyId("");
          form.resetFields();
          SetUsers([]);
          setExpireDate(now.toISOString().slice(0, 10));
          setIsModalOpen(false);
        })
        .catch((err) => {
          showNotification("error", err.data.data.message);
        });
    } else {
      showNotification("error", `Select users and expire data`);
    }
  };

  const handleCancel = () => {
    SetUsers([]);
    setExpireDate(now.toISOString().slice(0, 10));
    setIsModalOpen(false);
    form.resetFields();
  };

  const assigneeSurvey = (id: string) => {
    setSurveyId(id);
    showModal();
  };
  const [form] = Form.useForm();
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
    getSurveys(searchKeyword, pageNumber).then((data) => {
      console.log(data);
      setSurvey([...surveys, ...data.content]);
      setHasMore(!data.last);
      setPageNumber(pageNumber + 1);
    });
  };

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
    setPageNumber(0);
    getSurveys(value, 0).then((data) => {
      console.log("from search changed");
      console.log(data);
      setSurvey(data.content);
      setHasMore(!data.last);
    });
  };

  React.useEffect(() => {
    !initialLoad &&
      getSurveys(searchKeyword, pageNumber).then((data) => {
        console.log(data);
        setSurvey(data.content);
        setHasMore(!data.last);
        setPageNumber(pageNumber + 1);
        setInitialLoad(true);
      });
    console.log("Exprire Date", expireData);
  }, []);

  const handleSelectedUser = (Ids: React.SetStateAction<UserType[]>) => {
    console.log("Inside Handle selector", Ids);
    SetUsers(Ids);
    console.log("Set users", users);
    //setAssigneeId(Id);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const Popup = () => {
    return (
      <>
        <Modal
          title="Assign Survey"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <AssigneSearch
            handleSelectedUser={handleSelectedUser}
            userIds={users}
          />
          <DatePicker
            // defaultValue={dayjs("21/12/2022", dateFormat)}
            format={dateFormat}
            placeholder="Expire Date"
            disabledDate={disabledDate}
            value={moment(expireData, dateFormat)}
            onChange={(date, dateString) => {
              setExpireDate(dateString);
              console.log("Date string", dateString);
            }}
          />
        </Modal>
      </>
    );
  };

  return (
    <>
      {" "}
      {Popup()}
      <InfiniteScroll
        dataLength={surveys.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Spin size="large" />}
        scrollThreshold="20%"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "0% 3%",
          }}
        >
          <ShadowSearchInput
            placeholder="Type in the survey title you are looking for..."
            onChange={refreshPage}
          />
          <Button
            type="primary"
            style={{ marginBottom: "30px" }}
            onClick={() => navigate("/admin/new-survey")}
          >
            Create new survey
          </Button>
          <List
            grid={{ gutter: 1, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
            style={{ width: "100%" }}
            dataSource={surveys}
            renderItem={(item) => (
              <List.Item key={item.surveyTitle}>
                <Card
                  hoverable
                  style={{
                    width: "250px",
                  }}
                  cover={<img src={formatBase64(item.imgUrl)} />}
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
                    />,
                  ]}
                >
                  {" "}
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
};
