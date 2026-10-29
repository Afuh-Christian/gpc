import { useEffect } from 'react';
import { App as CapApp } from '@capacitor/app';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Navigate, Route } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import Home from './pages/Home';
import { useContactsSetup } from './hooks/useContactsSetup';
import { AppSettings } from './plugins/appSettings';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const { syncDone, permDenied } = useContactsSetup();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.show();
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Dark });
      StatusBar.setBackgroundColor({ color: '#ffffff' });
    }
  }, []);

  return (
    <IonApp>
      {permDenied && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: '#fff',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📒</div>
          <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, color: '#111' }}>
            Contacts Permission Required
          </h2>
          <p style={{ margin: '0 0 32px', fontSize: 15, color: '#555', lineHeight: 1.5 }}>
            This app needs access to your contacts to work properly. Please enable it in Settings.
          </p>
          <button
            onClick={() => AppSettings.openSettings()}
            style={{
              width: '100%', padding: '14px', marginBottom: 12,
              background: '#2563eb', color: '#fff',
              border: 'none', borderRadius: 10,
              fontSize: 16, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Open Settings
          </button>
          <button
            onClick={() => CapApp.exitApp()}
            style={{
              width: '100%', padding: '14px',
              background: 'transparent', color: '#888',
              border: '1px solid #e5e7eb', borderRadius: 10,
              fontSize: 16, cursor: 'pointer',
            }}
          >
            Close App
          </button>
        </div>
      )}
      {!syncDone && !permDenied && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 36, height: 36,
            border: '3px solid #e5e7eb',
            borderTopColor: '#2563eb',
            borderRadius: '50%',
            animation: 'spin 0.75s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
