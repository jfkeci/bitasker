import React from 'react';
import UserView from '../../views/user.view';
import WelcomeView from '../../views/welcome.view';
import RegisterView from '../../views/register.view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from '../../views/login.view';

export default function GridViewHolder() {
  return (
    <div className="grid grid-cols-12 gap-4 text-white">
      <div className="col-span-3 p-4"></div>
      <div className="col-span-6 p-4">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeView />} />
            <Route path="/profile" element={<UserView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/login" element={<LoginView />} />
          </Routes>
        </Router>
      </div>
      <div className="col-span-3 p-4"></div>
    </div>
  );
}
