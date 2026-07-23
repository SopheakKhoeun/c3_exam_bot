/**
 * C3 WMAD Exam Prep questions sourced from:
 * - C3 WMAD Preparatory Questions - Skill 3 & 4.pdf
 * - C3 WMAD Preparatory Questions - Skill 5 & 6.pdf
 * - Subject_3__Practice_Prep_MiniStoreBackend.docx
 * - Subject_4__Practice_Prep_MiniMartOrderDesk.docx
 */

function mcq(title, options, correctLetter, correctText, explanation, difficulty = 'easy') {
  const optionsText = options.map((o) => `${o}`).join('\n');
  return {
    title: `${title}\n\n${optionsText}`,
    answer: `${correctLetter}. ${correctText}`,
    explanation,
    difficulty,
  };
}

const frontendQuestions = [
  // Skill 3 & 4 — Next.js
  mcq(
    'Which command creates a new Next.js project?',
    ['A. npm create next-app', 'B. npx create-next-app@latest', 'C. npm install next', 'D. next new'],
    'B',
    'npx create-next-app@latest',
    'Official Next.js scaffolding uses npx create-next-app@latest.',
    'easy'
  ),
  mcq(
    'Which command starts the Next.js development server?',
    ['A. npm build', 'B. npm run dev', 'C. npm start', 'D. next dev start'],
    'B',
    'npm run dev',
    'In development, Next.js apps typically start with npm run dev.',
    'easy'
  ),
  mcq(
    'Which folder contains pages when using the Next.js App Router?',
    ['A. pages/', 'B. src/', 'C. app/', 'D. public/'],
    'C',
    'app/',
    'App Router routes live under the app/ directory.',
    'easy'
  ),
  mcq(
    'Which folder is used to store static files (images, icons, etc.) in Next.js?',
    ['A. assets', 'B. images', 'C. public', 'D. static'],
    'C',
    'public',
    'Files in public/ are served as static assets at the site root.',
    'easy'
  ),
  mcq(
    'Which file is commonly used to define the homepage in the Next.js App Router?',
    ['A. home.js', 'B. page.js', 'C. index.html', 'D. app.js'],
    'B',
    'page.js',
    'Each route segment uses page.js (or page.tsx) as the UI entry.',
    'easy'
  ),
  // React
  mcq(
    'What is the main purpose of a React Component?',
    ['A. Store data', 'B. Create reusable user interfaces', 'C. Connect to a database', 'D. Deploy a website'],
    'B',
    'Create reusable user interfaces',
    'Components encapsulate UI pieces you can reuse and compose.',
    'easy'
  ),
  mcq(
    'What is the main purpose of Props in React?',
    ['A. Store API data', 'B. Pass data between components', 'C. Style components', 'D. Create routes'],
    'B',
    'Pass data between components',
    'Props flow from parent to child as read-only inputs.',
    'easy'
  ),
  mcq(
    'Which React Hook is commonly used to manage component state?',
    ['A. useRouter()', 'B. useState()', 'C. useEffect()', 'D. useRef()'],
    'B',
    'useState()',
    'useState stores local state and triggers re-renders on update.',
    'easy'
  ),
  mcq(
    'Which React Hook is commonly used to fetch data after a component loads?',
    ['A. useState()', 'B. useEffect()', 'C. useMemo()', 'D. useCallback()'],
    'B',
    'useEffect()',
    'Data fetching on mount is typically done inside useEffect.',
    'easy'
  ),
  mcq(
    'Which React Hook is used to perform side effects?',
    ['A. useState()', 'B. useEffect()', 'C. useRef()', 'D. useMemo()'],
    'B',
    'useEffect()',
    'Side effects (fetch, subscriptions, DOM sync) belong in useEffect.',
    'easy'
  ),
  mcq(
    'Which React Hook updates the User Interface (UI) when the component state changes?',
    ['A. useState()', 'B. useRef()', 'C. useMemo()', 'D. useRouter()'],
    'A',
    'useState()',
    'Updating state via useState causes React to re-render the UI.',
    'easy'
  ),
  // Tailwind
  mcq(
    'What is the purpose of Tailwind CSS?',
    ['A. Database management', 'B. Utility-first styling', 'C. API integration', 'D. Routing'],
    'B',
    'Utility-first styling',
    'Tailwind provides small utility classes to compose designs in markup.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS class creates a Flexbox container?',
    ['A. grid', 'B. flex', 'C. inline', 'D. block'],
    'B',
    'flex',
    'The flex class sets display: flex.',
    'easy'
  ),
  mcq(
    'Which CSS property creates a Flexbox layout?',
    ['A. display: flex', 'B. display: grid', 'C. position: absolute', 'D. float: left'],
    'A',
    'display: flex',
    'Flexbox is enabled with display: flex.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS class creates a Grid layout?',
    ['A. flex', 'B. grid', 'C. container', 'D. inline-grid'],
    'B',
    'grid',
    'The grid class sets display: grid.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS class creates three columns?',
    ['A. grid-cols-2', 'B. grid-cols-3', 'C. flex-row', 'D. col-3'],
    'B',
    'grid-cols-3',
    'grid-cols-3 creates a 3-column CSS Grid track template.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS class centers items horizontally in a Flexbox container?',
    ['A. justify-center', 'B. items-center', 'C. content-center', 'D. text-center'],
    'A',
    'justify-center',
    'justify-* controls main-axis alignment; for a row flex container that is horizontal.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS breakpoint is commonly used for tablet screens?',
    ['A. sm', 'B. md', 'C. xl', 'D. 2xl'],
    'B',
    'md',
    'md is the common tablet breakpoint in Tailwind’s mobile-first scale.',
    'easy'
  ),
  mcq(
    'Which Tailwind CSS breakpoint is commonly used for desktop screens?',
    ['A. sm', 'B. md', 'C. lg', 'D. xs'],
    'C',
    'lg',
    'lg is commonly used as the desktop breakpoint.',
    'easy'
  ),
  // REST API (UI side)
  mcq(
    'Which HTTP method retrieves data from a REST API?',
    ['A. POST', 'B. GET', 'C. DELETE', 'D. PATCH'],
    'B',
    'GET',
    'GET is used to read/retrieve resources.',
    'easy'
  ),
  mcq(
    'Which HTTP method is commonly used to create new data?',
    ['A. GET', 'B. POST', 'C. DELETE', 'D. PATCH'],
    'B',
    'POST',
    'POST typically creates a new resource.',
    'easy'
  ),
  mcq(
    'Which HTTP method is commonly used to update existing data?',
    ['A. GET', 'B. POST', 'C. PUT', 'D. OPTIONS'],
    'C',
    'PUT',
    'PUT (and PATCH) update existing resources; PUT is the option listed here.',
    'easy'
  ),
  mcq(
    'Which API response status code indicates a successful request?',
    ['A. 200', 'B. 404', 'C. 500', 'D. 403'],
    'A',
    '200',
    '200 OK means the request succeeded.',
    'easy'
  ),
  mcq(
    'Which format is most commonly returned by REST APIs?',
    ['A. XML', 'B. JSON', 'C. HTML', 'D. CSS'],
    'B',
    'JSON',
    'Modern REST APIs most often exchange JSON.',
    'easy'
  ),
  mcq(
    'Which function is commonly used to send an HTTP request in JavaScript?',
    ['A. axios()', 'B. request()', 'C. fetch()', 'D. api()'],
    'C',
    'fetch()',
    'fetch() is the built-in browser/Node API for HTTP requests.',
    'easy'
  ),
  mcq(
    'Which function converts an API response into JSON format?',
    ['A. response.text()', 'B. response.json()', 'C. JSON.parse()', 'D. response.data()'],
    'B',
    'response.json()',
    'Response.json() parses the body as JSON (returns a Promise).',
    'easy'
  ),
  mcq(
    'Which layout is most suitable for displaying product cards?',
    ['A. Flexbox only', 'B. CSS Grid', 'C. Float', 'D. Position'],
    'B',
    'CSS Grid',
    'CSS Grid is ideal for two-dimensional card layouts.',
    'medium'
  ),
  // Best practices
  mcq(
    'What should be displayed while waiting for data from a REST API?',
    ['A. Blank page', 'B. Loading Indicator', 'C. Error message', 'D. Reload page'],
    'B',
    'Loading Indicator',
    'Show loading UI so users know the app is working.',
    'easy'
  ),
  mcq(
    'Why should loading indicators be displayed?',
    ['A. Increase file size', 'B. Improve user experience', 'C. Reduce API requests', 'D. Hide errors'],
    'B',
    'Improve user experience',
    'Feedback during async work improves perceived performance and clarity.',
    'easy'
  ),
  mcq(
    'If an API request fails, what should the application do?',
    ['A. Crash', 'B. Ignore the error', 'C. Display an error message', 'D. Close automatically'],
    'C',
    'Display an error message',
    'Surface a clear error so the user can retry or fix input.',
    'easy'
  ),
  mcq(
    'Why should React components be reusable?',
    ['A. Increase file size', 'B. Reduce duplicated code', 'C. Make debugging harder', 'D. Replace CSS'],
    'B',
    'Reduce duplicated code',
    'Reusable components keep UI consistent and easier to maintain.',
    'easy'
  ),
  mcq(
    'Which practice improves code maintainability?',
    ['A. Duplicate components', 'B. Reusable components', 'C. Inline styles only', 'D. Large files'],
    'B',
    'Reusable components',
    'Reusable components reduce duplication and simplify updates.',
    'easy'
  ),
  mcq(
    'Which statement best describes responsive web design?',
    [
      'A. It only works on desktop computers.',
      'B. It allows websites to adapt to different screen sizes and devices.',
      'C. It makes websites load faster by reducing images.',
      'D. It is only used for mobile applications.',
    ],
    'B',
    'It allows websites to adapt to different screen sizes and devices.',
    'Responsive design adapts layout across mobile, tablet, and desktop.',
    'easy'
  ),
  // Subject 4 — Mini-Mart Order Desk practical
  {
    title: 'In Mini-Mart Order Desk (Subject 4), what must the Products tab show?',
    answer:
      'Every product with price and stock at a glance; green = in stock, red = out of stock; and search by name.',
    explanation:
      'S3.1 requires a styled search input, table, $ price, and stock badge (green when stock > 0, red when stock = 0).',
    difficulty: 'medium',
  },
  {
    title: 'In Order Desk S4.4, what body should POST /api/orders send?',
    answer: '{ customerId, productId, quantity } as numbers.',
    explanation:
      'On success show a green confirmation and clear the form; on 400/404/409 show the API error; never show success and error boxes at once.',
    difficulty: 'medium',
  },
  {
    title: 'In Order Desk, when should the Cancel button appear on an order row?',
    answer: 'Only on PENDING orders.',
    explanation:
      'Status badges: PENDING yellow, PAID green, CANCELLED gray. Cancel calls the API then reloads the customer.',
    difficulty: 'medium',
  },
  {
    title: 'What is the difference between Props and State in React? (Skill 3&4 short answer)',
    answer:
      'Props are data passed from parent to child (read-only for the child). State is local mutable data owned by the component that triggers re-renders when updated.',
    explanation:
      'Use props for configuration/input; use state for values that change over time inside the component.',
    difficulty: 'medium',
  },
  {
    title: 'Compare Flexbox and CSS Grid for responsive layouts.',
    answer:
      'Flexbox is one-dimensional (row or column). CSS Grid is two-dimensional (rows and columns). Use Flex for nav/toolbars; Grid for product/event card boards.',
    explanation:
      'Both can be responsive with Tailwind breakpoints (sm/md/lg).',
    difficulty: 'medium',
  },
];

