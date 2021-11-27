import { dbQuery, dbQueryFirst } from "../services/db"

export type Client = {
    id: number;
    cnpj:string,
    loan_amount: number,
    revenues: number,
    company_address:string,
    requester_name:string,
    requester_cpf:string,
    requester_phone:number,
    requester_email:string,
}

const insertClient = async (client: Client) => {
    console.log('entrou aqui!!')
    await dbQuery(`INSERT INTO client (id,cnpj,loan_amount,revenues,company_address,requester_name,requester_cpf,requester_phone,requester_email) VALUES( ?, ?,?, ?,?, ?,?, ?,?)`, [
      client.id,
      client.cnpj,
      client.loan_amount,
      client.revenues,
      client.company_address, 
      client.requester_name,
      client.requester_cpf,
      client.requester_phone,
      client.requester_email])

    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = client`);
    
    return getClient(retorno[0].Id);
}

const updateClient = async (client: Client) => {
    await dbQuery(`UPDATE client SET name = ?, revenues = ? WHERE id = ?`, [
      client.id,
      client.cnpj,
      client.loan_amount,
      client.revenues,
      client.company_address, 
      client.requester_name,
      client.requester_cpf,
      client.requester_phone,
      client.requester_email, ])
    return getClient(client.id);
}

const listClients = async () => {
    const retorno = await dbQuery(`SELECT * FROM client`);
    return retorno as Client[];
}

const getClient = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM client WHERE id = ?`, [id]);
    return retorno as Client | undefined;
}

const deleteClient = async (id: number) => {
    await dbQueryFirst(`DELETE FROM client WHERE id = ?`, [id]);
}

export const clientModel = {
    insertClient,
    listClients,
    getClient,
    deleteClient,
    updateClient
}