import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Activity, Home, FileText, BarChart3 } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #2d3748;
  font-weight: 700;
  font-size: 1.5rem;
  
  &:hover {
    color: #667eea;
  }
`;

const LogoIcon = styled(Activity)`
  color: #667eea;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  &.active {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
`;

const CTAButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;

const Header = () => {
  const location = useLocation();

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoIcon size={24} />
        Fitness Assessment
      </Logo>
      
      <Nav>
        <NavLink 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          <Home size={18} />
          Home
        </NavLink>
        
        <NavLink 
          to="/assessment" 
          className={location.pathname === '/assessment' ? 'active' : ''}
        >
          <FileText size={18} />
          Assessment
        </NavLink>
        
        <NavLink 
          to="/dashboard" 
          className={location.pathname === '/dashboard' ? 'active' : ''}
        >
          <BarChart3 size={18} />
          Dashboard
        </NavLink>
        
        <CTAButton to="/assessment">
          Start Assessment
        </CTAButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 