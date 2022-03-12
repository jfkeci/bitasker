import { authAdmin } from "../../middleware/authenticated.middleware";
import validation from "../../middleware/validation.middleware";
import { Router } from "express";
import ProjectController from "./project.controller";
import validate from './project.validation'

class ProjectRoutes {
    private router = Router();
    private path = '/projects';

    public init(controller: ProjectController): Router {

        this.router.post(
            `${this.path}`,
            validation(validate.create),
            controller.createProject
        )

        this.router.patch(
            `${this.path}/:id`,
            validation(validate.create),
            controller.updateProject
        )

        this.router.delete(
            `${this.path}/:id`,
            controller.deleteProject
        )

        this.router.get(
            `${this.path}`,
            controller.getProjects
        )

        return this.router
    }

}

export default ProjectRoutes;