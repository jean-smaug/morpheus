# Morpheus

Export your [Insomnia](https://insomnia.rest) workspace and test it in command line.

![demo](demo.gif)

## Installation

```bash
yarn add -DE @lano/morpheus jest
```

## Usage

By default Morpheus search look for a file named `/Insomnia.*\.json/i`

```json
{
  "scripts": {
    "test:api": "morpheus"
  }
}
```

## Example

The generated snapshot will look like the following. Keep in mind that the `date` header is removed to not break the snapshots.

```js
Object {
  "body": "OK",
  "description": "",
  "headers": Object {
    "connection": "close",
    "content-length": "2",
    "content-type": "text/plain; charset=utf-8",
  },
  "statusCode": 200,
  "url": "http://localhost:5000/auth/basic",
}
```

## To do

In `file.ts` take the most recent file using fs.statSync is there are multiples Insomnia files
