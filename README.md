# Morpheus

Export your [Insomnia](https://insomnia.rest) workspace and test it in command line.

This package require Jest to work, because it's using Jest's snapshots.

## Installation

```bash
yarn add @jeansmaug/morpheus
```

## Usage

By default Morpheus will look for a file named `/Insomnia.*\.json/i`

```json
{
  "scripts": {
    "test:requests": "morpheus"
  }
}
```

You can specify a file name using the `--file` option

```json
{
  "scripts": {
    "test:requests": "morpheus --file ./__tests__/Insonia.json"
  }
}
```
