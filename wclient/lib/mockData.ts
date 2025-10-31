// lib/mockData.ts

export type Client = {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  testType: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REPORTED";
  img?: string; 
};


export const sampleClients: Client[] = [
  {
    id: "c1",
    name: "Ram Thapa",
    age: 65,
    gender: "M",
    testType: "Blood Sugar",
    status: "PENDING",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "c2",
    name: "Sita Sharma",
    age: 70,
    gender: "F",
    testType: "CBC",
    status: "IN_PROGRESS",
    img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "c3",
    name: "Maya KC",
    age: 68,
    gender: "F",
    testType: "Lipid Panel",
    status: "COMPLETED",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "c4",
    name: "Hari Adhikari",
    age: 72,
    gender: "M",
    testType: "Urinalysis",
    status: "REPORTED",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

