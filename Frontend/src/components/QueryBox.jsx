function QueryBox({
  question,
  setQuestion,
  askQuestion,
}) {
  return (
    <>
      <h2>Ask a Question</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
        style={{
          width: "350px",
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <button
        onClick={askQuestion}
        disabled={!question.trim()}
      >
        Ask
      </button>
    </>
  );
}

export default QueryBox;