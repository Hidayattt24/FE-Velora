export interface HealthOption {
  label: string;
  value: number;
}

export interface BloodPressureOption {
  label: string;
  systolic: number;
  diastolic: number;
}

export interface ParameterInfo {
  title: string;
  items: string[];
}

export const ageOptions: HealthOption[] = [
  { label: "Di bawah 20 tahun", value: 18 },
  { label: "20-25 tahun", value: 23 },
  { label: "26-30 tahun", value: 28 },
  { label: "31-35 tahun", value: 33 },
  { label: "36-40 tahun", value: 38 },
  { label: "Di atas 40 tahun", value: 42 },
];

export const bpOptions: BloodPressureOption[] = [
  { 
    label: "Normal (Systolic: 90-120, Diastolic: 60-80)", 
    systolic: 115,
    diastolic: 75
  },
  { 
    label: "Prehipertensi (Systolic: 120-140, Diastolic: 80-90)", 
    systolic: 130,
    diastolic: 85
  },
  { 
    label: "Hipertensi (Systolic: >140, Diastolic: >90)", 
    systolic: 150,
    diastolic: 95
  },
  { 
    label: "Rendah (Systolic: <90, Diastolic: <60)", 
    systolic: 85,
    diastolic: 55
  },
];

export const bsOptions: HealthOption[] = [
  { label: "Normal (4.0-7.0 mmol/L)", value: 5.5 },
  { label: "Sedikit Tinggi (7.1-11.0 mmol/L)", value: 9.0 },
  { label: "Tinggi (>11.0 mmol/L)", value: 12.0 },
  { label: "Rendah (<4.0 mmol/L)", value: 3.5 },
];

export const tempOptions: HealthOption[] = [
  { label: "Normal (97.8-99.0°F / 36.5-37.2°C)", value: 98.6 },
  { label: "Sedikit Tinggi (99.1-100.4°F / 37.3-38.0°C)", value: 99.5 },
  { label: "Tinggi (>100.4°F / >38.0°C)", value: 101.0 },
  { label: "Rendah (<97.8°F / <36.5°C)", value: 97.0 },
];

export const hrOptions: HealthOption[] = [
  { label: "Normal (60-100 bpm)", value: 80 },
  { label: "Tinggi (>100 bpm)", value: 110 },
  { label: "Rendah (<60 bpm)", value: 55 },
];

export const parameterInfo: ParameterInfo[] = [
  {
    title: "Tekanan Darah",
    items: [
      "Normal: 90-120/60-80 mmHg",
      "Prehipertensi: 120-140/80-90 mmHg",
      "Hipertensi: {'>'}140/{'>'}90 mmHg"
    ]
  },
  {
    title: "Gula Darah",
    items: [
      "Normal: 4.0-7.0 mmol/L",
      "Sedikit Tinggi: 7.1-11.0 mmol/L",
      "Tinggi: {'>'}11.0 mmol/L"
    ]
  },
  {
    title: "Suhu Tubuh",
    items: [
      "Normal: 36.5-37.2°C",
      "Demam Ringan: 37.3-38.0°C",
      "Demam: {'>'}38.0°C"
    ]
  },
  {
    title: "Detak Jantung",
    items: [
      "Normal: 60-100 detak per menit",
      "Tinggi: {'>'}100 detak per menit",
      "Rendah: {'<'}60 detak per menit"
    ]
  }
]; 