# REST API - Session 1 Answers
# Section 1:
## Task 1.1

### Command

```bash
curl.exe -i https://jsonplaceholder.typicode.com/users
```

### Answers

- **Status Code:** 200 OK
- **Content-Type:** application/json; charset=utf-8
- **Number of Users Returned:** 10
- **URL Structure:** Collection Resource (`/users`)

---

## Task 1.2

### Commands

```bash
curl.exe -i https://jsonplaceholder.typicode.com/users/3
```

```bash
curl.exe -i https://jsonplaceholder.typicode.com/users/9999
```

### Answers

- **Status Code (Second Request):** 404 Not Found
- **Response Body:** `{}`

**Explanation:**

The API returns **404 Not Found** with an empty JSON object when the requested resource does not exist. This informs the client that the requested resource could not be found.

---

## Task 1.3

### Commands

```bash
curl.exe -i "https://jsonplaceholder.typicode.com/posts?userId=1"
```

```bash
curl.exe -i https://jsonplaceholder.typicode.com/users/1/posts
```

### Answers

- **Number of Posts Returned:** 10

- **Path:** `/posts`

- **Query String:** `?userId=1`

- **Can a path parameter be used?**
  - Yes. `/users/1/posts` can also be used.

- **Do both return the same results?**
  - Yes. Both URLs return the same 10 posts.

- **Preferred URL Style**
  - I prefer `/users/1/posts` because it clearly represents the relationship between the user and their posts, making the API more readable and RESTful.

# Section 2:
# Section 2 – HTTP Methods

---

## Task 2.1 – POST: Create a Resource

### Command

```bash
curl.exe -X POST https://jsonplaceholder.typicode.com/posts ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"REST is easy\",\"body\":\"Once you know the verbs\",\"userId\":1}"
```

### Answers

- **Expected Status Code:** 201 Created
- **Response Body:** Returns the created resource with the submitted fields and a newly assigned `id` (typically `101` in JSONPlaceholder).
- **Location Header:** No. JSONPlaceholder does not return a `Location` header, which is a difference from many production APIs.

### Comment

If the same POST request is sent again, JSONPlaceholder creates another resource instead of treating it as a duplicate.

In a well-designed API, if duplicate creation is not allowed, the server should return:

**409 Conflict**

---

## Task 2.2 – PUT: Replace a Resource

### PUT Command

```bash
curl.exe -X PUT https://jsonplaceholder.typicode.com/posts/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"id\":1,\"title\":\"Replaced title\",\"body\":\"All fields replaced\",\"userId\":1}"
```

### PATCH Command

```bash
curl.exe -X PATCH https://jsonplaceholder.typicode.com/posts/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"title\":\"Just the title changed\"}"
```

### Answers

**PUT Response**

Contains the complete resource:

- id
- title
- body
- userId

**PATCH Response**

Contains the updated resource, where only the provided field (`title`) was changed while the remaining fields stay unchanged.

### Why did PATCH only need one field?

PATCH is used for partial updates. Only the fields that need modification are sent to the server.

### When would you choose PUT over PATCH?

Use **PUT** when replacing an entire resource.

Example:

Replacing all employee details in an Intern Dashboard.

Use **PATCH** when changing only one or two fields.

Example:

Updating only an employee's phone number or email.

---

## Task 2.3 – DELETE: Remove a Resource

### Command

```bash
curl.exe -i -X DELETE https://jsonplaceholder.typicode.com/posts/1
```

### Answers

- **Expected Status Code:** 200 OK
- **Response Body:** `{}` (empty JSON object)

### Which is better, 200 or 204?

Both are valid.

- **200 OK** → Used when the server returns a response body.
- **204 No Content** → Preferred when nothing needs to be returned after deletion.

Most REST APIs prefer **204 No Content** because the resource has already been deleted and no additional data is required.

# Section 3:
# Section 3 – Status Codes

---

## Task 3.1 – Map the Codes

