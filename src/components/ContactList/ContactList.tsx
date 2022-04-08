import { getContactsApi } from "api";
import { FC, useEffect, useState } from "react";
import { WrapperStyled } from "./ContactList.styled";
import { getUserDataFromLS } from 'utils/getUserDataFromLS';
import { ILSUser } from "types/ILSUser";
import { getCookie } from "utils/getCookie";
import { useTypedSelector } from "redux/hooks/useTypedSelector";
import { v4 as uuidv4 } from 'uuid';
import { useTypedDispatch } from "redux/hooks/useTypedDispatch";
import { setContactList } from "redux/slices/main.slice";
import Contact from "components/Contact/Contact";

interface IProps {
  search: string;
}

const ContactList: FC<IProps> = ({ search }) => {
  const { contacts, update } = useTypedSelector(state => state.main);
  const [searched, setSearched] = useState(contacts);
  const dispatch = useTypedDispatch();

  const getContacts = async () => {
    const userData = JSON.parse(getUserDataFromLS() as string) as ILSUser;
    const token = getCookie('accessToken' + userData.id);

    try {
      const res = await getContactsApi(userData.id, token || '');
      return res;
    } catch (e) {

    }
  };

  useEffect(() => {
    const filtred = contacts.filter(contact => {
      const fullName = contact.firstName + ' ' + contact.lastName;
      if (fullName
        .toLowerCase()
        .includes(search.toLowerCase())
      ) return true;

      return false;
    });

    setSearched(filtred);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    (async () => {
      const res = await getContacts();

      if (res?.status === 200) {
        dispatch(setContactList(res.data));
        setSearched(res.data);
      }

      if (res?.status === 403) {
        const res2 = await getContacts();

        if (res2?.status === 200) {
          dispatch(setContactList(res2.data));
          setSearched(res2.data);
        }
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  return (
    <WrapperStyled>

      {searched.map(contact => (
        <Contact
          key={uuidv4()}
          data={contact}
        />
      ))}

    </WrapperStyled>
  );
};

export default ContactList;