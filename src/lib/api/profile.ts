const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface UserProfile {
  id: string;
  full_name: string;
  username: string;
  phone: string;
  email: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface UpdateProfileData {
  fullName?: string;
  username?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ChangeEmailData {
  newEmail: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

class ProfileService {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  private getAuthHeadersForUpload() {
    const token = localStorage.getItem("auth_token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Get user profile
  async getProfile(): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil profil");
      }

      return result;
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  }

  // Update profile
  async updateProfile(
    data: UpdateProfileData
  ): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal memperbarui profil");
      }

      return result;
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/change-password`,
        {
          method: "PUT",
          headers: this.getAuthHeaders(),
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengubah password");
      }

      return result;
    } catch (error) {
      console.error("Change password error:", error);
      throw error;
    }
  }

  // Change email
  async changeEmail(
    data: ChangeEmailData
  ): Promise<ApiResponse<{ user: UserProfile }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/change-email`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengubah email");
      }

      return result;
    } catch (error) {
      console.error("Change email error:", error);
      throw error;
    }
  }

  // Upload profile picture
  async uploadProfilePicture(
    file: File
  ): Promise<ApiResponse<{ user: UserProfile; imageUrl: string }>> {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE_URL}/api/users/upload-avatar`, {
        method: "POST",
        headers: this.getAuthHeadersForUpload(),
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengupload foto profil");
      }

      return result;
    } catch (error) {
      console.error("Upload profile picture error:", error);
      throw error;
    }
  }

  // Delete account
  async deleteAccount(password: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/account`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus akun");
      }

      return result;
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  }
}

// Export instance
export const profileService = new ProfileService();