const backendQuestions = [
  {
    title: 'In Mini Store Backend (Subject 3), how must totalPrice be calculated?',
    answer: 'totalPrice = quantity × product price, calculated by the server — never taken from the client request.',
    explanation:
      'Shop rule: the client sends customerId, productId, quantity only; the server computes money.',
    difficulty: 'medium',
  },
  {
    title: 'When can an order be cancelled in Mini Store Backend?',
    answer: 'Only when status is PENDING. PAID orders cannot be cancelled.',
    explanation:
      'Cancel sets status to CANCELLED and restores product stock by the order quantity. Non-PENDING → 409.',
    difficulty: 'medium',
  },
  {
    title: 'What HTTP status should Mini Store return if stock is insufficient when placing an order?',
    answer: '409 Conflict',
    explanation:
      'S7.1: 400 bad quantity, 404 missing customer/product, 409 not enough stock.',
    difficulty: 'medium',
  },
  {
    title: 'How should place-order update stock and create the order in Mini Store?',
    answer: 'In one prisma.$transaction: create PENDING order and decrease stock by quantity.',
    explanation:
      'A transaction keeps order creation and stock decrease atomic — if one fails, both roll back.',
    difficulty: 'hard',
  },
  {
    title: 'What does GET /api/products?search=rice do in Mini Store?',
    answer: 'Returns products filtered by name, case-insensitive.',
    explanation: 'Implemented in product.repository.js with Prisma Client (S6.1).',
    difficulty: 'easy',
  },
  {
    title: 'What must GET /api/customers/:id return in Mini Store?',
    answer: 'The customer with their orders, and each order’s product. Unknown id → return null (controller sends 404).',
    explanation: 'S6.2 — use Prisma include/nested relations.',
    difficulty: 'medium',
  },
  {
    title: 'What are the rules for GET /api/reports/product-sales in Mini Store?',
    answer:
      'Every product with quantitySold and moneyEarned from non-CANCELLED orders only; ordered by quantitySold desc; must use prisma.$queryRaw with JOIN + GROUP BY + SUM.',
    explanation: 'A Prisma-Client-only solution earns 0 for S6.3.',
    difficulty: 'hard',
  },
  {
    title: 'List the OrderStatus enum values required in Mini Store schema.',
    answer: 'PENDING, PAID, CANCELLED',
    explanation:
      'PENDING = placed not paid; PAID = cannot cancel; CANCELLED = stock restored.',
    difficulty: 'easy',
  },
  {
    title: 'What fields belong on the Order model in Mini Store?',
    answer:
      'id, customerId, productId, quantity, totalPrice, status (OrderStatus, default PENDING), orderDate (default now), plus relations to Customer and Product.',
    explanation: 'Part B data dictionary — create Order + OrderStatus in prisma/schema.prisma (S5.2).',
    difficulty: 'medium',
  },
  {
    title: 'What validation does POST /api/orders require for quantity?',
    answer: '400 if quantity is not a whole number greater than 0.',
    explanation: 'Business rule in order.service.js S7.1.',
    difficulty: 'easy',
  },
  mcq(
    'Which HTTP method retrieves data from a REST API?',
    ['A. POST', 'B. GET', 'C. DELETE', 'D. PATCH'],
    'B',
    'GET',
    'Backend routes like GET /api/products use GET to read data.',
    'easy'
  ),
  mcq(
    'Which HTTP method is commonly used to create new data?',
    ['A. GET', 'B. POST', 'C. DELETE', 'D. PATCH'],
    'B',
    'POST',
    'POST /api/orders creates a new order resource.',
    'easy'
  ),
  {
    title: 'Explain why Error Handling is important when working with APIs and Forms.',
    answer:
      'APIs and forms fail (validation, network, 404/409). Clear errors prevent silent failures, guide users, and keep data consistent (e.g. stock conflicts).',
    explanation: 'Skill 3&4 essay topic — show loading, success, and error states separately.',
    difficulty: 'medium',
  },
  {
    title: 'Explain Client-side vs Server-side Validation with examples.',
    answer:
      'Client-side: check inputs in the browser before submit (e.g. quantity > 0) for fast UX. Server-side: enforce rules in the API (e.g. stock check, totalPrice) so bad/malicious clients cannot bypass rules.',
    explanation: 'Never trust the client alone — Mini Store calculates totalPrice on the server.',
    difficulty: 'medium',
  },
];

