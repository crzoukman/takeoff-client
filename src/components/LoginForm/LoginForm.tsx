import { FC } from 'react'
import { Form, Input, Button } from 'antd';
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { useNavigate } from 'react-router-dom';
import { ILoginForm, ILoginUserData } from './types';
import { loginApi } from 'api';
import { AxiosError } from 'axios';
import config from 'config';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { setIsAuth } from 'redux/slices/main.slice';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { setIsLoading } from 'redux/slices/main.slice';

const LoginForm: FC<ILoginForm> = ({
  setIsError,
  setErrorCode,
}) => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { isLoading } = useTypedSelector(state => state.main);

  const onFinish = async (values: ILoginUserData) => {
    try {
      dispatch(setIsLoading(true));
      const res = await loginApi(values);

      document.cookie = `refreshToken${res.data.id}=${res.data.refreshToken}`;
      document.cookie = `accessToken${res.data.id}=${res.data.accessToken}`;

      localStorage.setItem(
        `${window.location.hostname}-user-data`,
        JSON.stringify({ id: res.data.id, username: res.data.username }),
      );

      setIsError(false);
      dispatch(setIsAuth(true));

      setTimeout(() => {
        navigate('/contacts');
      }, config.ALERT_DURATION);
    } catch (e) {
      if (e instanceof Error) {
        const error = e as AxiosError;
        setIsError(true);

        if (error.response?.status === 401) {
          setErrorCode(401);
        } else {
          error.response && setErrorCode(500);
        }

      }
    }

    dispatch(setIsLoading(false));

    setTimeout(() => {
      setIsError(null);
      setErrorCode(null);

    }, config.ALERT_DURATION);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<ILoginUserData>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;