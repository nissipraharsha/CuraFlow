import React from 'react';

const CURAFLOWLogo = ({ size = 'medium', className = '' }) => {
  const sizeStyles = {
    small: {
      container: { fontSize: '1.2rem', gap: '8px' },
      icon: { width: '30px', height: '30px', fontSize: '16px' }
    },
    medium: {
      container: { fontSize: '1.8rem', gap: '12px' },
      icon: { width: '45px', height: '45px', fontSize: '24px' }
    },
    large: {
      container: { fontSize: '2.5rem', gap: '15px' },
      icon: { width: '60px', height: '60px', fontSize: '32px' }
    }
  };

  const currentSize = sizeStyles[size];

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: currentSize.container.gap,
        ...currentSize.container
      }}
      className={className}
    >
      <div style={{
        width: currentSize.icon.width,
        height: currentSize.icon.height,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        ...currentSize.icon
      }}>
        C
      </div>
      <div style={{
        fontWeight: 'bold',
        color: '#2c3e50',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        CURAFLOW
      </div>
    </div>
  );
};

export default CURAFLOWLogo; 