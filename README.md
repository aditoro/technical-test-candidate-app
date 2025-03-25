## Workspaces
  - app: Angular app
  - api: nestjs rest api 

## Requirements
 - Node LTS 22.14.0

## Project setup
```bash
$ cd <root_folder>
$ npm install
```

##  Run the project
Need run app and api in two separate terminal
- app: http://localhost:4020
```bash
$ cd <root_folder>
$ npm start --workspace=app 
```

- api: http://localhost:3000
```bash
$ cd <root_folder>
$ npm start --workspace=api
```

## Test
```bash
$ cd <root_folder>
$ npm test --workspaces
```
