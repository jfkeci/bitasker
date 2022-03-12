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

    public getProjects = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const projects = await this.ProjectService.getProjects();

            if (!projects) return next(new HttpException(404, 'No projects found'))

            return res.status(200).json(projects);
        } catch (error: any) {
            return next(new HttpException(500, error.message))
        }
    }

    public updateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            let id = req.params.id;
            const project = req.body;

            const updatedProject = await this.ProjectService.updateProject(id, project);
            return res.status(200).json(updatedProject);
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    }

    public addTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            return res.sendStatus(204);
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    }

    public deleteProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const id = req.params.id;

            if (!isValidId(id)) return next(
                new HttpException(404, 'Invalid id')
            );

            const project = await this.ProjectService.deleteProject(id);

            if (!project) return next(
                new HttpException(400, 'Something went wrong')
            )

            return res.sendStatus(204);
        } catch (error: any) {
            return next(new HttpException(500, error.message));
        }
    }
}

export default ProjectController;
