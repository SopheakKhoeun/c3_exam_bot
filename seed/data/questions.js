const backendQuestions = [
  {
    title: 'What is middleware in Express?',
    answer: 'Middleware is a function that runs during the request-response cycle and can modify req/res or end the cycle.',
    explanation: 'Middleware is commonly used for logging, authentication, parsing, and error handling.',
    difficulty: 'easy',
  },
  {
    title: 'What does REST stand for?',
    answer: 'Representational State Transfer.',
    explanation: 'REST is an architectural style for designing networked APIs using standard HTTP methods.',
    difficulty: 'easy',
  },
  {
    title: 'What HTTP method is typically used to create a resource?',
    answer: 'POST',
    explanation: 'POST is used to create new resources, while PUT/PATCH update existing ones.',
    difficulty: 'easy',
  },
  {
    title: 'What is the difference between PUT and PATCH?',
    answer: 'PUT usually replaces an entire resource; PATCH updates only specific fields.',
    explanation: 'PATCH is preferred for partial updates to avoid overwriting unchanged data.',
    difficulty: 'medium',
  },
  {
    title: 'What is JWT used for?',
    answer: 'JSON Web Tokens are used for authentication and securely transmitting claims between parties.',
    explanation: 'A JWT typically contains a header, payload, and signature and is sent with each request.',
    difficulty: 'medium',
  },
  {
    title: 'What is the purpose of environment variables in Node.js?',
    answer: 'They store configuration such as secrets, ports, and database URLs outside source code.',
    explanation: 'Using dotenv keeps sensitive values out of the repository and makes environments configurable.',
    difficulty: 'easy',
  },
  {
    title: 'What is async/await in JavaScript?',
    answer: 'Syntax for writing asynchronous code that looks synchronous, built on Promises.',
    explanation: 'await pauses execution until a Promise resolves, improving readability over nested callbacks.',
    difficulty: 'easy',
  },
  {
    title: 'What is the N+1 query problem?',
    answer: 'Fetching a list then running an extra query per item, causing many unnecessary database calls.',
    explanation: 'It is fixed with joins, includes, or batching so related data is loaded efficiently.',
    difficulty: 'hard',
  },
  {
    title: 'What does CRUD stand for?',
    answer: 'Create, Read, Update, Delete.',
    explanation: 'CRUD maps to common API and database operations for managing resources.',
    difficulty: 'easy',
  },
  {
    title: 'What is CORS?',
    answer: 'Cross-Origin Resource Sharing — a browser security mechanism controlling cross-origin HTTP requests.',
    explanation: 'Servers send CORS headers to allow trusted frontends to call their APIs.',
    difficulty: 'medium',
  },
  {
    title: 'What is the difference between authentication and authorization?',
    answer: 'Authentication verifies identity; authorization checks what that identity is allowed to do.',
    explanation: 'Login proves who you are; role/permission checks decide access to resources.',
    difficulty: 'medium',
  },
  {
    title: 'What is Express.js?',
    answer: 'A minimal Node.js web framework for building HTTP APIs and web applications.',
    explanation: 'It provides routing, middleware, and helpers for request handling.',
    difficulty: 'easy',
  },
  {
    title: 'What is rate limiting?',
    answer: 'Restricting how many requests a client can make in a time window.',
    explanation: 'It protects APIs from abuse, spam, and denial-of-service style traffic.',
    difficulty: 'medium',
  },
  {
    title: 'What is a status code 401 vs 403?',
    answer: '401 means unauthenticated; 403 means authenticated but not allowed.',
    explanation: 'Use 401 when credentials are missing/invalid and 403 when permissions are insufficient.',
    difficulty: 'medium',
  },
  {
    title: 'What is connection pooling?',
    answer: 'Reusing a pool of database connections instead of opening a new one per request.',
    explanation: 'Pooling reduces connection overhead and improves backend performance under load.',
    difficulty: 'hard',
  },
  {
    title: 'What is idempotency in APIs?',
    answer: 'Repeating the same request produces the same result without unintended side effects.',
    explanation: 'GET, PUT, and DELETE are typically idempotent; POST usually is not.',
    difficulty: 'hard',
  },
  {
    title: 'What is the purpose of a .gitignore file?',
    answer: 'It tells Git which files and folders should not be tracked or committed.',
    explanation: 'Common ignores include node_modules, .env, logs, and build artifacts.',
    difficulty: 'easy',
  },
  {
    title: 'What is horizontal scaling?',
    answer: 'Adding more servers/instances to handle load, instead of making one machine more powerful.',
    explanation: 'It is common with load balancers and containerized deployments.',
    difficulty: 'medium',
  },
  {
    title: 'What is a repository pattern?',
    answer: 'An abstraction layer that isolates data-access logic from business logic.',
    explanation: 'Services call repositories instead of talking to Prisma/SQL directly, improving testability.',
    difficulty: 'medium',
  },
  {
    title: 'What is graceful shutdown?',
    answer: 'Stopping a server cleanly by finishing in-flight work and closing connections before exit.',
    explanation: 'Handling SIGINT/SIGTERM prevents dropped requests and leaves the database in a clean state.',
    difficulty: 'hard',
  },
];

