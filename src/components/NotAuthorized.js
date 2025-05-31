import React from 'react';
import { supabase } from './supabaseConfig';

const NotAuthorized = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'; // Redirect to login page after logout
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#282c34',
      color: 'white'
    }}>
      <h1>You are not authorized to view this page.</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#61dafb',
          color: '#282c34',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default NotAuthorized; 