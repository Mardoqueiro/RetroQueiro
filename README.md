# 🛍️ Rétro Quéiro

Welcome to **Rétro Quéiro**, my very first **e-commerce website** — fully built by me from scratch!

## 🧠 The Idea & Inspiration

The name **"Rétro Quéiro"** is a blend of **“Retro”** (classic, nostalgic, timeless) and **“Quéiro”**, taken from my own name, **Mardoquéiro** — giving it a personal, signature feel.

I’ve always been drawn to the **modern vintage aesthetic** — that fusion of clean, modern layouts with nostalgic color palettes, fonts, and design vibes. I wanted to create a shopping experience that felt warm, familiar, and stylish — something that felt like it had *soul*.

This project was not only a portfolio piece but also a major milestone in my coding journey — from layout structuring to navbar logic, responsive CSS styling, and bringing product pages to life.

## 🔧 Tech Stack

- **HTML5 / CSS3**
- **Bootstrap 5**
- **JavaScript / jQuery**
- **Responsive Design**

## 📦 Features

- Clean navigation with a sticky navbar
- Dynamic product layout with search, category filter and price sorting
- Shopping cart with quantities, totals and a live navbar counter
- Customer accounts (sign up, log in, order history) and an admin-only login for the product manager
- Admin page to add, edit and remove products
- Cart and products saved in the browser with `localStorage`
- Mobile responsiveness

## 🗂️ Project Structure

- `index.html` – home page
- `html/` – About, Products, Cart (checkout), Admin, Contact, Log in and My account pages
- `css/style.css` – all custom styling
- `script/store.js` – shared product list, cart helpers and navbar counter (loaded on every page)
- `script/auth.js` – customer and admin logins (loaded on every page)
- `script/code.js` (home), `script/products.js`, `script/checkout.js` (cart), `script/admin.js`, `script/contact.js`, `script/login.js`, `script/account.js` – page-specific logic

## 🚀 Running Locally

No build step needed — open `index.html` in a browser, or use the VS Code Live Server extension.

## 🔐 Logins

Customers can create an account on the **Log in** page; checkout asks them to log in and saves each order to **My account**. The **Admin** page only opens for the admin login (the email in `script/auth.js`).

This is a browser-only demo login: accounts, orders and products are saved in each visitor's own browser (`localStorage`), so it is not real security. A real store would need a server or a service like Firebase.

To change the admin password, open the site, run this in the browser console with your new password, and paste the result into `ADMIN_PASSWORD_HASH` in `script/auth.js`:

```js
await hashPassword("mordecai.dimbu@gmail.com", "your-new-password")
```
