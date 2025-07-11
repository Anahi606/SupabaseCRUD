import './App.css';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Cargando...</div>;
  }

  if (!keycloak.authenticated) {
    keycloak.login();
    return null;
  }

  return (
    <main className="column">
      <h1>Bienvenido, {keycloak.tokenParsed?.preferred_username || 'usuario'}</h1>
      <button onClick={() => keycloak.logout()}>Cerrar sesión</button>
      {/* Aquí puedes renderizar el resto de tu app */}
    </main>
  );
}

export default App;
