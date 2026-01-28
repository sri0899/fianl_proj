
import { Scheme, Language, UserCategory } from './types';

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

export const CURATED_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    nameEn: 'PM-KISAN',
    nameTa: 'பிரதமர் கிசான்',
    nameHi: 'पीएम-किसान',
    category: 'Agriculture',
    minAge: 18,
    eligibleCategories: ['Farmer'],
    descriptionEn: 'Income support to farmer families.',
    descriptionTa: 'விவசாய குடும்பங்களுக்கு வருமான ஆதரவு.',
    descriptionHi: 'किसान परिवारों को आय सहायता।',
    benefitsEn: ['₹6,000 per year'],
    benefitsTa: ['ஆண்டுக்கு ₹6,000'],
    benefitsHi: ['₹6,000 प्रति वर्ष'],
    eligibilityEn: ['Small and marginal farmers'],
    eligibilityTa: ['சிறு மற்றும் குறு விவசாயிகள்'],
    eligibilityHi: ['लघु और सीमांत किसान'],
    documentsEn: ['Aadhaar', 'Land Records'],
    documentsTa: ['ஆதார்', 'நிலப் பதிவுகள்'],
    documentsHi: ['आधार', 'भूमि रिकॉर्ड'],
    officialUrl: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmsvanidhi',
    nameEn: 'PM SVANidhi',
    nameTa: 'பிஎம் ஸ்வநிதி',
    nameHi: 'पीएम स्वनिधि',
    category: 'Entrepreneurship',
    minAge: 18,
    eligibleCategories: ['Entrepreneur', 'Working'],
    descriptionEn: 'Micro-credit for street vendors.',
    descriptionTa: 'தெருவோர வியாபாரிகளுக்கான சிறு கடன்.',
    descriptionHi: 'रेहड़ी-पटरी वालों के लिए सूक्ष्म ऋण।',
    benefitsEn: ['₹10,000 initial loan'],
    benefitsTa: ['தொடக்கக் கடன் ₹10,000'],
    benefitsHi: ['₹10,000 प्रारंभिक ऋण'],
    eligibilityEn: ['Street vendors in urban areas'],
    eligibilityTa: ['நகர்ப்புற தெருவோர வியாபாரிகள்'],
    eligibilityHi: ['शहरी क्षेत्रों में रेहड़ी-पटरी वाले'],
    documentsEn: ['Vending Certificate', 'Aadhaar'],
    documentsTa: ['வியாபாரச் சான்றிதழ்', 'ஆதார்'],
    documentsHi: ['विक्रय प्रमाण पत्र', 'आधार'],
    officialUrl: 'https://pmsvanidhi.mohua.gov.in/'
  }
];

export const UI_STRINGS = {
  en: {
    title: 'AI Civil Assistant',
    login: 'Login with Google',
    setupProfile: 'Complete Your Profile',
    recommended: 'Recommended for You',
    allSchemes: 'All Schemes',
    chatPrompt: 'How can I help you today?',
    disclaimer: 'This AI provides guidance for awareness only and is not official government advice.',
    uploadDoc: 'Analyze Document',
    category: 'Category',
    income: 'Annual Income',
    save: 'Save Profile',
    // Added missing keys for SchemeDetail.tsx
    benefits: 'Benefits',
    eligibility: 'Eligibility',
    documents: 'Documents Required',
    visitOfficial: 'Visit Official Website'
  },
  ta: {
    title: 'AI சிவில் உதவியாளர்',
    login: 'கூகுள் மூலம் உள்நுழையவும்',
    setupProfile: 'உங்கள் சுயவிவரத்தை பூர்த்தி செய்க',
    recommended: 'உங்களுக்காக பரிந்துரைக்கப்படுபவை',
    allSchemes: 'அனைத்து திட்டங்கள்',
    chatPrompt: 'இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
    disclaimer: 'இந்த AI விழிப்புணர்விற்கான வழிகாட்டுதலை மட்டுமே வழங்குகிறது மற்றும் இது அதிகாரப்பூர்வ அரசாங்க ஆலோசனை அல்ல.',
    uploadDoc: 'ஆவணத்தை பகுப்பாய்வு செய்க',
    category: 'வகை',
    income: 'ஆண்டு வருமானம்',
    save: 'சுயவிவரத்தை சேமி',
    // Added missing keys for SchemeDetail.tsx
    benefits: 'பலன்கள்',
    eligibility: 'தகுதி',
    documents: 'தேவைப்படும் ஆவணங்கள்',
    visitOfficial: 'அதிகாரப்பூர்வ வலைதளத்திற்குச் செல்லுங்கள்'
  },
  hi: {
    title: 'AI नागरिक सहायक',
    login: 'गूगल के साथ लॉगिन करें',
    setupProfile: 'अपनी प्रोफ़ाइल पूरी करें',
    recommended: 'आपके लिए अनुशंसित',
    allSchemes: 'सभी योजनाएं',
    chatPrompt: 'आज मैं आपकी क्या सहायता कर सकता हूँ?',
    disclaimer: 'यह AI केवल जागरूकता के लिए मार्गदर्शन प्रदान करता है और आधिकारिक सरकारी सलाह नहीं है।',
    uploadDoc: 'दस्तावेज़ विश्लेषण',
    category: 'श्रेणी',
    income: 'वार्षिक आय',
    save: 'प्रोफ़ाइल सहेजें',
    // Added missing keys for SchemeDetail.tsx
    benefits: 'लाभ',
    eligibility: 'पात्रता',
    documents: 'आवश्यक दस्तावेज़',
    visitOfficial: 'आधिकारिक वेबसाइट पर जाएं'
  }
};
