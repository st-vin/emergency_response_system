# **EMERGENCY RESPONSE SYSTEM - COMPLETE DESIGN**

---

## **1. USE CASE DIAGRAM**

```
                   +--------------------+
                   |     Mobile User    |
                   +--------------------+
                     /         |         \
                    /          |          \
                   v           v           v
        +----------------+  +------------------+  +----------------+
        | Report         |  | View Assignment  |  | Track ETA      |
        | Emergency      |  | Details          |  |                |
        +----------------+  +------------------+  +----------------+

                   +--------------------+
                   |   Responder        |
                   +--------------------+
                      |          |
                      v          v
            +----------------+  +----------------+
            | Accept Case    |  | Update Status |
            +----------------+  +----------------+

                   +---------------------+
                   |  Dispatcher/Admin   |
                   +---------------------+
                            |
                            v
                   +---------------------+
                   | Monitor Incidents   |
                   +---------------------+
```

---

## **2. UML API CONTRACT**

### **A. ENTITY UML DIAGRAMS**

#### **Alert-Service Entities**

**EmergencyReport**

```
+------------------------------------------------------+
|                   EmergencyReport                    |
+------------------------------------------------------+
| - id: Long                                           |
| - type: String                                       |
| - description: String                                |
| - locationLat: Double                                |
| - locationLng: Double                                |
| - timestamp: Date                                    |
| - status: String                                     |
| - reporterId: String (external ID, not FK)           |
+------------------------------------------------------+
| + getId(): Long                                      |
| + getType(): String                                  |
| + setStatus(String)                                  |
+------------------------------------------------------+
```

#### **Responder-Service Entities**

**Responder**

```
+------------------------------------------------------+
|                     Responder                        |
+------------------------------------------------------+
| - id: Long                                           |
| - name: String                                       |
| - role: String (MEDIC, POLICE, FIRE)                 |
| - currentLat: Double                                 |
| - currentLng: Double                                 |
| - availability: Boolean                              |
+------------------------------------------------------+
| + getId(): Long                                      |
| + isAvailable(): Boolean                             |
| + setAvailable(Boolean)                              |
+------------------------------------------------------+
```

**Assignment**

```
+------------------------------------------------------+
|                    Assignment                        |
+------------------------------------------------------+
| - id: Long                                           |
| - emergencyId: Long (stored as value, not FK)        |
| - responderId: Long                                  |
| - etaMinutes: int                                    |
| - assignmentTime: Date                               |
| - syncStatus: String (PENDING, SYNCED)               |
+------------------------------------------------------+
| + getEmergencyId(): Long                             |
| + setResponderId(Long)                               |
| + getSyncStatus(): String                            |
+------------------------------------------------------+
```

### **B. DTO UML DIAGRAMS**

**CreateEmergencyReportDTO**

```
+------------------------------------------------------+
|             CreateEmergencyReportDTO                 |
+------------------------------------------------------+
| + type: String                                       |
| + description: String                                |
| + locationLat: Double                                |
| + locationLng: Double                                |
| + reporterId: String                                 |
+------------------------------------------------------+
```

**EmergencyResponseDTO**

```
+------------------------------------------------------+
|              EmergencyResponseDTO                    |
+------------------------------------------------------+
| + reportId: Long                                     |
| + responderName: String                              |
| + responderRole: String                              |
| + etaMinutes: int                                    |
+------------------------------------------------------+
```

**ResponderDTO**

```
+------------------------------------------------------+
|                    ResponderDTO                      |
+------------------------------------------------------+
| + id: Long                                           |
| + name: String                                       |
| + role: String                                       |
| + availability: Boolean                              |
+------------------------------------------------------+
```

**AssignmentDTO**

```
+------------------------------------------------------+
|                   AssignmentDTO                      |
+------------------------------------------------------+
| + id: Long                                           |
| + responderId: Long                                  |
| + emergencyId: Long                                  |
| + etaMinutes: int                                    |
+------------------------------------------------------+
```

### **C. REPOSITORY UML DIAGRAMS**

**EmergencyReportRepository**

```
+------------------------------------------------------+
|             EmergencyReportRepository                |
+------------------------------------------------------+
| + save(EmergencyReport): EmergencyReport             |
| + findById(Long): Optional<EmergencyReport>          |
| + findAll(): List<EmergencyReport>                   |
| + findByReporterId(String): List<EmergencyReport>    |
+------------------------------------------------------+
```

**ResponderRepository**

```
+------------------------------------------------------+
|                  ResponderRepository                 |
+------------------------------------------------------+
| + findAvailable(): List<Responder>                   |
| + findById(Long): Optional<Responder>                |
| + save(Responder): Responder                         |
+------------------------------------------------------+
```

**AssignmentRepository**

```
+------------------------------------------------------+
|                 AssignmentRepository                 |
+------------------------------------------------------+
| + save(Assignment): Assignment                       |
| + findByEmergencyId(Long): Optional<Assignment>      |
| + findAll(): List<Assignment>                        |
+------------------------------------------------------+
```

### **D. SERVICE UML DIAGRAMS**

**EmergencyReportService**

```
+------------------------------------------------------+
|             EmergencyReportService                   |
+------------------------------------------------------+
| + createReport(CreateEmergencyReportDTO): Long       |
| + getReport(Long): EmergencyReport                   |
| + validateReporter(String): boolean                  |
| + notifyResponderService(Long): EmergencyResponseDTO |
+------------------------------------------------------+
```

**ResponderService**

