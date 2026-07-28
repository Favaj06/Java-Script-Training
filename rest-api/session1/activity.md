# REST API - Session 1 Activity

## Section 1 — Reading Existing APIs

### Task 1.1 — Make your first GET request

Run the following and observe the response:

```bash
curl -i https://jsonplaceholder.typicode.com/users
```

Answer in a comment:
- What is the status code?
- What is the Content-Type header value?
- How many users are returned?
- What is the URL structure — collection or single resource?

---

### Task 1.2 — Get a single resource

```bash
curl -i https://jsonplaceholder.typicode.com/users/3
```

Then try a resource that does not exist:

```bash
curl -i https://jsonplaceholder.typicode.com/users/9999
```

Answer:
- What status code did the second request return?
- What was in the response body for the 404?
- What does this tell you about how this API handles "not found"?

---

### Task 1.3 — Use a query parameter

```bash
curl -i "https://jsonplaceholder.typicode.com/posts?userId=1"
```

Answer:
- How many posts were returned?
- Which part of the URL is the path? Which part is the query string?
- Could you use a path parameter instead (`/users/1/posts`)? Try it:

```bash
curl -i https://jsonplaceholder.typicode.com/users/1/posts
```

- Do both return the same results? Which URL style do you prefer and why?

# Section 2:
## Task 2.1 — POST: Create a resource

```bash
curl -X POST ...
```

Answer:
- What status code was returned?
- What is in the response body? What id was assigned?
- Did the Location header appear?

> Write a comment:
> What would happen if you sent the same POST request a second time?
> What status code should a well-designed API return on a duplicate?

# Section 3 — Status Codes

## Task 3.1 — Map the codes

For each scenario below, write the status code you would return and why:

| Scenario | Status code | Reason |
|----------|------------|--------|
| GET /interns — 15 interns found | | |
| POST /interns — intern created successfully | | |
| DELETE /interns/42 — deleted, no body needed | | |
| GET /interns/9999 — this intern does not exist | | |
| POST /interns — request body is missing `name` field | | |
| GET /interns — user is not logged in | | |
| GET /interns/42 — user is logged in but only admins can see this | | |
| POST /interns — database crashed | | |

---

## Task 3.2 — Spot the wrong status codes

Each API response below has a bug. Identify what is wrong and what the correct code should be:

### Bug A

```text
GET /interns/99
→ 200 OK
→ { "error": "Intern not found" }
```

### Bug B

```text
POST /interns (body is valid, intern is created)
→ 200 OK
→ { "id": 44, "name": "Priya" }
```

### Bug C

```text
DELETE /interns/42 (deleted successfully)
→ 200 OK
→ { "message": "deleted" }
```

### Bug D

```text
GET /interns (user has a valid token but it expired yesterday)
→ 403 Forbidden
```

> **Write a comment:** Why does returning `200 OK` with `{ "error": "..." }` break API consumers?
> (Hint: Think about what a frontend developer writes when they see a `200` status.)

# Section 3 — Status Codes

## Task 3.1 — Map the codes

For each scenario below, write the status code you would return and why:

| Scenario | Status code | Reason |
|----------|------------|--------|
| GET /interns — 15 interns found | | |
| POST /interns — intern created successfully | | |
| DELETE /interns/42 — deleted, no body needed | | |
| GET /interns/9999 — this intern does not exist | | |
| POST /interns — request body is missing `name` field | | |
| GET /interns — user is not logged in | | |
| GET /interns/42 — user is logged in but only admins can see this | | |
| POST /interns — database crashed | | |

---

## Task 3.2 — Spot the wrong status codes

Each API response below has a bug. Identify what is wrong and what the correct code should be.

### Bug A

```text
GET /interns/99
→ 200 OK
→ { "error": "Intern not found" }
```

### Bug B

```text
POST /interns (body is valid, intern is created)
→ 200 OK
→ { "id": 44, "name": "Priya" }
```

### Bug C

```text
DELETE /interns/42 (deleted successfully)
→ 200 OK
→ { "message": "deleted" }
```

### Bug D

```text
GET /interns (user has a valid token but it expired yesterday)
→ 403 Forbidden
```

### Questions

- What is wrong with each response?
- What should the correct status code be?

> **Write a comment:** Why does returning `200 OK` with `{ "error": "..." }` break API consumers?
> *(Hint: Think about what a frontend developer writes when they see a `200` status.)*

