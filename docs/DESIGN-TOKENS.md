# DESIGN-TOKENS.md

# SENA Engineering Document Management System (EDMS) MVP

## Purpose

Dokumen ini mendefinisikan seluruh Design Token yang digunakan pada aplikasi.

Seluruh implementasi UI harus menggunakan token ini sebagai referensi utama.

Tidak diperbolehkan menggunakan nilai acak (magic value) pada komponen.

---

# Color Tokens

## Background

background.primary

```
#061726
```

background.secondary

```
#0B2239
```

background.surface

```
#102B46
```

background.hover

```
#163554
```

background.overlay

```
rgba(0,0,0,0.6)
```

---

## Primary

primary.50

```
#EFF6FF
```

primary.100

```
#DBEAFE
```

primary.500

```
#2563EB
```

primary.600

```
#1D4ED8
```

primary.700

```
#1E40AF
```

---

## Success

success

```
#22C55E
```

success.light

```
#DCFCE7
```

---

## Warning

warning

```
#F59E0B
```

warning.light

```
#FEF3C7
```

---

## Danger

danger

```
#EF4444
```

danger.light

```
#FEE2E2
```

---

## Info

info

```
#06B6D4
```

---

## Border

border.default

```
#1E3A5F
```

border.active

```
#2563EB
```

---

## Text

text.primary

```
#FFFFFF
```

text.secondary

```
#CBD5E1
```

text.muted

```
#94A3B8
```

text.disabled

```
#64748B
```

---

# Typography

Font Family

```
sans-serif
```

Fallback

```
Arial

Helvetica

system-ui
```

---

## Font Size

xs

12px

sm

14px

base

16px

lg

18px

xl

20px

2xl

24px

3xl

30px

4xl

36px

---

## Font Weight

normal

400

medium

500

semibold

600

bold

700

---

# Spacing Scale

xs

4px

sm

8px

md

12px

lg

16px

xl

24px

2xl

32px

3xl

48px

4xl

64px

---

# Border Radius

input

10px

button

10px

card

16px

modal

16px

pill

9999px

---

# Shadow

small

shadow-sm

medium

shadow-md

large

shadow-lg

extra

shadow-xl

---

# Z-Index

dropdown

100

sticky

200

overlay

500

modal

1000

toast

1200

loader

1500

---

# Transition

fast

150ms

normal

250ms

slow

350ms

Timing Function

ease-in-out

Source alignment:

Dashboard SLA Overview clickable rows use hover/focus transitions based on the existing dark surface and hover tokens:

* `background.surface`
* `background.hover`
* `border.active`
* `transition.fast`

---

# Breakpoints

mobile

0px

tablet

768px

desktop

1024px

wide

1280px

---

# Container Width

sm

640px

md

768px

lg

1024px

xl

1280px

2xl

1536px

---

# Table Tokens

Row Height

48px

Header Height

52px

Cell Padding

16px

Border Radius

12px

---

# KPI Card Tokens

Height

120px

Border Radius

16px

Padding

24px

Number Size

36px

Title Size

16px

Subtitle Size

12px

---

# Modal Tokens

Max Width

640px

Padding

24px

Radius

16px

Overlay

background.overlay
