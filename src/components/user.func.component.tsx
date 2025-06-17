import { useEffect, useState } from 'react';

// Componente ait Propslar export edilen bir tip değildir. Component export edilir. Propslara component üzerinden zaten erişebiliriz
// { id }: Props -> Object Deconstruction işlemi

type Props = { id?: number };
interface User {
	id: number;
	email: string;
}
type State = {
	users: User[];
};

function UserFunctionComponent({ id }: Props) {
	console.log('id-props', id);
	const [state, setState] = useState<State>({ users: [] }); //constructor -> this.state = {users:[]}

	// component doma girdiği ve domadan çıktığını anı yakalamamızı sağlayan bir hook. Aynı zamanda api gibi scoket gibi external kaynaklar ile componenti bağlamak içinde kullanırız.
	// componentDidMount,componentDidUpdate, componentWillUnmount hepsini destekler.

	const loadData = async () => {
		const data = await (
			await fetch('https://jsonplaceholder.typicode.com/users')
		).json();
		setState({ users: data });
	};

	// component will unmount
	const cleanup = () => {
		console.log('component willunmount, component domdan çıkarken tetiklenir');
		//component içindeki external kaynakları temizleme işlemleri burada yaparız.
	};

	// componentDidMount []
	useEffect(() => {
		// asenkron load işlemlerini burada gerçekleştiririz.
		console.log(
			'[] ile tanımlanırsa componentDidMount gibi davranır, [state] varsa ilk açılışta componentDidMount state değişiminde componentDidUpdate gibi davranır.'
		);
		loadData();

		return cleanup; // Optional eğer component için cleap işi yoksa gerek yok
		
	}, []); // [] empty dependecy ile sayfa açılışında 1 kereye mahsus tetiklenir. [state1,state2,state3] -> bu kısım ile de state takibi yapıyoruz. [] sadece component doma girdiği ilk anda çalışıyor.

	// Not: Bir component içerisinde birden fazla useEffect varsa bu durumda hepsi ilk component doma girdiğinde tetiklenir.

	// componentDidUpdate
	useEffect(() => {
		// state ilk initial değeri atandıysa logic çalıştır.
		if (state.users.length > 0) {
			// logic burada uygulansın.
			console.log('user State değişti');
		}
	}, [state.users]); // eğer component içerisinde setState yapılırsa bu kod bloğu tetiklenir

	// [users,numbers] -> numbers veya users state'den birisi değişirse yine tetiklenir.

	const addUser = () => {
		// state undefined değilse
		const id = state.users.length + 1;
		const email = `user_${id}@test.com`;

		const newUserState = { users: [...state.users, { id, email }] };
		setState(newUserState);

		// Not: function componentlerde setState yapısında değişen state'i callback edecek bir yapı yok
	};

	return (
		<>
			<p>Kullanıcı Sayısı: {state?.users.length}</p>
			<button onClick={addUser}>Add User</button>
			<hr></hr>
		</>
	);
}

export default UserFunctionComponent;

// Function Component ve Props 2.yazım şekli
export const UserFunctionComponentV2 = (props: Props) => {
	console.log('props', props);
	return <></>;
};
