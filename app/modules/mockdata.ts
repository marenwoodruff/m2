const
    survey = {
        name: 'Conference Survey',
        id: 287182928,
        questions: [
             {
                questionIdNumber: 23,
                text: "What do you do with a drunken sailor, early in the morning?",
                answer: {
                    type: "radial",
                    options: [
                        {
                            selected: false,
                            value: "Make him a bloody Mary",
                        },
                        {
                            selected: true,
                            value: "Ask him if he needs you to call someone",
                        },
                        {
                            selected: false,
                            value: "Tell him the police are on the way",
                        },
                        {
                            selected: false,
                            value: "Pour a bucket of water on him",
                        },
                        {
                            selected: false,
                            value: "Tell him it's not his fault",
                        }
                    ]
                }
            },
            {
                questionIdNumber: 44,
                text: "Bad boys bad boys, watcha gonna do when they come for you?",
                answer: {
                    type: "radial",
                    options: [
                        {
                            selected: false,
                            value: "No moddy no mix na min ay",
                        },
                        {
                            selected: false,
                            value: "Run, you did it",
                        },
                        {
                            selected: true,
                            value: "Reason with them",
                        },
                        {
                            selected: false,
                            value: "Reason with them... with money",
                        },
                        {
                            selected: false,
                            value: "Go out guns-a-blazing",
                        }
                    ]
                }
            },
            {
                questionIdNumber: 12,
                text: "Where in the world is Carmen Sandiego?",
                answer: {
                    type: "radial",
                    options: [
                        {
                            selected: false,
                            value: "San Diego",
                        },
                        {
                            selected: true,
                            value: "Nashville",
                        },
                        {
                            selected: false,
                            value: "New York",
                        },
                        {
                            selected: false,
                            value: "Carolina",
                        },
                        {
                            selected: false,
                            value: "Liverpool",
                        }
                    ]
                }
            },
            {
                questionIdNumber: 19,
                text: "Would you do a survey like this again?",
                answer: {
                    type: "yesOrNo",
                    options: [
                        {
                            selected: true,
                            value: "yes",
                        },
                        {
                            selected: false,
                            value: "no",
                        },
                        {
                            selected: false,
                            value: "maybe",
                        },
                        {
                            selected: false,
                            value: "I don't know",
                        },
                    ]
                }
            },
            {
                questionIdNumber: 67,
                text: "What could we do to improve the experience?",
                answer: {
                    type: "textBox",
                    options: [
                        {
                            selected: true,
                            value: "Free beer",
                        },
                    ]
                }
            },
            {
                questionIdNumber: 2,
                text: "How did you hear about us?",
                answer: {
                    type: "checkAny",
                    options: [
                        {
                            selected: false,
                            value: "From a friend",
                        },
                        {
                            selected: true,
                            value: "Online",
                        },
                        {
                            selected: true,
                            value: "Saw an ad in the paper",
                        },
                        {
                            selected: true,
                            value: "Another conference",
                        },
                        {
                            selected: false,
                            value: "other",
                        }
                    ]
                }
            },
        ]
    },
    surveyResponse = {
        user: {
            name: "Isaac",
            id: 898989,
        }
        surveyId: 287182928,
        responses: [
            {
                questionIdNumber: 23,
                answers: [
                    {
                        value: 1,
                        display: "Ask him if he needs you to call someone",
                    }
                ]
            },
            {
                questionIdNumber: 19,
                answers: [
                    {
                        value: 0,
                        display: "Would you do a survey like this again?",
                    }
                ]
            },
            {
                questionIdNumber: 44,
                answers: [
                    {
                        value: 2,
                        display: "Reason with them",
                    }
                ]
            },
            {
                questionIdNumber: 2,
                answers: [
                    {
                        value: 2,
                        display: "Online",
                    },
                    {
                        value: 3,
                        display: "Saw an ad in the paper",
                    },
                    {
                        value: 4,
                        display: "Another conference",
                    }
                ]
            },
            {
                questionIdNumber: 67,
                answers: [
                    {
                        value: 0,
                        display: "Free beer",
                    }
                ]
            },
            {
                questionIdNumber: 12,
                answers: [
                    {
                        value: 1,
                        display: "Where in the world is Carmen Sandiego?",
                    }
                ]
            }
        ],
    },
    user = {
        id: 898989,
        name: "Isaac",
        email: "Isaac@mcdonaldshealthclub.com",
        phone: 4049840021,
    }

export {
    user,
    survey,
    surveyResponse,
}
