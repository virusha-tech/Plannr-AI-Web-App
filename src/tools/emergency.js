import { ViewListIcon } from "@heroicons/react/solid";

const obj = {
  title: "Emergency Plan",
  desc: "An emergency preparedness plan outlines the steps needed to prepare for and respond to emergencies, such as natural disasters or personal emergencies.",
  category: "Personal",
  Icon: ViewListIcon,
  // tags: [],
  permissions: ["user"],
	isComingSoon: true,

  fromColor: "green-500",
  toColor: "blue-500",

  to: "/ai/travel",
  api: "/ai/travel",

  output: {
    title: "Travel",
    desc: "The following key points detected",
    Icon: false,
    color: "blue",
  },

  prompts: [
    {
      title: "Entry Text",
      desc: "A sentence or paragraph you wish to understand in bullet point form.",
      // n: 1,
      prompts: [
        {
          title: "City",
          attr: "city",
          value: "",
          placeholder: "City",
          label: "Examples: Udaipur, Shimla, Nanital",
          // type: "textarea",
          maxLength: 40,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "Udaipur",
        },
        {
          title: "Days",
          attr: "days",
          value: "",
          placeholder: "5",
          label: "Examples: 2,5",
          //type: "number",
          maxLength: 20,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "5",
        },
        {
          title: "Traveller",
          attr: "traveller",
          value: "",
          placeholder: "Solo",
          label: "Examples: 2,5",
          //type: "number",
          maxLength: 20,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "5",
        },
        {
          title: "Budget",
          attr: "budget",
          value: "",
          placeholder: "5",
          label: "Examples: 2,5",
          //   type: "number",
          maxLength: 20,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "5",
        },
        {
          title: "purpose",
          attr: "purpose",
          value: "",
          placeholder: "5",
          label: "Examples: 2,5",
          // type: "number",
          maxLength: 20,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "5",
        },
        {
          title: "stay",
          attr: "stay",
          value: "",
          placeholder: "5",
          label: "Examples: 2,5",
          //type: "number",
          maxLength: 20,
          // max: 100,
          min: 1,
          required: true,
          error: "",
          example: "5",
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
