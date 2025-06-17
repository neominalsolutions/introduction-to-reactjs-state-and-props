import { Component, type ReactNode } from 'react';

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
		this.addUser = this.addUser.bind(this); // private event EventHandler Changed; // Method artık bir vent üzerinden tetiklenebilir oluyor.
	}

	addUser() {
		const id = this.state.users.length + 1;
		const name = `user_${id}`; // $"{name}" backtick
		// her butona basıldığında user append eder.

		this.setState({ users: [...this.state.users, { id, name }] });
	}
	// component yüklendiğinde jsx element döndüreceğimiz method.
	render(): ReactNode {
		console.log('...rendering');
		return (
			<>
				{/* model binding */}
				<p>
					Kullanıcı Adeti {this.state.users.length}
					<br></br>
					<button onClick={this.addUser}>User Ekle</button>
				</p>
				{/* event binding işlemi yaptık */}
			</>
		);
	}
}
