# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Authentication
Most endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Routes

### POST `/auth/signup`
Create new user account

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CHILD" // CHILD | NURSE | MEDICAL_ADMIN | ADMIN
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "cm123...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CHILD",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### POST `/auth/login`
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 👥 User Management Routes

### GET `/users` 
Get all users (ADMIN only)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "cm123...",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "CHILD",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### GET `/users/:id`
Get user by ID (Own profile or ADMIN)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cm123...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "CHILD",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## 👴 Parent Management Routes

### POST `/parents`
Add new parent (CHILD role)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "name": "Mary Doe",
  "age": 75,
  "gender": "Female",
  "address": "123 Main St, City, State",
  "diseases": "Diabetes, Hypertension",
  "medications": "Metformin, Lisinopril",
  "emergencyContact": "+1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Parent added successfully",
  "data": {
    "parent": {
      "id": "cm456...",
      "name": "Mary Doe",
      "age": 75,
      "gender": "Female",
      "address": "123 Main St, City, State",
      "diseases": "Diabetes, Hypertension",
      "medications": "Metformin, Lisinopril",
      "emergencyContact": "+1234567890"
    }
  }
}
```

### GET `/parents`
Get all parents for logged-in child

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Parents retrieved successfully",
  "data": {
    "parents": [
      {
        "id": "cm456...",
        "name": "Mary Doe",
        "age": 75,
        "gender": "Female",
        "address": "123 Main St, City, State",
        "diseases": "Diabetes, Hypertension",
        "medications": "Metformin, Lisinopril",
        "emergencyContact": "+1234567890"
      }
    ]
  }
}
```

### GET `/parents/:id`
Get specific parent details

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Parent retrieved successfully",
  "data": {
    "parent": {
      "id": "cm456...",
      "name": "Mary Doe",
      "age": 75,
      "gender": "Female",
      "address": "123 Main St, City, State",
      "diseases": "Diabetes, Hypertension",
      "medications": "Metformin, Lisinopril",
      "emergencyContact": "+1234567890"
    }
  }
}
```

### PUT `/parents/:id`
Update parent information

**Headers:** `Authorization: Bearer <token>`

**Request:** (All fields optional)
```json
{
  "name": "Mary Doe Updated",
  "age": 76,
  "diseases": "Diabetes, Hypertension, Arthritis"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Parent updated successfully"
}
```

### DELETE `/parents/:id`
Delete parent profile

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Parent deleted successfully"
}
```

---

## 🏥 Visit Management Routes

### POST `/visits`
Schedule new visit (CHILD role)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "parentId": "cm456...",
  "scheduledFor": "2024-12-15T10:00:00Z",
  "visitType": "BASIC" // BASIC | FULL
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Visit scheduled successfully",
  "data": {
    "visit": {
      "id": "cm789...",
      "parentId": "cm456...",
      "scheduledFor": "2024-12-15T10:00:00.000Z",
      "visitType": "BASIC",
      "status": "PENDING",
      "Parent": {
        "name": "Mary Doe",
        "address": "123 Main St, City, State"
      }
    }
  }
}
```

### GET `/visits/child`
Get child's visits (CHILD role) - Only shows approved visits with vitals

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Visits retrieved successfully",
  "data": {
    "visits": [
      {
        "id": "cm789...",
        "parentId": "cm456...",
        "nurseId": "cm999...",
        "scheduledFor": "2024-12-15T10:00:00.000Z",
        "visitType": "BASIC",
        "status": "APPROVED",
        "completedAt": "2024-12-15T11:30:00.000Z",
        "Parent": {
          "name": "Mary Doe",
          "address": "123 Main St, City, State"
        },
        "Nurse": {
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "vitals": {
          "bp": "120/80",
          "sugar": "95",
          "pulse": "72",
          "oxygen": "98",
          "temperature": "98.6",
          "notes": "Patient stable",
          "medicines": "Continue current medication"
        }
      }
    ]
  }
}
```

