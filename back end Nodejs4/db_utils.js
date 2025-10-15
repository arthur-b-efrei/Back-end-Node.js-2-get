const { Client } = require('pg');
const DB_USER = process.env.dbuser || 'postgres';
const DB_PWD = process.env.dbpwd || 'root';

function getConnection(username, password, database) {
	return new Client({ host: 'localhost', database, user: username, password, port: 5432 });
}

function getUsers(callback) {
	const client = getConnection(DB_USER, DB_PWD, 'postgres');
	client.connect()
		.then(() => client.query('SELECT * FROM users'))
		.then((result) => callback(null, result.rows))
		.catch((error) => callback(error, null))
		.finally(() => client.end());
}

function insert_user(user, callback) {
	const client = getConnection(DB_USER, DB_PWD, 'postgres');
	const keys = Object.keys(user);
	if (keys.length === 0) return callback(new Error('user object is empty'), null);
	const columns = keys.map(k => `"${k}"`).join(', ');
	const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
	const values = keys.map(k => user[k]);
	const text = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *`;
	client.connect()
		.then(() => client.query(text, values))
		.then((result) => callback(null, result.rows[0]))
		.catch((error) => callback(error, null))
		.finally(() => client.end());
}

module.exports = {
	getConnection,
	getUsers,
	insert_user
};

if (require.main === module) {
	const testUser = {  email: 'test@gmail.com' };
	insert_user(testUser, (err, inserted) => {
		if (err) {
			console.error('Erreur insertion:', err.message);
			return;
		}
		console.log('Inséré:', inserted);
		getUsers((error, users) => {
			if (error) {
				console.error('Erreur lecture:', error.message);
			} else {
			}
		});
	});
}