# agents.md

## Coding Standards

- Use strict TypeScript and avoid `any`
- Prefer small reusable components over large page-level implementations
- Keep UI state local unless shared state is clearly required
- Use Chakra UI primitives and patterns for all interface work
- Keep animations subtle and purposeful

## Naming Conventions

- Components: `PascalCase`
- Hooks: `useCamelCase`
- Utility functions and variables: `camelCase`
- Types and interfaces: `PascalCase`
- File names: match exported symbol names where practical

## Folder Structure Rules

- `src/components`: shared presentational building blocks
- `src/pages`: page-level composition
- `src/features`: domain-specific UI and feature modules
- `src/hooks`: reusable React hooks
- `src/types`: shared TypeScript types
- `src/utils`: constants and pure helpers

## Commit Rules

- Use conventional commit messages
- Keep commits focused and logically grouped
- Do not mix refactors with unrelated feature work

## Tech Stack Rules

- Frontend must remain React + TypeScript + Vite
- Chakra UI is the primary component library
- Framer Motion is the approved animation library
- Lucide React is the approved icon library
- Future backend work should target Vercel Functions first
