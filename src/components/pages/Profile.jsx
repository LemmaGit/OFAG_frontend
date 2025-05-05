import React, { useState } from "react";
import UserInfo from "./UserInfo";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChangePassword";
import TabButton from "./TabButton";

const Profile = ({ handleProfileUpdate, handlePasswordChange }) => {
  const [activeTab, setActiveTab] = useState("account-general");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center space-x-4 mb-6">
            <TabButton
              tab="account-general"
              buttonText="Account"
              activeTab={activeTab}
              handler={handleTabChange}
            />
            <TabButton
              tab="account-change"
              buttonText="Update Details"
              activeTab={activeTab}
              handler={handleTabChange}
            />
            <TabButton
              tab="account-change-password"
              buttonText="Change Password"
              activeTab={activeTab}
              handler={handleTabChange}
            />
          </div>

          <div className="space-y-6">
            {activeTab === "account-general" && <UserInfo />}
            {activeTab === "account-change" && (
              <UpdateProfile handleProfileUpdate={handleProfileUpdate} />
            )}
            {activeTab === "account-change-password" && (
              <ChangePassword handlePasswordChange={handlePasswordChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
