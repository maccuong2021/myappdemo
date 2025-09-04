import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Resource } from "../entity/resource";

export class ResourceController {
  private repo = AppDataSource.getRepository(Resource);

  /**
   * @swagger
   * tags:
   *   name: Resources
   *   description: API for managing resources
   */
  public router(): Router {
    const router = Router();

    /**
     * @swagger
     * /resources:
     *   get:
     *     summary: Get all resources
     *     tags: [Resources]
     *     responses:
     *       200:
     *         description: List of resources
     */
    router.get("/", this.getAllResources.bind(this));

    /**
     * @swagger
     * /resources/{id}:
     *   get:
     *     summary: Get a resource by ID
     *     tags: [Resources]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Resource ID
     *     responses:
     *       200:
     *         description: Resource found
     *       404:
     *         description: Resource not found
     */
    router.get("/:id", this.getResourceById.bind(this));

    /**
     * @swagger
     * /resources:
     *   post:
     *     summary: Create a new resource
     *     tags: [Resources]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - type
     *             properties:
     *               name:
     *                 type: string
     *               type:
     *                 type: string
     *     responses:
     *       201:
     *         description: Resource created successfully
     */
    router.post("/", this.createResource.bind(this));

    /**
     * @swagger
     * /resources/{id}:
     *   put:
     *     summary: Update a resource by ID
     *     tags: [Resources]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Resource ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               type:
     *                 type: string
     *     responses:
     *       200:
     *         description: Resource updated
     *       404:
     *         description: Resource not found
     */
    router.put("/:id", this.updateResource.bind(this));

    /**
     * @swagger
     * /resources/{id}:
     *   delete:
     *     summary: Delete a resource by ID
     *     tags: [Resources]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: Resource ID
     *     responses:
     *       200:
     *         description: Resource deleted
     *       404:
     *         description: Resource not found
     */
    router.delete("/:id", this.deleteResource.bind(this));

    return router;
  }

  public async createResource(req: Request, res: Response) {
    try {
      const { name, type } = req.body;
      const item = this.repo.create({ name, type });
      await this.repo.save(item);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getAllResources(req: Request, res: Response) {
    const items = await this.repo.find();
    res.json(items);
  }


  public async getResourceById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.repo.findOneBy({ id });
    if (!item) return res.status(404).json({ message: "Resource Not found" });
    res.json(item);
  }

  public async updateResource(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.repo.findOneBy({ id });
    if (!item) return res.status(404).json({ message: "Resource Not found" });
    Object.assign(item, req.body);
    await this.repo.save(item);
    res.json(item);
  }

  public async deleteResource(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.repo.delete(id);
    res.json({ message: "Resource Deleted successfully" });
  }
}
