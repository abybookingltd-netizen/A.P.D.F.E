// src/data/programs.ts

import image1 from '../assets/program/image1.png'
import image2 from '../assets/program/image2.png'
import image3 from '../assets/program/image3.png'
import image4 from '../assets/program/image4.png'


export type Program = {
  id: string;
  title: string;
  icon: string;           // remixicon or lucide name (for reference)
  shortDescription: string;
  fullDescription: string;
  image: string;
  highlights: string[];
  subPrograms: Array<{
    title: string;
    icon?: string;
    description: string;
  }>;
  stats?: Array<{ label: string; value: string }>;
};

export const PROGRAMS: Program[] = [
  {
    id: "health",
    title: "Health Program",
    icon: "heart-pulse",
    shortDescription:
      "Delivering life-saving primary healthcare, nutrition support, sexual & reproductive health services, and mental health & psychosocial support (MHPSS) to women, children and survivors in conflict-affected areas.",
    fullDescription: `In the fragile and conflict-affected regions where APDFE operates — Central African Republic, eastern Democratic Republic of Congo, northern Cameroon, and parts of Republic of Congo — healthcare systems have been devastated by decades of instability. Health facilities have been looted or destroyed, qualified medical personnel have fled, supply chains for medicines and equipment are frequently disrupted, and large populations remain in hard-to-reach rural areas or displacement sites with no access to basic care.

Malnutrition is a persistent and deadly emergency. Recent nutrition surveys in displacement camps and return zones frequently show Global Acute Malnutrition (GAM) rates exceeding the WHO emergency threshold of 15%, with severe acute malnutrition (SAM) contributing significantly to under-five mortality. Pregnant and lactating women face heightened risks of anaemia, low birth weight deliveries, and maternal complications due to chronic food insecurity and limited antenatal care.

Gender-based violence (GBV), early and forced marriage, and lack of reproductive autonomy continue to drive high rates of adolescent pregnancy, obstetric complications, and sexually transmitted infections. Survivors often face stigma, lack of confidential services, and barriers to accessing post-rape care or family planning.

The psychological toll of prolonged exposure to violence, loss, displacement, and uncertainty is immense. Depression, anxiety, post-traumatic stress disorder (PTSD), and suicidal ideation are widespread, yet mental health services remain scarce, heavily stigmatized, and rarely funded in humanitarian responses.

APDFE adopts an integrated, survivor-centered, and community-based health approach. We deploy mobile clinics to reach remote and displaced populations, train and supervise community health workers (many of them women from the communities served), provide trauma-informed mental health and psychosocial support (MHPSS), and establish referral pathways to higher-level care when possible. All interventions prioritize dignity, confidentiality, cultural sensitivity, and do-no-harm principles, ensuring that health services contribute to both immediate survival and long-term resilience.`,
    image: image1 ,
    highlights: [
      "Mobile clinics reaching remote displacement sites",
      "Nutrition screening & treatment for children under 5",
      "Antenatal, delivery & postnatal care packages",
      "Family planning & modern contraceptive distribution",
      "Menstrual hygiene management & education",
      "Clinical management of rape survivors (where feasible)",
      "Group & individual psychosocial support sessions",
      "Community health worker training & supervision",
      "Hygiene promotion & cholera prevention campaigns",
      "Referral systems for specialized care"
    ],
    subPrograms: [
      {
        title: "Sexual and Reproductive Health and Rights (SRHR)",
        description:
          "We provide comprehensive, rights-based SRHR services including age-appropriate comprehensive sexuality education, family planning counseling and commodity distribution, menstrual hygiene kits and education, safe motherhood support, prevention and treatment of sexually transmitted infections, and clinical management of rape survivors in partnership with health facilities. Community dialogues engage men, boys, traditional and religious leaders to reduce stigma, challenge harmful norms, and promote gender-equitable decision-making around reproductive health."
      },
      {
        title: "Malnutrition Prevention & Treatment",
        description:
          "Our nutrition interventions focus on early detection through regular MUAC screening, treatment of moderate and severe acute malnutrition using community-based management protocols, blanket supplementary feeding during lean seasons or emergencies, promotion of optimal infant and young child feeding practices, micronutrient supplementation, and nutrition-sensitive agriculture training for caregivers. We work closely with mothers’ groups to prevent relapse and build long-term household nutrition resilience."
      },
      {
        title: "Mental Health and Psychosocial Support (MHPSS)",
        description:
          "Following IASC MHPSS guidelines, we deliver layered, community-based services: psychological first aid at the point of crisis, peer-led support groups, expressive arts and play therapy for children, individual counseling for moderate to severe cases, and community healing dialogues. All activities are trauma-informed, culturally adapted, and delivered by trained psychosocial workers — many of whom are survivors themselves — with regular supervision and referral pathways for psychiatric care when needed."
      }
    ],
    stats: [
      { label: "Women & girls reached annually", value: "18,500+" },
      { label: "Children screened & treated for malnutrition", value: "9,200+" },
      { label: "MHPSS sessions conducted", value: "42,000+" },
      { label: "Mobile clinic consultations", value: "31,000+" }
    ]
  },

  {
    id: "empowerment",
    title: "Youth and Women Economic Empowerment",
    icon: "hand-coin",
    shortDescription:
      "Equipping women and youth with market-relevant skills, entrepreneurship training, financial inclusion tools, and cooperative models to build sustainable livelihoods and economic independence.",
    fullDescription: `Extreme poverty, limited formal employment opportunities, and systemic exclusion from economic life remain defining features of the environments in which APDFE works. Women-headed households, adolescent girls, displaced populations, and youth — particularly those affected by conflict — face multiple barriers: lack of marketable skills, no access to capital, insecure land tenure, gender discrimination in markets, and high levels of risk aversion after years of instability.

Economic disempowerment perpetuates cycles of dependency, early marriage, transactional sex, and vulnerability to exploitation. Conversely, when women and youth gain economic agency, they reinvest significantly in their families (education, nutrition, health), strengthen community resilience, and become powerful agents of social change.

APDFE’s economic empowerment program is designed to be holistic, market-driven, and survivor-sensitive. We deliver vocational training in locally viable trades, entrepreneurship and business management courses, financial literacy and savings group formation (using the Village Savings & Loan Association model), provision of start-up kits or small seed grants, mentorship from successful local entrepreneurs, and support for collective marketing through women- and youth-led cooperatives.

Special attention is given to reducing gender barriers: we engage male partners and community leaders to support women’s economic participation, provide childcare during training sessions, and ensure safe transportation for participants in insecure areas. Many graduates go on to employ others, form thriving micro-enterprises, and serve as role models — demonstrating that economic dignity is a powerful pathway to broader empowerment and peace.`,
    image: image1,
    highlights: [
      "Market-relevant vocational training (tailoring, agriculture, small trade, cosmetics)",
      "Entrepreneurship & business planning bootcamps",
      "Financial literacy and money management workshops",
      "Formation and training of Village Savings & Loan Associations (VSLAs)",
      "Start-up kits, tools, and small seed grants",
      "Mentorship from successful local business owners",
      "Collective marketing & value-chain linkages",
      "Digital skills and mobile money training",
      "Women & youth cooperative development",
      "Gender-transformative dialogues with male gatekeepers"
    ],
    subPrograms: [
      {
        title: "Vocational Training and Entrepreneurship Development",
        description:
          "Participants receive 3–6 months of hands-on, competency-based training in high-demand, low-capital trades such as tailoring, soap & cosmetic production, poultry rearing, vegetable farming, petty trade, and hairdressing. Each course integrates business skills (costing, pricing, record-keeping, customer service) and entrepreneurship modules. Graduates receive start-up kits and are supported to develop business plans, access small grants or loans, and link to local markets or value chains."
      },
      {
        title: "Financial Inclusion and Cooperative Strengthening",
        description:
          "We facilitate the formation and capacity-building of Village Savings & Loan Associations (VSLAs) using a proven, self-managed methodology. Members save regularly, provide small loans to each other at fair interest rates, and build financial discipline. Over time, many groups evolve into formal cooperatives that engage in collective production, bulk purchasing, or joint marketing — increasing bargaining power and economic returns for members."
      }
    ],
    stats: [
      { label: "Women & youth trained annually", value: "4,800+" },
      { label: "Active savings & loan groups supported", value: "210+" },
      { label: "Micro-enterprises started or expanded", value: "2,150+" },
      { label: "Average income increase reported", value: "65–120%" }
    ]
  },

  {
    id: "protection",
    title: "Child Protection and Child Rights Governance",
    icon: "shield-user",
    shortDescription:
      "Preventing violence, abuse, exploitation and harmful practices against children while strengthening community protection mechanisms and promoting child rights and participation.",
    fullDescription: `Children in conflict-affected Central Africa face multiple and overlapping protection risks: forced recruitment by armed groups, early and forced marriage, physical and sexual violence in homes and camps, child labor (including worst forms), family separation during displacement, lack of birth registration, and exclusion from education and play due to insecurity.

Weak child protection systems, limited government presence in remote areas, cultural acceptance of certain harmful practices, and low awareness of child rights further compound vulnerability — particularly for girls, children with disabilities, and those from minority ethnic or religious groups.

APDFE adopts a community-based, systems-strengthening approach to child protection. We train and support community child protection committees, identify and build capacity of child protection focal points, establish and run child-friendly spaces in displacement sites and villages, facilitate case management and referral pathways for children at risk or survivors, conduct prevention campaigns (especially targeting early marriage, corporal punishment, and child labor), and support birth registration drives.

Equally important is our focus on child rights governance and participation. We create safe platforms for children and adolescents to express their views, support child-led clubs and peer education initiatives, engage children in community dialogues on issues affecting them, and advocate for child-sensitive policies and resource allocation at local and national levels.

By combining prevention, response, and empowerment, we aim to create protective environments where every child can survive, learn, develop, and participate — laying the foundation for a more just and peaceful future.`,
    image: image2,
    highlights: [
      "Community child protection committee training & activation",
      "Child-friendly spaces in camps and host communities",
      "Prevention campaigns against early marriage & child labor",
      "Case identification, documentation & referral pathways",
      "Psychosocial support & recreational activities for children",
      "Birth registration & legal identity documentation drives",
      "Child rights awareness in schools & communities",
      "Child participation clubs & peer education",
      "Training for traditional & religious leaders on child rights",
      "Advocacy for stronger child protection policies"
    ],
    subPrograms: [
      {
        title: "Community-Based Child Protection Mechanisms",
        description:
          "We establish and strengthen community child protection committees, train child protection focal points and community volunteers, develop referral pathways to health, legal, and social services, and facilitate regular case review meetings to ensure timely, coordinated, and survivor-centered responses to child protection concerns."
      },
      {
        title: "Child-Friendly Spaces and Psychosocial Support",
        description:
          "Safe, supervised child-friendly spaces offer structured play, learning, and expressive activities (art, music, sports) for children affected by conflict and displacement. These spaces also serve as entry points for early identification of protection risks and delivery of age-appropriate psychosocial support."
      },
      {
        title: "Child Rights Awareness and Participation",
        description:
          "We conduct rights awareness sessions for children, caregivers, and community leaders, support child-led clubs and peer education initiatives, and create platforms for children to express their views on issues affecting their lives — ensuring that children are not just beneficiaries, but active participants in shaping protective environments."
      }
    ],
    stats: [
      { label: "Children reached with protection services", value: "21,000+" },
      { label: "Child-friendly spaces established & run", value: "38" },
      { label: "Community volunteers & focal points trained", value: "1,450+" },
      { label: "Birth certificates issued / supported", value: "3,800+" }
    ]
  },

  {
    id: "environment",
    title: "Environmental Protection & Climate Resilience",
    icon: "leaf",
    shortDescription:
      "Promoting sustainable natural resource management, climate change adaptation, and community-led conservation to build resilience against environmental degradation and shocks.",
    fullDescription: `Environmental degradation — deforestation, soil erosion, loss of biodiversity, poor waste management, and water pollution — is accelerating in our operational zones, driven by population pressure from displacement, unsustainable farming practices, charcoal production, and weak environmental governance.

Climate change compounds these challenges: erratic rainfall, prolonged dry spells, flooding, and rising temperatures threaten food security, water availability, and livelihoods — especially for subsistence farmers and women who bear primary responsibility for collecting water and firewood.

APDFE integrates environmental protection and climate resilience across all programming while also running dedicated initiatives. We promote climate-smart agriculture (improved seeds, agroforestry, soil & water conservation), support community-led reforestation and watershed protection, raise awareness on environmental health (waste management, hygiene), and empower women and youth to lead green micro-enterprises (beekeeping, solar products, briquette production).

Our approach is participatory and rights-based: communities identify priorities, lead implementation, and benefit directly from improved natural resources and alternative livelihoods — ensuring ownership and sustainability even after projects end.`,
    image: image3   ,
    highlights: [
      "Climate-smart agriculture training & demonstration plots",
      "Community-led tree planting & agroforestry",
      "Watershed protection & soil conservation structures",
      "Improved cookstoves & briquette production",
      "Beekeeping & non-timber forest product enterprises",
      "Solar lantern & clean energy product distribution",
      "Environmental education in schools & communities",
      "Waste management & recycling initiatives",
      "Women & youth green entrepreneurship support",
      "Advocacy for local environmental bylaws"
    ],
    subPrograms: [
      {
        title: "Climate-Smart Agriculture and Natural Resource Management",
        description:
          "We train farmers (with strong focus on women) in climate-resilient techniques: drought-resistant crops, intercropping, mulching, composting, rainwater harvesting, and establishment of woodlots and live fences. Demonstration plots and farmer field schools allow participants to test and adopt practices suited to local conditions."
      },
      {
        title: "Community-Led Conservation and Green Enterprises",
        description:
          "Communities identify degraded areas for restoration; we support tree nurseries, reforestation, and watershed protection. Simultaneously, we train women and youth in green micro-enterprises (beekeeping, fruit tree nurseries, briquette making, solar product sales) — creating economic incentives for conservation while diversifying livelihoods."
      }
    ],
    stats: [
      { label: "Trees planted & surviving", value: "145,000+" },
      { label: "Farmers trained in climate-smart practices", value: "6,800+" },
      { label: "Green micro-enterprises supported", value: "420+" }
    ]
  },

  {
    id: "education",
    title: "Education Program",
    icon: "book-open",
    shortDescription:
      "Providing foundational literacy, numeracy, life skills, and accelerated learning for out-of-school children, youth, and women — with strong emphasis on girls’ education and reintegration.",
    fullDescription: `Conflict and chronic instability have devastated education systems across our operational zones. Schools have been destroyed, looted, or occupied by armed groups; teachers have fled; learning materials are scarce; and entire generations of children — especially girls — have been out of school for years due to displacement, early marriage, household responsibilities, and insecurity on the way to school.

In many areas, net enrollment rates remain far below regional averages, with girls disproportionately affected. Lack of education perpetuates poverty, limits economic opportunities, increases vulnerability to GBV, and reduces community resilience and civic participation.

APDFE’s education program focuses on reaching the most excluded: adolescent girls, young mothers, displaced children, and youth who have missed years of schooling. We offer accelerated learning programs that condense primary-level content into shorter cycles, combined with foundational literacy & numeracy, life skills (health, rights, decision-making), and vocational orientation. We distribute scholastic materials, provide sanitary pads and hygiene kits to improve girls’ attendance, establish temporary learning spaces in displacement sites, and support reintegration into formal schools where possible.

We also run community awareness campaigns to shift norms around girls’ education and engage parents, traditional leaders, and husbands in supporting retention and completion. Long-term, we advocate for inclusive education policies and increased investment in conflict-affected areas.`,
    image: image1,
    highlights: [
      "Accelerated learning for out-of-school children & youth",
      "Foundational literacy & numeracy for adolescent girls & women",
      "Life skills & leadership training",
      "Distribution of scholastic materials & hygiene kits",
      "Temporary learning spaces in displacement sites",
      "Girls’ education retention & reintegration support",
      "Community & parental awareness campaigns",
      "Teacher training in trauma-informed pedagogy",
      "Vocational orientation & bridging to skills programs",
      "Advocacy for inclusive education policies"
    ],
    subPrograms: [
      {
        title: "Accelerated Learning and Literacy for Out-of-School Groups",
        description:
          "Tailored accelerated programs condense 3–4 years of primary content into 9–18 months for older children and adolescents who have missed school. Classes focus on core literacy, numeracy, and essential life skills, with flexible scheduling to accommodate work or childcare responsibilities. Strong emphasis is placed on creating safe, girl-friendly learning environments."
      },
      {
        title: "Girls’ Retention and Community Engagement",
        description:
          "We provide sanitary pads, hygiene education, and transportation support to reduce dropout due to menstruation or distance. Community dialogues, parent committees, and engagement with religious & traditional leaders challenge norms around early marriage and girls’ domestic workload, while celebrating girls who complete learning cycles as role models."
      }
    ],
    stats: [
      { label: "Learners enrolled annually", value: "7,200+" },
      { label: "Girls receiving scholastic & hygiene support", value: "4,500+" },
      { label: "Learners reintegrated into formal schools", value: "2,100+" }
    ]
  },

  {
    id: "peace",
    title: "Peace-Building and Governance",
    icon: "handshake",
    shortDescription:
      "Facilitating inclusive dialogue, conflict resolution, women & youth leadership, and local governance structures to promote social cohesion and sustainable peace.",
    fullDescription: `Decades of armed conflict, ethnic tensions, resource competition, and weak governance have deeply fractured social relations and eroded trust between communities, between citizens and authorities, and within families in our operational areas.

Women and young people — who suffer disproportionately from violence and displacement — are frequently excluded from formal peace negotiations and local decision-making, despite their critical role in maintaining household and community resilience.

APDFE believes sustainable peace requires addressing root causes: inequality, exclusion, unresolved grievances, and lack of inclusive governance. Our peace-building approach is multi-layered: we facilitate structured inter-community dialogues to rebuild trust and address shared problems (water points, grazing land, markets); train women and youth as mediators and peace advocates; support local peace committees and early warning mechanisms; deliver conflict sensitivity and do-no-harm training to community leaders and service providers; and advocate for greater inclusion of marginalized voices in local governance processes.

We also integrate peacebuilding into other programs — for example, ensuring economic empowerment activities bring together members of different groups, or using child-friendly spaces as neutral venues for cross-community interaction. By centering women, youth, and survivors in peace efforts, we help build more equitable, resilient, and cohesive societies capable of preventing relapse into violence.`,
    image: image4,
    highlights: [
      "Inter-community dialogue & trust-building sessions",
      "Women & youth mediator & peace advocate training",
      "Support to local peace committees & early warning networks",
      "Conflict analysis & do-no-harm training",
      "Trauma-aware peacebuilding & reconciliation activities",
      "Inclusive local governance advocacy",
      "Cross-community economic & social initiatives",
      "Engagement of traditional & religious leaders in peace",
      "Youth-led peace education & arts initiatives",
      "Regional cross-border peace networking"
    ],
    subPrograms: [
      {
        title: "Inclusive Dialogue and Reconciliation",
        description:
          "We facilitate structured, trauma-sensitive dialogues between communities in tension (host/refugee, farmer/herder, different ethnic or religious groups) to identify shared needs, address grievances, and develop joint solutions (e.g., shared water management, market access agreements). Dialogues are followed by concrete, trust-building joint activities."
      },
      {
        title: "Women and Youth Leadership in Peace and Governance",
        description:
          "Dedicated training equips women and youth with mediation, negotiation, advocacy, and leadership skills. We support their participation in local peace structures, community decision-making bodies, and advocacy platforms — ensuring their perspectives shape responses to conflict and recovery."
      }
    ],
    stats: [
      { label: "Dialogue & reconciliation events facilitated", value: "180+" },
      { label: "Women & youth mediators / advocates trained", value: "920+" },
      { label: "Local peace committees supported", value: "65" },
      { label: "Community members reached through peace activities", value: "28,000+" }
    ]
  }
];