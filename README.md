# Books API

A REST API to explore books with search, author filter, date range, pagination, and sorting.

## Features

- Full-text search in `name`, `description`, and `author`
- Filter by author (case-insensitive)
- Filter by publish date range
- Pagination and sorting by `name`, `author`, or `publishDate`

## Setup

### Clone the repo

```bash
git clone https://github.com/Alok-jena-tech/Book_Api.git
cd Book_Api
npm install

Run the server:
# Start normally
npm run start       # => node server.js

# Start with nodemon
npm run dev         # => nodemon server.js

# Seed the database
npm run seed        # => node seed.js

Configure environment
Create a `.env` file in the project root with the following content:
MONGO_URI
PORT


API Usage
GET api/bookExplore → query params: search, author, from, to, page, limit, sortBy, sortOrder

Query parameters:
search      : string          # search by name, description, or author
author      : string          # exact match, case-insensitive
from        : YYYY-MM-DD      # start publish date
to          : YYYY-MM-DD      # end publish date
page        : integer         # default 1
limit       : integer         # default 10, max 50
sortBy      : name | author | publishDate
sortOrder   : asc | desc      # default desc

Response:
{
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "data": [
        {
            "_id": "68dcdcd3151b3b4bc1570d85",
            "name": "kalijai r sandya",
            "description": "this is all about kalijai tample",
            "author": "fakir mohan senapati",
            "publishDate": "1949-03-25T00:00:00.000Z",
            "createdAt": "2025-10-01T07:48:35.472Z",
            "updatedAt": "2025-10-01T07:48:35.472Z",
            "__v": 0
        }
    ]
}

Create a new book

POST /api/create → create new book with JSON body
Body (JSON):
 {
    name: "The Silent Spring",
    description: "Classic environmental science book raising awareness about pesticides.",
    author: "Rachel Carson",
    publishDate: "1962-09-27",
  }
Response:
{
    "name": "kalijai r sandya",
    "description": "this is all about kalijai tample",
    "author": "fakir mohan senapati",
    "publishDate": "1949-03-25T00:00:00.000Z",
    "_id": "68dcdcd3151b3b4bc1570d85",
    "createdAt": "2025-10-01T07:48:35.472Z",
    "updatedAt": "2025-10-01T07:48:35.472Z",
    "__v": 0
}
