import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Forum from '../pages/Forum';
import AdminPanel from '../pages/AdminPanel';
import Mapa from '../pages/Mapa';
import FAQ from '../pages/FAQ';
import Locais from '../pages/Locais';
import Rotas from '../pages/Rotas';
import SigninEdit from '../pages/SigninEdit';
import LocaisEdit from '../pages/LocaisEdit';
import FaqEdit from '../pages/FAQEdit';
import ForumPost from '../pages/ForumPost';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

function PrivateRoutes() {
  return (
    <div className="PrivateRoutes">
      <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/signin' Component={Signin} />
          <Route path='/signin' Component={Signin} />
          <Route path='/signin/:idUser' Component={SigninEdit} />
          <Route path='/forum' Component={Forum} />
          <Route path='/admin' Component={AdminPanel}/>
          <Route path='/faq' Component={FAQ} />
          <Route path='/faq/:idFaq' Component={FaqEdit} />
          <Route path='/mapa' Component={Mapa} />
          <Route path='/locais' Component={Locais} />
          <Route path='/locais/:idLocation' Component={LocaisEdit} />
          <Route path='/rotas' Component={Rotas} />
          <Route path='/post/:idForum' Component={ForumPost} />
        </Routes>
      </Router>
      </I18nextProvider>
    </div>
  );
}

export default PrivateRoutes;