| Scenario | Status Code | Reason |
|----------|-------------|--------|
| GET /interns — 15 interns found | **200 OK** | Request completed successfully and data was returned. |
| POST /interns — intern created successfully | **201 Created** | A new intern resource was created. |
| DELETE /interns/42 — deleted, no body needed | **204 No Content** | Resource deleted successfully and no response body is required. |
| GET /interns/9999 — this intern does not exist | **404 Not Found** | The requested resource does not exist. |
| POST /interns — request body is missing `name` field | **400 Bad Request** | Required request data is missing. |
| GET /interns — user is not logged in | **401 Unauthorized** | Authentication is required. |
| GET /interns/42 — user is logged in but only admins can see this | **403 Forbidden** | User is authenticated but does not have permission. |
| POST /interns — database crashed | **500 Internal Server Error** | An unexpected server error occurred. |

---

## Task 3.2 – Spot the Wrong Status Codes

### Bug A

**Wrong:** `200 OK`

**Correct:** `404 Not Found`

**Reason:** The requested intern does not exist.

---

### Bug B

**Wrong:** `200 OK`

**Correct:** `201 Created`

**Reason:** A new intern resource was successfully created.

---

### Bug C

**Current:** `200 OK`

**Better Choice:** `204 No Content`

**Reason:** The resource was deleted successfully and no response body is needed.

---

### Bug D

**Wrong:** `403 Forbidden`

**Correct:** `401 Unauthorized`

**Reason:** The authentication token has expired, so the user must authenticate again.

---

## Comment

Returning **200 OK** with an error message such as `{ "error": "Intern not found" }` breaks API consumers because many frontend applications treat any **200** response as a successful request. This can cause the frontend to process invalid data instead of handling the error correctly. Proper status codes allow client applications to detect and respond to errors reliably.

# Section 4 – Parameters

---

## Task 4.1 – Path vs Query

### Scenario A

Get a specific intern by ID

**Correct URL**

```text
GET /interns/7
```

Uses a **path parameter** because it identifies a specific resource.

---

### Scenario B

Get interns whose role is Frontend

```text
GET /interns?role=Frontend
```

Uses a **query parameter** because it filters the collection.

---

### Scenario C

Get the first 5 interns sorted by score descending

```text
GET /interns?limit=5&sort=score_desc
```

Uses **query parameters** because they control filtering, sorting, and pagination.

---

### Scenario D

Get attendance records for intern 42

```text
GET /interns/42/attendance
```

Uses a **path parameter** because attendance belongs to a specific intern.

---

### Scenario E

Get interns whose name contains "Rahu"

```text
GET /interns?name=Rahu
```

Uses a **query parameter** because it searches/filter results.

---

## Task 4.2 – Headers in curl

### Command

```powershell
curl.exe -i https://jsonplaceholder.typicode.com/users `
  -H "Authorization: Bearer my-fake-token" `
  -H "Accept: application/json"
```curl.exe -v https://jsonplaceholder.typicode.com/users/1

### Answers

**Did the fake token cause a 401? Why not?**

No. JSONPlaceholder is a fake REST API and does not validate Authorization headers.

---

**In a real API, what would the server do?**

The server would verify the Bearer token. If the token is valid, the request proceeds. Otherwise, it returns **401 Unauthorized**.

---

**Difference between 401 and 403**

- **401 Unauthorized** → Authentication failed or token is missing/expired.
- **403 Forbidden** → User is authenticated but does not have permission.

---

## Task 4.3 – Design the Intern Dashboard API

| Action | Method | URL | Request Body | Expected Status |
|--------|--------|-----|--------------|-----------------|
| List all interns | GET | /interns | None | 200 OK |
| Get intern #7 | GET | /interns/7 | None | 200 OK |
| Create a new intern | POST | /interns | name, role, score, isPresent | 201 Created |
| Update intern #7's score only | PATCH | /interns/7 | score | 200 OK |
| Replace intern #7 entirely | PUT | /interns/7 | id, name, role, score, isPresent | 200 OK |
| Delete intern #7 | DELETE | /interns/7 | None | 204 No Content |
| List interns with role = Backend | GET | /interns?role=Backend | None | 200 OK |
| Get all attendance for intern #7 | GET | /interns/7/attendance | None | 200 OK |

---

## Comment

