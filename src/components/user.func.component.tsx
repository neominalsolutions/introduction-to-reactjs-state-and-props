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
	useEffect(() => {
		// asenkron load işlemlerini burada gerçekleştiririz.

		console.log('componentDidMount gibi davranır');

		// 1. yöntem
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setState({ users: data });
			});
	}, []); // [] empty dependecy ile sayfa açılışında 1 kereye mahsus tetiklenir. [state1,state2,state3] -> bu kısım ile de state takibi yapıyoruz. [] sadece component doma girdiği ilk anda çalışıyor.

	const addUser = () => {
		const id = state.users.length + 1;
		const email = `user_${id}@test.com`;
		const newUserState = { users: [...state.users, { id, email }] };
		setState(newUserState); // Not: function componentlerde setState yapısında değişen state'i callback edecek bir yapı yok
	};

	return (
		<>
			<p>Kullanıcı Sayısı: {state.users.length}</p>
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
