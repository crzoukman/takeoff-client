import { FC } from 'react'
import { Form, Input, Button } from 'antd';
import { IRegForm } from './types';
import { IUserData } from 'types/IUserData';
import { createUserApi } from 'api';
import config from 'config';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const RegForm: FC<IRegForm> = ({
  setIsError,
  setErrorCode,
}) => {
  const navigate = useNavigate();

  const onFinish = async (values: IUserData) => {
    try {
      await createUserApi(values);
      setIsError(false);

      setTimeout(() => {
        navigate('/login');
      }, config.ALERT_DURATION);
    } catch (e) {
      if (e instanceof Error) {
        const error = e as AxiosError;
        setIsError(true);

        if (error.response?.status === 409) {
          setErrorCode(409);
        } else {
          error.response && setErrorCode(500);
        }

      }
    }

    setTimeout(() => {
      setIsError(null);
      setErrorCode(null);

    }, config.ALERT_DURATION);

  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<IUserData>) => {
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
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
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

      <Form.Item
        label="Password Confirmation"
        name="passwordConfirmation"
        rules={[
          { required: true, message: 'Please input your password confirmation!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        dependencies={['password']}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegForm;