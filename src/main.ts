import './services/firebase/createFirebaseApp';
import './services/firebase/handleFirebaseEvents';
import './services/firebase/connectToFirebaseDB';
import App from './App.svelte';

const app = new App({
	target: document.body,
});

export default app;