import React from "react";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsActionSuccess } from '../../states/global/action';

const UnderlineTabs = ({
  setShowRoleList,
  setShowAddRole,
  activeTab,
  setActiveTab,
  tabRefs,
  setShowRoleMaxPopup,
  data
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rolesAmount = useSelector((state) => state.roles.map((role) => role.total_record)[1]);

  const toggleRoleList = (value) => {
    setActiveTab(value);
    setShowRoleList(true);
    setShowAddRole(false);
    navigate("./role-list")
  };

  const toggleAddRole = (value) => {
    if (rolesAmount >= 100) {
      dispatch(setIsActionSuccess("go to role list"))
      setShowRoleMaxPopup(true)
      return
    }
    setActiveTab(value);
    setShowAddRole(true);
    setShowRoleList(false);
    navigate("./add-role")
  };

  return (
    <Tabs value={activeTab} className="pb-10 z-0 font-montserrat">
      <TabsHeader
        className="rounded-none border-b bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-4 border-light-primary shadow-none rounded-none mt-0.5",
        }}
      >
        {data.map(({ value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() =>
              value === "Add Role"
                ? toggleAddRole(value)
                : toggleRoleList(value)
            }
            ref={tabRefs[value]}
            className={`${activeTab === value
              ? "text-xl z-0 text-light-primary font-semibold font-montserrat"
              : "text-xl text-secondary-hover font-semibold font-montserrat"
              } w-1/12 cursor-pointer`}
          >
            {value}
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  );
};

export default UnderlineTabs;