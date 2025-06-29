const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Photo {
  id: string;
  user_id: string;
  title?: string;
  description?: string;
  image_url: string;
  pregnancy_week?: number;
  created_at: string;
  updated_at: string;
}

export interface GetPhotosParams {
  page?: number;
  limit?: number;
  week?: number;
}

export interface GetPhotosResponse {
  success: boolean;
  message: string;
  data: {
    photos: Photo[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface UploadPhotoData {
  image: File;
  title?: string;
  description?: string;
  pregnancy_week?: number;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Get authentication token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Gallery API Functions
export const galleryApi = {
  getPhotos: async (
    params: GetPhotosParams = {}
  ): Promise<GetPhotosResponse> => {
    const token = getAuthToken();
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.week) queryParams.append("week", params.week.toString());

    const response = await fetch(
      `${API_BASE_URL}/api/gallery/photos?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal memuat foto");
    }

    return result;
  },

  uploadPhoto: async (data: UploadPhotoData): Promise<ApiResponse> => {
    const token = getAuthToken();
    const formData = new FormData();

    formData.append("image", data.image);
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.pregnancy_week)
      formData.append("pregnancy_week", data.pregnancy_week.toString());

    const response = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mengunggah foto");
    }

    return result;
  },

  deletePhoto: async (photoId: string): Promise<ApiResponse> => {
    const token = getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/gallery/photos/${photoId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal menghapus foto");
    }

    return result;
  },

  getPhoto: async (
    photoId: string
  ): Promise<{ success: boolean; data: { photo: Photo } }> => {
    const token = getAuthToken();

    const response = await fetch(
      `${API_BASE_URL}/api/gallery/photos/${photoId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal memuat foto");
    }

    return result;
  },
};
