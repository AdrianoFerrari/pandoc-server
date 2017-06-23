# Pandoc: Docx to Markdown

Send a docx file to server (via POST), and receive markdown string response.

## Installation

With node installed.

```
npm i
node index.js
```

Server should now be running on localhost:3000

## Example Usage

If `inputfile.docx` is a file in current directory, then do:

```
curl -X POST http://localhost:3000 -H "Content-Type: application/octet-stream" --data-binary "@inputfile.docx"

```

(or add `> outputfile.md` to save)
