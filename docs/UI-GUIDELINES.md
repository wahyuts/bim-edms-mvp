# SENA EDMS UI Guidelines

## Design Principle

- Modern Enterprise
- Dark Theme
- Clean
- Professional
- Minimal
- Engineering Dashboard

---

# Color Palette

Background

#061726

Card

#0B2239

Primary

#2563EB

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Border

#1E3A5F

Text

#FFFFFF

Secondary Text

#CBD5E1

---

# Typography

Font

sans-serif

Weight

400

500

600

700

Large KPI

36px

Title

24px

Subtitle

16px

Body

14px

Small

12px

---

# Border Radius

Card

16px

Button

10px

Input

10px

Modal

16px

---

# Shadow

Tailwind

shadow-xl

---

# Buttons

Primary

Blue

Secondary

Gray

Success

Green

Danger

Red

Ghost

Transparent

Hover transition 150ms

---

# Inputs

Dark Background

Rounded

Blue Focus Ring

Placeholder Gray

Validation State

Success

Warning

Error

Disabled

---

# Status Badge

Approved

Green

Client Review

Orange

Draft

Blue

Revision Requested

Yellow

Overdue

Red

Final As-Built

Green

---

# Table

Dark Theme

Sticky Header

Hover Row

Rounded

Responsive

Action Column

Icons

View

Edit

Delete

Download

Upload

Open

---

# Card

Rounded

Dark

Soft Shadow

Hover Transition

Optional Progress Bar

---

# Dashboard Layout

Source alignment:

* Row `At Risk` pada Dashboard SLA Overview membuka `/sla`.
* Row `Overdue` pada Dashboard SLA Overview membuka `/escalation`.
* Row `On Track` dan `Final As-Built` bersifat statis.
* Sidebar aktual mencakup SLA Monitoring dan Notifications.
* Detail interaksi mengikuti `docs/DASHBOARD-INTERACTIONS.md`.

+--------------------------------------------------------------------------------+

Topbar

+-----------+-------------------------------------------------------------------+

Sidebar     | KPI Summary                          

            +-------------------------------------------------------------------+
                                                   | SLA Overview
            | Document Register Table              | 
                                                   +----------------------------+
            |                                      | Escalation Alert
                                                   | 
            |                                      +----------------------------+
            |                                      | 
            |                                      | Storage Repository
            |                                      | 
+-----------+--------------------------------------+----------------------------+

---

# Rules

Desktop

3 Columns

Left Sidebar

Main Content

Right Sidebar


Tablet

Left Sidebar

Main Content

Right Sidebar di bawah Main Content


Mobile

Semua menjadi vertical

---

# Sidebar

Dark

Expandable

Active Indicator

Supports

Dashboard

Document Register

    PFD

    P&ID

Transmittal

    Incoming

    Outgoing

Escalation Alert

Audit Trail

Storage Repository

    NAS

---

# Topbar

Project Name

Notification

Profile Dropdown

Create New User

Edit User Profile

Profile

Change Password

Logout

Create New User dan Edit User Profile tampil abu-abu dan tidak aktif untuk user non-Administrator.

---

# Login Screen

Centered Layout

Dark Gradient

Logo

EDMS Title

Username

Password

Show Password

Login Button

Forgot Password

Version Footer

---

# Modal

Rounded

Dark

Overlay Blur

Supports

View

Edit

Delete Confirmation

Logout Confirmation

---

# CRUD Buttons Standard

View

Icon: Eye

Color: Blue

Edit

Icon: Pencil

Color: Amber

Delete

Icon: Trash

Color: Red

Create

Icon: Plus

Color: Green

Download

Icon: Download

Color: Gray

Upload

Icon: Upload

Color: Blue

Open

Icon: External Link

Color: Cyan

---

# Animation

Hover

150ms

Dropdown Fade

Modal Fade

Button Hover

Card Hover

Professional only.

No excessive animation.
