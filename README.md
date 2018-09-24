# Pen 9
An online note taking web application.

## Requirements
* MongoDB Database
* Node.JS
* NPM

## Example `config.json`
```json
{
  "port": 8181,
  "db": {
    "string": "mongodb://localhost:27017/pen9"
  }
}
```
Key | Description | Example | Optional
--- | --- | --- | ---
port | The port to listen for requests on | 80 |
db | Config used for the mongoDB client. | |
string | The connection string | `mongodb://localhost:27017/pen9` | 
