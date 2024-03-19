import { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../assets/download.svg';
import "../style/SingleFileDownloader.css";

const FileTable = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://7oe17qx131.execute-api.eu-west-1.amazonaws.com/tesoro/getFilesName';

    axios.get(apiUrl)
      .then(response => {
        setFiles(response.data);
        setLoading(false);

      })
      .catch(error => {
        console.error('Error fetching files:', error);
      });
  }, []);

  const handleDownload = async (fileName: string) => {
    try {
      const url = `https://7oe17qx131.execute-api.eu-west-1.amazonaws.com/tresero/getFileContent/${fileName}`;
      const response = await axios.get(url);
      const preSignedUrl = response.data;
      console.log(response)
      window.location.href = preSignedUrl;
    } catch (error) {
      console.error('Error fetching file:', error);
    }

  };

  const handleDelete = async (fileName: string) => {
    // Implement your download logic here
    const isConfirmed = window.confirm(`Are you sure you want to delete ${fileName}?`);

    if (isConfirmed) {
      try {
        const encodedFileName = encodeURIComponent(fileName);
        // Assuming your backend endpoint is "/api/files/delete"
        await axios.delete(`https://7oe17qx131.execute-api.eu-west-1.amazonaws.com/tesoro/deleteFile/${encodedFileName}`);
        console.log('Delete:', fileName);
        setFiles(files.filter((file) => file !== fileName));
      } catch (error) {
        console.error('Error deleting file:', error);
      }

    }
  };

  return (
    <>
      <img className="down-load-image" src={logo} alt="Logo" />
      <div>
        {loading ? (
          // Show spinner while loading
          <h1 className="spinner">Loading... ⏳</h1>
        ) : (
          // Render the table when data is loaded
          <table>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Download</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file}>
                  <td>{file}</td>
                  <td>
                    <button className="button-tableau download-button" onClick={() => handleDownload(file)}>
                      Download
                    </button>
                  </td>
                  <td>
                    <button className="button-tableau delete-button" onClick={() => handleDelete(file)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default FileTable;
