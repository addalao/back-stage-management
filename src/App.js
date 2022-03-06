import { Spin } from "antd";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

const Login = React.lazy(() => import("./login"));
const BasicLayout = React.lazy(() => import("./layout"));

const AuthVerification = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) return children;

  return <Navigate to="/login" replace></Navigate>;
};

function App() {
  return (
    <div className="App">
      <React.Suspense fallback={<Spin className="loading" tip="Loading..." />}>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            path="/*"
            element={
              <AuthVerification>
                <BasicLayout></BasicLayout>
              </AuthVerification>
            }
          ></Route>
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
