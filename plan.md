```markdown
# Implementation Plan for Multi-Role Project Management App

## Overview
This project will implement a Next.js application supporting three user roles—Admin, Client, and Customer—with a role-based dashboard. It will integrate with Bitrix24 (for client and project data), Amazon (for file outputs), and Zoho Books (for payment details). API credentials will be managed via environment variables with placeholders for ease of integration.

## 1. Authentication and Role Management
- **Create Login Page (`src/app/login/page.tsx`):**
  - Build a modern, responsive login form with fields for username, password, and a role selector (dropdown or radio buttons for Admin, Client, Customer).
  - On form submission, use a simple authentication function (in `src/lib/auth.ts`) to validate credentials (mock authentication for now) and set a session/token.
  - Implement error handling by displaying inline error messages for invalid logins.
  
- **Authentication Module (`src/lib/auth.ts`):**
  - Implement helper functions such as `login()`, `logout()`, and `getUserRole()`.
  - Include role-check middleware for protecting routes (to be used in each role-specific page).

## 2. Role-Specific Dashboards and Routes
- **Admin Dashboard (`src/app/admin/page.tsx`):**
  - Fetch all client data by calling a Bitrix24 integration function.
  - Render the data in a styled table with proper spacing, typography, and error boundaries.
  - Include pagination or filtering if necessary.

- **Client Dashboard (`src/app/client/page.tsx`):**
  - Fetch and display customer data specific to the logged-in client.
  - Use card or list layouts with clear headings and content separation.

- **Customer Dashboard (`src/app/customer/page.tsx`):**
  - Fetch project details (from Bitrix24), associated file outputs (from Amazon), and payment details (from Zoho Books).
  - Display the project information using a clean layout with sections for project info, file outputs, and payment summary.
  
## 3. API Integration Modules
- **Bitrix24 Integration (`src/lib/api/bitrix.ts`):**
  - Create functions like `fetchClientData()` and `fetchProjectDetails()`.
  - Use asynchronous calls (e.g., using fetch or axios) and wrap them in try-catch blocks.
  - Use environment variables (e.g., `process.env.BITRIX_DOMAIN`, `process.env.BITRIX_API_KEY`) for authentication.

- **Amazon File Output Integration (`src/lib/api/amazon.ts`):**
  - Build functions such as `fetchFileOutput()`, implementing calls to AWS (using AWS SDK or HTTP calls).
  - Utilize environment variables (`AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_BUCKET`, `AMAZON_REGION`).

- **Zoho Books Integration (`src/lib/api/zoho.ts`):**
  - Create a function `fetchPaymentDetails()` to retrieve payment information.
  - Incorporate robust error handling and use credentials from env variables (`ZOHO_ORGANIZATION_ID`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`).

## 4. UI Components and Styling
- **Global Styling (`src/app/globals.css`):**
  - Define a modern and clean color palette, typography, spacing, and layout styles to ensure consistency across all role-specific pages.
  
- **Common Layout and Navigation:**
  - Create a `Layout` component (`src/components/Layout.tsx`) to wrap page content with a header and footer.
  - Create a `Navigation` component (`src/components/Navigation.tsx`) that dynamically shows menu options based on the user’s role.
  - Ensure that no external icon libraries are used; rely solely on CSS for visual separation and textual cues.

## 5. Environment Variables and Configuration
- Create an `.env.local` file (not committed) with placeholders for:
  - Bitrix24: `BITRIX_DOMAIN`, `BITRIX_API_KEY`
  - Amazon: `AMAZON_ACCESS_KEY`, `AMAZON_SECRET_KEY`, `AMAZON_BUCKET`, `AMAZON_REGION`
  - Zoho Books: `ZOHO_ORGANIZATION_ID`, `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`
- Update `next.config.ts` if needed to expose these variables securely.

## 6. Error Handling and Best Practices
- Wrap all API calls with try-catch blocks and display user-friendly error messages in the UI.
- Validate API responses using TypeScript types and interfaces.
- Log errors (preferably to an external logging service in production) and provide graceful fallback UI.

## 7. Dependencies and Package Updates
- If not already included, add dependencies such as `axios` for API calls and AWS SDK if using it for Amazon integrations.
- Ensure ESLint and Prettier configurations are followed (see `eslint.config.mjs`).

## 8. Testing and Documentation
- Test all API integrations using curl commands (for any server-side endpoints that need to be verified) and unit tests on key functions.
- Update `README.md` with instructions on setting up environment variables, running the development server, and deployment steps.
- Include sample curl commands in the documentation for critical API endpoints.

---

**Summary:**
• A login page with role selection is created under `src/app/login/page.tsx` using `src/lib/auth.ts` for authentication.  
• Admin, Client, and Customer dashboards are built in separate routes to show respective data.  
• API integrations for Bitrix24, Amazon, and Zoho Books are encapsulated in `src/lib/api/bitrix.ts`, `amazon.ts`, and `zoho.ts` with robust error handling via environment variables.  
• Modern UI components and layouts are implemented with responsive design in `Layout.tsx` and `Navigation.tsx`, using only CSS for styling.  
• Environment variables are managed via `.env.local`, and API integration errors are handled gracefully with user-friendly messages.  
• The app adheres to best practices in error handling, code quality, and testing through ESLint and curl validation.  
• The overall structure allows for clean scalability and maintainability for additional roles or functionality.
