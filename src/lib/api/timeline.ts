const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Interface untuk timeline entry
interface TimelineEntry {
  id?: string;
  user_id?: string;
  pregnancy_week: number;
  health_services: { [key: string]: boolean };
  symptoms: { [key: string]: boolean };
  health_services_notes: string;
  symptoms_notes: string;
  created_at?: string;
  updated_at?: string;
}

// Interface untuk pregnancy profile
interface PregnancyProfile {
  id?: string;
  user_id?: string;
  due_date: string;
  last_menstrual_period: string;
  current_weight?: number;
  pre_pregnancy_weight?: number;
  height?: number;
  current_week?: number;
  created_at?: string;
  updated_at?: string;
}

// Interface untuk response API
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

class TimelineService {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      throw new Error("User tidak terautentikasi");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // Get pregnancy profile
  async getPregnancyProfile(): Promise<
    ApiResponse<{ profile: PregnancyProfile | null }>
  > {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timeline/profile`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil profil kehamilan");
      }

      return data;
    } catch (error) {
      console.error("Get pregnancy profile error:", error);
      throw error;
    }
  }

  // Create or update pregnancy profile
  async savePregnancyProfile(
    profile: Omit<
      PregnancyProfile,
      "id" | "user_id" | "current_week" | "created_at" | "updated_at"
    >
  ): Promise<ApiResponse<{ profile: PregnancyProfile }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timeline/profile`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan profil kehamilan");
      }

      return data;
    } catch (error) {
      console.error("Save pregnancy profile error:", error);
      throw error;
    }
  }

  // Get all timeline entries
  async getTimelineEntries(): Promise<
    ApiResponse<{ entries: TimelineEntry[] }>
  > {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timeline/entries`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil data timeline");
      }

      return data;
    } catch (error) {
      console.error("Get timeline entries error:", error);
      throw error;
    }
  }

  // Get timeline entry for specific week
  async getTimelineEntry(
    week: number
  ): Promise<ApiResponse<{ entry: TimelineEntry | null }>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/timeline/entries/${week}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengambil data timeline");
      }

      return data;
    } catch (error) {
      console.error("Get timeline entry error:", error);
      throw error;
    }
  }

  // Create or update timeline entry
  async saveTimelineEntry(
    entry: Omit<TimelineEntry, "id" | "user_id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<{ entry: TimelineEntry }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/timeline/entries`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(entry),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan data timeline");
      }

      return data;
    } catch (error) {
      console.error("Save timeline entry error:", error);
      throw error;
    }
  }

  // Delete timeline entry for specific week
  async deleteTimelineEntry(week: number): Promise<ApiResponse<{}>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/timeline/entries/${week}`,
        {
          method: "DELETE",
          headers: this.getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus data timeline");
      }

      return data;
    } catch (error) {
      console.error("Delete timeline entry error:", error);
      throw error;
    }
  }
}

export const timelineService = new TimelineService();
export type { TimelineEntry, PregnancyProfile, ApiResponse };
