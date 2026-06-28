# Cấu trúc DOM cơ bản của một trang web

**DOM (Document Object Model)** là cấu trúc cây biểu diễn tài liệu HTML mà trình duyệt đọc và render.

---

## Cấu trúc HTML cơ bản

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Tiêu đề trang</title>
  </head>
  <body>
    Nội dung hiển thị
  </body>
</html>
```

---

## Giải thích từng phần

### `<!DOCTYPE html>`
- Khai báo đây là tài liệu HTML5.
- Giúp trình duyệt render đúng chuẩn.

---

### `<html>`
- Thẻ **gốc (root element)** của toàn bộ tài liệu HTML.
- Bên trong thường có 2 phần: `<head>` và `<body>`.

---

### `<head>`
Chứa thông tin **không hiển thị** trực tiếp lên giao diện.

| Thẻ | Công dụng |
|-----|-----------|
| `<title>` | Tiêu đề tab trình duyệt |
| `<meta>` | Metadata (charset, responsive…) |
| `<link>` | Nhúng file CSS |
| `<script>` | Nhúng file JS |
| `<style>` | CSS nội bộ |

**Ví dụ:**
```html
<head>
  <meta charset="UTF-8">
  <title>Trang chủ</title>
  <link rel="stylesheet" href="style.css">
</head>
```

---

### `<body>`
Chứa **toàn bộ nội dung** người dùng nhìn thấy.

Bên trong thường có:
- `<header>` — Phần đầu trang
- `<nav>` — Menu điều hướng
- `<main>` — Nội dung chính
- `<footer>` — Phần chân trang

**Ví dụ:**
```html
<body>
  <header>Logo</header>

  <nav>Menu</nav>

  <main>
    <section>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </section>
  </main>

  <footer>Copyright</footer>
</body>
```

---

## Cây DOM

```
Document
└── html
    ├── head
    │   ├── meta
    │   └── title
    └── body
        ├── header
        ├── nav
        ├── main
        │   └── section
        │       ├── h1
        │       └── p
        └── footer
```