```
+------------------------------------------------------+
|                  ResponderService                    |
+------------------------------------------------------+
| + getAvailableResponders(): List<Responder>          |
| + getResponder(Long): Responder                      |
| + updateLocation(Long, lat, lng): Responder          |
+------------------------------------------------------+
```

**AssignmentService**

```
+------------------------------------------------------+
|                  AssignmentService                   |
+------------------------------------------------------+
| + assignResponder(emergencyId: Long): AssignmentDTO  |
| + calculateETA(responder, emergency): int            |
| + syncAssignmentStatus(): void                       |
+------------------------------------------------------+
```

### **E. CONTROLLER UML DIAGRAMS**

**EmergencyReportController**

```
+------------------------------------------------------+
|             EmergencyReportController                |
+------------------------------------------------------+
| + POST /alerts (CreateEmergencyReportDTO)            |
| + GET /alerts/{id}                                   |
| + GET /alerts/reporter/{reporterId}                  |
| + POST /alerts/{id}/assign                           |
+------------------------------------------------------+
```

**ResponderController**

```
+------------------------------------------------------+
|                ResponderController                   |
+------------------------------------------------------+
| + GET /responders                                    |
| + GET /responders/{id}                               |
| + PATCH /responders/{id}/location                    |
+------------------------------------------------------+
```

**AssignmentController**

```
+------------------------------------------------------+
|               AssignmentController                   |
+------------------------------------------------------+
| + POST /assign?emergencyId={id}                      |
| + GET /assign/{id}                                   |
| + GET /assign/emergency/{emergencyId}                |
+------------------------------------------------------+
```

---

## **3. ENTITY RELATIONSHIP DIAGRAM (ERD)**

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

### **Relationships**

1. **Responder → Assignment**: One-to-Many (1:*)

    - Foreign Key: `Assignment.responderId` references `Responder.id`
2. **EmergencyReport ↔ Assignment**: Eventual Consistency

    - `Assignment.emergencyId` stores the ID as a regular field
    - No database-level foreign key constraint
    - Synchronization handled at application level

### **Validation Strategy**

- **reporterId**: Validated by checking if ID exists in request headers
- **emergencyId in Assignment**: Periodic sync job validates against alert-service API
- **syncStatus**: Tracks whether emergency still exists (PENDING → SYNCED)

---

## **4. SEQUENCE DIAGRAM (WITH EVENTUAL CONSISTENCY)**

```
User      Mobile App    Alert-Service    Responder-Service    Database
 |            |              |                  |                 |
 |--Report--->|              |                  |                 |
 |            |--POST /alert-|                  |                 |
 |            | (reporterId) |                  |                 |
 |            |              |--validate--------|                 |
 |            |              |  reporterId      |                 |
 |            |              |--save report---->|                 |
 |            |              |                  |--insert-------->|
 |            |              |<--OK (id=123)----|                 |
 |            |              |---POST /assign-->|                 |
 |            |              | emergencyId=123  |                 |
 |            |              |                  |--find nearest-->|
 |            |              |                  |--save assignment|
 |            |              |                  | (emergencyId=123|
 |            |              |                  |  syncStatus=    |
 |            |              |                  |  PENDING)       |
 |            |              |                  |<--OK------------|
 |            |              |                  |--async verify-->|
 |            |              |                  | (check 123      |
 |            |              |                  |  exists)        |
 |            |              |                  |--update sync--->|
 |            |              |                  | (SYNCED)        |
 |            |<--Responder + ETA---------------|                 |
 |<--Show ETA-|              |                  |                 |
```

---

## **5. COMPONENT DIAGRAM**

```
+------------------------------------------------------+
|              Mobile App (React Native)               |
|------------------------------------------------------|
|  - Report Emergency (with reporterId)                |
|  - View Responder                                    |
|  - View ETA                                          |
+---------------------------|--------------------------+
                            |
                   REST API Calls
                            |
+---------------------------v--------------------------+
|                    alert-service                     |
|------------------------------------------------------|
| Controllers:                                         |
|   - POST /alerts (validates reporterId)              |
|   - GET /alerts/reporter/{id}                        |
| Services:                                            |
|   - SaveEmergencyReport                              |
|   - ValidateReporter (check ID format)               |
|   - NotifyResponderService                           |
| Repository:                                          |
|   - EmergencyReportRepository                        |
+---------------------------|--------------------------+
                            |
                     REST API (Service-to-Service)
                            |
+---------------------------v--------------------------+
|                 responder-service                    |
|------------------------------------------------------|
| Controllers:                                         |
|   - POST /assign                                     |
| Services:                                            |
|   - FindNearestResponder                             |
|   - AssignResponder                                  |
|   - SyncAssignmentStatus (async)                     |
| Repository:                                          |
|   - ResponderRepository                              |
|   - AssignmentRepository                             |
+---------------------------|--------------------------+
                            |
                        Database
```

---

## **KEY DESIGN DECISIONS**

### **1. Cross-Database References**

- **Solution**: Store `emergencyId` and `reporterId` as regular fields without FK constraints
- **Trade-off**: No automatic referential integrity, handled at application layer
- **Benefit**: True microservice independence

### **2. Reporter Validation**

- **Solution**: `reporterId` validated by checking format/structure only
- **Use Case**: Simple string ID from mobile device or session token
- **No User Table**: System doesn't store reporter details, just validates ID exists in request

### **3. Eventual Consistency**

- **Implementation**: `syncStatus` field tracks synchronization state
- **Background Job**: Periodic task verifies `emergencyId` still exists in alert-service
- **Failure Handling**: If emergency deleted, assignment marked as orphaned