# [WIP] Morpheus

Export your [Insomnia](https://insomnia.rest) workspace and test it in command line.

## Installation

```bash
yarn add @lano/morpheus
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

## Example

The generated snapshot will look like the following. Keep in mind that the `date` header is removed to not break the snapshots.

```js
Object {
  "body": "Created",
  "headers": Object {
    "connection": "close",
    "content-length": "7",
    "content-type": "text/plain; charset=utf-8",
  },
  "statusCode": 201,
}
```
