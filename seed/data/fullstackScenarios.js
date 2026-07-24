/**
 * Fullstack practice scenarios from C3 Subject 3 + Subject 4 starters:
 * - Mini Store Backend (Express + Prisma + PostgreSQL)
 * - Mini-Mart Order Desk (React + Vite + Tailwind)
 */

const fullstackQuestions = [
  {
    title:
      'Fullstack scenario: What is Toul Kork Mini-Mart end-to-end?\n\n' +
      'Describe Backend (Subject 3) + Frontend (Subject 4) together.',
    answer:
      'Backend: Express/Prisma API for products, customers, orders (stock rules, totalPrice server-side). Frontend: React Order Desk with Products, Customer, and Order tabs that call that API.',
    explanation:
      'Staff use the UI instead of requests.http. Same shop rules apply on both sides: stock check, PENDING cancel, prices from server.',
    difficulty: 'medium',
  },
  {
    title:
      'Fullstack setup order — what do you start first and why?',
    answer:
      'Start the Mini Store backend first (localhost:3000) and confirm GET /api/products returns 5 products. Then start Order Desk (npm run dev → localhost:5173).',
    explanation:
      'Subject 4 depends on the finished Session 1 API. UI fetch calls BASE_URL http://localhost:3000/api.',
    difficulty: 'easy',
  },
  {
    title:
      'Subject 3 — which files are you allowed to edit?',
    answer:
      'prisma/schema.prisma, src/repositories/product.repository.js, src/repositories/customer.repository.js, src/services/order.service.js',
    explanation:
      'Routes, controllers, and error handling are already provided — only implement the TODOs.',
    difficulty: 'easy',
  },
  {
    title:
      'Subject 4 — which files are graded?',
    answer:
      'src/pages/ProductsPage.jsx, src/pages/OrderPage.jsx, src/pages/CustomerPage.jsx',
    explanation:
      'App shell, tabs, Tailwind, and src/api.js BASE_URL are already provided.',
    difficulty: 'easy',
  },
  {
    title:
      'S5.2 — Write the OrderStatus enum values and meaning.',
    answer:
      'PENDING = placed not paid (cancellable). PAID = paid, cannot cancel. CANCELLED = cancelled and stock restored.',
    explanation:
      'Default status on new Order is PENDING; orderDate defaults to now().',
    difficulty: 'easy',
  },
  {
    title:
      'S5.2 — List Order model fields and relations.',
    answer:
      'id, customerId (FK Customer), productId (FK Product), quantity, totalPrice, status (OrderStatus), orderDate; relation fields customer and product. Customer/Product need orders Order[].',
    explanation:
      'Relation needs a field on BOTH sides. Use npx prisma format if a side is missing.',
    difficulty: 'medium',
  },
  {
    title:
      'S6.1 — How should listProducts(search) work?',
    answer:
      'Return all products ordered by id asc. If search is given, filter name contains search (case-insensitive). Empty search → all products. Use Prisma Client.',
    explanation:
      'Test: GET /api/products and GET /api/products?search=rice → Jasmine Rice 5kg.',
    difficulty: 'easy',
  },
  {
    title:
      'S6.2 — What must getCustomerWithOrders return?',
    answer:
      'Customer with orders[], and each order includes product. Unknown id → return null (controller sends 404).',
    explanation:
      'Test: GET /api/customers/2 → Chan Mealea with 2 orders; GET /api/customers/999 → 404.',
    difficulty: 'medium',
  },
  {
    title:
      'S6.3 — Sales report rules (raw SQL).',
    answer:
      'One row per product: id, name, quantitySold, moneyEarned. Only non-CANCELLED orders. Include products with 0. Order by quantitySold desc, id asc. MUST use prisma.$queryRaw (JOIN + GROUP BY + SUM).',
    explanation:
      'Prisma-Client-only = 0 points. Tip: LEFT JOIN with status <> CANCELLED; COALESCE(SUM(...),0)::int. Seed expect: Instant Noodles 15/$15, Rice 2/$16, Oil 1/$4, Coke 0, Palm Sugar 0.',
    difficulty: 'hard',
  },
  {
    title:
      'S7.1 — placeOrder status codes and rules.',
    answer:
      '400 quantity not whole number > 0; 404 customer/product missing; 409 not enough stock; totalPrice = quantity × price (server); create PENDING order + decrease stock in one prisma.$transaction; return created order.',
    explanation:
      'Happy path example: customerId 3, productId 3, qty 2 → totalPrice $12, stock 30→28.',
    difficulty: 'hard',
  },
  {
    title:
      'S7.2 — cancelOrder rules.',
    answer:
      '404 if order missing; 409 if not PENDING (PAID cannot cancel); set CANCELLED; increase product stock by order.quantity; return updated order.',
    explanation:
      'Example: cancel order 2 (PENDING qty 5) → stock product 1: 50→55. Cancel again → 409. Cancel order 1 (PAID) → 409.',
    difficulty: 'medium',
  },
  {
    title:
      'Why use prisma.$transaction in placeOrder?',
    answer:
      'Order create and stock decrease must succeed or fail together. If one fails, the other must not be saved.',
    explanation:
      'Rubric awards points specifically for using $transaction (grader reads the file).',
    difficulty: 'medium',
  },
  {
    title:
      'S3.1 Products page — static UI requirements.',
    answer:
      'Styled search input; table with header/borders/zebra; price as $ amount; stock badge green when stock > 0, red when stock = 0. Use SAMPLE_PRODUCTS first.',
    explanation:
      'Build markup before wiring fetch (S4.1/S4.2).',
    difficulty: 'easy',
  },
  {
    title:
      'S3.2 Order form — static UI requirements.',
    answer:
      'Labeled customer-id input, product select (SAMPLE_PRODUCTS), quantity input, submit with hover, green success box AND red error box both visible for static grading.',
    explanation:
      'S4.4 later wires real API and must never show both boxes at once.',
    difficulty: 'easy',
  },
  {
    title:
      'S3.3 Customer page — static UI requirements.',
    answer:
      'Customer-id + Load button; info card; orders table (qty, total); status badges PENDING yellow, PAID green, CANCELLED gray; Cancel button only on PENDING rows.',
    explanation:
      'Use SAMPLE_CUSTOMER for static stage.',
    difficulty: 'easy',
  },
  {
    title:
      'S4.1 + S4.2 — Products dynamic behavior.',
    answer:
      'On mount fetch GET /products, show Loading… then rows. Search input refetches GET /products?search=<text>.',
    explanation:
      'BASE_URL is in src/api.js. Flow A: type rice → only Jasmine Rice 5kg.',
    difficulty: 'medium',
  },
  {
    title:
      'S4.4 — Order submit contract.',
    answer:
      'POST { customerId, productId, quantity } as numbers. Success → green confirmation + clear form. 400/404/409 → show API { error } in red box. Never show success and error together.',
    explanation:
      'Flow B: customer 3, Coca-Cola qty 2 → Ordered! Total: $12; stock 30→28. Palm Sugar qty 1 → Not enough stock. customer 999 → Customer not found.',
    difficulty: 'hard',
  },
  {
    title:
      'S4.3 + S4.5 — Customer load and cancel.',
    answer:
      'Load → GET /customers/:id; unknown id → red error, no card. Cancel → PUT /orders/:id/cancel then reload customer so badge becomes CANCELLED and button disappears.',
    explanation:
      'Flow C: customer 1 has PAID only (no Cancel). customer 2 PENDING Instant Noodles → Cancel → stock 50→55.',
    difficulty: 'hard',
  },
  {
    title:
      'API map used by both Subject 3 tests and Subject 4 UI.',
    answer:
      'GET /products, GET /products?search=, GET /customers/:id, POST /orders, PUT /orders/:id/cancel. Errors: { "error": "message" }.',
    explanation:
      'Order Desk must display the API error string on failures.',
    difficulty: 'medium',
  },
  {
    title:
      'Fullstack bug: UI sends totalPrice in POST /orders. What is wrong?',
    answer:
      'Client must not send totalPrice. Server always computes quantity × product.price. Trusting client price breaks shop rules and exam requirements.',
    explanation:
      'S7.1 explicitly says never trust a price sent by the client.',
    difficulty: 'medium',
  },
  {
    title:
      'Fullstack bug: Cancel button shows on PAID orders. Fix?',
    answer:
      'Render Cancel only when order.status === "PENDING". PAID/CANCELLED rows show badge only.',
    explanation:
      'Matches S3.3 static requirement and S7.2 business rule (409 if not PENDING).',
    difficulty: 'easy',
  },
  {
    title:
      'Fullstack data reset tip during practice.',
    answer:
      'On backend run npm run seed anytime to reset customers/products/orders, then retest requests.http and the Order Desk flows.',
    explanation:
      'Subject 3 README and Subject 4 docs both recommend reseeding for a clean state.',
    difficulty: 'easy',
  },
  {
    title:
      'Exam repo naming reminders.',
    answer:
      'Subject 3: C3_<StudentID>_<YourName>. Subject 4: C3_<ID>_<Name>_S2. Commit per task, push, submit URL.',
    explanation:
      'One commit per task minimum is part of the submission checklist.',
    difficulty: 'easy',
  },
  {
    title:
      'Walkthrough: implement placeOrder (pseudo-steps).',
    answer:
      '1) Validate quantity. 2) Load customer & product (404). 3) Check stock (409). 4) totalPrice = qty * price. 5) $transaction: create Order PENDING + update stock -= qty. 6) Return order.',
    explanation:
      'Throw httpError(status, message) so controllers return correct HTTP codes.',
    difficulty: 'hard',
  },
  {
    title:
      'Walkthrough: ProductsPage fetch pattern.',
    answer:
      'useState for products/loading/error/search. useEffect loads on mount and when search changes. fetch(`${BASE_URL}/products?search=...`) then setProducts. Show Loading… while pending.',
    explanation:
      'Replace SAMPLE_PRODUCTS after S4.1 works.',
    difficulty: 'medium',
  },
];

