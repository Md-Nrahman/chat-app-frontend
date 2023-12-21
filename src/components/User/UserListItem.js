const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <div mr={2} size="sm" cursor="pointer" name={user.name} src={user.pic} />
      <div>
        <h3>{user.name}</h3>
        <h3 fontSize="xs">
          <b>Email : </b>
          {user.email}
        </h3>
      </div>
    </div>
  );
};

export default UserListItem;
