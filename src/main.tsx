import { createRoot } from 'react-dom/client';
import { UserComponent } from './components/user.component';
import './index.css';
import { useState } from 'react';
// import { App, MyButton } from './App.tsx';
// import App from './App'; // default ile export edilmiş

// Not: Boş importları kaldırmak için Alt + Shift + O kullanırız.
// <Strict /> Component yazarken yazım hatalarını ve componentlerin çalışma zamanında hatalarını kontrol eden bir component.

const Home = () => {
	const [visible, setVisible] = useState(true); //  visible true

	const buttonComponent = (
		<button onClick={() => setVisible(!visible)}>Hide/Show</button>
	);

	if (visible) {
		// ilk açılışta görünür
		return (
			<p>
				<UserComponent id={10} />
				{buttonComponent}
			</p>
		);
	} else {
		return (
			<>
				Component Domdan çıktı
				{buttonComponent}
			</>
		);
	}
};

createRoot(document.getElementById('root')!).render(
	<>
		<Home />
		{/* <App /> */}
		{/* <MyButton /> */}
		{/* <UserComponent id={10} /> */}
		{/* new UserService(10); */}
		{/* <UserComponent /> */}
	</>
);
