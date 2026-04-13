export type Language = "en" | "kn" | "hi";

const translations = {
  en: {
    welcome: "Welcome to LDERLY",
    namaste: "Namaste",
    wellness_score: "Wellness Score",
    next_visit: "Next Visit",
    book_visit: "Book Visit",
    emergency_sos: "Emergency SOS",
    call_family: "Call Family",
    i_need_help: "I need help",
    my_health: "My Health",
  },
  kn: {
    welcome: "LDERLY ಗೆ ಸುಸ್ವಾಗತ",
    namaste: "ನಮಸ್ಕಾರ",
    wellness_score: "ಕ್ಷೇಮ ಸ್ಕೋರ್",
    next_visit: "ಮುಂದಿನ ಭೇಟಿ",
    book_visit: "ಭೇಟಿ ಕಾಯ್ದಿರಿಸಿ",
    emergency_sos: "ತುರ್ತು SOS",
    call_family: "ಕುಟುಂಬಕ್ಕೆ ಕರೆ ಮಾಡಿ",
    i_need_help: "ನನಗೆ ಸಹಾಯ ಬೇಕು",
    my_health: "ನನ್ನ ಆರೋಗ್ಯ",
  },
  hi: {
    welcome: "LDERLY में आपका स्वागत है",
    namaste: "नमस्ते",
    wellness_score: "वेलनेस स्कोर",
    next_visit: "अगली मुलाकात",
    book_visit: "विजिट बुक करें",
    emergency_sos: "आपातकालीन SOS",
    call_family: "परिवार को कॉल करें",
    i_need_help: "मुझे मदद चाहिए",
    my_health: "मेरा स्वास्थ्य",
  }
};

export function useTranslation(lang: Language = "en") {
  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations.en[key];
  };
  return { t };
}
