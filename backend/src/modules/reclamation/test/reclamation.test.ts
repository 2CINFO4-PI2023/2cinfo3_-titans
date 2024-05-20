import request from 'supertest';
import { ReclamationRouter } from '../router/reclamation.router'; 
import { ReclamationController } from '../controller/reclamation.controller'; 
import { Reclamation } from '../model/reclamation.schema';
import { expect } from 'chai';
import { ReclamationService } from '../service/reclamation.service';
import { ReclamationRepository } from '../repository/reclamation.repository';

describe('ReclamationRouter', () => {
  let router: ReclamationRouter;

  const reclamationRepository = new ReclamationRepository();
  const reclamationService = new ReclamationService(reclamationRepository);
  const controller = new ReclamationController(reclamationService);
  router = new ReclamationRouter(controller);

  it('should create a new reclamation', async () => {
    const response = await request(router.reclamationRoutes)
      .post('/')
      .send({
        user: 'user_id',
        statut: 'statut_id',
        numero: '123',
        type: 'complaint',
        description: 'Test complaint',
        date_creation: new Date()
      });

    expect(response.status).toBe(200);
  });

  it('should get a reclamation by ID', async () => {
    const response = await request(router.reclamationRoutes)
      .get('/123'); 

    expect(response.status).toBe(200);
    
  });

  it('should update a reclamation', async () => {
    const response = await request(router.reclamationRoutes)
      .put('/123')
      // add valid reclamation data
      .send(new Reclamation(1, 1, '123', 'complaint', 'Test complaint', new Date()));

    expect(response.status).toBe(200);
   
  });
  it('should delete a reclamation by ID', async () => {
    const response = await request(router.reclamationRoutes)
      .delete('/123'); 
    expect(response.status).to.equal(200);
  });

  it('should update reclamation status', async () => {
    const response = await request(router.reclamationRoutes)
      .post('/123/statusId') 
      .send();

    expect(response.status).to.equal(200);
   
  });

  it('should fetch reclamations grouped by status', async () => {
    const response = await request(router.reclamationRoutes)
      .get('/recGroupBy');

    expect(response.status).toBe(200);
   
  });

});
function expect(status: any) {
  throw new Error('Function not implemented.');
}

