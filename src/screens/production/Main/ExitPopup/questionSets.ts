type QuestionSet = {
  title: string;
  content: string;
  cancel: string;
  exit: string;
}[];

const questionSet: QuestionSet = [
  {
    title: "헐",
    content: "본인도 외모가 수려한 거 알고 있죠?",
    cancel: "후훗, 그럼요",
    exit: "예?",
  },
  {
    title: "이럴수가",
    content: "본인도 자신이 똑똑한 거 알고 있죠?",
    cancel: "ㅋ눈치 채셨구나?",
    exit: "예?",
  },
  {
    title: "오마이갓",
    content: "본인도 자신이 특별한 거 알고 있죠?",
    cancel: "당연하죠",
    exit: "예?",
  },
  {
    title: "커헉",
    content: "언제부터 그렇게 매력이 넘쳤어요?",
    cancel: "태어날 때부터",
    exit: "예?",
  },
]

export default questionSet;