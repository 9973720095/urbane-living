import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button, Card, Typography, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const allowedAdmins = [
        "sabankumarjha9@gmail.com",
        "urbaneliving.in@gmail.com",
        "jhas08387@gmail.com",
        "askabhi139@gmail.com"
      ];

      const userEmail = user.email?.toLowerCase().trim();

      if (allowedAdmins.includes(userEmail)) {

        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', userEmail);

        message.success(`Welcome back, ${user.displayName}!`);

        navigate('/admin-dashboard');

      } else {

        message.error('Access Denied!');
      }

    } catch (error) {
      console.error(error);
      message.error('Login failed!');
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000") no-repeat center center/cover',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)'
        }}
      />

      <Card
        style={{
          width: '90%',
          maxWidth: 420,
          textAlign: 'center',
          borderRadius: '28px',
          background: 'rgba(255, 255, 255, 0.95)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <img
          src="https://urbaneliving.in/wp-content/uploads/2024/07/cropped-Untitled-design-87-png.webp"
          alt="Logo"
          style={{ width: 140, marginBottom: 20 }}
        />

        <Title level={2}>Admin Portal</Title>

        <Text type="secondary">
          Secure access for Urbane Living
        </Text>

        <div style={{ marginTop: 40, marginBottom: 25 }}>
          <Button
            type="primary"
            size="large"
            block
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            style={{
              height: 55,
              borderRadius: 14,
              background: '#000',
              fontWeight: '600'
            }}
          >
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;