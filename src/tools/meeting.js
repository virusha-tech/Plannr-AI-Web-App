import { ViewListIcon } from "@heroicons/react/solid";

const obj = {
  title: "Meeting Preparation",
  desc: "Our Meeting Preparation service streamlines the meeting preparation process for BCG consultants, reducing delays and allowing them to focus on other tasks.",
  category: "Bcg",
  Icon: ViewListIcon,
  // tags: [],
  permissions: ["user"],

  fromColor: "green-600",
  toColor: "gray-500",

  to: "/ai/helloworld",
  api: "/ai/helloworld",

  output: {
    title: "Hello World",
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
          title: "Content",
          attr: "content",
          value: "",
          placeholder: "When doing an your taxes, it's important to...",
          label: "",
          type: "textarea",
          maxLength: 600,
          // max: 100,
          min: 3,
          required: true,
          error: "",
          example: "Hello World ",
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
