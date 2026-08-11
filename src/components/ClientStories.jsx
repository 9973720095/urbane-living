import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ClientStories = ({ onOpenForm }) => {
  const stories = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/embed/evkW_kZdf2s",
      quote: `"We wanted our new home to reflect contemporary and modern styles, inspired by designs we loved, perfectly curated by UrbaneLiving."`,
      author: "Dr. Lipika and Dr. Satendra"
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/embed/ICvpClnA7Ts",
      quote: `"Combining our family’s heritage with a modern look was our dream, and UrbaneLiving helped make it a reality."`,
      author: "Amrish"
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/embed/WpdoW7NXsbU",
      quote: `"Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste."`,
      author: "Neha and Manish"
    }
    // {
    //   id: 4,
    //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //   quote: `"The modular kitchen and wardrobe designs are simply outstanding. Professional execution from start to finish!"`,
    //   author: "Rahul Sharma"
    // },
    // {
    //   id: 5,
    //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //   quote: `"Incredible false ceiling work completed well before the deadline. Highly recommend their design team."`,
    //   author: "Pooja Verma"
    // },
    // {
    //   id: 6,
    //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //   quote: `"Transparent pricing and top-notch quality finishes. Our living room looks straight out of a luxury magazine."`,
    //   author: "Vikram Malhotra"
    // },
    // {
    //   id: 7,
    //   videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    //   quote: `"Amazing attention to detail and great customer support throughout the entire project journey."`,
    //   author: "Ananya Roy"
    // }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStories = stories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: '80px 20px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <Title level={2} style={{ fontSize: '38px', fontWeight: 800, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>
            Heard from us? Now it’s time to hear our <br /> clients’ stories
          </Title>
          <Button 
            type="primary" 
            onClick={onOpenForm}
            style={{ backgroundColor: '#ff0000', borderColor: '#ff0000', height: '48px', padding: '0 28px', fontSize: '15px', fontWeight: 700, borderRadius: '100px', boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)' }}
          >
            BOOK FREE CONSULTATION
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          {currentStories.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Direct Video Embed */}
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', height: '240px', backgroundColor: '#000' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={item.videoUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div style={{ padding: '0 4px' }}>
                <Paragraph style={{ fontSize: '14px', color: '#444444', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', marginBottom: '8px' }}>
                  {item.quote}
                </Paragraph>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a', display: 'block', textAlign: 'center' }}>
                  — {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '40px' }}>
            <Button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} icon={<LeftOutlined />} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => setCurrentPage(index + 1)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', backgroundColor: currentPage === index + 1 ? '#ff0000' : '#f0f2f5', color: currentPage === index + 1 ? '#ffffff' : '#333333', fontWeight: 700, cursor: 'pointer' }}>{index + 1}</button>
            ))}
            <Button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} icon={<RightOutlined />} style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientStories;