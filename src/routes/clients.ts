import { Router } from 'express';
import { clientController } from '../controllers/clients';

const clientRouter = Router();
clientRouter.get('/', clientController.listclients);
clientRouter.get('/:id', clientController.getclient);
clientRouter.post('/', clientController.insertClient);
clientRouter.put('/:id', clientController.updateclient);
clientRouter.delete('/:id', clientController.deleteclient);

export { 
    clientRouter,
}