const frontendQuestions = [
  {
    title: 'What is the Virtual DOM in React?',
    answer: 'An in-memory representation of the UI that React diffs to update the real DOM efficiently.',
    explanation: 'React compares previous and next virtual trees and applies only necessary DOM updates.',
    difficulty: 'medium',
  },
  {
    title: 'What is JSX?',
    answer: 'A syntax extension that lets you write HTML-like markup inside JavaScript.',
    explanation: 'JSX compiles to React.createElement (or equivalent) function calls.',
    difficulty: 'easy',
  },
  {
    title: 'What is the difference between props and state?',
    answer: 'Props are passed from parent to child; state is local and mutable within a component.',
    explanation: 'Props are read-only for the child; state changes trigger re-renders.',
    difficulty: 'easy',
  },
  {
    title: 'What does useEffect do?',
    answer: 'It lets functional components run side effects after render.',
    explanation: 'Common uses: data fetching, subscriptions, and syncing with external systems.',
    difficulty: 'medium',
  },
  {
    title: 'What is controlled vs uncontrolled input in React?',
    answer: 'Controlled inputs are driven by React state; uncontrolled inputs keep their own DOM value.',
    explanation: 'Controlled forms use value + onChange; uncontrolled forms often use refs.',
    difficulty: 'medium',
  },
  {
    title: 'What is Tailwind CSS?',
    answer: 'A utility-first CSS framework for building designs with small reusable classes.',
    explanation: 'Instead of writing custom CSS files first, you compose styles directly in markup.',
    difficulty: 'easy',
  },
  {
    title: 'What is responsive design?',
    answer: 'Designing UIs that adapt layout and typography across screen sizes.',
    explanation: 'Techniques include fluid layouts, media queries, and mobile-first breakpoints.',
    difficulty: 'easy',
  },
  {
    title: 'What is the purpose of keys in React lists?',
    answer: 'Keys help React identify which items changed, were added, or removed.',
    explanation: 'Stable unique keys improve reconciliation and avoid incorrect component reuse.',
    difficulty: 'medium',
  },
  {
    title: 'What is lifting state up?',
    answer: 'Moving shared state to the closest common parent so siblings can share data.',
    explanation: 'This keeps a single source of truth for related UI pieces.',
    difficulty: 'medium',
  },
  {
    title: 'What is CSS Flexbox used for?',
    answer: 'One-dimensional layout for aligning and distributing items in a row or column.',
    explanation: 'Flexbox is ideal for nav bars, card rows, and centering content.',
    difficulty: 'easy',
  },
  {
    title: 'What is CSS Grid used for?',
    answer: 'Two-dimensional layout for rows and columns.',
    explanation: 'Grid is powerful for page layouts and complex card/dashboard arrangements.',
    difficulty: 'easy',
  },
  {
    title: 'What is hydration in React/Next.js?',
    answer: 'Attaching event handlers and React state to server-rendered HTML on the client.',
    explanation: 'Hydration makes static HTML interactive without fully re-rendering from scratch.',
    difficulty: 'hard',
  },
  {
    title: 'What is the difference between == and === in JavaScript?',
    answer: '== compares with type coercion; === compares value and type strictly.',
    explanation: 'Prefer === to avoid unexpected loose-equality bugs.',
    difficulty: 'easy',
  },
  {
    title: 'What is event bubbling?',
    answer: 'An event propagates from the target element up through its ancestors.',
    explanation: 'You can stop bubbling with stopPropagation when needed.',
    difficulty: 'medium',
  },
  {
    title: 'What is localStorage?',
    answer: 'A browser API for storing key-value string data that persists across sessions.',
    explanation: 'It is synchronous and origin-scoped; avoid storing sensitive secrets there.',
    difficulty: 'easy',
  },
  {
    title: 'What is the SPA pattern?',
    answer: 'Single Page Application — the page loads once and updates views via JavaScript routing.',
    explanation: 'SPAs feel fast but need careful handling of SEO, auth, and initial load size.',
    difficulty: 'medium',
  },
  {
    title: 'What does npm stand for?',
    answer: 'Node Package Manager.',
    explanation: 'npm installs, updates, and manages JavaScript package dependencies.',
    difficulty: 'easy',
  },
  {
    title: 'What is a React fragment?',
    answer: 'A way to group children without adding an extra DOM node.',
    explanation: 'Use <>...</> or <React.Fragment> when a component must return multiple siblings.',
    difficulty: 'easy',
  },
  {
    title: 'What is debouncing?',
    answer: 'Delaying a function until a pause in rapid events (e.g. typing or resizing).',
    explanation: 'Debouncing reduces expensive work like API calls on every keystroke.',
    difficulty: 'medium',
  },
  {
    title: 'What is accessibility (a11y) in frontend?',
    answer: 'Designing interfaces so people with disabilities can use them effectively.',
    explanation: 'Includes semantic HTML, ARIA when needed, keyboard navigation, and contrast.',
    difficulty: 'medium',
  },
];

