import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { deleteContactApi } from "api";
import EditModal from "components/EditModal";
import { FC } from "react"
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { forceUpdate } from "redux/slices/main.slice";
import { IContact } from "types/IContact";
import { getCookie } from "utils/getCookie";
import { getUserDataFromLS } from "utils/getUserDataFromLS";
import { ButtonsWrapper, WrapperStyled } from "./Contact.styled";

interface IProps {
  data: IContact
}

const Contact: FC<IProps> = ({ data }) => {
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
        {data.firstName} {data.lastName}
      </div>

      <ButtonsWrapper>
        <EditModal
          id={data._id}
          fName={data.firstName}
          lName={data.lastName}
        />

        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size='small'
          onClick={() => deleteHandler(data._id)}
        />
      </ButtonsWrapper>


    </WrapperStyled>
  );
};

export default Contact;