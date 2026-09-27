/*import { describe, it, expect } from 'vitest';
import { Entity, Repository, Linking, UnitOfWork } from '../src/index.js';

// Concrete implementations for testing
class User extends Entity<string> {
  constructor(id: string, public name: string) {
    super(id);
  }
}

class Project extends Entity<number> {
  constructor(id: number, public title: string) {
    super(id);
  }
}

class UserRepository extends Repository<User, string> {
  private storage = new Map<string, User>();

  async create(entity: User): Promise<User> {
    this.storage.set(entity.id, entity);
    return entity;
  }

  async get(id: string): Promise<User | null> {
    return this.storage.get(id) || null;
  }

  async update(entity: User): Promise<User> {
    this.storage.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<boolean> {
    return this.storage.delete(id);
  }

  async list(): Promise<User[]> {
    return Array.from(this.storage.values());
  }
}

describe('HydraTS Core', () => {
  it('Entity should store id', () => {
    const user = new User('u1', 'Alice');
    expect(user.id).toBe('u1');
    expect(user.name).toBe('Alice');
  });

  it('Linking should link two entities', () => {
    const user = new User('u1', 'Alice');
    const project = new Project(1, 'HydraTS');
    const link = new Linking(user, project);
    expect(link.entity1).toBe(user);
    expect(link.entity2).toBe(project);
  });

  it('Repository should perform CRUD operations', async () => {
    const repo = new UserRepository();
    const user = new User('u1', 'Alice');
    
    await repo.create(user);
    const fetched = await repo.get('u1');
    expect(fetched).toEqual(user);
    
    user.name = 'Alice Smith';
    await repo.update(user);
    expect((await repo.get('u1'))?.name).toBe('Alice Smith');
    
    await repo.delete('u1');
    expect(await repo.get('u1')).toBeNull();
  });

  it('UnitOfWork should have callable methods', async () => {
    const uow = new UnitOfWork();
    await expect(uow.done()).resolves.not.toThrow();
    await expect(uow.rollback()).resolves.not.toThrow();
  });
});
*/