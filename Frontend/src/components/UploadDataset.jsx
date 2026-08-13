function UploadDataset({ setFile, uploadFile }) {
  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          console.log("File Selected:", e.target.files[0]);
          setFile(e.target.files[0]);
        }}
      />

      <button
        onClick={uploadFile}
        style={{ marginLeft: "10px" }}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadDataset;