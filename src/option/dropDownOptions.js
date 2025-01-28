export const options = (t) => ({
    gender:[
        {value:"bride",label: t("Options.gender.male")},
        {value:"groom",label: t("Options.gender.female")}
    ],
    minAgeOptions : Array.from({ length: 42 }, (_, i) => ({
        value: (i + 18).toString(),
        label: (i + 18).toString(),
      })),
      maxAgeOptions : [
        ...Array.from({ length: 43 }, (_, i) => ({
          value: (i + 18).toString(),
          label: (i + 18).toString(),
        })),
        { value: "60+", label: "60+" }
      ],
      casteOptions:[
        { value: "suthar", label: t("Options.caste.suthar") },
      ],
      subCasteOptions : [
        { value: "ashdev", label: t("Options.subCaste.ashdev") },
        { value: "bardwa", label: t("Options.subCaste.bardwa") },
        { value: "bamniya", label: t("Options.subCaste.bamniya") },
        { value: "Bhadrecha", label: t("Options.subCaste.Bhadrecha") },
        { value: "chadiya", label: t("Options.subCaste.chadiya") },
        { value: "chuyal", label: t("Options.subCaste.chuyal") },
        { value: "dhamu", label: t("Options.subCaste.dhamu") },
        { value: "dhanerava", label: t("Options.subCaste.dhanerava") },
        { value: "doyal", label: t("Options.subCaste.doyal") },
        { value: "durgesar", label: t("Options.subCaste.durgesar") },
        { value: "gepal", label: t("Options.subCaste.gepal") },
        { value: "khokha", label: t("Options.subCaste.khokha") },
        { value: "kulriya", label: t("Options.subCaste.kulriya") },
        { value: "ladrecha", label: t("Options.subCaste.ladrecha") },
        { value: "makad", label: t("Options.subCaste.makad") },
        { value: "mandan", label: t("Options.subCaste.mandan") },
        { value: "marotiya", label: t("Options.subCaste.marotiya") },
        { value: "motiyar", label: t("Options.subCaste.motiyar") },
        { value: "nagal", label: t("Options.subCaste.nagal") },
        { value: "nishan", label: t("Options.subCaste.nishan") },
        { value: "padwa", label: t("Options.subCaste.padwa") },
        { value: "jhambad", label: t("Options.subCaste.jhambad") }
      ],      
    qualificationOptions : [
        { value: "secondary", label: t("Options.qualification.secondary") },
        { value: "sr_sec", label: t("Options.qualification.sr_sec") },
        { value: "graduation", label: t("Options.qualification.graduation") },
        { value: "pg", label: t("Options.qualification.pg") },
        { value: "phd", label: t("Options.qualification.phd") },
        { value: "diploma", label: t("Options.qualification.diploma") },
        { value: "other_professional", label: t("Options.qualification.other_professional") },
        { value: "none", label: t("Options.qualification.none") }
    ],
     occupationOptions : [
        { value: "doctor", label: t("Options.occupation.doctor") },
        { value: "engineer", label: t("Options.occupation.engineer") },
        { value: "teacher", label: t("Options.occupation.teacher") },
        { value: "self_employed", label: t("Options.occupation.self_employed") },
        { value: "govt_service", label: t("Options.occupation.govt_service") },
        { value: "pvt_service", label: t("Options.occupation.pvt_service") },
        { value: "labour", label: t("Options.occupation.labour") },
        { value: "student", label: t("Options.occupation.student") },
        { value: "none", label: t("Options.occupation.none") }
    ],
    
     stateOptions : [
        { value: "rajasthan", label: t("Options.location.state.rajasthan") },
    ],
    
    cities: [
  { value: "ajmer", label: t("Options.location.city.ajmer") },
  { value: "alwar", label: t("Options.location.city.alwar") },
  { value: "banswara", label: t("Options.location.city.banswara") },
  { value: "baran", label: t("Options.location.city.baran") },
  { value: "barmer", label: t("Options.location.city.barmer") },
  { value: "bharatpur", label: t("Options.location.city.bharatpur") },
  { value: "bhilwara", label: t("Options.location.city.bhilwara") },
  { value: "bikaner", label: t("Options.location.city.bikaner") },
  { value: "bundi", label: t("Options.location.city.bundi") },
  { value: "chittorgarh", label: t("Options.location.city.chittorgarh") },
  { value: "churu", label: t("Options.location.city.churu") },
  { value: "dausa", label: t("Options.location.city.dausa") },
  { value: "dholpur", label: t("Options.location.city.dholpur") },
  { value: "shri_dungargarh", label: t("Options.location.city.shri_dungargarh") },
  { value: "shri_ganganagar", label: t("Options.location.city.shri_ganganagar") },
  { value: "hanumangarh", label: t("Options.location.city.hanumangarh") },
  { value: "jaipur", label: t("Options.location.city.jaipur") },
  { value: "jaisalmer", label: t("Options.location.city.jaisalmer") },
  { value: "jalore", label: t("Options.location.city.jalore") },
  { value: "jhalawar", label: t("Options.location.city.jhalawar") },
  { value: "jhunjhunu", label: t("Options.location.city.jhunjhunu") },
  { value: "jodhpur", label: t("Options.location.city.jodhpur") },
  { value: "karauli", label: t("Options.location.city.karauli") },
  { value: "kota", label: t("Options.location.city.kota") },
  { value: "nagaur", label: t("Options.location.city.nagaur") },
  { value: "pali", label: t("Options.location.city.pali") },
  { value: "pratapgarh", label: t("Options.location.city.pratapgarh") },
  { value: "rajsamand", label: t("Options.location.city.rajsamand") },
  { value: "sawai_madhopur", label: t("Options.location.city.sawai_madhopur") },
  { value: "sikar", label: t("Options.location.city.sikar") },
  { value: "sirohi", label: t("Options.location.city.sirohi") },
  { value: "tonk", label: t("Options.location.city.tonk") },
  { value: "udaipur", label: t("Options.location.city.udaipur") }
]

  });
  