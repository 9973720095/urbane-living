import React, { useState } from 'react';
import { Typography, Button } from 'antd';
import { LeftOutlined, RightOutlined, YoutubeFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ClientStories = ({ onOpenForm }) => {
  // Sample client stories data (Aap ise apne hisab se aur bhi add kar sakte hain)
  const stories = [
    {
      id: 1,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      quote: `"We wanted our new home to reflect contemporary and modern styles, inspired by designs we loved, perfectly curated by UrbaneLiving."`,
      author: "Dr. Lipika and Dr. Satendra"
    },
    {
      id: 2,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
      quote: `"Combining our family’s heritage with a modern look was our dream, and UrbaneLiving helped make it a reality."`,
      author: "Amrish"
    },
    {
      id: 3,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
      quote: `"Thanks to UrbaneLiving, our new home seamlessly blends heritage beauty with modern style, reflecting our taste."`,
      author: "Neha and Manish"
    },
    {
      id: 4,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=600&q=80",
      quote: `"The modular kitchen and wardrobe designs are simply outstanding. Professional execution from start to finish!"`,
      author: "Rahul Sharma"
    },
    {
      id: 5,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=80",
      quote: `"Incredible false ceiling work completed well before the deadline. Highly recommend their design team."`,
      author: "Pooja Verma"
    },
    {
      id: 6,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
      quote: `"Transparent pricing and top-notch quality finishes. Our living room looks straight out of a luxury magazine."`,
      author: "Vikram Malhotra"
    },
    // Extra items for second page demonstration pagination
    {
      id: 7,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=600&q=80",
      quote: `"Amazing attention to detail and great customer support throughout the entire project journey."`,
      author: "Ananya Roy"
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 items per row * 2 rows = 6 items per page

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStories = stories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div style={{ padding: '80px 20px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <Title level={2} style={{ fontSize: '38px', fontWeight: 800, color: '#1a1a1a', margin: 0, lineHeight: 1.2 }}>
            Heard from us? Now it’s time to hear our <br /> clients’ stories
          </Title>
          <Button 
            type="primary" 
            onClick={onOpenForm}
            style={{
              backgroundColor: '#ff0000',
              borderColor: '#ff0000',
              height: '48px',
              padding: '0 28px',
              fontSize: '15px',
              fontWeight: 700,
              borderRadius: '100px',
              boxShadow: '0 4px 15px rgba(255, 0, 0, 0.3)'
            }}
          >
            BOOK FREE CONSULTATION
          </Button>
        </div>

        {/* Stories Grid (3 cards per row, 2 rows max per page) */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          {currentStories.map((item) => (
            <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Video Card Container */}
              <div style={{ 
                position: 'relative', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                height: '240px',
                backgroundColor: '#000'
              }}>
                <img 
                  src={item.thumbnail} 
                  alt="Client Story" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} 
                />
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px'
                }}>
                  {/* Top Branding / ID */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '13px', fontWeight: 600 }}>
                    <div style={{ width: '24px', height: '24px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#ff0000', fontSize: '12px', fontWeight: 'bold' }}>S</span>
                    </div>
                    <span>Urbane Living Client</span>
                  </div>

                  {/* Play Button Icon Center */}
                  <div style={{ alignSelf: 'center', cursor: 'pointer' }}>
                    <YoutubeFilled style={{ fontSize: '56px', color: '#ff0000', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} />
                  </div>

                  {/* Bottom YouTube Branding text */}
                  <div style={{ color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <YoutubeFilled style={{ color: '#ff0000' }} /> Watch on <span style={{ fontWeight: 'bold' }}>YouTube</span>
                  </div>
                </div>
              </div>

              {/* Quote & Author */}
              <div style={{ padding: '0 4px' }}>
                <Paragraph style={{ fontSize: '14px', color: '#444444', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '8px' }}>
                  {item.quote}
                </Paragraph>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1a1a1a' }}>
                  — {item.author}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Advanced & Modern Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '40px' }}>
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              icon={<LeftOutlined />}
              style={{ borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: currentPage === index + 1 ? '#ff0000' : '#f0f2f5',
                  color: currentPage === index + 1 ? '#ffffff' : '#333333',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: currentPage === index + 1 ? '0 4px 12px rgba(255, 0, 0, 0.3)' : 'none'
                }}
              >
                {index + 1}
              </button>
            ))}

            <Button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              icon={<RightOutlined />}
              style={{ borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientStories;