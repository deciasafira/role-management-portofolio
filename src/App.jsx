import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
// Component
import RoleManagement from "./pages/RoleManagement";
import Map from "./pages/UserManagement";
import Sidebar from "./components/sidebar/Sidebar";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux Integration
import { Provider } from "react-redux";
import store from "./states";

const UserManagement = React.lazy(() => import("fe_user_list/UserManagement"));
const ViewMap = React.lazy(() => import("fe_map/ViewPeta"));

const App = () => {
  const [showRoleManagement, setShowRoleManagement] = useState(null);
  const [showUserManagement, setShowUserManagement] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (showUserManagement) {
      navigate('/user-management/user-list');
      setShowUserManagement(true)
      setShowRoleManagement(false)
    } else if (showRoleManagement) {
      navigate("/role-management/role-list");
      setShowUserManagement(false)
      setShowRoleManagement(true)
    } else if (showMap) {
      navigate("/map");
    }
    else {
      navigate("/role-management/role-list");
      setShowUserManagement(false)
      setShowRoleManagement(true)
    }
  }, [showUserManagement, showRoleManagement, showMap]);

  const renderRoleManagement = () => (
    <Provider store={store}>
      <div className="w-full h-full">
        <div className="flex bg-base-surface">
          <Sidebar
            showRoleManagement={showRoleManagement}
            setShowRoleManagement={setShowRoleManagement}
            showUserManagement={showUserManagement}
            setShowUserManagement={setShowUserManagement}
          />
          <Routes>
            {showRoleManagement && (
              <Route
                path="/role-management/*"
                element={
                  <RoleManagement showMap={showMap} setShowMap={setShowMap} />
                }
              />
            )}
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Provider>
  );

  const renderUserManagement = () => (
    <React.Suspense fallback={"Loading Page....."}>
      <UserManagement showMap={showMap} setShowMap={setShowMap} />
    </React.Suspense>
  );

  const renderMap = () => (
    <React.Suspense fallback={"Loading Page....."}>
      <ViewMap />
    </React.Suspense>
  );

  return (
    showMap ? renderMap() :
      (showUserManagement ? renderUserManagement() :
        (showRoleManagement ? renderRoleManagement() :
          null))
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

export default App;