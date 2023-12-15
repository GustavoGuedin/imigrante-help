import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Forum from '../pages/Forum';
import FAQ from '../pages/FAQ';
import ForumPost from '../pages/ForumPost';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Impostos from '../pages/Impostos';
import Interprete from '../pages/Interprete';

function PublicRoutes() {
  return (
    <div className="PublicRoutes">
      <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/signin' Component={Signin} />
          <Route path='/forum' Component={Forum} />
          <Route path='/faq' Component={FAQ} />
          <Route path='/post/:idForum' Component={ForumPost} />
          <Route path='/impostos' Component={Impostos} />
          <Route path='/interprete' Component={Interprete} />
        </Routes>
      </Router>
      </I18nextProvider>
    </div>
  );
}

export default PublicRoutes;
