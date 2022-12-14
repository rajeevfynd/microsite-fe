export interface SurveyDto {
  id: string;
  surveyTitle: string;
  description: string;
  imgUrl: string;
  questions: QuestionsType[];
}

export interface QuestionsType {
  id: string;
  questionText: string;
  questionType: string;
  choice: Choice[];
}

export interface Choice {
  choiceText: string;
}

export interface AssigneeSurveyDto {
  assigneeId: string;
  expireData: Date;
  surveyId: string;
}

export interface UserType {
  id: number;
  name: string;
  domainId: string;
}
