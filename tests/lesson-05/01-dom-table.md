# Cấu trúc bảng (Table) trong HTML

Trong HTML, một bảng được tạo bằng thẻ `<table>` theo cấu trúc: **bảng → hàng → ô**.

---

## Ví dụ trực quan

| STT | Họ tên | Tuổi | Địa chỉ |
|-----|--------|------|---------|
| 1 | Nguyễn Văn A | 25 | Hà Nội |
| 2 | Trần Thị B | 30 | TP. HCM |
| 3 | Lê Văn C | 28 | Đà Nẵng |
| **Tổng** | | **83** | **3 người** |

---

## Cấu trúc HTML cơ bản

```html
<table>
  <thead>
    <tr>
      <th>Họ tên</th>
      <th>Tuổi</th>
      <th>Thành phố</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Nguyễn Văn A</td>
      <td>30</td>
      <td>Huế</td>
    </tr>
    <tr>
      <td>Trần Thị B</td>
      <td>25</td>
      <td>TP.HCM</td>
    </tr>
    <tr>
      <td>Lê Văn C</td>
      <td>28</td>
      <td>Đà Nẵng</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td>Tổng</td>
      <td>83</td>
      <td>3 người</td>
    </tr>
  </tfoot>
</table>
```

---

## Cây DOM tương ứng

```
table
├── thead
│   └── tr
│       ├── th (Họ tên)
│       ├── th (Tuổi)
│       └── th (Thành phố)
├── tbody
│   ├── tr
│   │   ├── td
│   │   ├── td
│   │   └── td
│   ├── tr
│   │   ├── td
│   │   ├── td
│   │   └── td
│   └── tr
│       ├── td
│       ├── td
│       └── td
└── tfoot
    └── tr
        ├── td (Tổng)
        ├── td (83)
        └── td (3 người)
```

---

## Ý nghĩa từng thẻ

| Thẻ | Chức năng |
|-----|-----------|
| `<table>` | Bao toàn bộ bảng |
| `<thead>` | Phần tiêu đề bảng |
| `<tbody>` | Phần dữ liệu chính |
| `<tfoot>` | Phần cuối bảng (tổng kết, phân trang…) |
| `<tr>` | Table Row — một hàng |
| `<th>` | Table Header — ô tiêu đề (in đậm, căn giữa) |
| `<td>` | Table Data — ô dữ liệu thông thường |

---

