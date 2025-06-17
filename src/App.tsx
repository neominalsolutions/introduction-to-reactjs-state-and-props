import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

// Function Component
// Not Component isimleri Reactda app formatlarda tanımlanamaz. Html element ile karışır. Dosya isimlerini büyük yapalım.
function App() {
	// state ile component içerisinde kullanıcı etikleşimleri sonucunda ekrana basılaca güncel model değerleri yönetilir.
	const [count, setCount] = useState(0); // 0 initial değer ile başlamış
	// const [state, setState] = useState({});
	// button click yapıldığında function callback yap
	const onCountIncrease = () => {
		setCount(count + 1);
		// count++;
		// setState({ id: 1 });
		// count = 10; virtual dom state nesnelerin değiştiğini anlamak için setState ifadesine ihtiyaç duyar.
		// setCount -> state güncellemek için kullanılan function.
	};

	// react da state değişimi olduğunda component tekrardan re-render edilir.

	console.log('...rendering');

	// render function
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				{/* {count} model binding */}
				<button onClick={onCountIncrease}>count is {count}</button>
				{/* eventin jsx dosyasına bind edilmesi event binding */}
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

// Not: Bu component içinden tek bir dosya çıkar bu sebeple default olarak App ismi ile export et.
export default App;

// export function MyButton() {
// 	return <>Button</>;
// }
