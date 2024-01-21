import request from 'supertest';
import StatusCode from 'status-code-enum';
import { getBaseUrl } from '../commons/config/config-utils';
import { Validator } from 'jsonschema';
import { createUpdatePETPayload, petStoreApiSchema, updatePetAPISchema } from './petstore-api-utils';

describe('User Call Logs Suite', () => {
	const autBaseUrl = getBaseUrl();
	const appRequest = request(autBaseUrl);
	let randomPetId: any;
	let updatePETPayload;
	const validator = new Validator();

	test('Make a call to GET API and get a list of all the available pets', async () => {
		const response = await appRequest.get(`pet/findByStatus`).set('Accept', 'application/json').query({
			status: 'available'
		});
		const validationResult = validator.validate(response.body, petStoreApiSchema);
		if (validationResult.errors.length > 0) {
			console.error('Response does not match the JSON schema:', validationResult.errors);
			throw validationResult.errors;
		}
		expect(response.statusCode, response.text).toBe(StatusCode.SuccessOK);
		const allPetIds = response.body.map((item: { id: any }) => item.id);
		randomPetId = allPetIds[Math.floor(Math.random() * allPetIds.length)];
		console.log(`Random PET ID ${randomPetId} saved successfully.`);
	});

	test('Pick a random Pet ID and update the details of the Pet using a PUT call.', async () => {
		console.log(`Picking up random PET ID = ${randomPetId} for update`);
		updatePETPayload = createUpdatePETPayload(randomPetId);
		const putResponse = await appRequest.put(`pet`).set('Content-Type', 'application/json').send(updatePETPayload);
		expect(putResponse.statusCode, putResponse.text).toBe(StatusCode.SuccessOK);
	});

	test('Use the same pet ID to GET the details of the pet using the pet ID.', async () => {
		console.log(`Picking up random PET ID = ${randomPetId} for update`);
		const getResponse = await appRequest.get(`pet/${randomPetId}`).set('Accept', 'application/json');
		expect(getResponse.statusCode, getResponse.text).toBe(StatusCode.SuccessOK);
		const validationResult = validator.validate(getResponse.body, updatePetAPISchema);
		if (validationResult.errors.length > 0) {
			console.error('Response does not match the JSON schema:', validationResult.errors);
			throw validationResult.errors;
		}
	});
});
