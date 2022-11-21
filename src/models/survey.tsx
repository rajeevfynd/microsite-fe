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