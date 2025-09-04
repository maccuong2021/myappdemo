// src/app/app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'detail/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      try {
        const filePath = join(process.cwd(), 'document-ids.json');
        const raw = await readFile(filePath, 'utf-8');
        const ids: string[] = JSON.parse(raw);
        return ids.map(id => ({ id }));
      } catch (error) {
        console.error('Error loading document IDs:', error);
        return [];
      }
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
