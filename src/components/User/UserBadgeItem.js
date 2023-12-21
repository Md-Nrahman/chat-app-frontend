const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <div pl={1} />
    </div>
  );
};

export default UserBadgeItem;
