const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Interface untuk data diagnosa
export interface DiagnosisData {
  age: number;
  systolic_bp: number;
  diastolic_bp: number;
  blood_sugar: number;
  body_temp: number;
  heart_rate: number;
  risk_level: "low risk" | "mid risk" | "high risk";
  user_data: {
    nama: string;
    usia: string;
    golonganDarah: string;
  };
  prediction_result?: any;
}

// Interface untuk riwayat diagnosa
export interface DiagnosisHistory {
  id: string;
  user_id: string;
  age: number;
  systolic_bp: number;
  diastolic_bp: number;
  blood_sugar: number;
  body_temp: number;
  heart_rate: number;
  risk_level: "low risk" | "mid risk" | "high risk";
  prediction_result: {
    user_data: {
      nama: string;
      usia: string;
      golonganDarah: string;
    };
    prediction_result?: any;
    timestamp: string;
  };
  created_at: string;
}

// Interface untuk statistik diagnosa
export interface DiagnosisStats {
  total_predictions: number;
  risk_level_counts: {
    "low risk": number;
    "mid risk": number;
    "high risk": number;
  };
  recent_predictions: number;
  latest_prediction: DiagnosisHistory | null;
  trends: {
    last_30_days: number;
    dominant_risk_level: "low risk" | "mid risk" | "high risk";
  };
}

// Interface untuk response API
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// Interface untuk pagination
export interface PaginationData {
  current_page: number;
  total_pages: number;
  total_items: number;
  items_per_page: number;
}

class DiagnosisService {
  private getAuthHeaders(): Record<string, string> {
    if (typeof window === "undefined") {
      return {
        "Content-Type": "application/json",
      };
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.warn("No auth token found in localStorage");
      return {
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  // Simpan hasil diagnosa
  async saveDiagnosis(
    data: DiagnosisData
  ): Promise<ApiResponse<{ prediction: DiagnosisHistory }>> {
    try {
      const url = `${API_BASE_URL}/api/diagnosa/predict`;
      const headers = this.getAuthHeaders();

      console.log("=== DIAGNOSIS API DEBUG ===");
      console.log("API_BASE_URL:", API_BASE_URL);
      console.log("Full URL:", url);
      console.log("Headers:", headers);
      console.log("Data:", data);

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );
      const result = await response.json();
      console.log("Response data:", result);

      if (response.status === 400 && result.errors) {
        console.log("Validation errors from backend:", result.errors);
      }

      if (response.status === 404) {
        throw new Error(`Endpoint tidak ditemukan - /api/diagnosa/predict`);
      }

      if (!response.ok) {
        throw new Error(result.message || "Gagal menyimpan hasil diagnosa");
      }

      return result;
    } catch (error) {
      console.error("Save diagnosis error:", error);
      throw error;
    }
  }

  // Ambil riwayat diagnosa
  async getDiagnosisHistory(
    page: number = 1,
    limit: number = 10
  ): Promise<
    ApiResponse<{
      predictions: DiagnosisHistory[];
      pagination: PaginationData;
    }>
  > {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/diagnosa/history?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil riwayat diagnosa");
      }

      return result;
    } catch (error) {
      console.error("Get diagnosis history error:", error);
      throw error;
    }
  }

  // Ambil diagnosa berdasarkan ID
  async getDiagnosisById(
    id: string
  ): Promise<ApiResponse<{ prediction: DiagnosisHistory }>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/diagnosa/history/${id}`,
        {
          method: "GET",
          headers: this.getAuthHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data diagnosa");
      }

      return result;
    } catch (error) {
      console.error("Get diagnosis by ID error:", error);
      throw error;
    }
  }

  // Hapus diagnosa berdasarkan ID
  async deleteDiagnosis(id: string): Promise<ApiResponse<{}>> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/diagnosa/history/${id}`,
        {
          method: "DELETE",
          headers: this.getAuthHeaders(),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus diagnosa");
      }

      return result;
    } catch (error) {
      console.error("Delete diagnosis error:", error);
      throw error;
    }
  }

  // Ambil statistik diagnosa
  async getDiagnosisStats(): Promise<ApiResponse<DiagnosisStats>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/diagnosa/stats`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil statistik diagnosa");
      }

      return result;
    } catch (error) {
      console.error("Get diagnosis stats error:", error);
      throw error;
    }
  }
}

// Export instance
export const diagnosisService = new DiagnosisService();
