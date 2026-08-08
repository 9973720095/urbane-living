import React, { useEffect, useState, Suspense, useMemo } from "react";
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  ContactShadows, 
  Environment,
  Float
} from '@react-three/drei';
import * as THREE from 'three';
import { Button, Card, Tag, Row, Col, Select } from "antd";
import { WhatsAppOutlined, HomeOutlined, SafetyCertificateOutlined, DollarOutlined } from "@ant-design/icons";

const { Option } = Select;

// --- 3D COMPONENTS (Inlined to avoid resolve errors) ---

const Room = ({ ceilingDesign, floorType, wallType }) => {
  const wallHex = useMemo(() => {
    const map = {
      white: '#ffffff',
      beige: '#f5f5dc',
      grey: '#bdbdbd',
      dark: '#3e4a59'
    };
    return map[wallType] || wallType;
  }, [wallType]);

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color={floorType === 'wood' ? '#3e2723' : floorType === 'marble' ? '#fafafa' : '#bdbdbd'} 
          roughness={floorType === 'marble' ? 0.05 : 0.6} 
          metalness={floorType === 'marble' ? 0.4 : 0.1}
        />
      </mesh>

      {/* Main Back Wall */}
      <mesh position={[0, 3, -10]} receiveShadow>
        <boxGeometry args={[30, 10, 0.5]} />
        <meshStandardMaterial color={wallHex} roughness={0.9} />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-15, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color={wallHex} roughness={0.9} />
      </mesh>
      
      <mesh position={[15, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[20, 10, 0.5]} />
        <meshStandardMaterial color={wallHex} roughness={0.9} />
      </mesh>

      {/* Interactive Ceiling Structure */}
      <group position={[0, 8, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 20]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {ceilingDesign === 'cove' && (
          <group position={[0, -0.5, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[8, 8.5, 32]} />
              <meshStandardMaterial color="#4cc9f0" emissive="#4cc9f0" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[16, 0.4, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={1} />
            </mesh>
            <pointLight position={[0, -1, 0]} intensity={1} color="#4cc9f0" distance={15} />
          </group>
        )}

        {ceilingDesign === 'panel' && (
          <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
            <group position={[0, -0.8, 0]}>
              {[[-4, -4], [4, -4], [-4, 4], [4, 4]].map((pos, i) => (
                <mesh key={i} position={[pos[0], 0, pos[1]]}>
                  <boxGeometry args={[6, 0.3, 6]} />
                  <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.2} />
                </mesh>
              ))}
            </group>
          </Float>
        )}
      </group>

      <rectAreaLight width={20} height={10} intensity={1} position={[0, 5, 5]} rotation={[Math.PI, 0, 0]} />
    </group>
  );
};

const ThreeViews = ({ config }) => {
  const safeConfig = useMemo(() => ({
    ceiling: config?.ceiling || 'flat',
    floor: config?.floor || 'marble',
    wallColor: config?.wallColor || 'white'
  }), [config]);

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#1a1a1a' }}>
      <Canvas shadows camera={{ position: [12, 10, 15], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            maxPolarAngle={Math.PI / 2.1} 
            minDistance={8} 
            maxDistance={25} 
            target={new THREE.Vector3(0, 3, 0)} 
          />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
          <Environment preset="apartment" />
          <Room ceilingDesign={safeConfig.ceiling} floorType={safeConfig.floor} wallType={safeConfig.wallColor} />
          <ContactShadows position={[0, -1.99, 0]} opacity={0.4} scale={30} blur={2.5} far={10} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function FalseCeilingPage({ onOpenForm }) {
  const [designs, setDesigns] = useState([]);
  const [filters, setFilters] = useState({ category: "", style: "" });
  const [ceilingDesign, setCeilingDesign] = useState("flat");
  const [floorDesign, setFloorDesign] = useState("marble");
  const [wallDesign, setWallDesign] = useState("white");

  // Mock data to replace missing API for demonstration
  useEffect(() => {
    const mockData = [
      { _id: '1', title: 'Modern Cove Design', style: 'Modern', category: 'Living Room', price: '85/sqft', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6' },
      { _id: '2', title: 'Minimalist Panel', style: 'Minimalist', category: 'Bedroom', price: '79/sqft', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed' },
      { _id: '3', title: 'Luxury Gypsum', style: 'Luxury', category: 'Hall', price: '120/sqft', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
      { _id: '4', title: 'Royal Wooden Mix', style: 'Classic', category: 'Living Room', price: '150/sqft', image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea' }
    ];
    setDesigns(mockData);
  }, [filters]);

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* INLINE CSS to avoid resolve errors */}
      <style>{`
        .hero {
          height: 400px;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hero h1 { color: white; font-size: 3rem; margin-bottom: 1rem; font-weight: 800; }
        .hero p { font-size: 1.5rem; margin-bottom: 2rem; }
        .btn-group { display: flex; gap: 15px; justify-content: center; }
        .visualizer-card { background: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); overflow: hidden; }
        .selection-panel { padding: 24px; border-left: 1px solid #f0f0f0; }
        .design-btn { border: 2px solid transparent; transition: all 0.3s; cursor: pointer; border-radius: 8px; overflow: hidden; }
        .design-btn:hover { border-color: #40a9ff; }
        .design-btn.active { border-color: #1890ff; background: #e6f7ff; }
      `}</style>


      {/* 3D VISUALIZER SECTION */}
      <div style={{ maxWidth: '1400px', margin: '40px auto', padding: '0 20px' }}>
        <div className="visualizer-card">
          <Row>
            {/* LEFT: 3D View */}
            <Col xs={24} lg={16}>
              <div style={{ height: "600px", width: "100%", background: '#000' }}>
                <ThreeViews 
                  config={{
                    ceiling: ceilingDesign,
                    floor: floorDesign,
                    wallColor: wallDesign
                  }} 
                />
              </div>
            </Col>

            {/* RIGHT: Selection Panel */}
            <Col xs={24} lg={8} className="selection-panel">
              <h2 style={{ marginBottom: 24, fontSize: '1.25rem' }}>Personalize Your Space</h2>
              
              <div style={{ marginBottom: 30 }}>
                <h4 style={{ color: '#8c8c8c', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HomeOutlined /> Ceiling Structure
                </h4>
                <Row gutter={[12, 12]}>
                  {["flat", "cove", "panel"].map((type) => (
                    <Col span={8} key={type}>
                      <div 
                        onClick={() => setCeilingDesign(type)}
                        className={`design-btn ${ceilingDesign === type ? 'active' : ''}`}
                        style={{ padding: '12px 8px', textAlign: 'center' }}
                      >
                        <div style={{ fontSize: '10px', fontWeight: 600 }}>{type.toUpperCase()}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <div style={{ marginBottom: 30 }}>
                <h4 style={{ color: '#8c8c8c', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <DollarOutlined /> Flooring Type
                </h4>
                <Row gutter={[12, 12]}>
                  {["marble", "wood", "tiles"].map((type) => (
                    <Col span={8} key={type}>
                      <div 
                        onClick={() => setFloorDesign(type)}
                        className={`design-btn ${floorDesign === type ? 'active' : ''}`}
                        style={{ padding: '12px 8px', textAlign: 'center' }}
                      >
                        <div style={{ fontSize: '10px', fontWeight: 600 }}>{type.toUpperCase()}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              <div style={{ marginBottom: 30 }}>
                <h4 style={{ color: '#8c8c8c', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <SafetyCertificateOutlined /> Wall Color
                </h4>
                <Row gutter={[10, 10]}>
                  {[
                    { label: 'White', color: 'white' },
                    { label: 'Beige', color: 'beige' },
                    { label: 'Grey', color: 'grey' },
                    { label: 'Ocean', color: 'dark' }
                  ].map((wall) => (
                    <Col span={6} key={wall.color}>
                      <div 
                        onClick={() => setWallDesign(wall.color)}
                        style={{
                          height: "40px",
                          backgroundColor: wall.color === "white" ? "#ffffff" : wall.color === "beige" ? "#f5f5dc" : wall.color === "grey" ? "#bdbdbd" : "#3e4a59",
                          border: wallDesign === wall.color ? "3px solid #1890ff" : "1px solid #d9d9d9",
                          borderRadius: "8px",
                          cursor: "pointer",
                          transition: 'transform 0.2s'
                        }}
                        title={wall.label}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}