const sqlQuestions = [
  mcq(
    'What is the role of a Primary Key in a database?',
    [
      'A. Store duplicate values for faster searching',
      'B. Uniquely identify each record',
      'C. Create relationships between two databases',
      'D. Encrypt data automatically',
    ],
    'B',
    'Uniquely identify each record',
    'A primary key uniquely identifies each row and cannot be NULL.',
    'easy'
  ),
  mcq(
    'Which one is a Relational Database?',
    ['A. MongoDB', 'B. Redis', 'C. MySQL', 'D. Firebase'],
    'C',
    'MySQL',
    'MySQL is a relational (SQL) DBMS. MongoDB/Redis/Firebase are typically NoSQL/other.',
    'easy'
  ),
  mcq(
    'Which SQL statement is used to create a new table?',
    ['A. MAKE TABLE Students', 'B. CREATE TABLE Students', 'C. NEW TABLE Students', 'D. INSERT TABLE Students'],
    'B',
    'CREATE TABLE Students',
    'DDL uses CREATE TABLE to define a new table.',
    'easy'
  ),
  mcq(
    'Which data type is best suited for storing birth dates?',
    ['A. VARCHAR', 'B. DATE', 'C. INT', 'D. BOOLEAN'],
    'B',
    'DATE',
    'DATE stores calendar dates without inventing string formats.',
    'easy'
  ),
  mcq(
    'What is the role of a Foreign Key?',
    ['A. Sort data', 'B. Identify each record', 'C. Create relationships between tables', 'D. Encrypt data'],
    'C',
    'Create relationships between tables',
    'A foreign key references a primary key in another table.',
    'easy'
  ),
  mcq(
    'What is the best practice when designing a database?',
    [
      'A. Do not use Primary Keys',
      'B. Store duplicate data',
      'C. Choose appropriate data types and create proper relationships',
      'D. Store all data in one table',
    ],
    'C',
    'Choose appropriate data types and create proper relationships',
    'Good design uses proper types, keys, and normalized relationships.',
    'easy'
  ),
  mcq(
    'Which constraint prevents duplicate values?',
    ['A. NOT NULL', 'B. UNIQUE', 'C. CHECK', 'D. DEFAULT'],
    'B',
    'UNIQUE',
    'UNIQUE enforces no duplicate values in a column (or set of columns).',
    'easy'
  ),
  mcq(
    'Can a PRIMARY KEY contain NULL values?',
    ['A. Yes', 'B. No', 'C. Only in special cases', 'D. Depends on the DBMS'],
    'B',
    'No',
    'Primary keys are UNIQUE and NOT NULL.',
    'easy'
  ),
  mcq(
    'What does a FOREIGN KEY refer to?',
    ['A. A normal column', 'B. The Primary Key of another table', 'C. A data type', 'D. A database'],
    'B',
    'The Primary Key of another table',
    'FK values must match an existing PK (or unique key) in the related table.',
    'easy'
  ),
  mcq(
    'Which Normal Form removes repeating groups of data?',
    ['A. First Normal Form (1NF)', 'B. Second Normal Form (2NF)', 'C. Third Normal Form (3NF)', 'D. Boyce-Codd Normal Form (BCNF)'],
    'A',
    'First Normal Form (1NF)',
    '1NF requires atomic values and no repeating groups.',
    'medium'
  ),
  mcq(
    'What does VARCHAR(100) mean?',
    ['A. Stores 100 digits', 'B. Stores up to 100 characters', 'C. Stores 100 records', 'D. Stores 100 bytes'],
    'B',
    'Stores up to 100 characters',
    'VARCHAR(n) stores variable-length strings up to n characters.',
    'easy'
  ),
  mcq(
    'Which SQL statement adds a new column to an existing table?',
    ['A. UPDATE TABLE', 'B. ALTER TABLE', 'C. MODIFY TABLE', 'D. CHANGE TABLE'],
    'B',
    'ALTER TABLE',
    'ALTER TABLE ... ADD COLUMN changes table structure.',
    'easy'
  ),
  mcq(
    'ALTER TABLE is used for',
    ['A. Modifying the table structure', 'B. Deleting data', 'C. Inserting records', 'D. Searching records'],
    'A',
    'Modifying the table structure',
    'ALTER TABLE changes schema (columns, constraints), not row content.',
    'easy'
  ),
  mcq(
    'WHERE clause is used for',
    ['A. Sorting data', 'B. Specifying conditions', 'C. Grouping data', 'D. Joining tables'],
    'B',
    'Specifying conditions',
    'WHERE filters rows before grouping/aggregation.',
    'easy'
  ),
  mcq(
    'Which JOIN returns only matching records from both tables?',
    ['A. LEFT JOIN', 'B. RIGHT JOIN', 'C. INNER JOIN', 'D. FULL JOIN'],
    'C',
    'INNER JOIN',
    'INNER JOIN keeps only rows with matches on both sides.',
    'easy'
  ),
  mcq(
    "What does LIKE 'A%' mean?",
    ['A. Ends with A', 'B. Starts with A', 'C. Contains A in the middle', 'D. Only contains A'],
    'B',
    'Starts with A',
    "% is a wildcard; 'A%' matches strings beginning with A.",
    'easy'
  ),
  mcq(
    'What does CRUD stand for?',
    [
      'A. Create, Read, Update, Delete',
      'B. Copy, Read, Upload, Download',
      'C. Create, Remove, Update, Download',
      'D. Check, Read, Upload, Delete',
    ],
    'A',
    'Create, Read, Update, Delete',
    'CRUD are the four basic data operations.',
    'easy'
  ),
  mcq(
    'TRUNCATE TABLE is different from DELETE because',
    [
      'A. TRUNCATE removes all records but keeps the table.',
      'B. TRUNCATE deletes the table.',
      'C. TRUNCATE creates a table.',
      'D. There is no difference.',
    ],
    'A',
    'TRUNCATE removes all records but keeps the table.',
    'TRUNCATE clears all rows quickly; the table structure remains.',
    'medium'
  ),
  mcq(
    'What is the purpose of an Index?',
    ['A. Reduce query speed', 'B. Increase query speed', 'C. Delete tables', 'D. Increase data size'],
    'B',
    'Increase query speed',
    'Indexes speed up lookups/filters at some write/storage cost.',
    'easy'
  ),
  mcq(
    'When is SQL more appropriate than NoSQL?',
    [
      'A. When the schema changes frequently',
      'B. When data relationships are well defined',
      'C. When data is unstructured',
      'D. When using JSON documents',
    ],
    'B',
    'When data relationships are well defined',
    'Relational SQL fits structured data with clear relationships and constraints.',
    'medium'
  ),
  mcq(
    'Which Aggregate Function returns the maximum value?',
    ['A. COUNT()', 'B. SUM()', 'C. MAX()', 'D. AVG()'],
    'C',
    'MAX()',
    'MAX() returns the largest value in a set.',
    'easy'
  ),
  {
    title: 'Explain INNER JOIN vs LEFT JOIN vs RIGHT JOIN vs FULL JOIN.',
    answer:
      'INNER: only matching rows. LEFT: all left rows + matches (NULL if none). RIGHT: all right rows + matches. FULL: all rows from both, NULL where no match.',
    explanation: 'Skill 5&6 short answer — choose JOIN type based on whether unmatched rows must appear.',
    difficulty: 'hard',
  },
  {
    title: 'What is Normalization and why is it important?',
    answer:
      'Normalization organizes tables to reduce redundancy and anomalies by applying normal forms (1NF, 2NF, 3NF...).',
    explanation: 'It improves integrity and maintainability of relational designs like CompanyDB / Mini Store.',
    difficulty: 'medium',
  },
  {
    title: 'What is the difference between WHERE and HAVING?',
    answer:
      'WHERE filters rows before aggregation. HAVING filters groups after GROUP BY / aggregate functions.',
    explanation: 'Example: WHERE salary > 500 filters employees; HAVING COUNT(*) > 2 filters departments by employee count.',
    difficulty: 'medium',
  },
];

const mongodbQuestions = [
  mcq(
    'Which one is a NoSQL Database?',
    ['A. Oracle', 'B. PostgreSQL', 'C. MongoDB', 'D. MariaDB'],
    'C',
    'MongoDB',
    'MongoDB is a document-oriented NoSQL database.',
    'easy'
  ),
  mcq(
    'In MongoDB, data is stored as',
    ['A. Rows', 'B. Tables', 'C. Documents', 'D. Worksheets'],
    'C',
    'Documents',
    'MongoDB stores BSON/JSON-like documents in collections.',
    'easy'
  ),
  mcq(
    'Which MongoDB command inserts one document?',
    ['A. db.students.insertOne({})', 'B. db.students.add({})', 'C. db.students.create({})', 'D. db.students.new({})'],
    'A',
    'db.students.insertOne({})',
    'insertOne inserts a single document into a collection.',
    'easy'
  ),
  mcq(
    'Which MongoDB command creates a collection?',
    ['A. createCollection()', 'B. newCollection()', 'C. insertCollection()', 'D. makeCollection()'],
    'A',
    'createCollection()',
    'db.createCollection("name") creates a collection explicitly.',
    'easy'
  ),
  mcq(
    'Which MongoDB command inserts multiple documents?',
    ['A. insertOne()', 'B. insertMany()', 'C. addMany()', 'D. createMany()'],
    'B',
    'insertMany()',
    'insertMany accepts an array of documents.',
    'easy'
  ),
  mcq(
    'Which MongoDB command searches for documents?',
    ['A. insertOne()', 'B. find()', 'C. updateOne()', 'D. createCollection()'],
    'B',
    'find()',
    'find() queries documents; findOne() returns a single document.',
    'easy'
  ),
  mcq(
    'What does findOne() return?',
    ['A. All documents', 'B. One document', 'C. One collection', 'D. One database'],
    'B',
    'One document',
    'findOne returns the first matching document or null.',
    'easy'
  ),
  mcq(
    'What does updateMany() modify?',
    ['A. Database', 'B. Collection', 'C. Multiple documents', 'D. One document'],
    'C',
    'Multiple documents',
    'updateMany updates all documents matching the filter.',
    'easy'
  ),
  mcq(
    'What does deleteMany() do?',
    ['A. Delete a database', 'B. Delete a collection', 'C. Delete multiple documents', 'D. Delete one document'],
    'C',
    'Delete multiple documents',
    'deleteMany removes all documents matching the filter.',
    'easy'
  ),
  {
    title: 'Explain CRUD operations in MongoDB (commands).',
    answer:
      'Create: insertOne/insertMany. Read: find/findOne. Update: updateOne/updateMany. Delete: deleteOne/deleteMany.',
    explanation: 'Skill 5&6 essay — map SQL CRUD ideas to MongoDB collection methods.',
    difficulty: 'medium',
  },
];

