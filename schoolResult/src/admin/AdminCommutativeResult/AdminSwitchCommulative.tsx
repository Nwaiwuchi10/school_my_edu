import React, { useState } from "react";
import CreateCommutativeResult from "./CreateCommutativeResult";
import ManualCreateCommulativeResult from "./ManualCreateCommulativeResult";
import "./Commulative.css";
import AdminLayout from "../AdminDashboard/AdminLayout";
import DynamicResult from "./DynamicResult";
const AdminSwitchCommulative: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(
    <CreateCommutativeResult />
  );

  const handleSelectComponent = (component: JSX.Element) => {
    setSelectedComponent(component);
  };

  return (
    <AdminLayout>
      <div className="commulative">
        <div className="commulative-sidebar">
          <div
            onClick={() => handleSelectComponent(<CreateCommutativeResult />)}
            typeof="button"
          >
            Dynamic Commulative Result
          </div>
          <div
            onClick={() =>
              handleSelectComponent(<ManualCreateCommulativeResult />)
            }
            typeof="button"
          >
            Manual Commulative Result
          </div>
        </div>
        <div>{selectedComponent}</div>
      </div>
    </AdminLayout>
  );
};

export default AdminSwitchCommulative;
