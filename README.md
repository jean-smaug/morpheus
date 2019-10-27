# Morpheus

Export your [Insomnia](https://insomnia.rest) workspace and test it in command line.

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
    "test:requests": "FILE=./__tests__/Insomnia.json morpheus"
  }
}
```
