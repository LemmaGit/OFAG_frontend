import { changePassword, updateProfile } from "../../../helpers/librarian";
import Layout from "../Layout";
import Profile from "../Profile";

function ProfileMgt() {
  return (
    <Layout>
      <Profile
        handlePasswordChange={changePassword}
        handleProfileUpdate={updateProfile}
      />
    </Layout>
  );
}

export default ProfileMgt;
