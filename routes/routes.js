const faker = require('faker');

let appRouter = function (app) {
	app.get('/', (req, res) => {
	  res.status(200).send('Hello, world!');
	});

	app.get('/user', (req, res) => {
		let data = ({
			user: faker.internet.userName(),
			email: faker.internet.email()
		});
		res.status(200).send(data);
	})

	app.get("/users/:num", (req, res) => {
		let users = [];
		let num = req.params.num;

		if (isFinite(num) && num > 0) {
			for (i = 0; i <= num-1; i++) {
				users.push({
					user: faker.internet.userName(),
					email: faker.internet.email()
				});
			}

			res.status(200).send(users);
		} else 
			res.status(400).send({ message: 'invalid user' });
	})
}

module.exports = appRouter;