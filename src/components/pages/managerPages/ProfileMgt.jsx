import { changePassword, updateProfileInfo } from "../../../helpers/manager";
import Profile from "../Profile";

function ProfileMgt() {
  return (
    <div className="bg-[#F4F7FC] rounded-3xl m-2 grid grid-cols-(--librarians-layout-grid-cols)  gap-x-3 gap-y-5 pt-4 pb-2 ">
      <div className="col-start-2 ">
        <Profile
          handlePasswordChange={changePassword}
          handleProfileUpdate={updateProfileInfo}
        />
      </div>
    </div>
  );
}

export default ProfileMgt;
