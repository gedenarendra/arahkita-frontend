import TermsPolicyComponent from "../components/test/TermsPolicyComponent";
import QuestionComponent from "../components/test/QuestionComponent";

function TestPages({
  mode = "terms", // 'terms' (Node 1) | 'question' (Node > 1)
  major = "Math",
  level = 2,
  questionData,
  onBack,
  onAgreeTerms,
  onSubmitQuestion,
  activeTab = "home",
  setActiveTab = () => {},
}) {
  if (mode === "terms") {
    return (
      <TermsPolicyComponent
        onBack={onBack}
        onAgree={onAgreeTerms}
        onDisagree={onBack}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <QuestionComponent
      major={major}
      level={level}
      questionData={questionData}
      onBack={onBack}
      onSubmit={onSubmitQuestion}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

export default TestPages;
