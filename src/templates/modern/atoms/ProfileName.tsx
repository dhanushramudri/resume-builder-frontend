export const ProfileName = ({ fullName }: { fullName: string }) => {
  return (
    <h3
      className="text-3xl font-medium max-w-[90%] overflow-hidden overflow-ellipsis whitespace-nowrap"
      title={fullName}
    >
      {fullName}
    </h3>
  );
};
