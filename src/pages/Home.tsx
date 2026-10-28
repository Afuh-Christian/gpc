import { IonContent, IonPage } from '@ionic/react';
import './Home.css';

const WEBSITE_URL = 'https://globalparcelcarrier.com';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <iframe
          src={WEBSITE_URL}
          title="GPC Website"
          className="webview-frame"
          allow="fullscreen"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
