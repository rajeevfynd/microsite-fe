const Surveys = [
  {
    SurveyTile: "Survey1",
    Description: "This the test Survey",
    questions: [
      {
        questionText: "This is the first question",
        questionType: "radio",
        Option: [
          { optionText: "option1" },
          { optionText: "option2" },
          { optionText: "option4" },
        ],
      },
      {
        questionText: "This is the second question",
        questionType: "checkBox",
        Option: [
          { optionText: "option12" },
          { optionText: "option22" },
          { optionText: "option42" },
        ],
      },
    ],
  },
  {
    SurveyTile: "Survey2",
    Description: "This the test second  Survey",
    questions: [
      {
        questionText: "This is the Second question",
        questionType: "radio",
        Option: [
          { optionText: "option1" },
          { optionText: "option2" },
          { optionText: "option4" },
          { optionText: "option5" },
        ],
      },
    ],
  },
];
export { Surveys };