### GET `/visits/nurse`
Get nurse's assigned visits (NURSE role)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Nurse visits retrieved successfully",
  "data": {
    "visits": [
      {
        "id": "cm789...",
        "parentId": "cm456...",
        "scheduledFor": "2024-12-15T10:00:00.000Z",
        "visitType": "BASIC",
        "status": "ASSIGNED",
        "Parent": {
          "name": "Mary Doe",
          "age": 75,
          "address": "123 Main St, City, State",
          "diseases": "Diabetes, Hypertension",
          "medications": "Metformin, Lisinopril",
          "emergencyContact": "+1234567890"
        }
      }
    ]
  }
}
```

### POST `/visits/:id/assign`
Assign nurse to visit (ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "nurseId": "cm999..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Nurse assigned successfully",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "ASSIGNED",
      "Parent": {
        "name": "Mary Doe",
        "address": "123 Main St, City, State"
      },
      "Nurse": {
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    }
  }
}
```

### POST `/visits/:id/start`
Start visit (NURSE role)

**Headers:** `Authorization: Bearer <token>`

**Request:** No body required

**Response (200):**
```json
{
  "success": true,
  "message": "Visit started successfully",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "STARTED"
    }
  }
}
```

### POST `/visits/:id/vitals`
Submit vitals data (NURSE role) - Sets status to WAITING_APPROVAL

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "bp": "120/80",
  "sugar": "95",
  "pulse": "72",
  "oxygen": "98",
  "temperature": "98.6",
  "notes": "Patient doing well, stable vitals",
  "medicines": "Continue current medication, add vitamin D"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Vitals submitted and sent for medical review",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "WAITING_APPROVAL",
      "Parent": {
        "name": "Mary Doe",
        "address": "123 Main St, City, State",
        "emergencyContact": "+1234567890"
      },
      "Nurse": {
        "id": "cm999...",
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "vitals": {
        "bp": "120/80",
        "sugar": "95",
        "pulse": "72",
        "oxygen": "98",
        "temperature": "98.6",
        "notes": "Patient doing well, stable vitals",
        "medicines": "Continue current medication, add vitamin D"
      }
    },
    "vitals": {
      "id": "cm111...",
      "visitId": "cm789...",
      "bp": "120/80",
      "sugar": "95",
      "pulse": "72",
      "oxygen": "98",
      "temperature": "98.6",
      "notes": "Patient doing well, stable vitals",
      "medicines": "Continue current medication, add vitamin D",
      "createdAt": "2024-12-15T11:00:00.000Z"
    }
  }
}
```

---

## 👩⚕️ Nurse Management Routes

### GET `/nurses`
Get list of nurses (ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Nurses retrieved successfully",
  "data": {
    "nurses": [
      {
        "id": "cm999...",
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    ]
  }
}
```

---

## 🏥 Medical Review Routes

### GET `/review/visits/review`
Get visits waiting for approval (MEDICAL_ADMIN | ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Visits for review",
  "data": {
    "visits": [
      {
        "id": "cm789...",
        "parentId": "cm456...",
        "nurseId": "cm999...",
        "scheduledFor": "2024-12-15T10:00:00.000Z",
        "visitType": "BASIC",
        "status": "WAITING_APPROVAL",
        "Parent": {
          "id": "cm456...",
          "name": "Mary Doe",
          "age": 75,
          "gender": "Female",
          "address": "123 Main St, City, State",
          "diseases": "Diabetes, Hypertension",
          "medications": "Metformin, Lisinopril",
          "emergencyContact": "+1234567890"
        },
        "Nurse": {
          "id": "cm999...",
          "name": "Jane Smith",
          "email": "jane@example.com"
        },
        "vitals": {
          "id": "cm111...",
          "visitId": "cm789...",
          "bp": "120/80",
          "sugar": "95",
          "pulse": "72",
          "oxygen": "98",
          "temperature": "98.6",
          "notes": "Patient doing well, stable vitals",
          "medicines": "Continue current medication, add vitamin D",
          "createdAt": "2024-12-15T11:00:00.000Z"
        }
      }
    ]
  }
}
```

### GET `/review/visits/:id/review`
Get visit details for review (MEDICAL_ADMIN | ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Visit found",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "WAITING_APPROVAL",
      "Parent": {
        "name": "Mary Doe",
        "age": 75,
        "diseases": "Diabetes, Hypertension"
      },
      "Nurse": {
        "name": "Jane Smith",
        "email": "jane@example.com"
      },
      "vitals": {
        "bp": "120/80",
        "sugar": "95",
        "pulse": "72",
        "oxygen": "98",
        "temperature": "98.6",
        "notes": "Patient doing well, stable vitals",
        "medicines": "Continue current medication, add vitamin D"
      }
    }
  }
}
```

