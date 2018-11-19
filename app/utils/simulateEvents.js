// Hurricane, Earthquake, fire, Gas Leakage, Noise Pollution

const sensors = require('./sensors.js');
const _ = require('lodash');
let sensorCollection = [];
let eventCollection = [];

const EVENTS_MAP = [
	{
		event_id: 1,
		name: 'hurricane',
		type: 'wind'
	}, 
	{
		event_id: 2,
		name: 'earthquake',
		type: 'geological'
	},
	{
		event_id: 3,
		name: 'fire',
		type: 'temperature'
	},
	{
		event_id: 4,
		name: 'gas_leakage',
		type: 'gas'
	},
	{
		event_id: 5,
		name: 'noise_pollution',
		type: 'sound'
	}
];




function setEvent(e) {
	let event = _.map(EVENTS_MAP, (value) => {
		if (value.name == e.name) return value;
	});

	event.position = e.position;
	this.eventCollection.push(event);
}

function setSensor(s) {
	this.sensorCollection.push(sensors.createSensors(s.name, s.position, s.radius));	
}

function triggerSensor(){
	let triggered = {};
	_.map(this.eventCollection, event => {
		if (event.event_id == 1) {
			if (event.rawData.max() >= 33 && event.rawData.max() <= 42) triggered.category = 1;
			else if (event.rawData.max() >= 43 && event.rawData.max() <= 49) triggered.category = 2;
			else if (event.rawData.max() >= 50 && event.rawData.max() <= 58) triggered.category = 3;
			else if (event.rawData.max() >= 58 && event.rawData.max() <= 70) triggered.category = 4;
			else if (event.rawData.max() >= 70) triggered.category = 5;
			else {
				_.remove(eventCollection, element => {
					return element == event;
				});
			}
			triggered.eventId = event.event_id;
			triggered.sensor = _.filter(this.sensorCollection, sensor => {
				return sensor.sensor_id == 1;
			});
		} else if (event.event_id == 2) {
			if (event.rawData.max() < 1) {
				_.remove(eventCollection, element => {
					return element == event;
				});
			} else if (event.rawData.max() >= 1 && event.rawData.max() <= 1.9) triggered.category = 'micro';
			else if (event.rawData.max() >= 2 && event.rawData.max() <= 3.9) triggered.category = 'minor';
			else if (event.rawData.max() >= 4 && event.rawData.max() <= 4.9) triggered.category = 'light';
			else if (event.rawData.max() >= 5 && event.rawData.max() <= 5.9) triggered.category = 'moderate';
			else if (event.rawData.max() >= 6 && event.rawData.max() <= 6.9) triggered.category = 'strong';
			else if (event.rawData.max() >= 7 && event.rawData.max() <= 7.9) triggered.category = 'major';
			else if (event.rawData.max() >= 8) triggered.category = 'great';
			triggered.eventId = event.event_id;
			triggered.sensor = _.filter(this.sensorCollection, sensor => {
				return sensor.sensor_id == 1;
			});
		} else if (event.event_id == 3) {
			triggered.eventId = event.event_id;
			triggered.sensor = _.filter(this.sensorCollection, sensor => {
				return sensor.sensor_id == 1;
			});			
		} else if (event.event_id == 4) {
			triggered.eventId = event.event_id;
			triggered.sensor = _.filter(this.sensorCollection, sensor => {
				return sensor.sensor_id == 1;
			});
		} else if (event.event_id == 5) {
			triggered.eventId = event.event_id;
			triggered.sensor = _.filter(this.sensorCollection, sensor => {
				return sensor.sensor_id == 1;
			});
		}
	});
	return triggered;
}


module.exports = {
	setEvent: setEvent,
	setSensor: setSensor,
	triggerSensor: triggerSensor
}