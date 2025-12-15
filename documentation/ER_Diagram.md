## **ENTITY RELATIONSHIP DIAGRAM (ERD)**

### **Alert-Service Database**

```
+-------------------------+
|    EmergencyReport      |
+-------------------------+
| PK: id (Long)           |
|     type (String)       |
|     description (String)|
|     locationLat (Double)|
|     locationLng (Double)|
|     timestamp (Date)    |
|     status (String)     |
|     reporterId (String) | ← External ID, no FK
+-------------------------+
```

### **Responder-Service Database**

```
+-------------------------+          +-------------------------+
|      Responder          |          |      Assignment         |
+-------------------------+          +-------------------------+
| PK: id (Long)           |          | PK: id (Long)           |
|     name (String)       |          |     emergencyId (Long)  | ← Stored value, no FK
|     role (String)       |          | FK: responderId (Long)  |---→ Responder.id
|     currentLat (Double) |          |     etaMinutes (int)    |
|     currentLng (Double) |          |     assignmentTime(Date)|
|     availability (Bool) |          |     syncStatus (String) |
+-------------------------+          +-------------------------+
            |                                    |
            +------------------------------------+
                           1 : *
```