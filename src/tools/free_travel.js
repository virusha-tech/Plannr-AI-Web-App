import { ViewListIcon } from "@heroicons/react/solid";

const obj = {
  title: "Travel Plan",
  desc:
    "A travel plan outlines the details of a trip, including destinations, accommodation, transportation, and activities.",
  additionalSystemTextForChatBot:
    "You are an AI assistant that is an expert with Travel Plans. You know about everything related to the above Travel Plan and things that are related to the above plan. You can provide advice related to the above Travel Plan. If someone is asking anything which is outside travel related query than please respond with the phrase \"I'm just  your Travel assistant. I can't help with that.\"",
  category: "Personal",
  Icon: ViewListIcon,
  // tags: [],
  //   permissions: ["user"],
  isRecommendationsAvailable: true,
  isTrackingAvailable: true,
  fromColor: "gray-500",
  toColor: "gray-500",

  to: "/travel",
  api: "/free/travel",
  subsequentQuestion: "/ai/subsequentQuestion",

  output: {
    title: "Travel",
    desc: "The following key points detected",
    Icon: false,
    color: "blue",
  },

  prompts: [
    {
      title: "Entry Text",
      desc:
        "A sentence or paragraph you wish to understand in bullet point form.",
      prompts: [
        {
          title: "Destination",
          attr: "destination",
          value: "",
          placeholder: "",
          maxLength: 80,
          error: "",
          min: 1,
          required: true,
        },
        {
          title: "Days",
          attr: "days",
          value: "",
          placeholder: "",
          maxLength: 80,
          error: "",
          min: 1,
          required: true,
        },
        {
          title: "Date",
          attr: "startDate",
          value: "",
          type: "dateRange",
          isSingleDate: true,
          required: true,
          error: "",
        },
        {
          title: "Budget",
          attr: "budget",
          value: "",
          placeholder: "INR: 50,000",
          maxLength: 20,
          error: "",
          min: 1,
          required: true,
        },
        {
          title: "Travellers",
          attr: "traveller",
          value: "",
          type: "radiogroup",
          required: true,
          error: "",
          options: [
            {
              label: "Solo",
            },
            {
              label: "Couple",
            },
            {
              label: "Family",
            },
            {
              label: "Friends",
            },
          ],
        },
      ],
      example: {
        output:
          "Hello World Hello World Hello World Hello World Hello World Hello World Hello World ",
        // outputs: [
        // 	"The sun is very old, over 4.5 billion years",
        // 	"At 10,000 degrees, sun is also very hot",
        // 	"Gasses called coronal mass ejections erupt from the sun",
        // ],
        // Icon: RefreshIcon,
        color: "blue",
      },
    },
  ],
};

export default obj;
