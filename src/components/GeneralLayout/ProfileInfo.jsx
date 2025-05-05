function ProfileInfo({ avatar, fullName, role }) {
  return (
    <div className="flex flex-col gap-1 items-center pb-2 ">
      <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-full relative outline-4 outline-[#2d3390] ">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img
            src={avatar}
            alt="profile-picture"
            className="w-full h-full object-fill"
          />
        </div>
        <div className="w-3 h-3 bg-green-500 absolute right-1 top-3/4 rounded-full"></div>
      </div>
      <div
        className="text-white text-center
          "
      >
        <p
          className="text-lg
            "
        >
          {fullName}
        </p>
        <p className="opacity-75">{role}</p>
      </div>
    </div>
  );
}

export default ProfileInfo;
