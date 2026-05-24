import type { GeneratedPaper } from "@/types/assignment";
import { SCHOOL } from "@/lib/constants";

export const MOCK_GENERATED_PAPER: GeneratedPaper = {
  schoolName: SCHOOL.fullName,
  subject: "Science",
  className: "VIII",
  timeAllowed: "45 minutes",
  maximumMarks: 20,
  generalInstruction:
    "All questions are compulsory unless stated otherwise.",
  sections: [
    {
      title: "Section A",
      questionType: "Short Answer Questions",
      instruction: "Attempt all questions. Each question carries 2 marks",
      questions: [
        {
          question: "Define electroplating. Explain its process.",
          difficulty: "Easy",
          marks: 2,
        },
        {
          question:
            "What is electrolysis? Name the products formed at the anode and cathode during electrolysis of water.",
          difficulty: "Easy",
          marks: 2,
        },
        {
          question:
            "Distinguish between good conductors and insulators with two examples each.",
          difficulty: "Moderate",
          marks: 2,
        },
        {
          question:
            "Explain the chemical effect of electric current with a suitable experiment.",
          difficulty: "Moderate",
          marks: 2,
        },
        {
          question:
            "Why is distilled water a poor conductor of electricity? How can it be made to conduct electricity?",
          difficulty: "Moderate",
          marks: 2,
        },
        {
          question:
            "Write the chemical equation for the reaction at the cathode during electroplating of copper.",
          difficulty: "Challenging",
          marks: 2,
        },
        {
          question:
            "List two applications of electroplating in daily life.",
          difficulty: "Easy",
          marks: 2,
        },
        {
          question:
            "What is an electrolyte? Give two examples of strong electrolytes.",
          difficulty: "Easy",
          marks: 2,
        },
        {
          question:
            "Explain why an electric bulb glows when connected in a complete circuit.",
          difficulty: "Moderate",
          marks: 2,
        },
        {
          question:
            "Describe the process of purification of copper by electrolysis.",
          difficulty: "Challenging",
          marks: 2,
        },
      ],
    },
  ],
  answerKey: [
    "Electroplating is the process of depositing a thin layer of metal on the surface of another metal using electric current. The object to be plated is made the cathode and the plating metal is made the anode in an electrolytic cell.",
    "Electrolysis is the decomposition of an electrolyte by passing electric current. At anode: O₂ gas; at cathode: H₂ gas during electrolysis of water.",
    "Good conductors allow electric current to pass easily (e.g., copper, aluminium). Insulators do not allow current to pass (e.g., rubber, glass).",
    "When electric current passes through a conducting liquid, chemical reactions occur at the electrodes. Example: electroplating or decomposition of water.",
    "Distilled water has no free ions. It can conduct when acids, bases, or salts are dissolved in it.",
    "At cathode: Cu²⁺ + 2e⁻ → Cu",
    "Jewellery plating, coating iron objects with chromium to prevent rusting.",
    "An electrolyte is a substance that conducts electricity in molten or aqueous state. Examples: NaCl solution, H₂SO₄ solution.",
    "Current flows through the filament, heating it to incandescence due to the complete closed circuit.",
    "Impure copper is made anode, pure copper cathode, and CuSO₄ solution as electrolyte. Pure copper deposits on cathode.",
  ],
};

export const MOCK_AI_SUMMARY =
  "Certainly, Lakshya! Here are customized Question Paper for your CBSE Grade 8 Science classes on the NCERT chapters:";

export const MOCK_AI_SUMMARY_MOBILE =
  "Done! We've analyzed your data to generate a Question Paper for your 10th Science class based on the topics discussed.";
