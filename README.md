# webapp

## Preparations

### Install Node.js Version Manager:

```bash
https://github.com/nvm-sh/nvm#installing-and-updating
```

```bash
nvm use
```

```bash
corepack enable && corepack prepare
```

### Installation

```bash
corepack pnpm i # If you don't have pnpm installed, run: corepack enable
```

## Usage

### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Testing

```bash
pnpm test:unit
```

### Docker Production Build

First, build the webapp image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t webapp:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 webapp:latest
```
