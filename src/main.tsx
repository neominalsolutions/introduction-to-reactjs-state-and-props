import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { UserComponent } from './components/user.component';
// import { App, MyButton } from './App.tsx';
// import App from './App'; // default ile export edilmiş

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* <App /> */}
		{/* <MyButton /> */}
		<UserComponent id={10} />
		{/* new UserService(10); */}
		{/* <UserComponent /> */}
	</StrictMode>
);
