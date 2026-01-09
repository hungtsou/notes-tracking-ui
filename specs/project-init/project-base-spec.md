
### Role

You are a **senior frontend engineer** building a **production-quality React application**.

---

### Goal

Create a **Notes Tracking Application** that allows users to **add, view, and delete reusable Notes**, with persistent storage using a JSON-based local database.

---

### Tech Stack

* React + Vite
* TypeScript (strict mode)
* Tailwind CSS
* JSON-based database (e.g., `lowdb`)
* Functional components + React hooks only

---

### Functional Requirements

#### Note Model

Define a strongly typed note model:

```ts
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
```

---

#### Features

1. **Add Note**

   * Form with controlled inputs
   * Validate required fields
   * Save Note to JSON database
   * Update UI immediately

2. **List Notes**

   * Display Notes in a clean list
   * Show title + truncated content preview
   * Sort by newest first
   * Show empty state when no Notes exist

3. **Delete Note**

   * Delete Note by ID
   * Update database and UI
   * Optional confirmation step

---

### Architecture Guidelines

* Separate concerns:

  * `components/` → UI components
  * `services/` → data access (JSON DB logic)
  * `types/` → TypeScript interfaces
* Avoid `any`
* Prefer reusable, composable components
* Keep logic out of UI where possible

---

### Styling & UX

* Tailwind CSS only
* Calm, educational, professional design
* Neutral colors (light blues, grays)
* Responsive layout
* Accessible buttons and inputs
* Subtle hover/focus states

---

### Persistence

* Use a JSON-based database package
* Data must persist across reloads
* Seed database with example Notes

---

### Output Expectations

* Fully working app
* Clean folder structure
* Idiomatic React + TypeScript code
* Clear instructions to run the project

---

### Constraints

* No Redux
* No backend server
* No class components
* No overengineering

---

### Optional Enhancements (Only If Core Is Complete)

* Edit Note
* Search/filter Notes
* Toast notifications

---

**Important**:
Follow the implementation plan exactly in the order listed below.
Generate only one step at a time.
After completing each step, stop and wait for explicit confirmation before continuing.

### Step 1 – Project Setup

* Create a Vite + React + TypeScript project
* Configure Tailwind CSS
* Enable strict TypeScript mode
* Provide folder structure

⏭ *Stop after setup*

---

### Step 2 – Data Layer

* Install and configure a JSON database (`lowdb`)
* Create a typed data access service
* Implement:

  * `getNotes()`
  * `addNote(Note)`
  * `deleteNote(id)`
* Seed example data

⏭ *Stop after data layer*

---

### Step 3 – Core UI Components

* Build:

  * `NoteForm`
  * `NoteList`
  * `NoteCard`
* Use strong typing
* Controlled inputs
* Clean Tailwind styling

⏭ *Stop after components*

---

### Step 4 – App Integration

* Wire components together in `App.tsx`
* Handle state synchronization
* Ensure persistence works correctly

⏭ *Stop after integration*

---

### Step 5 – UX Polish

* Empty states
* Button feedback
* Responsive layout
* Accessibility improvements

⏭ *Stop after polish*

---

### Step 6 – Final Review

* Refactor if needed
* Validate TypeScript safety
* Provide run instructions

---


Important: “Do not skip steps. Ask for confirmation before proceeding to the next step.”
