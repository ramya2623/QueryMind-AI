function ResultsTable({ sql, results }) {
  return (
    <>
      <h2>Generated SQL</h2>

      <pre>{sql}</pre>

      <h2>Results</h2>

      {results.length > 0 && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              {Object.keys(results[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {results.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ResultsTable;