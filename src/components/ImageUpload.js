import React, { useEffect } from "react";
import { db, storage } from '../firebase';

function ImageUpload() {
	const [fileUrl, setFileUrl] = React.useState(null);
	const [users, setUsers] = React.useState([]);

	const onFileChange = async (e) => {
		const file = e.target.files[0];
		const storageRef = storage.ref();
		const fileRef = storageRef.child(file.name);
		await fileRef.put(file);
		setFileUrl(await fileRef.getDownloadURL());
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		if (!username || !fileUrl) {
			return;
		}
		await db.collection("images").doc(username).set({
			name: username,
			image: fileUrl,
		});
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const usersCollection = await db.collection("images").get();
			setUsers(
				usersCollection.docs.map((doc) => {
					return doc.data();
				})
			);
		};
		fetchUsers();
	}, []);

	return (
		<>
			<div className="container">
				<form onSubmit={onSubmit}>
					<input type="file" onChange={onFileChange} />
					<input type="text" name="username" placeholder="NAME" />
					<button>Submit</button>
				</form>
				<ul>
					{users.map((user) => {
						return (
							<li key={user.name}>
								<img width="100" height="100" src={user.image} alt={user.name} />
								<p>{user.name}</p>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}

export default ImageUpload;