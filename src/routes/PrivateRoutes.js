import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import SigninAdmin from '../pages/SigninAdmin'
import Forum from '../pages/Forum';
import ForumAdd from '../pages/ForumAdd';
import AdminPanel from '../pages/AdminPanel';
import Mapa from '../pages/Mapa';
import FAQ from '../pages/FAQ';
import FaqAdd from '../pages/FAQAdd';
import Locais from '../pages/Locais';
import SigninEdit from '../pages/SigninEdit';
import LocaisEdit from '../pages/LocaisEdit';
import FaqEdit from '../pages/FAQEdit';
import ForumPost from '../pages/ForumPost';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import ForumEdit from '../pages/ForumEdit';
import ForumPostAdd from '../pages/ForumPostAdd';
import InterpreteAdd from '../pages/InterpreteAdd';
import InterpreteEdit from '../pages/InterpreteEdit';
import Impostos from '../pages/Impostos';
import Interprete from '../pages/Interprete';

function PrivateRoutes() {
  return (
    <div className="PrivateRoutes">
      <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/signin' Component={Signin} />
          <Route path='/useradd' Component={SigninAdmin} />
          <Route path='/signin/:idUser' Component={SigninEdit} />
          <Route path='/forum' Component={Forum} />
          <Route path='/forumadd' Component={ForumAdd} />
          <Route path='/postadd/:idForum' Component={ForumPostAdd} />
          <Route path='/forumedit/:idForum' Component={ForumEdit} />
          <Route path='/admin' Component={AdminPanel}/>
          <Route path='/faq' Component={FAQ} />
          <Route path='/faqadd' Component={FaqAdd} />
          <Route path='/faq/:idFaq' Component={FaqEdit} />
          <Route path='/mapa' Component={Mapa} />
          <Route path='/locais' Component={Locais} />
          <Route path='/locais/:idLocation' Component={LocaisEdit} />
          <Route path='/post/:idForum' Component={ForumPost} />
          <Route path='/interpreteadd' Component={InterpreteAdd} />
          <Route path='/interpreteedit/:idInterprete' Component={InterpreteEdit} />
          <Route path='/impostos' Component={Impostos} />
          <Route path='/interprete' Component={Interprete} />
        </Routes>
      </Router>
      </I18nextProvider>
    </div>
  );
}

export default PrivateRoutes;
