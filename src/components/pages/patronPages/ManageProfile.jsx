import { changePassword, updateProfileInfo } from "../../../helpers/patron";
import Profile from "../Profile";

function ManageProfile() {
  return (
    <>
      <Profile
        handlePasswordChange={changePassword}
        handleProfileUpdate={updateProfileInfo}
      />
    </>
  );
}

export default ManageProfile;
