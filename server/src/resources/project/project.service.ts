import ProjectModel from './project.model'
import Project from './project.interface'


class ProjectService {
    private project = ProjectModel;

    public async createProject(
        project: Project,
    ): Promise<Project | null> {
        const newProject = await this.project.create(project);

        return newProject;
    }

    public async getProjects(): Promise<Array<Project> | null> {
        const projects = await this.project.find({});

        return projects;
    }

    public async updateProject(
        _id: string,
        project: Project,
    ): Promise<Project | null> {
        const updatedProject = await this.project.findByIdAndUpdate(_id, project);

        return updatedProject;
    }

    public async deleteProject(_id: string): Promise<Project | null> {
        const deletedProject = await this.project.findByIdAndRemove(_id);

        return deletedProject;
    }
}

export default ProjectService;