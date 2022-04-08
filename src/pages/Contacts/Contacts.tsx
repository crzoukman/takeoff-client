import { FC, useState } from 'react'
import { ControllersStyled, WrapperStyled } from './Contacts.styled';
import Search from 'antd/lib/input/Search';
import ContactList from 'components/ContactList';
import Modal from 'components/Modal';

const Contacts: FC = () => {
  const [search, setSearch] = useState('');

  const onChange = (value: string) => {
    setSearch(value);
  };

  return (
    <WrapperStyled>
      <ControllersStyled>
        <Modal />

        <Search
          placeholder="search a contact..."
          allowClear
          size='large'
          onChange={(e) => onChange(e.target.value)}
        />
      </ControllersStyled>

      <ContactList search={search} />
    </WrapperStyled>
  );
};

export default Contacts;