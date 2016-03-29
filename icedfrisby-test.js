// start up fleet sim, vehicle gateway, dispatch service first
// use Walla Walla data

'use strict';

const frisby = require('icedfrisby');
const expect = require('chai').expect;
const joi = require('joi');
const URL = 'http://52.11.223.36:5000/'; //Dispatch API

executeTests()

function executeTests() {
	// get all vehicles
	frisby.create('Get all vehicles')
		.get(URL + 'vehicle/')
		.expectStatus(200)
		// TODO: Find a way to check how many vehicles are returned
		.toss();

	// get valid vehicle
	frisby.create('Get valid vehicle')
		.get(URL + 'vehicle/91')
		.expectStatus(200)
		.expectBodyContains('VT-VAN-8-SEAT')
		// need to explore using paths
		.expectContainsJSON({
			vehicles: [{type: 'VT-VAN-8-SEAT'}]
		})
		.toss();

	// check data types for vehicle
	frisby.create('Check data types')
		.get(URL + 'vehicle/91')
		.expectJSONTypes('vehicle', {
			mobileId: joi.number(),
			name: joi.string()
		})
		.toss();

	// log a driver on to a vehicle
	frisby.create('Log on a driver')
		.addHeader('content-type', 'application/json')
		.addHeader('content-type', 'charset=utf-8')
		.put(URL + '/vehicle/202/links/driver/310')
		.expectStatus(400) //should be 200
		.toss();

	// get invalid vehicle
	frisby.create('Get invalid vehicle')
		.get(URL + 'vehicle/92')
		.expectStatus(404)
		.toss();
}


