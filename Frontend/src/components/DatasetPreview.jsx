function DatasetPreview({ preview }) {
  if (preview.length === 0) return null;

  return (
    <>
      <h2>Preview</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            {Object.keys(preview[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {preview.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DatasetPreview;