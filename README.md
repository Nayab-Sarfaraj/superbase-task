## 📄 SQL File Design Choices

- **id column**: Picked `uuid` type to ensure uniqueness and avoid collisions across distributed systems.
- **title column**: Used `text` type to handle varying length content.
- **content column**: Used `text` type to handle varying length content.
- **created_at column**: Used `timestamp with time zone` and defaulted to `now()` so every note automatically records the exact creation time (including timezone info).
- **user_id column**: Used `uuid` type to match Supabase Auth's `user.id`.

---
## 🚀 Curl Commands

### Get Notes
```bash
curl --location 'https://lbmgtgjxhorenruvglmx.supabase.co/functions/v1/get_notes' \
--header 'Authorization: Bearer <your-access-token>'  
```

### Post Notes
```bash
curl --location 'https://lbmgtgjxhorenruvglmx.supabase.co/functions/v1/get_notes' \
--header 'Authorization: Bearer <your-access-token>'\
--header 'Content-Type: application/json' \
--data '{
	"title":"my title",
    "content":"my content"
  
}'
```

---

### Sample Output
```bash
[
    {
        "id": "757b425a-f8a0-49d4-b092-337b6c732608",
        "user_id": "bf23f2d7-96ef-4227-aa9e-bba4a2336350",
        "title": "my title",
        "content": "my content",
        "created_at": "2025-05-06T19:23:44.265957+00:00"
    }
]
```




