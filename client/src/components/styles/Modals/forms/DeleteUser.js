/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { reset, deleteUser } from "../../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { closeModal } from "../../../../features/modal/modalSlice";

const ConfirmTitle = styled.h2`
  font-size: 16px;
  padding: 5%;
`;
const ConfirmSubtitle = styled.p`
  font-size: 14px;
  padding: 5%;

  /* margin-bottom: 10%; */
`;
const ConfirmButton = styled.button`
  margin-left: 42%;
  margin-top: 10%;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #5e17eb;
  font-size: 14px;

  &:hover {
    color: #5e17eb;
  }
`;

const DeleteUser = (props) => {
  console.log("DeleteUser props: ", props); // {id: 130, loginMethod: 0}
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <ConfirmTitle>정말 탈퇴하시겠습니까?</ConfirmTitle>
        <ConfirmSubtitle>
          데이터는 모두 삭제되며 재가입을 위해서는 재인증이 필요합니다.
        </ConfirmSubtitle>
        <ConfirmButton
          onClick={async () => {
            await dispatch(deleteUser(props));
            dispatch(reset());
            dispatch(closeModal());
            navigate("/");
          }}
        >
          확인
        </ConfirmButton>
      </div>
    </>
  );
};
export default DeleteUser;
