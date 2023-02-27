const onboardingParameters = [
  {
    type: "text",
    placeholder: "Enter first name",
    name: "First Name",
    id: "firstName",
  },
  {
    type: "text",
    placeholder: "Enter last name",
    name: "Last Name",
    id: "lastName",
  },
  {
    type: "date",
    placeholder: "Enter date of birth",
    name: "Date of Birth",
    id: "dateOfBirth",
  },
  {
    name: "Gender",
    type: "select",
    placeholder: "Select your gender",
    id: "gender",
    options: ["Male", "Female"],
  },
  {
    id: "location",
    type: "text",
    placeholder: "Enter your location",
    name: "Location",
  },
  {
    id: "mbti",
    type: "select",
    placeholder: "Your personality type",
    name: "Personality Type",
    options: [
      "ESTJ",
      "ESTP",
      "ENTJ",
      "ENFJ",
      "ESFJ",
      "ESFP",
      "ENTP",
      "ENFP",
      "ISTJ",
      "ISTP",
      "INTJ",
      "INFJ",
      "ISFJ",
      "ISFP",
      "INTP",
      "INFP",
    ],
  },
  {
    id: "photo",
    name: "Photo",
    placeholder: "Select your best photo",
  },
  {
    id: "interests",
    name: "Interests",
    type: "fieldset",
    placeholder: "Select upto 5 interests",
    options: [
      "Photography",
      "Shopping",
      "Hiking",
      "Anime",
      "Manga",
      "Marvel",
      "DC Universe",
      "Cooking",
      "Singing",
      "Rock",
      "Hip-Hop",
      "Metal",
      "Adventure",
      "Sports",
      "Cafe Hopping",
      "Wines",
    ],
  },
  {
    id: "bio",
    type: "textarea",
    name: "Bio",
    placeholder: "Write a short and catchy bio",
  },
];

export { onboardingParameters };
