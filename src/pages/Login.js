import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { Button, Card, Typography, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { isAdminEmail } from '../config/admins';

const { Title, Text } = Typography;

// Firebase error code -> clear message (the code is also shown, so problems are easy to fix)
const loginErrorText = (code) => ({
  'auth/unauthorized-domain': 'This website is not allowed in Firebase. Add it in Firebase → Authentication → Settings → Authorized domains.',
  'auth/popup-blocked': 'The browser blocked the Google popup. Allow popups for this site and try again.',
  'auth/popup-closed-by-user': 'The Google popup was closed before login finished.',
  'auth/cancelled-popup-request': 'Another login popup was already open. Try again.',
  'auth/network-request-failed': 'Network problem. Check the internet and try again.',
  'auth/operation-not-allowed': 'Google login is turned off in Firebase → Authentication → Sign-in method.',
}[code] || 'Login failed!');

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const userEmail = user.email?.toLowerCase().trim();

      if (isAdminEmail(userEmail)) {

        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminEmail', userEmail);

        message.success(`Welcome back, ${user.displayName}!`);

        navigate('/admin-dashboard');

      } else {
        // not an admin: sign out so another Google account can be picked next time
        await signOut(auth);
        message.error(`Access Denied! ${userEmail} is not an admin.`);
      }

    } catch (error) {
      console.error('Admin login error:', error.code, error.message);
      message.error(`${loginErrorText(error.code)}${error.code ? ` (${error.code})` : ''}`, 8);
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
          src="https://res.cloudinary.com/diosq0s7w/image/upload/q_auto/f_auto/v1777899675/UrbaneLiving_Logo_6_1_dfh2r1.png"
          alt="Urbane Living"
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