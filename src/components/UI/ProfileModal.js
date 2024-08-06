import React from "react";
import ModalComponent from "./ModalComponent";

const ProfileModal = ({ user, children, closeModal }) => {
  return (
    <>
    <ModalComponent title={user.name} closeModal={()=>closeModal(false)} >
        <div className="flex flex-col items-center justify-center">
            <img src={user.pic} alt={user.name} className="rounded-full w-40 h-40" />
            <p className="text-2xl mt-4">Email: {user.email}</p>
        </div>
    </ModalComponent>
    </>
  );
};

export default ProfileModal;
