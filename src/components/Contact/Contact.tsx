import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteContactApi } from "api";
import EditModal from "components/EditModal";
import React, { FC } from "react"
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { forceUpdate } from "redux/slices/main.slice";
import { getCookie } from "utils/getCookie";
import { getUserDataFromLS } from "utils/getUserDataFromLS";
import { ButtonsWrapper, WrapperStyled } from "./Contact.styled";

interface IProps {
  _id: string;
  firstName: string;
  lastName: string
}

const Contact: FC<IProps> = ({ _id, firstName, lastName }) => {
  const dispatch = useTypedDispatch();

  const deleteContact = async (id: string) => {
    const userData = JSON.parse(getUserDataFromLS() as string);
    const token = getCookie('accessToken' + userData.id);

    try {
      const res = await deleteContactApi(
        id,
        token || ''
      );

      return res;
    } catch (e) {
      if (e instanceof Error) {

      }
    }

  };

  const deleteHandler = async (id: string) => {
    const res = await deleteContact(id);

    if (res?.status === 200) {
      dispatch(forceUpdate({}));
    }

    if (res?.status === 403) {
      await deleteContact(id);

      dispatch(forceUpdate({}));
    }

  }

  return (
    <WrapperStyled>
      <div>
        {firstName} {lastName}
      </div>

      <ButtonsWrapper>
        <EditModal
          id={_id}
          fName={firstName}
          lName={lastName}
        />

        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size='small'
          onClick={() => deleteHandler(_id)}
        />
      </ButtonsWrapper>


    </WrapperStyled>
  );
};

export default React.memo(Contact);
