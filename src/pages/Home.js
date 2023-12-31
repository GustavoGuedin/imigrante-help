import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Topbar from '../components/Topbar';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts/AuthContext';
import Footer from '../components/Footer';

function Home() {
  const { t } = useTranslation();
  const { auth } = useContext(AuthContext);

  return (
    <div className='Home'>
      <Topbar />
      <div style={{
        width: '100%',
        background: '#98aef3',
        padding: '64px 0 64px 0',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '90%',
          margin: '0 auto',
          textShadow: 'rgba(0,0,0,0.2) 0 2px 4px, rgba(0,0,0,0.2) 0 4px 8px',
        }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '4em' }}>{t('header.title')}</h1>
            <p style={{ color: '#fff', fontWeight: 'bold' }}>{t('header.subtitle')}</p>

          {(() => {
            if (auth){
              return ("")
            } else {
              return (
                <>
                  <Button
                    size='lg'
                    variant='outline-light'
                    href='/login'
                    style={{
                      fontWeight: 'bold',
                      border: '2px solid white',
                      margin: '12px 0 0 0',
                      boxShadow: 'rgba(0,0,0,0.2) 0 2px 4px, rgba(0,0,0,0.2) 0 4px 8px',
                    }}>{t('buttons.login')}</Button>
                  <Button
                    size='lg'
                    variant='outline-light'
                    href='/signin'
                    style={{
                      margin: '12px 0 0 12px',
                      fontWeight: 'bold',
                      border: '2px solid white',
                      boxShadow: 'rgba(0,0,0,0.2) 0 2px 4px, rgba(0,0,0,0.2) 0 4px 8px',
                    }}>{t('buttons.signup')}</Button>
                </>
                  )
              }
            })()}
          </div>

          <img src='/imagem 1.webp' width='600px' alt='' />
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        margin: '0 auto',
      }}>
        <img src='/imagem 2.webp' width='500px' alt='' />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '90%',
          margin: '0 auto',
          textAlign: 'end'
        }}>
          <div>
            <h1 style={{ color: '#575757', fontSize: '3.5em' }}>{t('header.mapTitle')}</h1>
            <p style={{ color: '#575757', fontWeight: 'bold' }}>{t('header.mapSubtitle')}</p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '90%',
          margin: '0 auto',
        }}>
          <div>
            <h1 style={{ color: '#575757', fontSize: '3.5em' }}>{t('header.faqTitle')}</h1>
            <p style={{ color: '#575757', fontWeight: 'bold' }}>{t('header.faqSubtitle')}</p>
          </div>
        </div>
        <img src='/imagem 3.svg' width='550px' alt='' />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '90%',
        margin: '0 auto',
      }}>
        <img src='/imagem 4.svg' width='500px' alt='' />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '90%',
          margin: '0 auto',
          textAlign: 'end'
        }}>
          <div>
            <h1 style={{ color: '#575757', fontSize: '3.5em' }}>{t('header.forumTitle')}</h1>
            <p style={{ color: '#575757', fontWeight: 'bold' }}>{t('header.forumSubtitle')}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;