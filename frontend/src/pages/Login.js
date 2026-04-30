import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth'; 
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

      // --- UPDATED SECURITY CHECK ---
      // Ab yahan dono emails allowed hain
      const allowedAdmins = ["jhas08387@gmail.com", "askabhi139@gmail.com"]; 

      if (allowedAdmins.includes(user.email)) {
        message.success(`Welcome back, ${user.displayName}!`);
        navigate('/admin-dashboard'); 
      } else {
        message.error("Access Denied! You are not an authorized admin.");
        await signOut(auth); 
      }
    } catch (error) {
      console.error(error);
      message.error("Login failed! Please check your connection.");
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: 'url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000") no-repeat center center/cover',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: 'rgba(0,0,0,0.6)', 
        backdropFilter: 'blur(10px)' 
      }}></div>

      <Card style={{ 
        width: '90%',
        maxWidth: 420, 
        textAlign: 'center', 
        borderRadius: '28px', 
        background: 'rgba(255, 255, 255, 0.95)', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        position: 'relative',
        zIndex: 1
      }}>
        <img 
          src="https://urbaneliving.in/wp-content/uploads/2024/07/cropped-Untitled-design-87-png.webp" 
          alt="Urbane Living Logo" 
          style={{ width: 140, marginBottom: 20 }} 
        />
        <Title level={2} style={{ marginBottom: 5, color: '#001529' }}>Admin Portal</Title>
        <Text type="secondary" style={{ fontSize: '15px' }}>Secure access for Urbane Living</Text>
        
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
                fontSize: '17px', 
                fontWeight: '600',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
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