import { useTranslation } from "react-i18next";
import Topbar from "../components/Topbar";

function Impostos() {
    const { t } = useTranslation();

    return(
        <>
        <Topbar />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '90%',
            margin: '0 auto',
        }}>
        <img src='/imagem 5.webp' width='500px' alt='' />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '90%',
            margin: '0 auto',
            textAlign: 'end'
        }}>
            <div>
                <h1 style={{ color: '#575757', fontSize: '3.5em' }}>{t('header.taxTitle')}</h1>
                <p style={{ color: '#575757', fontWeight: 'bold' }}>{t('header.taxSubtitle')}</p>
            </div>
        </div>
        </div>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '90%',
            margin: '0 auto',
            textAlign: 'center'
        }}>
            <div>
                <h1 style={{ color: '#575757', fontSize: '3.5em' }}>{t('header.financeTitle')}</h1>
                <p style={{ color: '#575757', fontWeight: 'bold' }}>{t('header.financeSubtitle')}</p>
            </div>
        </div>
        </>
    )
}

export default Impostos