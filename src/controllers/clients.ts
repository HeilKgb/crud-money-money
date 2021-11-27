import { Request, Response } from 'express';
import { badRequest, internalServerError, validateNumber, notFound, ok, validateCPF, validateEmail, validateCNPJ } from '../services/util';
import { Client, clientModel } from '../models/clients';

const insertClient = (req: Request, res: Response) => {
    {
        const Client = req.body;
        if (!Client)
            return badRequest(res, "Cliente inválido");
        if (!validateCPF(Client.cpf))
            return badRequest(res, 'Informe um CPF válido');
        if (!validateCNPJ(Client.cnpj))
        return badRequest(res, 'Informe um CNPJ válido');
        if(!validateEmail(Client.email))
        return badRequest(res, 'Informe o email válido');
    }

    const Client = req.body as Client;
    return clientModel.insertClient(Client)
        .then(client => {
            res.json(client);
        })
        .catch(err => internalServerError(res, err));
}


const updateclient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const client = req.body;
        if (!client)
            return badRequest(res, "Cliente inválido");

        const clientSaved = await clientModel.getClient(id);
        if(!clientSaved)
            return notFound(res);
    }

    const client = req.body as Client;
    return clientModel.updateClient(client)
        .then(client => {
            res.json(client)
        })
        .catch(err => internalServerError(res, err));
}


const listclients = ({}: Request, res: Response) => {
    clientModel.listClients()
        .then(clients => {
            res.json(clients)
        })
        .catch(err => internalServerError(res, err));
}

const getclient = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return clientModel.getClient(id)
        .then((client) => {
            if(client)
                return res.json(client);
            else
                return notFound(res);
        })
        .catch(err => internalServerError(res, err));
}

const deleteclient = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const clientSaved = await clientModel.getClient(id);
        if(!clientSaved)
            return notFound(res);
    }

    return clientModel.deleteClient(id)
        .then(() => ok(res))
        .catch(err => internalServerError(res, err));
}

export const clientController = {
    insertClient,
    listclients,
    getclient,
    deleteclient,
    updateclient
}