const miniStoreBackendExtra = [
  {
    title:
      'Starter tip for getSalesReport SQL quoting.',
    answer:
      'PostgreSQL table/column names are case-sensitive — quote them: "Product", "Order", "productId". Filter status in JOIN: AND o."status" <> \'CANCELLED\'.',
    explanation:
      'Direct tip from product.repository.js TODO comments in the Subject 3 starter.',
    difficulty: 'hard',
  },
  {
    title:
      'After S5 schema, which commands?',
    answer:
      'npm run migrate (name e.g. init) then npm run seed (4 customers, 5 products, 5 orders). Both must succeed.',
    explanation:
      'Commit message example: "S5 database setup done".',
    difficulty: 'easy',
  },
];

const orderDeskExtra = [
  {
    title:
      'Order Desk BASE_URL location and error shape.',
    answer:
      'src/api.js exports BASE_URL = http://localhost:3000/api. API errors are always JSON { "error": "message" }.',
    explanation:
      'Show that message string in the red error box.',
    difficulty: 'easy',
  },
  {
    title:
      'Subject 4 Part B setup points checklist.',
    answer:
      'Backend up with 5 products; frontend npm install && npm run dev shows 3 tabs at :5173; create exam repo and first commit.',
    explanation:
      'Worth 10 pts before coding pages.',
    difficulty: 'easy',
  },
];

module.exports = {
  fullstackQuestions,
  miniStoreBackendExtra,
  orderDeskExtra,
};
