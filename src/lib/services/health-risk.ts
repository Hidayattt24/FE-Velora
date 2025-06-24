export interface HealthRiskData {
  Age: number;
  SystolicBP: number;
  DiastolicBP: number;
  BS: number;
  BodyTemp: number;
  HeartRate: number;
}

export interface HealthRiskResponse {
  risk_level: "low risk" | "mid risk" | "high risk";
}

export interface HealthParameters {
  age_ranges: Array<{
    label: string;
    value: number;
  }>;
  blood_pressure_ranges: Array<{
    label: string;
    systolic: number;
    diastolic: number;
  }>;
  blood_sugar_ranges: Array<{
    label: string;
    value: number;
  }>;
  body_temp_ranges: Array<{
    label: string;
    value: number;
  }>;
  heart_rate_ranges: Array<{
    label: string;
    value: number;
  }>;
}

export const getHealthParameters = async (): Promise<HealthParameters> => {
  if (!process.env.NEXT_PUBLIC_ML_API_URL) {
    throw new Error("ML API URL is not configured");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/parameters`);

  if (!response.ok) {
    throw new Error('Failed to fetch health parameters');
  }

  return response.json();
};

export const getRiskRecommendations = (riskLevel: string) => {
  switch (riskLevel) {
    case "high risk":
      return [
        "Segera konsultasikan kondisi Anda dengan dokter atau bidan",
        "Lakukan pemeriksaan kesehatan secara menyeluruh",
        "Ikuti semua saran dan petunjuk dari tenaga medis",
      ];
    case "mid risk":
      return [
        "Lakukan pemeriksaan rutin sesuai jadwal",
        "Perhatikan pola makan dan istirahat",
        "Konsultasikan setiap perubahan kondisi dengan tenaga medis",
      ];
    default:
      return [
        "Lanjutkan pemeriksaan kehamilan secara rutin",
        "Pertahankan pola hidup sehat",
        "Tetap waspada terhadap perubahan kondisi",
      ];
  }
};

export const predictHealthRisk = async (data: HealthRiskData): Promise<HealthRiskResponse> => {
  if (!process.env.NEXT_PUBLIC_ML_API_URL) {
    throw new Error("ML API URL is not configured");
  }

  try {
    console.log('Sending data to API:', data);
    const response = await fetch(`${process.env.NEXT_PUBLIC_ML_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to predict health risk: ${errorText}`);
    }

    const result = await response.json();
    console.log('API Response:', result);
    return result;
  } catch (error) {
    console.error('Error calling predict API:', error);
    throw new Error('Failed to predict health risk. Please check your internet connection and try again.');
  }
}; 