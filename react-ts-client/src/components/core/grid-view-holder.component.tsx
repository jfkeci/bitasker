import React from 'react';
import LoginView from '../../views/login.view';
import WelcomeView from '../../views/welcome.view';
import EncoderView from '../../views/encoder.view';
import RegisterView from '../../views/register.view';
import NotFoundView from '../../views/not-found.view';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function GridViewHolder() {
  return (
    <div className="grid grid-cols-12 gap-4 text-white">
      <div className="col-span-3 p-4"></div>
      <div className="col-span-6 p-4">
        <Router>
          <Routes>
            <Route path="/register" element={<RegisterView />} />
            <Route path="/encoder" element={<EncoderView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="*" element={<NotFoundView />} />
            <Route path="/" element={<WelcomeView />} />
          </Routes>
        </Router>
      </div>
      <div className="col-span-3 p-4"></div>
    </div>
  );
}
