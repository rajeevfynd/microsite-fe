import {
  Select,
  Button,
  notification,
  Space,
  Popconfirm,
  Upload,
  message,
  Form,
  Menu,
  Radio,
} from "antd";
import html2canvas from "html2canvas";

import * as React from "react";

import {
  DeleteOutlined,
  CopyFilled,
  PlusOutlined,
  LoadingOutlined,
  UploadOutlined,
  MailOutlined,
  AlignLeftOutlined,
  CheckSquareTwoTone,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import RadioUi from "./options/RadioUI";
import CheckBoxUi from "./options/CheckBoxUi";
import { useParams } from "react-router-dom";
import {
  creatSurvey,
  getSurveyById,
  updateSurvey,
  uploadImageToserver,
} from "../../../../service/survey-service";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";
import axios from "axios";
import { CircleFill } from "react-bootstrap-icons";

const UplodUrl = "/microsite/document/upload";

const Survey = () => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
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
  const [visible, setVisible] = React.useState(false);
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
    console.log("Inside add option ", i + " " + j);
    let t = Survey;
    t.questions[i].choices.splice(j + 1, 0, { id: "", choiceText: "" });
    console.log(t);
    setSurvey({ ...t });
  };

  const handleChoiceText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    j: number
  ) => {
    console.log("Inside choice text ", i + " " + j);
    let t = Survey;
    t.questions[i].choices.splice(j, 0, { id: "", choiceText: e.target.value });
    t.questions[i].choices.splice(j + 1, 1);
    console.log(t);
    setSurvey({ ...t });
  };

  const handleDeleteOption = (i: number, j: number) => {
    console.log("Choice length", Survey.questions[i].choices.length);
    if (Survey.questions[i].choices.length == 2) {
      openNotificationWithIcon("error", "chocies cannot be less than 2");
    } else {
      let t = Survey;
      t.questions[i].choices.splice(j, 1);
      console.log(t);
      setSurvey({ ...t });
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
    let a = Survey.questions[i];
    a = { ...a, questionType: value };
    const l = [
      ...Survey.questions.slice(0, i),
      a,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
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
  const handleSwitch = (questionType: string, i: number) => {
    switch (questionType) {
      case "SINGLE_CHOICE":
        return radioUI(i);
      case "MULTIPLE_CHOICE":
        return checkBoxUI(i);
      default:
        return <TextArea disabled></TextArea>;
    }
  };
  const addQuestion = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    const l = [...Survey.questions];
    l.push(newQuestion);
    setSurvey({ ...Survey, questions: l });
  };

  const handleQuestionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    let arr = Survey.questions[i];
    arr = { ...arr, questionText: e.target.value };
    const l = [
      ...Survey.questions.slice(0, i),
      arr,
      ...Survey.questions.slice(i + 1, Survey.questions.length),
    ];
    setSurvey({ ...Survey, questions: l });
    console.log(arr.questionText);
  };
  const DeleteQuestion = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    i: number
  ) => {
    console.log("Question length", Survey.questions.length);
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
      console.log(`Delete at ${i}`);
    }
  };

  /// IMage Upload Code _____________________________________________________

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };
  const uploadButton = (
    <>
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </>
  );
  const showPopconfirm = () => {
    setOpen(true);
  };

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
        console.log("Image id", info.file.response.data.id);
        setImgId(info.file.response.data.id);
      }
      if (info.file.status === "error") {
        message.error("error");
        setConfirmLoading(false);
      }
      console.log("File info", info.file.status);
    },
  };

  const uploadImage = () => {
    //handleSubmit(); //// needs to change
    return (
      <>
        <Upload {...prop}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        <p>you can always skip this</p>
      </>
    );
  };

  const handleOk = () => {
    setConfirmLoading(true);
    handleSubmit();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const formData = new FormData();
  const takeScreenShot = async () => {
    var formatOutput = "image/png";
    html2canvas(document.getElementById("TakeScreenShot")).then((canvas) => {
      //canvas.delete
      var context = canvas.getContext("2d"); //context from originalCanvas
      var tmpCanvas = document.createElement("canvas");
      tmpCanvas.width = canvas.width;
      console.log("Width :", canvas.width);
      tmpCanvas.height = canvas.height;
      console.log("Hiegth :", canvas.height);
      var context2 = canvas.getContext("2d"); //context from tmpCanvas
      var imageObj = new Image();
      imageObj.onload = function () {
        //setup: draw cropped image
        var sourceX = 0;
        var sourceY = 0;
        var sourceWidth = 1560;
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
        // callBackFuntion(canvas.toDataURL(formatOutput));
        setImgString(canvas.toDataURL(formatOutput));
        // console.log("TakeScreenShot ", canvas.toDataURL(formatOutput));
        //memory!!!
        context.clearRect(0, 0, sourceWidth, sourceHeight); //clear originalCanvas
        context2.clearRect(0, 0, sourceWidth, sourceHeight); //clear tmpCanvas
        data = null;
        tmpCanvas = null;
        canvas = null;
        imageObj = null;
      };
      imageObj.src = tmpCanvas.toDataURL("image/png");
    });
  };

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

  async function handleSubmit() {
    console.log("Image lemgth =", imgId.length);
    if (imgId.length == 0) {
      takeScreenShot();
    } else {
      submitForm(imgId);
    }
  }
  const submitForm = (localImage: string) => {
    //console.log("submit form", imgId.length);
    const body = {
      id: "",
      surveyTitle,
      description,
      documentId: localImage,
      questions: Survey.questions,
    };
    console.log(body);
    if (edit) {
      const reqBody = { ...body, id: params.id };
      console.log(reqBody);
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
          openNotificationWithIcon("error", "Changes are not saved");
        });
    } else {
      console.log("Body", body);
      body.questions.map((ques) => {
        if (ques.questionType == "SMALL_TEXT") {
          ques.choices = [];
        }
      });
      creatSurvey(body)
        .then((res) => {
          openNotificationWithIcon("success", surveyTitle + " created");
          setDescription("");
          setSurveyTitle("");
          setSurvey({ questions: [newQuestion] });
          setImgId("");
          setOpen(false);
          setConfirmLoading(false);
        })
        .catch((err) => {
          openNotificationWithIcon("error", err.message);
          setConfirmLoading(false);
        });
    }
  };

  React.useEffect(() => {
    console.log("Inside useEffect");
    if (params.id) {
      setIsLoading(true);
      getSurveyById(params.id).then((res) => {
        setSurveyTitle(res.data.surveyTitle);
        setDescription(res.data.description);
        setSurvey({ questions: res.data.questions });
        setSurvey({ questions: res.data.questions });
        console.log("Inside get");
        console.log(Survey);
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

  React.useEffect(() => {
    if (imgString) {
      console.log("ScreenShot Image", imgString); //   console.log("Inside take screenshot");
      const file = DataURIToBlob(imgString);
      formData.append("file", file, "image.png");
      console.log("Submit ", formData);
      uploadImageToserver(formData)
        .then((res) => {
          setImgId(res.data.id);
          submitForm(res.data.id);
        })
        .catch((err) => openNotificationWithIcon("error", err.message));

      console.log("Submit Screnhot form");
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
        <form onSubmit={(e) => handleSubmit()}>
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

                          <div className="col-4" data-html2canvas-ignore="true">
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
                        <div>{handleSwitch(question.questionType, index)}</div>
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

                <div className="row" style={{ float: "right" }}>
                  {/* <button type="submit" className="btn btn-primary">
                    {params.id ? "Save the Changes" : "Submit"}
                  </button> */}
                  <Popconfirm
                    title={uploadImage}
                    open={open}
                    onConfirm={handleOk}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                  >
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-html2canvas-ignore="true"
                      onClick={showPopconfirm}
                    >
                      {params.id ? "Save the Changes" : "Submit"}
                    </button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Survey;
