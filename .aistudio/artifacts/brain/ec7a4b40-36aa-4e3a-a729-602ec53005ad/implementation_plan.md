# Implementation Plan - Comprehensive Candidate Profile Editor

Enable candidates (and administrators) to edit all sections of their profile—including Manifesto Summaries, Vision & Goals, Achievements, and Campaign Galleries—directly via the `CandidateEditModal` component with interactive dynamic list editors.

## Proposed Changes

### 1. Type & State Updates (`CandidateEditModal.tsx`)
- Extend local form state to manage:
  - `manifestoSummary`: Array of strings (bullet points)
  - `visionAndGoals`: Array of objects (`{ title, description, category }`)
  - `achievements`: Array of strings
  - `campaignGallery`: Array of objects (`{ id, title, caption, date, tag, location }`)

### 2. UI Enhancements (`CandidateEditModal.tsx`)
- Organize the modal into clear navigation tabs or accordion sections:
  - **Overview & Branding**: Name, tagline, faculty, course, avatars, manifesto PDF.
  - **Manifesto & Goals**: Manifesto bullet points (add/remove inputs) + Vision & Goals (title, description, category dropdown, add/remove).
  - **Achievements & Gallery**: Key achievements list + Campaign gallery items (title, caption, date, tag, location).
  - **Contact & Social**: Email, phone, hall, Instagram.
- Add interactive "Add Item" and "Remove" buttons for each dynamic list.

### 3. Firestore Persistence (`CandidateEditModal.tsx` & `AppContext.tsx`)
- Ensure `updateCandidateFields` correctly persists all updated arrays and objects (`manifestoSummary`, `visionAndGoals`, `achievements`, `campaignGallery`) to the candidate document in Firestore.

## Verification Plan

### Automated Verification
- Run `npm run lint` (`lint_applet`) to ensure zero TypeScript errors.
- Run `compile_applet` to verify successful production build.

### Manual Verification
- Open the Admin Panel (`/` or click admin shortcut), click "Full Profile Editor Page" or edit a candidate.
- Verify that Manifesto Summary points, Vision & Goals, Achievements, and Campaign Gallery items can be added, edited, and removed with dynamic buttons.
- Save and verify updates reflect instantly on the candidate profile page.