const prismaQuestions = [
  {
    title: 'What is a Prisma Transaction?',
    answer: 'A Prisma Transaction executes multiple database operations atomically.',
    explanation: 'If one operation fails, all operations rollback. Mini Store uses $transaction for place order + stock decrease.',
    difficulty: 'medium',
  },
  {
    title: 'When must Mini Store use prisma.$queryRaw?',
    answer: 'For GET /api/reports/product-sales — JOIN + GROUP BY + SUM on non-CANCELLED orders.',
    explanation: 'S6.3 requires raw SQL; Prisma Client-only solutions score 0 for that task.',
    difficulty: 'hard',
  },
  {
    title: 'How do you relate Order to Customer and Product in Prisma?',
    answer:
      'Order has customerId and productId foreign keys, plus relation fields customer Customer and product Product; Customer/Product have orders Order[].',
    explanation: 'Matches Subject 3 Part B data dictionary (S5.2).',
    difficulty: 'medium',
  },
  {
    title: 'What Prisma commands are used after completing Mini Store schema?',
    answer: 'npm run migrate (or prisma migrate) then npm run seed.',
    explanation: 'S5.3 — migration creates tables; seed loads customers, products, and orders.',
    difficulty: 'easy',
  },
  {
    title: 'Why use repository pattern with Prisma in Mini Store?',
    answer:
      'Repositories isolate data access (product.repository.js, customer.repository.js) from business rules in services (order.service.js).',
    explanation: 'Controllers call services/repositories; you only implement TODO data-access and business functions.',
    difficulty: 'medium',
  },
];

