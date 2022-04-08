import { FC } from "react";
import { IErrors } from "./types";
import { Alert } from 'antd';

const Errors: FC<IErrors> = ({ isError, errorCode, errorMsgs }) => {

  return (
    <div>
      {isError === false && errorCode === null && (
        <Alert
          message="Success"
          description={errorMsgs[200]}
          type="success"
          showIcon
        />
      )}

      {isError && errorCode && errorCode !== 500 && (
        <Alert
          message="Warning"
          description={errorMsgs[errorCode]}
          type="warning"
          showIcon
        />
      )}

      {isError && errorCode === 500 && (
        <Alert
          message="Server Error"
          description={errorMsgs[500]}
          type="error"
          showIcon
        />
      )}
    </div>
  )
};

export default Errors;