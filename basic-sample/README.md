- Set Up Env
  Replace your data on .env file

```bash
NOTION_SECRET_KEY=xxx
NOTION_DATABASE_ID=yyy
```

- Do Write

```bash
$ time node -r esm doWrite.js
```

- Do Read

```bash
$ time node -r esm doRead.js | jq
```