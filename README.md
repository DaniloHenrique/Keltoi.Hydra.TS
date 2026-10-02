Keltoi.Hydra.TS

│ A TypeScript repository skeleton that embraces the Repository Pattern inside a 
hexagonal (ports ↔ adapters) architecture.  
│ Designed to be dropped into any project that wants a clean separation between 
domain logic, persistence, and infrastructure.

---

Why this structure?


┌──────────────────┬────────────────────────────────────────────────────────────┐
│ Benefit          │ Why it matters                                             │
├──────────────────┼────────────────────────────────────────────────────────────┤
│ Domain‑centric   │ The core never imports adapters; business rules stay       │
│                  │ isolated and fully testable.                               │
├──────────────────┼────────────────────────────────────────────────────────────┤
│ Swap‑out         │ Persist a type in‑memory, DB, or external API without      │
│ adapters         │ touching entities.                                         │
├──────────────────┼────────────────────────────────────────────────────────────┤
│ CQRS ready       │ Separate command and query handlers, with well‑typed       │
│                  │ Result/Ok/Error types.                                     │
├──────────────────┼────────────────────────────────────────────────────────────┤
│ Audit & Identity │ Built‑in IEntity, ITraceable, IChangeable, and linking     │
│                  │ helpers give every record a stable key and change history. │
├──────────────────┼────────────────────────────────────────────────────────────┤
│ Consistent       │ Every repo returns a Result<T> or IOk<T>, so callers can   │
│ outcomes         │ handle success/failure uniformly.                          │
└──────────────────┴────────────────────────────────────────────────────────────┘



---

Directory layout

src/
├── core/                # Domain primitives (entities, result monad, factory helpers)
├── context/             # Ports for API, DB, etc.
├── handler/             # CQRS orchestrators (use‑case, query, command)
├── repository/          # Repository interfaces & concrete adapters
└── index.ts             # Public façade

context

* api/ – API‑side ports (IApiRepository, IReadRepository, …)
* db/ – DB‑side ports (IDbContext, IDbRepository, paging/search interfaces)
* chain.ts – pipeline adapter

handler

* useCase.ts – IUseCaseHandler<TParam,TResult>
* query.ts – IQueryHandler<TQuery,TResult>
* command.ts – ICommandHandler<TCommand>
* node.ts – INode building blocks
* chain.ts – chains nodes into pipelines

repository

* api/interface/ – high‑level API contracts
* db/interface/ – DB contracts (paging, searching, ordering)
* db/ – concrete adapters (ThingRepository, SubstanceRepository, …)

---

Core domain primitives – Quick reference


┌──────────────────────────┬─────────────────────────────────────────────────────┐
│ Interface / Class        │ Role in repository pattern                          │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IEntity<T>               │ Persistable domain object (primary key +            │
│                          │ serialisation)                                      │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IBeing<T>                │ Entity with a textual description                   │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IThing<T>                │ Entity with a name                                  │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ ISubstance<T>            │ Combines Being & Thing                              │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IModel<TKey,TEntity>     │ DTO representation + validate() → Result            │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ Result<T>                │ Operation outcome (HTTP‑style status, data, error)  │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IOk<T>                   │ Lightweight success wrapper                         │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IError                   │ Structured error payload                            │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ ITraceable<T>            │ Created timestamp                                   │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IChangeable<T>           │ Updated timestamp + active flag                     │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ IKeyLinking<TKeyA,TKeyO> │ Composite key for relations                         │
├──────────────────────────┼─────────────────────────────────────────────────────┤
│ ILinking<TAbs,TOri>      │ Edge between two entities                           │
└──────────────────────────┴─────────────────────────────────────────────────────┘

These interfaces give every repository a predictable API:

// Example of a repository method
create(entity: IEntity<T>): Result<IEntity<T>> {
  // persist -> return Result with status code, maybe entity ID
}

---

Setup & Building

# Install dependencies
npm install

# Compile TS → JS
npm run build

# Run tests
npm test

Compiled output lives in `dist/`.


Basic Usage

import { DbContext, ThingRepository } from './dist';

const ctx = new DbContext(/* options */);
const repo = new ThingRepository(ctx);

// Create a new "Thing"
const result = await repo.create({ name: 'Example' });

if (result.isError) {
  console.error('Failed', result.error);
} else {
  console.log('Created Thing with ID', result.ok.data.id);
}

│ Tip:  
│ All repository operations return a `Result<T>` or `IOk<T>`, so you can check 
isError/isOk without try/catch.

---
Contributing

1. Fork the repo.  
2. Create a feature branch.  
3. Run npm test – all tests should pass.  
4. Commit, push, and open a PR.  

Adhere to existing style: no console logs in production code, use the core types, keep repositories thin and focused on persistence only.

---

License

MIT © Keltoi.io

---