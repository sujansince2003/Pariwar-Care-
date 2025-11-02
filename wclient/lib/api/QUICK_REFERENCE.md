# API Quick Reference

## Import

```typescript
import {
  authAPI,
  userAPI,
  parentAPI,
  visitAPI,
  nurseAPI,
  reviewAPI,
  analyticsAPI,
  setAuthToken,
  getUserData,
  clearAuth,
  isAuthenticated
} from '@/lib/api';
```

---

## 🔐 Authentication

```typescript
// Login
authAPI.login({ email, password })

// Signup
authAPI.signup({ name, email, password, role })

// After login
setAuthToken(response.data.data.token)
setUserData(response.data.data.user)

// Logout
clearAuth()

// Check auth
isAuthenticated()

// Get user
getUserData()
```

---

## 👥 Users

```typescript
// Get all users (ADMIN only)
userAPI.getAllUsers()

// Get user by ID
userAPI.getUserById(id)
```

---

## 👴 Parents

```typescript
// Get all parents
parentAPI.getAllParents()

// Get parent by ID
parentAPI.getParentById(id)

// Add new parent
parentAPI.addParent({
  name, age, gender, address,
  diseases, medications, emergencyContact
})

// Update parent
parentAPI.updateParent(id, { name, age, ... })

// Delete parent
parentAPI.deleteParent(id)
```

---

## 🏥 Visits

```typescript
// Schedule visit (CHILD)
visitAPI.scheduleVisit({
  parentId,
  scheduledFor: "2024-12-15T10:00:00Z",
  visitType: "BASIC" // or "FULL"
})

// Get child's visits (CHILD)
visitAPI.getChildVisits()

// Get nurse's visits (NURSE)
visitAPI.getNurseVisits()

// Assign nurse (ADMIN)
visitAPI.assignNurse(visitId, nurseId)

// Start visit (NURSE)
visitAPI.startVisit(visitId)

// Submit vitals (NURSE)
visitAPI.submitVitals(visitId, {
  bp, sugar, pulse, oxygen,
  temperature, notes, medicines
})
```

---

## 👩⚕️ Nurses

```typescript
// Get all nurses (ADMIN)
nurseAPI.getAllNurses()
```

---

## 🏥 Medical Review

```typescript
// Get visits for review (MEDICAL_ADMIN/ADMIN)
reviewAPI.getVisitsForReview()

// Get visit details for review
reviewAPI.getVisitDetailsForReview(visitId)

// Approve visit
reviewAPI.approveVisit(visitId, "Vitals look normal")

// Reject visit
reviewAPI.rejectVisit(visitId, "Please recheck BP")
```

---

## 📊 Analytics

```typescript
// Get parent health trends
analyticsAPI.getParentHealthTrends(parentId, "weekly") // or "monthly"
```

---

## Common Pattern

```typescript
const fetchData = async () => {
  try {
    const response = await visitAPI.getChildVisits();
    if (response.data.success && response.data.data) {
      setData(response.data.data.visits);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Role-Based Access

| Role | Access |
|------|--------|
| **CHILD** | Schedule visits, view parents, view approved visits |
| **NURSE** | View assigned visits, start visits, submit vitals |
| **MEDICAL_ADMIN** | Review and approve/reject visits |
| **ADMIN** | All permissions, assign nurses, view all users |

---

## Visit Status Flow

```
PENDING → ASSIGNED → STARTED → WAITING_APPROVAL → APPROVED
                                      ↓
                               REVISION_REQUIRED
```

---

## TypeScript Types

```typescript
import type {
  User,
  Parent,
  Visit,
  Vitals,
  HealthTrend,
  ApiResponse
} from '@/lib/api';
```

---

## No Token Management Needed! 🎉

The token is automatically:
- ✅ Added to every request
- ✅ Stored in cookies
- ✅ Removed on 401 errors
- ✅ Available across the app

**You never need to write `Authorization: Bearer ${token}` again!**