# Section 4 — Parameters

## Task 4.1 — Path vs Query

For each request below, decide whether the highlighted value should be a path parameter or a query parameter. Rewrite the URL in the correct form.

### Scenario A
Get a specific intern by ID.

**Correct URL:** ___________

### Scenario B
Get interns whose role is **Frontend**.

**Correct URL:** ___________

### Scenario C
Get the first **5** interns, sorted by **score descending**.

**Correct URL:** ___________

### Scenario D
Get attendance records for intern **42**.

**Correct URL:** ___________

### Scenario E
Get interns whose name contains **"Rahu"**.

**Correct URL:** ___________

---

## Task 4.2 — Headers in curl

Run the following command:

```bash
curl -i https://jsonplaceholder.typicode.com/users \
  -H "Authorization: Bearer my-fake-token" \
  -H "Accept: application/json"
```

Answer:

- Did the fake token cause a 401? Why not?
- In a real API, what would the server do with the Authorization header?
- What is the difference between 401 and 403 in terms of the Authorization header?

---

## Task 4.3 — Design the Intern Dashboard API

Fill in the following table.

| Action | Method | URL | Request Body | Expected Status |
|--------|--------|-----|--------------|-----------------|
| List all interns | | | | |
| Get intern #7 | | | | |
| Create a new intern | | | name, role, score, isPresent | |
| Update intern #7's score only | | | | |
| Replace intern #7 entirely | | | | |
| Delete intern #7 | | | | |
| List interns with role = Backend | | | | |
| Get all attendance for intern #7 | | | | |

> **Write a comment:** Would you have a separate `/attendance` resource or would you nest it under `/interns/{id}/attendance`? Explain the tradeoffs.

# Section 5 — curl Mastery

## Task 5.1 — Verbose debugging

Run the following command:

```bash
curl -v https://jsonplaceholder.typicode.com/users/1
```

Identify in the output:

- Lines starting with `>` — Request headers sent by curl.
- Lines starting with `<` — Response headers received from the server.
- The blank line that separates headers from the body.
- The `Host` header — What value does curl send automatically?

---

## Task 5.2 — Chain requests (Intermediate)

### Step 1 — Create

```bash
curl -s -X POST https://jsonplaceholder.typicode.com/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"My intern","body":"score 92","userId":1}'
```

### Step 2 — Get the created resource

```bash
curl -i https://jsonplaceholder.typicode.com/posts/<id-from-step-1>
```

> **Write a comment:** In a real application, which layer should make the POST request — the UI component, the service layer, or the repository layer? Explain your answer.

---

## Task 5.3 — Error Handling (Stretch)

Run the following command without the `Content-Type` header:

```bash
curl -X POST https://jsonplaceholder.typicode.com/posts \
  -d '{"title":"missing header","body":"no content type","userId":1}'
```

Then make a request to a non-existent endpoint:

```bash
curl -i https://jsonplaceholder.typicode.com/nonexistent
```

Answer:

- What happened when the `Content-Type` header was missing? Did it work? Should it?
- What status code did the non-existent endpoint return?
- What should a production API return in the body of a `400` or `404` response?

# Section 6 — Design Challenge

## Task 6.1 — Spot the Design Mistakes

Each endpoint below has a REST design mistake. Identify the mistake and suggest a fix.

### Mistake A

```text
GET /getAllInterns
```

### Mistake B

```text
POST /interns/delete/42
```

### Mistake C

```text
GET /createIntern?name=Rahul&role=Frontend&score=88
```

### Mistake D

```text
POST /interns/42/updateScore

Body:
{
  "score": 95
}
```

### Mistake E

```text
DELETE /interns?id=42
```

---

## Task 6.2 — Design a New Resource

The intern dashboard needs to support **Projects**. An intern can be assigned to multiple projects.

Design the REST API for:

- List all projects
- Get a specific project
- Create a project
- List all projects an intern is assigned to
- Assign an intern to a project
- Remove an intern from a project

For each action, specify:

- HTTP Method
- URL
- Expected Status Code

> **Write a comment:** Is `POST /projects/{id}/interns/{internId}` a good endpoint for assigning an intern, or should it be `POST /interns/{id}/projects/{projectId}`? What determines which resource is the owner?