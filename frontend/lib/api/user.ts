export interface UserProfile {
  id: string
  email: string
  firstName?: string
  lastName?: string
  image?: string
  accountNumber?: string
  customerId?: string
  memberSince?: string
  phone?: string
  address?: string
  dateOfBirth?: string
}

export interface UserAPIResponse {
  status: boolean
  user: {
    clerk: {
      id: string
      email: string
      firstName: string
      lastName: string
      image: string
    }
    db: {
      _id: string
      email: string
      role: 'clerk' | 'local' | 'google'
      clerkId: string
      username?: string
      firstName?: string
      lastName?: string
      image?: string
      createdAt: string
      updatedAt: string
    }
  }
}

export class UserAPIClient {
  private baseURL: string

  constructor(baseURL: string = '/api/user') {
    this.baseURL = baseURL
  }

  async getCurrentUser(): Promise<UserProfile> {
    const response = await fetch(`${this.baseURL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

    const data: UserAPIResponse = await response.json()

    // Map the response to UserProfile
    return {
      id: data.user.clerk.id,
      email: data.user.clerk.email || data.user.db.email,
      firstName: data.user.clerk.firstName || data.user.db.firstName,
      lastName: data.user.clerk.lastName || data.user.db.lastName,
      image: data.user.clerk.image || data.user.db.image,
      accountNumber: data.user.db._id ? `ACC-${data.user.db._id.slice(-6)}` : undefined,
      customerId: data.user.db._id ? `CUST-${data.user.db._id.slice(0, 6)}` : undefined,
      memberSince: data.user.db.createdAt
        ? new Date(data.user.db.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
          })
        : undefined
    }
  }

  async updateUser(updates: Partial<UserProfile>): Promise<UserProfile> {
    const response = await fetch(`${this.baseURL}/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new Error('Failed to update user data')
    }

    return await response.json()
  }
}

export const userAPI = new UserAPIClient()
