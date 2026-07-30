<h1 align="center">Fefade UI Svelte</h1>

[![license](https://img.shields.io/github/license/fefade/ui)](https://github.com/fefade/ui/blob/master/LICENSE)
![Svelte](https://img.shields.io/badge/Svelte-5-orange)

Svelte implementation of Fefade UI components.

This package provides Svelte components powered by the Fefade UI core system. It
requires `@fefade-ui/core` to provide themes, utilities, and the foundation used
across Fefade UI packages.

## Installation

```bash
npm install @fefade-ui/core @fefade-ui/svelte
```

or

```bash
pnpm add @fefade-ui/core @fefade-ui/svelte
```

## Usage

```svelte
<script lang="ts">
	import { Button } from "@fefade-ui/svelte"
</script>

<Button>Click</Button>
```

## Requirements

- `@fefade-ui/core` must be installed alongside this package
- Svelte 5+
- TypeScript support recommended

## Svelte Integration

- Native Svelte components
- Full TypeScript support
- Component props and slots
- Reactive component API
- Compatible with modern Svelte tooling

## Styling

Components use the Fefade UI theme system provided by `@fefade-ui/core`.

Customize your application using the shared CSS variables and theme
configuration from the core package.

## Components

The available components follow the same API and design principles across all
Fefade UI framework packages.

Documentation:

https://ui.fefade.com

## License

MIT — free for personal and commercial use.
