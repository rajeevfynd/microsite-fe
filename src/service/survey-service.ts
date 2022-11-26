import httpInstance from "../utility/http-client";
let userId = 11;

export function getAllSurveys(offset: number) {
  return httpInstance.get(
    `/microsite/surveys/pagination?offset=${offset}&pageSize=8`
  );
}

export function searchSurvey(keyword: string, pageNumber: number) {
  return httpInstance.get(
    `/microsite/surveys/search-survey?pageNumber=${pageNumber}&keyword=${keyword}&pageSize=10`
  );
}

export function getSurveyById(id: string) {
  return httpInstance.get(`/microsite/surveys/${id}`);
}
///userId should come from UI
export function getSurveysByStatus(status: boolean) {
  return httpInstance.get(`/microsite/assignee?completed=${status}`);
}

export function deleteSurveyById(id: string) {
  return httpInstance.delete(`/microsite/surveys/${id}`);
}

export function submitSurvey(body: {
  surveyId: string;
  completed: boolean;
  responses: { questionId: string; answer: string }[];
}) {
  return httpInstance.post("/microsite/assignee/survey", body);
}

export function updateSurvey(
  id: string,
  reqBody: {
    id: string;
    surveyTitle: string;
    description: string;
    documentId: string;
    questions: {
      id: string;
      questionText: string;
      questionType: string;
      choices: { id: string; choiceText: string }[];
    }[];
  }
) {
  return httpInstance.put(`/microsite/surveys/${id}`, reqBody);
}

export function creatSurvey(survey: {
  id: string;
  surveyTitle: string;
  description: string;
  documentId: string;
  questions: {
    id: string;
    questionText: string;
    questionType: string;
    choices: { id: string; choiceText: string }[];
  }[];
}) {
  return httpInstance.post("/microsite/surveys/", survey);
}

export function getSurveyResponseById(assigneeId: string) {
  return httpInstance.get(`/microsite/assignee/response/${assigneeId}`);
}

export function assignSurveyToUserId(reqBody: {
  surveyId: string;
  assigneeId: string;
  expireDate: string;
}) {
  return httpInstance.post("/microsite/surveys/assign", reqBody);
}

export function getImage(id: string) {
  return httpInstance.get(`/microsite/surveys/download?id=${id}`);
}

export function uploadImageToserver(formDat: FormData) {
  return httpInstance.post(`/microsite/document/upload`, formDat);
}
