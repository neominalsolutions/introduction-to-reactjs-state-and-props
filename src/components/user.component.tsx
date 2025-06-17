/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, type ReactNode } from 'react';
import './user.component.css';
// class import ederken from kullanmıyoruz.
// Not: Class Componentler Component extend olduğu için dışarıdan props tipinde bir değer bekler.
// Apiden gelen verilerimizi Interface olarak tanımlıyoruz.
interface User {
	id: number;
	name: string;
}
// component içerisinde users dizine butona basıldığında user bilgileri doduracağımız state
type State = {
	// ViewModel -> ViewModel birden fazla interface tipinden meydana gelebilir.
	users: User[];
};
type Props = { id?: number }; // ? optional value
export class UserComponent extends Component<Props, State> {
	constructor(props: Props) {
		super(props);

		//İlk initial değeri state verirken this.state değer set edebiliriz. ama bundan sonraki state set etme işlemlerini setState ile tanımlamak zorundayız.
		this.state = { users: [] };
		//this.addUser = this.addUser.bind(this); // private event EventHandler Changed; // Method artık bir vent üzerinden tetiklenebilir oluyor.
	}

	//re-rendering
	loadData = async () => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users');
		const data: User[] = await response.json();
		console.log('data', data);
		this.setState({ users: [...data] });
	};

	// her bir component için sadece 1 kez tetiklenir.
	componentDidMount(): void {
		console.log('component doma ilk girdiğinde tetiklenir');
		// async veri çekme işlemlerini burada başlatırız
		this.loadData();

		// 2. yöntem
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		this.setState({ users: [...data] });
		// 	});
	}
	// component içerisinde bir state yada props değişikliğinde tatiklenir.
	// component içinde bir durum değişikliği varsa bunu yakalamak için kullanırız
	componentDidUpdate(
		prevProps: Readonly<Props>,
		prevState: Readonly<State>,
		snapshot?: any
	): void {
		console.log('prevProps', prevProps);
		console.log('prevState', prevState);
		console.log('snapshot', snapshot);
		console.log('state-changed');
	}
	componentWillUnmount(): void {
		console.log('compoent domdan ayrıldığında çalışır');
		// componentDidMount -> ile başlatılan DOM, Request, Web Socket gibi, Interval, TimingAPı gibi işlemlerin temizlendiği kısım.
	}
	shouldComponentUpdate(
		nextProps: Readonly<Props>,
		nextState: Readonly<State>,
		nextContext: any // session state benzetebiliriz. componentler arası global state paylaşımı konusu.
	): boolean {
		console.log('shouldComponentUpdate', nextProps, nextState, nextContext);
		// eğer yapılan arayüz değişikliği sonucunda componentin berlirli bir koşula göre render alamsını sağlamak için kullanabiliriz. false dersek render gerçekleşmez.
		// users sayısı 10 ulaşılınca artık render alma.
		return true;
		//return this.state.users.length >= 10 ? false : true;
	}

	// addUser() {
	// 	const id = this.state.users.length + 1;
	// 	const name = `user_${id}`; // $"{name}" backtick
	// 	// her butona basıldığında user append eder.

	// 	this.setState({ users: [...this.state.users, { id, name }] });
	// }

	// eğer methodları arrow function formatında yazarsak direk olarak method bir event tetikleyici haline gelir.  () => callback function formatı
	addUser = () => {
		const id = this.state.users.length + 1;
		const name = `user_${id}`; // $"{name}" backtick
		const newState = { users: [...this.state.users, { id, name }] };

		this.setState(newState, () => {
			// state değişimde tetiklenen callback function
			console.log('this.state callback', this.state);
		});

		console.log('güncel state', this.state);
	};

	// Not: statelerin değişimi react async olarak çalışır.

	// component yüklendiğinde jsx element döndüreceğimiz method.

	sx: React.CSSProperties = {
		padding: 5,
		margin: 5,
		borderRadius: 5,
		border: '1px solid gray',
	};

	render(): ReactNode {
		console.log('...rendering');
		return (
			<>
				<p>
					Kullanıcı Adeti {this.state.users.length} {/* model binding */}
					<br></br>
					{/* <button onClick={this.addUser}>User Ekle</button> */}
					<button onClick={this.addUser}>User Ekle</button>
				</p>
				<hr></hr>
				{/* dinamik veriler ile arayüzde içerik üretmek için kullandık  */}
				{this.state.users.map((item: User, index: number) => {
					return (
						<div style={this.sx} key={item.id}>
							<div className="item">
								{' '}
								<span>{index}</span> - {item.name}
							</div>
						</div>
					);
				})}

				{/* event binding işlemi yaptık */}
			</>
		);
	}
}
