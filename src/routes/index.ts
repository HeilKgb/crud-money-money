import { Application } from "express";
import Router from 'express';
import { clientRouter } from "./clients";

export const useRoutes = (app: Application) => {
    const apiRouter = Router();
    apiRouter.use('/clients', clientRouter);

    app.use('/api/v1', apiRouter);
}
