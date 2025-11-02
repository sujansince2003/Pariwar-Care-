# API Integration Guide

This directory contains the centralized API integration for the application. All API calls are handled through this single file with automatic token management.

## Features

- ✅ Automatic JWT token handling via interceptors
- ✅ Token stored in cookies (auto-expires in 7 days)
- ✅ Auto-redirect to login on 401 errors
- ✅ TypeScript types for all API calls
- ✅ Organized by feature (auth, users, parents, visits, nurses, review, analytics)
- ✅ Consistent error handling

## Setup

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

If not set, it defaults to `http://localhost:8000/api`.

## Usage Examples

### 1. Authentication

```typescript
import { authAPI, setAuthToken, setUserData } from '@/lib/api';

// Login
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await authAPI.login({ email, password });
    if (response.data.success && response.data.data) {
      setAuthToken(response.data.data.token);
      setUserData(response.data.data.user);
      // Redirect to dashboard
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Signup
const handleSignup = async (data: {
  name: string;
  email: string;
  password: string;
  role: 'CHILD' | 'NURSE' | 'MEDICAL_ADMIN' | 'ADMIN';
}) => {
  try {
    const response = await authAPI.signup(data);
    if (response.data.success) {
      // Redirect to login
      router.push('/auth/login');
    }
  } catch (error) {
    console.error('Signup failed:', error);
  }
};
```

### 2. Parent Management

```typescript
import { parentAPI } from '@/lib/api';

// Get all parents
const fetchParents = async () => {
  try {
    const response = await parentAPI.getAllParents();
    if (response.data.success && response.data.data) {
      setParents(response.data.data.parents);
    }
  } catch (error) {
    console.error('Error fetching parents:', error);
  }
};

// Add new parent
const addParent = async (parentData: {
  name: string;
  age: number;
  gender: string;
  address: string;
  diseases: string;
  medications: string;
  emergencyContact: string;
}) => {
  try {
    const response = await parentAPI.addParent(parentData);
    if (response.data.success) {
      console.log('Parent added successfully');
      fetchParents(); // Refresh list
    }
  } catch (error) {
    console.error('Error adding parent:', error);
  }
};

// Update parent
const updateParent = async (id: string, updates: Partial<Parent>) => {
  try {
    const response = await parentAPI.updateParent(id, updates);
    if (response.data.success) {
      console.log('Parent updated successfully');
    }
  } catch (error) {
    console.error('Error updating parent:', error);
  }
};
```

### 3. Visit Management

```typescript
import { visitAPI } from '@/lib/api';

// Schedule a visit (CHILD role)
const scheduleVisit = async (data: {
  parentId: string;
  scheduledFor: string;
  visitType: 'BASIC' | 'FULL';
}) => {
  try {
    const response = await visitAPI.scheduleVisit(data);
    if (response.data.success) {
      console.log('Visit scheduled successfully');
    }
  } catch (error) {
    console.error('Error scheduling visit:', error);
  }
};

// Get child's visits (CHILD role)
const fetchChildVisits = async () => {
  try {
    const response = await visitAPI.getChildVisits();
    if (response.data.success && response.data.data) {
      setVisits(response.data.data.visits);
    }
  } catch (error) {
    console.error('Error fetching visits:', error);
  }
};

// Get nurse's visits (NURSE role)
const fetchNurseVisits = async () => {
  try {
    const response = await visitAPI.getNurseVisits();
    if (response.data.success && response.data.data) {
      setVisits(response.data.data.visits);
    }
  } catch (error) {
    console.error('Error fetching visits:', error);
  }
};

// Assign nurse to visit (ADMIN role)
const assignNurse = async (visitId: string, nurseId: string) => {
  try {
    const response = await visitAPI.assignNurse(visitId, nurseId);
    if (response.data.success) {
      console.log('Nurse assigned successfully');
    }
  } catch (error) {
    console.error('Error assigning nurse:', error);
  }
};

// Submit vitals (NURSE role)
const submitVitals = async (visitId: string, vitalsData: {
  bp: string;
  sugar: string;
  pulse: string;
  oxygen: string;
  temperature: string;
  notes: string;
  medicines: string;
}) => {
  try {
    const response = await visitAPI.submitVitals(visitId, vitalsData);
    if (response.data.success) {
      console.log('Vitals submitted successfully');
    }
  } catch (error) {
    console.error('Error submitting vitals:', error);
  }
};
```

