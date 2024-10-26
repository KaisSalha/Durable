# Kais take-home for Durable

[![CI](https://github.com/KaisSalha/Durable/actions/workflows/ci.yml/badge.svg)](https://github.com/KaisSalha/Durable/actions/workflows/ci.yml)
![Coverage](./badges/coverage-total.svg)

A beautiful static blog using Next.js with markdown support.

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Writing Posts

1. Create a new `.md` file in the `_posts` directory, the filename will be used as the slug for the post
2. Add the following frontmatter at the top of your markdown file:
    ```markdown
    ---
    title: "Your Post Title"
    date: "2024-10-24"
    excerpt: "A brief description of your post"
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop"
    ---
    ```
3. Write your post content in markdown below the frontmatter

## Testing

The project includes a comprehensive test suite using Vitest and Testing Library:

-   **Unit Tests**: Test individual components and utilities

    ```bash
    npm run test          # Run tests
    npm run test:watch    # Run tests in watch mode
    npm run coverage      # Generate coverage report
    ```

-   **E2E Tests**: Test full user flows with Playwright
    ```bash
    npm run test:e2e     # Run e2e tests
    npm run test:e2e:ui  # Run e2e tests with UI
    ```

### Test Structure

-   `__tests__/components/`: Component tests
-   `__tests__/lib/`: Utility function tests
-   `__tests__/utils/`: Helper function tests
-   `e2e/`: End-to-end tests

### Coverage Goals

-   All new features must include tests
-   E2E tests for critical user flows

## Building for Production

This project is configured for static exports, making it perfect for deployment on static hosting platforms.

1. Build the static site:
    ```bash
    npm run build
    ```
2. The static site will be generated in the `out` directory
3. You can preview the built site locally:
    ```bash
    npx serve out
    ```

When deploying to Vercel, the platform will automatically:

-   Run `npm run build` to generate the static export
-   Optimize and serve the static files from the `out` directory
-   Enable instant static page serving through their global edge network

## Deployment

This project is configured for static site generation using Next.js's `output: "export"` configuration.

When deploying to Vercel:

1. Connect your GitHub repository to Vercel:

    - Go to [Vercel](https://vercel.com)
    - Import your repository
    - Vercel will automatically detect Next.js settings

2. Vercel automatically handles:
    - Production deployments from the `master` branch
    - Preview deployments for all Pull Requests
    - Instant rollbacks if needed
    - Static file optimization and delivery through their global edge network

The Vercel GitHub integration provides:

-   Automatic deployments
-   Preview deployments for PRs
-   Deploy comments on PRs
-   Branch protection rules
-   Deploy statuses in GitHub

## Project Structure

-   `_posts/`: Markdown files for blog posts
-   `app/`: Next.js app directory
-   `components/`: UI components
-   `lib/`: Utility functions and blog helpers

## License

MIT