const reactQuestions = [
  {
    title: 'Match: useState() — what does it do?',
    answer: 'Manage component state.',
    explanation: 'Skill 3&4 matching: useState → Manage Component State; useEffect → Side Effects.',
    difficulty: 'easy',
  },
  {
    title: 'Match: useEffect() — what does it do?',
    answer: 'Side effects (e.g. fetching data after load).',
    explanation: 'Commonly used for API calls when a component mounts or dependencies change.',
    difficulty: 'easy',
  },
  {
    title: 'In Order Desk S4.1, how should products load?',
    answer: 'Fetch on mount, show "Loading…" while pending, then render real rows in the table.',
    explanation: 'Replace SAMPLE_* data with fetch using the base URL in src/api.js.',
    difficulty: 'medium',
  },
];

const expressQuestions = [
  {
    title: 'In Mini Store, which layers already exist vs what you implement?',
    answer:
      'Provided: Express app, routes, controllers, error handling. You implement: prisma schema, repositories TODOs, order.service.js business rules.',
    explanation: 'Subject 3 — only edit schema + repositories + order.service.js.',
    difficulty: 'easy',
  },
  {
    title: 'What database name should you create for Mini Store practice?',
    answer: 'storedb (PostgreSQL).',
    explanation: 'Then set DATABASE_URL in .env from .env.example.',
    difficulty: 'easy',
  },
];

const tailwindQuestions = [
  {
    title: 'How does Tailwind support Responsive Web Design?',
    answer:
      'Mobile-first breakpoint prefixes (sm, md, lg, xl, 2xl) apply utilities from that width upward so layouts adapt across devices.',
    explanation: 'Skill 3&4 essay — combine flex/grid utilities with breakpoint variants.',
    difficulty: 'medium',
  },
  {
    title: 'Fill in the blank: Tailwind CSS follows a __________ approach.',
    answer: 'utility-first',
    explanation: 'Skill 3&4 Part III fill-in-the-blank.',
    difficulty: 'easy',
  },
];

module.exports = {
  backendQuestions,
  frontendQuestions,
  sqlQuestions,
  mongodbQuestions,
  prismaQuestions,
  reactQuestions,
  expressQuestions,
  tailwindQuestions,
};
