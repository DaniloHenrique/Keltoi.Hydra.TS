#TypeScript Library

This is a TypeScript library that provides a set of classes and functions to implement the Repository Pattern in your code. Features to be implemented:

* Entity<TKey>
    Reproduce the Entity class from Hydra.JS, but in TypeScript, using T parameter to define the type of key constructor parameter.
* Model
    Must be converted into a TypeScript interface, with validate method.
* Linking<TEntity,TEntity2>
    Must be converted into a TypeScript class, using T parameter to define both entities must be linked.
* Repository<TEntity,TKey>
    Must be converted into a TypeScript class, with create, get, update, delete, list methods. And use generics to define the type of entity to be managed, 
    TEntity must be from Entity<TKey> class type.
* Context
    Must be converted into a TypeScript class, with db, http, unitOfWork, terraform methods.
* ApiContext
    Must be converted into a TypeScript class, with http method.
* DbContext
    Must be converted into a TypeScript class, with db, unitOfWork, terraform methods.
* UnitOfWork
    Must be converted into a TypeScript class, with done, rollback methods.
