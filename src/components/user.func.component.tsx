import { useState } from 'react';

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
