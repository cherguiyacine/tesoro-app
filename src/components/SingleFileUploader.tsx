import React, { useState } from "react";
import "../style/SingleFileUploader.css";
import logo from '../assets/upload.svg';

const SingleFileDownloader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");


      if (validateFile(file)) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          const response = await fetch(`https://7oe17qx131.execute-api.eu-west-1.amazonaws.com/tesoro/postFile/${file.name}`, {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            const result = await response.json();
            console.log(result.message); // Log success message
            setStatus("success");
          } else {
            console.error("File upload failed");
            setStatus("fail");
          }

          setStatus("success");
        } catch (error) {
          console.error(error);
          setStatus("fail");
        }
      } else {
        setStatus("fail");
      }

    }
  };

  return (
    <>
      <img className="up-load-image" src={logo} alt="Logo" />
      <div className="input-group">

        <button className="choosefile">
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>        </button>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {(file.size / (1024 * 1024)).toFixed(2)} Mo</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else if (status === "zipping") {
    return <p>⏳ Zipping selected file...</p>;
  } else {
    return null;
  }
};

const validateFile = (file: any) => {
  // Check file extension
  const allowedExtensions = ['doc', 'docx', 'ppt', 'pptx', 'pdf', 'txt'];
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    alert('Invalid file extension. Please upload a valid document (Word, PowerPoint, PDF).');
    return false;
  }

  // Check file size (in bytes)
  const maxSize = 2 * 1024 * 1024; // 2 MB
  if (file.size > maxSize) {
    alert('File size exceeds the limit 2MB. Please upload a smaller file.');
    return false;
  }

  return true;
};

export default SingleFileDownloader;