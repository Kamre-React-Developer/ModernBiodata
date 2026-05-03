
export interface BiodataField {
  id: string;
  label: string;
  value: string;
  type: string;
  required?: boolean;
  isLong?: boolean;
}

export interface BiodataSection {
  id: string;
  title: string;
  fields: BiodataField[];
}

export interface Biodata {
  mainTitle?: string;
  symbol: string;
  showHeading: boolean;
  headers: string[];
  photoUrl: string;
  sections: BiodataSection[];
}

export const initialBiodata: Biodata = {
  mainTitle: "",
  symbol: "none",
  showHeading: true,
  headers: [],
  photoUrl: "",
  sections: [
    {
      id: "personal",
      title: "PERSONAL DETAILS",
      fields: [
        { id: "p1", label: "Full Name", value: "Rahul Sharma", type: "text", required: true },
        { id: "p2", label: "Date of Birth", value: "15 August, 1995", type: "text", required: true },
        { id: "p3", label: "Time of Birth", value: "10:30 AM", type: "text" },
        { id: "p4", label: "Place of Birth", value: "Mumbai, Maharashtra", type: "text" },
        { id: "p5", label: "Height", value: "5 feet 10 inches (178 cm)", type: "text", required: true },
        { id: "p12", label: "Marital Status", value: "Single", type: "text" },
        { id: "p8", label: "Complexion", value: "Fair", type: "text" },
        { id: "p13", label: "Blood Group", value: "O+", type: "text" },
        { id: "p9", label: "Education", value: "Bachelor of Technology (Computer Science)", type: "text" },
        { id: "p10", label: "Job / Occupation", value: "Senior Software Engineer", type: "text" },
        { id: "p11", label: "Annual Income", value: "20-25 LPA", type: "text" },
        { id: "p14", label: "Religion", value: "Hindu", type: "text" },
        { id: "p15", label: "Mother Tongue", value: "Hindi", type: "text" },
        { id: "p6", label: "Caste", value: "Brahmin", type: "text", required: true },
        { id: "p16", label: "Sub Caste", value: "Gaur", type: "text" },
        { id: "p17", label: "Rashi (Zodiac)", value: "Mesh (Aries)", type: "text" },
        { id: "p18", label: "Manglik Status", value: "No", type: "text" },
      ]
    },
    {
      id: "family",
      title: "FAMILY DETAILS",
      fields: [
        { id: "f1", label: "Father's Name", value: "Mr. Suresh Sharma", type: "text", required: true },
        { id: "f2", label: "Father's Occupation", value: "Government Officer (Retired)", type: "text" },
        { id: "f3", label: "Mother's Name", value: "Mrs. Geeta Sharma", type: "text", required: true },
        { id: "f4", label: "Mother's Occupation", value: "Homemaker", type: "text" },
        { id: "f5", label: "Siblings", value: "1 Sister", type: "text" },
        { id: "f9", label: "Family Type", value: "Nuclear Family", type: "text" },
        { id: "f10", label: "Family Values", value: "Moderate", type: "text" },
        { id: "f11", label: "Family Status", value: "Upper Middle Class", type: "text" },
        { id: "f7", label: "Native Place", value: "Delhi, India", type: "text" },
      ]
    },
    {
      id: "contact",
      title: "CONTACT DETAILS",
      fields: [
        { id: "f8", label: "Residential Address", value: "Flat 501, Sunrise Apartments, Andheri West, Mumbai", type: "text", isLong: true },
        { id: "c1", label: "Mobile Number", value: "+91-9876543210", type: "text", required: true },
        { id: "c3", label: "Email ID", value: "rahul.sharma@example.com", type: "text" },
      ]
    }
  ]
};