### 4. Medical Review

```typescript
import { reviewAPI } from '@/lib/api';

// Get visits waiting for approval (MEDICAL_ADMIN/ADMIN)
const fetchVisitsForReview = async () => {
  try {
    const response = await reviewAPI.getVisitsForReview();
    if (response.data.success && response.data.data) {
      setVisits(response.data.data.visits);
    }
  } catch (error) {
    console.error('Error fetching visits:', error);
  }
};

// Approve visit
const approveVisit = async (visitId: string, note: string) => {
  try {
    const response = await reviewAPI.approveVisit(visitId, note);
    if (response.data.success) {
      console.log('Visit approved successfully');
    }
  } catch (error) {
    console.error('Error approving visit:', error);
  }
};

// Reject visit
const rejectVisit = async (visitId: string, note: string) => {
  try {
    const response = await reviewAPI.rejectVisit(visitId, note);
    if (response.data.success) {
      console.log('Visit rejected successfully');
    }
  } catch (error) {
    console.error('Error rejecting visit:', error);
  }
};
```

### 5. Nurse Management

```typescript
import { nurseAPI } from '@/lib/api';

// Get all nurses (ADMIN role)
const fetchNurses = async () => {
  try {
    const response = await nurseAPI.getAllNurses();
    if (response.data.success && response.data.data) {
      setNurses(response.data.data.nurses);
    }
  } catch (error) {
    console.error('Error fetching nurses:', error);
  }
};
```

### 6. Analytics

```typescript
import { analyticsAPI } from '@/lib/api';

// Get parent health trends
const fetchHealthTrends = async (parentId: string, period: 'weekly' | 'monthly' = 'weekly') => {
  try {
    const response = await analyticsAPI.getParentHealthTrends(parentId, period);
    if (response.data.success && response.data.data) {
      setTrends(response.data.data.vitalsTrend);
    }
  } catch (error) {
    console.error('Error fetching trends:', error);
  }
};
```

### 7. Auth Helper Functions

```typescript
import { getUserData, isAuthenticated, clearAuth } from '@/lib/api';

// Check if user is authenticated
if (isAuthenticated()) {
  console.log('User is logged in');
}

// Get user data
const user = getUserData();
console.log(user.name, user.role);

// Logout
const handleLogout = () => {
  clearAuth();
  router.push('/auth/login');
};
```

## Using in React Components

### Complete Example

```typescript
'use client';

import { useEffect, useState } from 'react';
import { visitAPI, type Visit } from '@/lib/api';

export default function VisitsList() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        setLoading(true);
        const response = await visitAPI.getChildVisits();
        if (response.data.success && response.data.data) {
          setVisits(response.data.data.visits);
        }
      } catch (err) {
        setError('Failed to fetch visits');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {visits.map((visit) => (
        <div key={visit.id}>
          <h3>{visit.Parent?.name}</h3>
          <p>Status: {visit.status}</p>
          {visit.vitals && (
            <div>
              <p>BP: {visit.vitals.bp}</p>
              <p>Sugar: {visit.vitals.sugar}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

## Error Handling

All API calls automatically handle:
- **401 Unauthorized**: Auto-redirects to login and clears auth data
- **Network errors**: Can be caught in try-catch blocks
- **Validation errors**: Returns error response from server

## Token Management

Tokens are automatically:
- Added to all API requests via interceptor
- Stored in cookies (expires in 7 days)
- Removed on 401 errors or manual logout
- Available across the entire app without manual handling

## TypeScript Support

All API functions and responses are fully typed. Use the exported types:

```typescript
import type { User, Parent, Visit, Vitals, HealthTrend } from '@/lib/api';
```
