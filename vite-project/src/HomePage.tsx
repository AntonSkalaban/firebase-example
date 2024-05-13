import { FC, useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

import { Button, Flex } from "antd";
import { GoogleOutlined, LoadingOutlined } from "@ant-design/icons";
import { auth } from "./firebase";
import { useAuth } from "./useAuth";
import Title from "antd/es/typography/Title";

export const Home: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const context = useAuth();

  useEffect(() => {
    if (user?.user && context) {
      context.login(user.user);
    }
  }, [context, user?.user]);

  const hanldeSignUp = () => {
    signInWithGoogle();
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <Flex vertical align="center" justify="center">
      <Title>Welcome!</Title>
      <Button
        type="primary"
        shape="round"
        icon={loading ? <LoadingOutlined /> : <GoogleOutlined />}
        size="large"
        onClick={hanldeSignUp}
        disabled={loading}
      >
        
        {loading ? "Loading..."  : "Google" }
      </Button>
    </Flex>
  );
}
