# Fullstack Practice — Mini Store + Order Desk

Sources:
- `Subject_3__Practice_Prep_MiniStoreBackend.docx` + `Subject 3/starter`
- `Subject_4__Practice_Prep_MiniMartOrderDesk.docx` + `Subject 4/starter`

## Architecture

```text
[ Order Desk UI :5173 ]  --fetch-->  [ Mini Store API :3000/api ]  -->  PostgreSQL (storedb)
   React + Tailwind                      Express + Prisma
   Products / Customer / Order           repositories + order.service
```

## Backend TODOs (edit only these)

- `prisma/schema.prisma` — OrderStatus + Order
- `src/repositories/product.repository.js` — listProducts, getSalesReport ($queryRaw)
- `src/repositories/customer.repository.js` — getCustomerWithOrders
- `src/services/order.service.js` — placeOrder ($transaction), cancelOrder

## Frontend TODOs (edit only these)

- `src/pages/ProductsPage.jsx` — S3.1 static, S4.1 load, S4.2 search
- `src/pages/OrderPage.jsx` — S3.2 static, S4.4 POST order
- `src/pages/CustomerPage.jsx` — S3.3 static, S4.3 load, S4.5 cancel

## API

| Method | Path | Notes |
|--------|------|--------|
| GET | `/products` | list |
| GET | `/products?search=` | case-insensitive name |
| GET | `/customers/:id` | + orders + product |
| POST | `/orders` | `{ customerId, productId, quantity }` |
| PUT | `/orders/:id/cancel` | PENDING only |

Errors: `{ "error": "message" }`

## Grading flows

- **A** Products search `rice` → Jasmine Rice 5kg
- **B** Order customer 3 / Coke qty 2 → $12 success; Palm Sugar → stock error
- **C** Cancel PENDING on customer 2 → stock restored; PAID has no Cancel
