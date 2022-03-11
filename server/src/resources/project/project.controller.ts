import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import ProjectService from './project.service';
import { isValidId } from '../../utils/validate.utils';
import { sendEmail } from '../../utils/mailer/mailer'
import ProjectRoutes from './project.routes';

class ProjectController implements Controller {
    public router = Router();

    private ProjectService = new ProjectService();

    constructor() {
        this.initRoutes();
    }

    private initRoutes(): void {
        this.router = new ProjectRoutes().init(this);
    }

    public createProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const newProject = await this.ProjectService.createProject(req.body)

            res.status(200).json(newProject);
        } catch (error: any) {
            return next(new HttpException(500, error.message))
        }
    }
}

export default ProjectController;
