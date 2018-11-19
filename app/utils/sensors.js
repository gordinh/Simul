const _ = require('lodash');

const SENSOR_MAP = [
	{
		sensor_id: 1,
		name: 'hurricane',
		type: 'wind'
	}, 
	{
		sensor_id: 2,
		name: 'earthquake',
		type: 'geological'
	},
	{
		sensor_id: 3,
		name: 'fire',
		type: 'temperature'
	},
	{
		sensor_id: 4,
		name: 'gas_leakage',
		type: 'gas'
	},
	{
		sensor_id: 5,
		name: 'noise_pollution',
		type: 'sound'
	}
];

module.export = {
	createSensor: function (name, position, radius) {
		let sensor = {};
		sensor.name = _.map(SENSOR_MAP, (value) => {
			if (value.name == name) return value;
		});
		sensor.name = name;
		sensor.position = position;
		sensor.radius = radius;

		return sensor;
}
};