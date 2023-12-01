const { default: Topbar } = require("../components/Topbar");

function Mapa() {
    return (
        <div className="Mapa">
        <Topbar />
            <div className="MapaContainer" style={{ 
                maxWidth: '100%', 
                height: '91.2vh' 
            }}>
            <iframe 
                src="https://www.google.com/maps/d/u/0/embed?mid=1ob60tg_H6rAKrvTrDVjm7H-Sc886DM0&ehbc=2E312F"
                width="100%"
                height="100%"
            >
            </iframe>
            </div>
        </div>
    );
}

export default Mapa;