const sqlQuestions = [
  {
    title: 'What does SELECT DISTINCT do?',
    answer: 'Returns unique rows by removing duplicate values from the result set.',
    explanation: 'Use it when you need unique combinations of selected columns.',
    difficulty: 'easy',
  },
  {
    title: 'What is the difference between WHERE and HAVING?',
    answer: 'WHERE filters rows before aggregation; HAVING filters groups after aggregation.',
    explanation: 'HAVING is typically used with GROUP BY and aggregate functions.',
    difficulty: 'medium',
  },
  {
    title: 'What is an INNER JOIN?',
    answer: 'A join that returns only rows with matching values in both tables.',
    explanation: 'Non-matching rows from either table are excluded.',
    difficulty: 'easy',
  },
  {
    title: 'What is a primary key?',
    answer: 'A column (or set of columns) that uniquely identifies each row in a table.',
    explanation: 'Primary keys are unique and not null, and are often used as foreign key targets.',
    difficulty: 'easy',
  },
  {
    title: 'What is an index in SQL?',
    answer: 'A data structure that speeds up lookups on specific columns.',
    explanation: 'Indexes improve read performance but add write overhead and storage cost.',
    difficulty: 'medium',
  },
];

const prismaQuestions = [
  {
    title: 'What is Prisma Transaction?',
    answer: 'A Prisma Transaction executes multiple database operations atomically.',
    explanation: 'If one operation fails, all operations rollback.',
    difficulty: 'medium',
  },
  {
    title: 'What is Prisma Client?',
    answer: 'An auto-generated type-safe query builder for your database schema.',
    explanation: 'You define models in schema.prisma and generate the client with prisma generate.',
    difficulty: 'easy',
  },
  {
    title: 'What does prisma migrate do?',
    answer: 'It creates and applies SQL migrations that evolve your database schema.',
    explanation: 'Migrations keep schema changes versioned and reproducible across environments.',
    difficulty: 'medium',
  },
  {
    title: 'What is the difference between findUnique and findFirst?',
    answer: 'findUnique queries by unique fields; findFirst returns the first match for any filter.',
    explanation: 'Prefer findUnique when filtering by id or other unique constraints.',
    difficulty: 'easy',
  },
  {
    title: 'What does include do in a Prisma query?',
    answer: 'It eagerly loads related records defined by model relations.',
    explanation: 'Example: include: { category: true } attaches the related category to each question.',
    difficulty: 'medium',
  },
];

const reactQuestions = [
  {
    title: 'What is useState?',
    answer: 'A React Hook that adds local state to a functional component.',
    explanation: 'Calling the setter schedules a re-render with the updated value.',
    difficulty: 'easy',
  },
  {
    title: 'What is useContext?',
    answer: 'A Hook that reads values from a React Context without prop drilling.',
    explanation: 'Useful for theme, auth, or locale data shared across a subtree.',
    difficulty: 'medium',
  },
];

const expressQuestions = [
  {
    title: 'How do you define a route in Express?',
    answer: 'Using app.METHOD(path, handler), for example app.get("/users", handler).',
    explanation: 'Route handlers receive req, res, and optionally next.',
    difficulty: 'easy',
  },
  {
    title: 'What is express.json() middleware?',
    answer: 'Built-in middleware that parses incoming JSON request bodies into req.body.',
    explanation: 'Without it, JSON POST bodies are not automatically available on req.body.',
    difficulty: 'easy',
  },
];

const tailwindQuestions = [
  {
    title: 'What does the class flex do in Tailwind?',
    answer: 'It sets display: flex on the element.',
    explanation: 'Combined with utilities like justify-center and items-center for alignment.',
    difficulty: 'easy',
  },
  {
    title: 'What is a Tailwind breakpoint prefix like md:?',
    answer: 'It applies a utility starting at the medium breakpoint and above.',
    explanation: 'Tailwind uses a mobile-first breakpoint system.',
    difficulty: 'easy',
  },
];

module.exports = {
  backendQuestions,
  frontendQuestions,
  sqlQuestions,
  prismaQuestions,
  reactQuestions,
  expressQuestions,
  tailwindQuestions,
};
