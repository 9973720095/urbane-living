import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth'; // signOut add kiya hai safety ke liye
import { Button, Card, Typography, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();

  // Saban, ye hai aapka main Login function
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // --- SECURITY CHECK START ---
      // Yahan "your-email@gmail.com" ki jagah apna asli Gmail likhein
      const adminEmail = "jhas08387@gmail.com"; 

      if (user.email === adminEmail) {
        message.success(`Welcome back, ${user.displayName}!`);
        navigate('/admin-dashboard'); 
      } else {
        // Agar koi aur login karega, toh system use bahaar nikaal dega
        message.error("Access Denied! You are not an authorized admin.");
        await signOut(auth); 
      }
      // --- SECURITY CHECK END ---

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
      {/* Dark Blur Overlay for Modern Look */}
      <div style={{ 
        position: 'absolute', 
        width: '100%', 
        height: '100%', 
        background: 'rgba(0,0,0,0.6)', 
        backdropFilter: 'blur(10px)' 
      }}></div>

      <Card style={{ 
        width: 420, 
        textAlign: 'center', 
        borderRadius: '28px', 
        background: 'rgba(255, 255, 255, 0.95)', 
        border: '1px solid rgba(255, 255, 255, 0.3)',
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
        <Text type="secondary" style={{ fontSize: '15px' }}>
          Secure access for Urbane Living management
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
                border: 'none', 
                fontSize: '17px', 
                fontWeight: '600',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
          >
            Continue with Google
          </Button>
        </div>
        
        <Text style={{ fontSize: '12px', color: '#999', letterSpacing: '0.5px' }}>
          OFFICIAL USE ONLY • PROTECTED BY FIREBASE
        </Text>
      </Card>
    </div>
  );
};

export default Login;