import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',         // <TU_DOMINIO_KEYCLOAK>
  realm: 'proyecto-integrador',         // <TU_REALM>
  clientId: 'frontend-app',             // <TU_CLIENT_ID>
});

export default keycloak; 