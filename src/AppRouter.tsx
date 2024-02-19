import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SingleFileUploader from "./components/SingleFileUploader";
import SingleFileDownloader from "./components/SingleFileDownloader";
import Home from "./components/Home";

function AppRouter() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/Home" Component={Home} />
          <Route path="/Upload" Component={SingleFileUploader} />
          <Route path="/Download" Component={SingleFileDownloader} />

        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;