I would prefer **`/interns/{id}/attendance`** because attendance belongs to a specific intern and the relationship is clear.

A separate **`/attendance`** resource is useful when querying attendance across all interns, such as filtering by date or generating reports.

Using nested resources improves readability, while separate resources provide more flexibility for global attendance queries.

# Section 5 – curl Mastery

---

## Task 5.1 – Verbose Debugging

### Answers

- Lines beginning with `>` are the **request headers** sent by curl.
- Lines beginning with `<` are the **response headers** returned by the server.
- A blank line separates the HTTP headers from the response body.
- curl automatically sends:

```
Host: jsonplaceholder.typicode.com
```

---

## Task 5.2 – Chain Requests

### Step 1

A POST request creates a new resource and returns a response containing an assigned `id` (typically `101` in JSONPlaceholder).

### Step 2

The returned `id` is then used to make a GET request for that resource.

### Comment

In a real application, the **Service Layer** should make the POST request.

Reason:

- The UI should only handle user interaction.
- The Service Layer contains business logic and coordinates API calls.
- The Repository/API Layer is responsible for communicating with the database or external APIs.

This separation improves maintainability, testing, and code organization.

---

## Task 5.3 – Error Handling

### Answers

**What happened when the Content-Type header was missing?**

JSONPlaceholder still accepted the request because it is a fake API designed for testing.

In a production API, the server should require the correct `Content-Type` (`application/json`) and may reject the request with **400 Bad Request** or **415 Unsupported Media Type** if the header is missing or incorrect.

---

**What status code did the non-existent endpoint return?**

```
404 Not Found
```

---

**What should a production API return for a 400 or 404 response?**

A structured JSON error response, for example:

```json
{
  "status": 404,
  "error": "Not Found",
  "message": "The requested resource was not found."
}
```

This helps clients understand and handle errors consistently.

# Section 6:
# Section 6 – Design Challenge

---

## Task 6.1 – Spot the Design Mistakes

### Mistake A

**Wrong**

```text
GET /getAllInterns
```

**Correct**

```text
GET /interns
```

**Reason**

REST APIs should use resource names (nouns), not action names (verbs).

---

### Mistake B

**Wrong**

```text
POST /interns/delete/42
```

**Correct**

```text
DELETE /interns/42
```

**Reason**

Deleting a resource should use the DELETE HTTP method.

---

### Mistake C

**Wrong**

```text
GET /createIntern?name=Rahul&role=Frontend&score=88
```

**Correct**

```text
POST /interns
```

**Request Body**

```json
{
  "name": "Rahul",
  "role": "Frontend",
  "score": 88
}
```

**Reason**

GET should never create resources. POST is the correct method.

---

### Mistake D

**Wrong**

```text
POST /interns/42/updateScore
```

**Correct**

```text
PATCH /interns/42
```

**Request Body**

```json
{
  "score": 95
}
```

**Reason**

PATCH is used for partial updates.

---

### Mistake E

**Wrong**

```text
DELETE /interns?id=42
```

**Correct**

```text
DELETE /interns/42
```

**Reason**

The resource identifier should be a path parameter.

---

## Task 6.2 – Design a New Resource

| Action | Method | URL | Status |
|---------|--------|-----|--------|
| List all projects | GET | /projects | 200 OK |
| Get a specific project | GET | /projects/{id} | 200 OK |
| Create a project | POST | /projects | 201 Created |
| List projects assigned to an intern | GET | /interns/{id}/projects | 200 OK |
| Assign an intern to a project | POST | /projects/{id}/interns/{internId} | 201 Created |
| Remove an intern from a project | DELETE | /projects/{id}/interns/{internId} | 204 No Content |

---

## Comment

Both endpoints are valid:

- `POST /projects/{id}/interns/{internId}`
- `POST /interns/{id}/projects/{projectId}`

The choice depends on the **owner resource**.

If the application mainly manages **projects and their assigned interns**, then `/projects/{id}/interns/{internId}` is more appropriate.

If the application mainly manages **interns and the projects assigned to them**, then `/interns/{id}/projects/{projectId}` is more appropriate.

The owner resource is determined by the primary relationship and how the API is designed around the application's business domain.