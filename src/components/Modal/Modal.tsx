import { Alert, Button, Input } from 'antd';
import React, { FC, useState } from 'react'
import { Modal as ModalAntd } from 'antd';
import { UserAddOutlined } from '@ant-design/icons'
import { createContactApi } from './../../api/contacts.api';
import { getCookie } from 'utils/getCookie';
import { getUserDataFromLS } from 'utils/getUserDataFromLS';
import config from 'config';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { forceUpdate } from 'redux/slices/main.slice';

const Modal: FC = () => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isError, setIsError] = useState<null | boolean>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useTypedDispatch();

  const isInputsEmpty = !(firstName.trim() && lastName.trim());

  const showModal = () => {
    setVisible(true);
  };

  const createContact = async () => {
    const userData = JSON.parse(getUserDataFromLS() as string);
    const token = getCookie('accessToken' + userData.id);

    try {
      const res = await createContactApi(
        {
          userId: userData.id,
          firstName,
          lastName,
        },
        token || ''
      );

      return res;
    } catch (e) {
      if (e instanceof Error) {
        setIsError(true);
        setErrorMsg('Something happend!');

        setTimeout(() => {
          setIsError(null);
          setErrorMsg('');
        }, config.ALERT_DURATION);
      }
    }

  };

  const validateInputs = () => {
    if (isInputsEmpty) {
      setIsError(true);
      setErrorMsg('You should fill both inputs!');

      setTimeout(() => {
        setIsError(null);
        setErrorMsg('');
      }, config.ALERT_DURATION);

      return false;
    }

    return true;
  };

  const handleOk = async () => {
    const isValid = validateInputs();

    if (isValid) {
      setConfirmLoading(true);

      const res = await createContact();

      if (res?.status === 200) {
        setVisible(false);
        dispatch(forceUpdate({}));
        setFirstName('');
        setLastName('');
      }

      if (res?.status === 403) {
        await createContact();

        setVisible(false);
        dispatch(forceUpdate({}));
        setFirstName('');
        setLastName('');
      }

      setConfirmLoading(false);
    }


  };

  const handleCancel = () => {
    setVisible(false);
  };

  const firstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<UserAddOutlined />}
        size='large'
        onClick={showModal}
      >
        Add New Contact
      </Button>
      <ModalAntd
        title="Add a new contact"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}

      >
        <Input
          placeholder="type a first name here"
          onChange={firstNameHandler}
          addonBefore='First Name'
          value={firstName}
          style={{ marginBottom: '20px' }}
        />

        <Input
          placeholder="type a last name here"
          onChange={lastNameHandler}
          addonBefore='Last Name'
          value={lastName}
        />

        {isError && (
          <Alert
            description={errorMsg}
            type="error"
            showIcon
            style={{ marginTop: '20px' }}
          />
        )}
      </ModalAntd>


    </>
  );
};

export default Modal;