import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/auth.store';

export default function LogoutView() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  logout();

  navigate('/login');

  return <div></div>;
}
