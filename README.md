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
    "test:api": "morpheus"
  }
}
```

You can specify a file name using the `FILE` env variable

```json
{
  "scripts": {
    "test:api": "FILE=./__tests__/Insomnia.json morpheus"
  }
}
```

## Example

The generated snapshot will look like the following. Keep in mind that the `date` header is removed to not break the snapshots.

```js
Object {
  "body": Object {
    "id": 1,
    "name": "Luffy",
  },
  "description": "Tu crois que c'est du respect mon garçon ?",
  "headers": Object {
    "connection": "close",
    "content-length": "23",
    "content-type": "application/json; charset=utf-8",
  },
  "statusCode": 200,
}
```
