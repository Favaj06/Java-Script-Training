# REST API - Session 1 Notes

## What is a REST API?

A REST API (Representational State Transfer API) is a web service that allows applications to communicate with each other using HTTP methods.

## Common HTTP Methods

| Method | Purpose |
|---------|---------|
| GET | Retrieve data |
| POST | Create new data |
| PUT | Replace existing data |
| PATCH | Update part of existing data |
| DELETE | Delete data |

## Common HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 OK | Request successful |
| 201 Created | Resource created successfully |
| 204 No Content | Request successful, no response body |
| 400 Bad Request | Invalid request |
| 401 Unauthorized | Authentication required |
| 403 Forbidden | Access denied |
| 404 Not Found | Resource not found |
| 500 Internal Server Error | Server error |

## URL Components

Example:

https://jsonplaceholder.typicode.com/posts?userId=1

- Base URL: https://jsonplaceholder.typicode.com
- Path: /posts
- Query String: ?userId=1

## Collection vs Single Resource

Collection:
/users

Single Resource:
/users/3

## JSONPlaceholder

JSONPlaceholder is a free fake REST API used for learning, testing, and prototyping.

# Section 2"
# HTTP Methods

## POST
- Used to create a new resource.
- Success Status Code: 201 Created

## PUT
- Used to completely replace an existing resource.
- The entire resource should be sent in the request body.

## PATCH
- Used to partially update an existing resource.
- Only the fields that need to change are sent.

## DELETE
- Used to remove a resource.
- Common success status codes:
  - 200 OK (response body included)
  - 204 No Content (no response body)

## Idempotent Methods

- GET 
- PUT 
- DELETE 

- POST 
- PATCH  (usually)

# Section 3:
# HTTP Status Codes

## Success Status Codes

| Code | Meaning |
|------|---------|
| 200 OK | Request completed successfully. |
| 201 Created | A new resource was created successfully. |
| 204 No Content | Request completed successfully with no response body. |

## Client Error Status Codes

| Code | Meaning |
|------|---------|
| 400 Bad Request | The request is invalid or missing required data. |
| 401 Unauthorized | Authentication is required or the token is invalid/expired. |
| 403 Forbidden | User is authenticated but does not have permission. |
| 404 Not Found | Requested resource does not exist. |
| 409 Conflict | Resource already exists or conflicts with current state. |

## Server Error Status Codes

| Code | Meaning |
|------|---------|
| 500 Internal Server Error | Unexpected server-side error. |

## Choosing the Correct Status Code

- Use **200 OK** for successful GET requests.
- Use **201 Created** when creating a new resource.
- Use **204 No Content** when deleting a resource without returning data.
- Use **400 Bad Request** for invalid request data.
- Use **401 Unauthorized** when authentication fails.
- Use **403 Forbidden** when the user lacks permission.
- Use **404 Not Found** when the requested resource does not exist.
- Use **500 Internal Server Error** for unexpected server failures.

# Section 4:
# Parameters in REST APIs

## Path Parameters

Path parameters identify a specific resource.

Example:

GET /interns/7

Here, `7` is the path parameter.

Use path parameters when identifying a single resource.

---

## Query Parameters

Query parameters filter, search, sort, or paginate data.

Examples:

GET /interns?role=Frontend

GET /interns?name=Rahu

GET /interns?limit=5&sort=score_desc

Use query parameters when filtering or modifying the returned result set.

---

## HTTP Headers

Headers provide additional information about a request.

Common Headers:

- Authorization
- Accept
- Content-Type

Example:

Authorization: Bearer <token>

---

## Authorization

A Bearer token is commonly used to authenticate users.

If the token is:

- Missing → 401 Unauthorized
- Invalid or Expired → 401 Unauthorized
- Valid but lacks permission → 403 Forbidden

---

## 401 vs 403

401 Unauthorized

- Authentication failed.
- User must log in again.

403 Forbidden

- Authentication succeeded.
- User does not have permission to access the resource.

---

## REST API Design

Good REST APIs use:

- Nouns instead of verbs
- Proper HTTP methods
- Meaningful status codes
- Path parameters for resources
- Query parameters for filtering

# Section 5:

# curl Mastery

## Verbose Mode (-v)

The `-v` option enables verbose output.

It displays:

- DNS lookup
- TCP/TLS connection
- Request headers
- Response headers
- Response body

---

## Request Headers

Lines beginning with:

```
>
```

represent headers sent from the client to the server.

Example:

```
> GET /users/1 HTTP/1.1
> Host: jsonplaceholder.typicode.com
> User-Agent: curl/...
```

---

## Response Headers

Lines beginning with:

```
<
```

represent headers returned by the server.

Example:

```
< HTTP/1.1 200 OK
< Content-Type: application/json
```

---

## Host Header

The `Host` header identifies the server being requested.

Example:

```
Host: jsonplaceholder.typicode.com
```

curl automatically sends this header.

---

## Content-Type

The `Content-Type` header tells the server what format the request body uses.

Example:

```
Content-Type: application/json
```

Many production APIs require this header for POST, PUT, and PATCH requests.

---

## Layered Architecture

Typical application flow:

```
UI
 ↓
Service Layer
 ↓
Repository/API Layer
 ↓
Database/API
```

The Service Layer contains business logic and coordinates communication between the UI and the data layer.

---

## Error Responses

A good REST API returns structured error responses.

Example:

```json
{
  "status":404,
  "error":"Not Found",
  "message":"Resource not found",
  "timestamp":"2026-07-28T10:15:00Z"
}
```

# Section 6:
# REST API Design Principles

## Use Nouns Instead of Verbs

REST endpoints should represent resources (nouns), not actions (verbs).

✅ Good

GET /interns

POST /interns

DELETE /interns/42

❌ Bad

GET /getAllInterns

POST /deleteIntern

GET /createIntern

---

## Use HTTP Methods Properly

| Method | Purpose |
|---------|---------|
| GET | Read data |
| POST | Create data |
| PUT | Replace an entire resource |
| PATCH | Partially update a resource |
| DELETE | Remove a resource |

---

## Resource Relationships

Nested resources express ownership.

Examples:

GET /interns/7/attendance

GET /interns/7/projects

GET /projects/3/interns

---

## Resource Ownership

Choose the parent resource based on the main entity being managed.

Example:

If managing an intern's projects:

POST /interns/{id}/projects/{projectId}

If managing members of a project:

POST /projects/{id}/interns/{internId}

Both are valid depending on the application's design.

---

## Good REST API Characteristics

- Resource-oriented URLs
- Proper HTTP methods
- Meaningful status codes
- Stateless communication
- Consistent naming conventions
