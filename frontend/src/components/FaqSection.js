import React from 'react';
import { Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './css/FaqSection.css';

const { Title } = Typography;
const { Panel } = Collapse;

const FaqSection = () => {
  const faqData = [
    {
      key: '1',
      question: 'Why should I do up the ceiling at my home?',
      answer: 'Ceilings enhance the aesthetics, provide better lighting options, and help in thermal insulation.',
    },
    {
      key: '2',
      question: 'What are the key benefits of Designer Ceilings?',
      answer: 'Designer ceilings hide messy wiring, reduce noise levels, and give a premium finish to your rooms.',
    },
    {
      key: '3',
      question: 'How long designer ceilings last?',
      answer: 'With high-quality materials like Urbane Living, designer ceilings can easily last for 15-20 years with minimal maintenance.',
    },
    {
      key: '4',
      question: 'Are False Ceiling Installations costly?',
      answer: 'It depends on the design, but basic designs are quite affordable and add significant value to your property.',
    },
    {
      key: '5',
      question: 'Why Should I do up my ceiling with Urbane Living?',
      answer: 'Urbane Living provides superior fire resistance, durability, and a smooth finish compared to local materials.',
    },
  ];

  return (
    <div className="faq-wrapper" style={{ padding: '60px 0', background: '#fff' }}>
      <Row justify="center">
        <Col xs={22} md={20} lg={16}>
          <Title level={2} className="faq-main-title">FAQ's</Title>
          
          <Collapse
            accordion
            expandIconPosition="end"
            expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 45 : 0} />}
            className="custom-faq-collapse"
          >
            {faqData.map((item) => (
              <Panel 
                header={item.question} 
                key={item.key}
                className="faq-panel"
              >
                <p>{item.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default FaqSection;