### POST `/review/visits/:id/approve`
Approve visit report (MEDICAL_ADMIN | ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "approvalNote": "Vitals look normal, approved for family viewing"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Visit approved",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "APPROVED",
      "approvedAt": "2024-12-15T12:00:00.000Z",
      "approvalNote": "Vitals look normal, approved for family viewing",
      "completedAt": "2024-12-15T12:00:00.000Z",
      "ApprovedBy": {
        "id": "cm888...",
        "name": "Dr. Smith",
        "email": "doctor@example.com"
      },
      "vitals": {
        "bp": "120/80",
        "sugar": "95",
        "pulse": "72",
        "oxygen": "98",
        "temperature": "98.6",
        "notes": "Patient doing well, stable vitals",
        "medicines": "Continue current medication, add vitamin D"
      }
    }
  }
}
```

### POST `/review/visits/:id/reject`
Reject visit and request revision (MEDICAL_ADMIN | ADMIN role)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "rejectionNote": "Blood pressure reading seems inconsistent, please recheck"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Visit rejected and sent back for revision",
  "data": {
    "visit": {
      "id": "cm789...",
      "status": "REVISION_REQUIRED",
      "rejectionNote": "Blood pressure reading seems inconsistent, please recheck",
      "approvedAt": "2024-12-15T12:00:00.000Z",
      "Parent": {
        "name": "Mary Doe"
      },
      "Nurse": {
        "name": "Jane Smith"
      },
      "vitals": {
        "bp": "120/80",
        "sugar": "95"
      }
    }
  }
}
```

---

## 📊 Analytics Routes

### GET `/analytics/parent/:id/trends?period=weekly`
Get parent health trends

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `period`: "weekly" or "monthly" (optional, defaults to "weekly")

**Response (200):**
```json
{
  "success": true,
  "message": "Health trends fetched successfully",
  "data": {
    "parentId": "cm456...",
    "period": "weekly",
    "vitalsTrend": [
      {
        "weekStart": "2024-12-09",
        "bp": "120/80",
        "sugar": 95.5,
        "pulse": 72.0,
        "oxygen": 98.0,
        "temperature": 98.6
      },
      {
        "weekStart": "2024-12-16",
        "bp": "118/78",
        "sugar": 92.0,
        "pulse": 70.0,
        "oxygen": 98.5,
        "temperature": 98.4
      }
    ]
  }
}
```

---

## 🔧 System Routes

### GET `/`
API status

**Response (200):**
```json
{
  "message": "Team-ALPHA Backend API",
  "status": "running",
  "timestamp": "2024-12-15T10:00:00.000Z"
}
```

### GET `/api/health`
Health check

**Response (200):**
```json
{
  "message": "API is healthy",
  "status": "success"
}
```

---

## 🚨 Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "invalid data"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📝 Visit Status Flow

```
PENDING → ASSIGNED → STARTED → WAITING_APPROVAL → APPROVED
                                      ↓
                               REVISION_REQUIRED → (back to WAITING_APPROVAL)
```

## 🔑 Role Permissions

| Role | Permissions |
|------|-------------|
| **CHILD** | Schedule visits, view own parents, view approved visit results |
| **NURSE** | View assigned visits, start visits, submit vitals |
| **MEDICAL_ADMIN** | Review and approve/reject visit reports |
| **ADMIN** | All permissions, assign nurses, view all users |

## 📧 Email Notifications

- **Visit Completion**: Sent to children when visit is approved by medical admin
- **Contains**: Parent name, visit date, approved vitals, doctor notes

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Medical data only visible after doctor approval
- Input validation and sanitization
- Rate limiting and security headers
