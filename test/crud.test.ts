import request from 'supertest'
import server from '../src/api/server'
import app from "../src/api/app";
import {saveGenially} from "../src/api/controllers/crud"
const payloadOK = {
    name: "Genially name",
    description: "This is a description"
}
const payloadKO = {
    name: "",
    description: "This is a description"
}
let mongoIdExist = '';

describe('Create a new Genially', () => {
    let agent: request.SuperTest<request.Test>;    
    beforeAll(() => {
		agent = request.agent(app);
	});

    it('Create a new Genially OK', async () => {
        const res = await agent.post('/').send(payloadOK);
        expect(res.status).toEqual(201);
    });

    it('Create a new Genially KO', async () => {
        const res = await agent.post('/').send(payloadKO);
        expect(res.status).toEqual(500);
    });
});

describe('Get Geniallies', () => {
    let agent: request.SuperTest<request.Test>; 
    beforeAll(() => {
		agent = request.agent(app);
	});
    it('Get all geniallies', async () => {
        const res = await agent.get('/').send();
        mongoIdExist = res.body.geniallies.length ? res.body.geniallies[0]._id : '123456';
        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('geniallies');
    });
});

describe('Update Genially', () => {
    let agent: request.SuperTest<request.Test>; 
    beforeAll(() => {
		agent = request.agent(app);
	});
    it('Update Genially OK', async () => {
        const res = await agent.put('/' + mongoIdExist).send(payloadOK);
        expect(res.status).toEqual(201);
    });
    it('Update Genially KO', async () => {
        const res = await agent.put('/63e534baba21d453b38d6e').send(payloadKO);
        expect(res.status).toEqual(400);
    });
});

describe('Delete Genially', () => {
    let agent: request.SuperTest<request.Test>; 
    beforeAll(() => {
		agent = request.agent(app);
	});
    it('Delete Genially OK', async () => {
        const res = await agent.delete('/' + mongoIdExist).send(payloadOK);
        expect(res.status).toEqual(201);
    });
    it('Delete Genially KO', async () => {
        const res = await agent.delete('/63e534baba21d453b38d6e').send(payloadKO);
        expect(res.status).toEqual(400);
    });
});