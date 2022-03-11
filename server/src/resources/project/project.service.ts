import ProjectModel from './project.model'
import Project from './project.interface'


class ProjectService {
    private project = ProjectModel;

    public async createProject(
        project: Project,
    ): Promise<Project | undefined> {
        const newProject = await this.project.create(project);

        return newProject;
    }
}

export default ProjectService;