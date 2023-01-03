import {
  Select,
  Button,
  notification,
  Upload,
  message,
  Radio,
  Checkbox,
  Typography,
} from "antd";
import html2canvas from "html2canvas";

import * as React from "react";

const { Text, Link } = Typography;
import {
  DeleteOutlined,
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
  AlignLeftOutlined,
  CheckSquareTwoTone,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import { useNavigate, useParams } from "react-router-dom";
import {
  creatSurvey,
  getSurveyById,
  updateSurvey,
  uploadImageToserver,
  getImage,
} from "../../../../service/survey-service";
import { RcFile, UploadProps } from "antd/lib/upload";

const UplodUrl = "/microsite/document/upload";

const Survey = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  type NotificationType = "success" | "info" | "warning" | "error";
  const { Option } = Select;
  const params = useParams();
  const [surveyTitle, setSurveyTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgId, setImgId] = React.useState("");
  const [imgString, setImgString] = React.useState("");
  const [newScreenShot, setNewScreenShot] = React.useState(false);
  const [disableSubmit, setDisableSubmit] = React.useState(false);
  const newQuestion = {
    id: "",
    questionText: "",
    questionType: "SMALL_TEXT",
    choices: [
      {
        id: "",
        choiceText: "",
      },
      {
        id: "",
        choiceText: "",
      },
    ],
  };

  const [Survey, setSurvey] = React.useState({
    questions: [newQuestion],
  });

  const openNotificationWithIcon = (
    type: NotificationType,
    message: String
  ) => {
    notification[type]({
      message,
    });
  };

  const handleAddOption = (i: number, j: number) => {
    let temp = Survey;
    temp.questions[i].choices.splice(j + 1, 0, { id: "", choiceText: "" });
    setSurvey({ ...temp });
  };

  const handleChoiceText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    let temp = Survey;
    temp.questions[i].choices.splice(j, 0, {
      id: "",
      choiceText: e.target.value,
    });
    temp.questions[i].choices.splice(j + 1, 1);
    setSurvey({ ...temp });
  };

  const handleDeleteOption = (i: number, j: number) => {
    if (Survey.questions[i].choices.length == 2) {
      openNotificationWithIcon("error", "chocies cannot be less than 2");
    } else {
      let temp = Survey;
      temp.questions[i].choices.splice(j, 1);
      setSurvey({ ...temp });
    }
  };

  const radioUI = (i: number) => {
    return (
      <>
        <div className="form-check ">
          {Survey.questions[i].choices.map((op, j) => (
            <RadioUi
              i={i}
              j={j}
              optionText={op.choiceText}
              handleDeleteOption={handleDeleteOption}
              handleAddOption={handleAddOption}
              handleOPtionIn={handleChoiceText}
            />
          ))}
        </div>
      </>
    );
  };
  const handleSelect = (value: string, i: number) => {
    let tempQuestion = Survey.questions[i];
    tempQuestion = { ...tempQuestion, questionType: value };
    let tempSurveys = [
      ...Survey.questions.slice(0, i),
      tempQuestion,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: tempSurveys });
  };
  const checkBoxUI = (i: number) => {
    return (
      <>
        {Survey.questions[i].choices.map((op, j) => (
          <CheckBoxUi
            i={i}
            j={j}
            optionText={op.choiceText}
            handleDeleteOption={handleDeleteOption}
            handleAddOption={handleAddOption}
            handleOPtionIn={handleChoiceText}
          />
        ))}
      </>
    );
  };

  const addOption = (i: number) => {
    handleAddOption(i, 0);
    handleAddOption(i, 1);
  };
  const handleSwitch = (questionType: string, i: number) => {
    switch (questionType) {
      case "SINGLE_CHOICE":
        {
          Survey.questions[i].choices.length == 0 ? addOption(i) : "";
        }
        return radioUI(i);
      case "MULTIPLE_CHOICE":
        {
          Survey.questions[i].choices.length == 0 ? addOption(i) : "";
        }
        return checkBoxUI(i);
      default:
        return <TextArea disabled></TextArea>;
    }
  };
  const addQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const tempQuestions = [...Survey.questions];
    tempQuestions.push(newQuestion);
    setSurvey({ ...Survey, questions: tempQuestions });
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let arr = Survey.questions[i];
    arr = { ...arr, questionText: e.target.value };
    let tempQuestions = [
      ...Survey.questions.slice(0, i),
      arr,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: tempQuestions });
  };
  const DeleteQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    if (Survey.questions.length == 1) {
      openNotificationWithIcon(
        "error",
        "survey should have aleast one question"
      );
    } else {
      const l = [
        ...Survey.questions.slice(0, i),
        ...Survey.questions.slice(i + 1, Survey.questions.length),
      ];
      setSurvey({ ...Survey, questions: l });
    }
  };

  /// IMage Upload Code _____________________________________________________

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("You can only upload JPEG/PNG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt5M;
  };
  const uploadButton = (
    <>
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </>
  );

  const prop: UploadProps = {
    name: "file",
    action: UplodUrl,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file.status);
      }
      if (info.file.status === "done") {
        setImgId(info.file.response.data.id);
      }
      if (info.file.status === "error") {
        message.error("error");
        setConfirmLoading(false);
      }
    },
  };

  const uploadImage = () => {
    //handleSubmit(); //// needs to change

    return (
      <>
        <div data-html2canvas-ignore="true">
          <Upload {...prop} beforeUpload={beforeUpload} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>

          {edit ? (
            <>
              <p>Upload Image to replace</p>
              <Checkbox onChange={(e) => setNewScreenShot(e.target.checked)}>
                Use New Screen shot
              </Checkbox>
              <br />
              <p> click ok to Skip</p>
            </>
          ) : (
            <Text type="danger">This can be skiped</Text>
          )}
        </div>
      </>
    );
  };

  const formData = new FormData();

  const takeScreenShot = () => {
    var formatOutput = "image/png";
    html2canvas(document.getElementById("TakeScreenShot")).then((canvas) => {
      //canvas.delete
      var context = canvas.getContext("2d"); //context from originalCanvas
      var tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = canvas.width;
      tmpCanvas.height = canvas.height;
      var context2 = canvas.getContext("2d"); //context from tmpCanvas
      var imageObj = new Image();
      // ScreenShot will be croped if the hieght is more than 1200
      if (canvas.height > 1200) {
        imageObj.onload = function () {
          //setup: draw cropped image
          var sourceX = 0;
          var sourceY = 0;
          var sourceWidth = canvas.width;
          var sourceHeight = 1200;
          var destWidth = sourceWidth;
          var destHeight = sourceHeight;
          var destX = canvas.width / 2 - destWidth / 2;
          var destY = canvas.height / 2 - destHeight / 2;
          context2.drawImage(
            imageObj,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            destX,
            destY,
            destWidth,
            destHeight
          );
          var data = context2.getImageData(
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight
          );
          context.clearRect(0, 0, canvas.width, canvas.height); //clear originalCanvas
          canvas.width = sourceWidth;
          canvas.height = sourceHeight;
          context2.putImageData(data, 0, 0);

          setImgString(canvas.toDataURL(formatOutput));

          //memory!!!
          context.clearRect(0, 0, sourceWidth, sourceHeight); //clear originalCanvas
          context2.clearRect(0, 0, sourceWidth, sourceHeight); //clear tmpCanvas
          data = null;
          tmpCanvas = null;
          canvas = null;
          imageObj = null;
        };
      } else {
        setImgString(canvas.toDataURL(formatOutput));
      }

      imageObj.src = tmpCanvas.toDataURL("image/png");
    });
  };

  /// converts the base64 to Blob
  function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisableSubmit(true);
    if (imgId.length == 0 || newScreenShot) {
      /// length is zero if the image is not uploaded by user, so take ScreenShot
      takeScreenShot();
    } else {
      submitForm(imgId);
    }
  }
  const submitForm = (newImgId: string) => {
    const body = {
      id: "",
      surveyTitle,
      description,
      documentId: newImgId,
      questions: Survey.questions,
    };
    //// if Edit survey is true it will update the survey
    if (edit) {
      const reqBody = { ...body, id: params.id };
      reqBody.questions.map((ques) => {
        if (ques.questionType == "SMALL_TEXT") {
          ques.choices = [];
        }
      });
      updateSurvey(params.id, reqBody)
        .then((res) => {
          openNotificationWithIcon("success", "Changes saved");
        })
        .catch((err) => {
          console.log(err.data);
          if (!err.message) {
            openNotificationWithIcon("error", "somthing went wrong");
          } else {
            openNotificationWithIcon("error", "Changes are not saved");
          }
          setConfirmLoading(false);
        });
    } else {
      body.questions.map((ques) => {
        if (ques.questionType == "SMALL_TEXT") {
          ques.choices = [];
        }
      });
      creatSurvey(body)
        .then((res) => {
          openNotificationWithIcon("success", surveyTitle + " created");
          navigate(`/admin/created-surveys`);
        })
        .catch((err) => {
          if (!err.message) {
            openNotificationWithIcon("error", "somthing went wrong");
          } else {
            openNotificationWithIcon("error", err.message);
          }
          setConfirmLoading(false);
        });
    }
  };

  React.useEffect(() => {
    if (params.id) {
      setIsLoading(true);
      getSurveyById(params.id).then(async (res) => {
        setSurveyTitle(res.data.surveyTitle);
        setDescription(res.data.description);
        setImgId(res.data.documentId);
        setSurvey({ questions: res.data.questions });
        setSurvey({ questions: res.data.questions });
        setIsLoading(false);
      });
      setEdit(true);
    } else {
      setDescription("");
      setSurveyTitle("");
      setSurvey({ questions: [newQuestion] });
      setEdit(false);
    }
  }, [params.id]);

  const uploadScreenShot = async () => {
    try {
      let res = await uploadImageToserver(formData);
      setImgId(res.data.id);
      //submitForm();
      submitForm(res.data.id);
    } catch (error) {
      if (!error.message) {
        openNotificationWithIcon("error", "somthing went wrong");
      } else {
        openNotificationWithIcon("error", error.message);
      }
    }
  };

  React.useEffect(() => {
    if (imgString) {
      const file = DataURIToBlob(imgString);
      formData.append("file", file, "image.png");
      uploadScreenShot();
    } else {
      console.log("Image is undefiend");
      console.log("No submit the screenshot");
    }
  }, [imgString]);

  return (
    <>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="question_form" id="TakeScreenShot">
              <br></br>

              <div className="section">
                <div className="question_title_section">
                  <div className="question_form_top">
                    <input
                      type="text"
                      name="surveyTitle"
                      className="question_form_top_name"
                      style={{ color: "black" }}
                      placeholder="Survey Title"
                      value={surveyTitle}
                      onChange={(e) => setSurveyTitle(e.target.value)}
                      required
                    ></input>

                    <input
                      type="text"
                      className="question_form_top_desc "
                      style={{ color: "black" }}
                      placeholder="Survey description"
                      name="description"
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                </div>

                <div className="container" style={{ paddingTop: "10px" }}>
                  {Survey.questions.map((question, index) => (
                    <div key={question.id}>
                      <div
                        className="card"
                        style={{
                          borderLeft: "4px solid rgb(66, 90, 245)",
                        }}
                      >
                        <div className="card-header">
                          <div className="row">
                            <div className="col-6">
                              <div className="input-group ">
                                <input
                                  key={index}
                                  id="validationCustom01"
                                  type="text"
                                  className="form-control"
                                  placeholder="Question"
                                  aria-label="questionText"
                                  name="questionText"
                                  aria-describedby="basic-addon1"
                                  value={question.questionText}
                                  onChange={(e) => handleQuestionText(e, index)}
                                  required
                                />
                              </div>
                            </div>

                            <div
                              className="col-4"
                              data-html2canvas-ignore="true"
                            >
                              <Select
                                defaultValue={
                                  question.questionType.length < 1
                                    ? "TextArea"
                                    : question.questionType
                                }
                                onChange={(e) => handleSelect(e, index)}
                              >
                                <Option value="SINGLE_CHOICE">
                                  <Radio />
                                  SINGLE CHOICE
                                </Option>

                                <Option value="MULTIPLE_CHOICE">
                                  <CheckSquareTwoTone /> MULTIPLE CHOICE
                                </Option>

                                <Option value="SMALL_TEXT">
                                  <AlignLeftOutlined /> Paragraph
                                </Option>
                              </Select>
                            </div>

                            <div className="col-2">
                              <div
                                style={{ position: "absolute", float: "right" }}
                              >
                                <DeleteOutlined
                                  data-html2canvas-ignore="true"
                                  style={{ color: "red" }}
                                  onClick={(e) => DeleteQuestion(e, index)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div>
                            {handleSwitch(question.questionType, index)}
                          </div>
                        </div>
                      </div>
                      <br />
                    </div>
                  ))}
                  <Button
                    type="primary"
                    onClick={(e) => addQuestion(e)}
                    data-html2canvas-ignore="true"
                  >
                    Add Question
                  </Button>
                  <br></br>
                  {uploadImage()}

                  <div
                    className="row"
                    style={{ float: "right" }}
                    data-html2canvas-ignore="true"
                  >
                    <button
                      disabled={disableSubmit}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {params.id ? "Save the Changes" : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Survey;
