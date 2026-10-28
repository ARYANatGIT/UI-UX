export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Northeast' | 'Central';
  category: 'Mountains & Mist' | 'Culture & Heritage' | 'Beaches & Coastlines' | 'Nature & Wildlife' | 'Slow Travel' | 'Weekend Escapes';
  budgetCategory: 'Budget-conscious' | 'Moderate comfort' | 'Boutique & Heritage';
  idealDuration: '2-3 days' | '4-5 days' | '6+ days';
  durationDays: number;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  highlights: string[];
  bestTimeToVisit: string;
  nearestHub: string;
  heroImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  thumbnailImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  guideSlug?: string;
  indicativeDailyCost: number; // in INR
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'jaipur',
    slug: 'jaipur-rajasthan',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North',
    category: 'Culture & Heritage',
    budgetCategory: 'Moderate comfort',
    idealDuration: '2-3 days',
    durationDays: 3,
    tagline: 'The Pink City of Astronomical Marvels and Living Craft Legacies',
    shortDescription: 'From the terracotta-hued ramparts of Amer Fort to century-old block printing ateliers in Sanganer, Jaipur marries royal grandeur with living artisan traditions.',
    longDescription: 'Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is India’s first planned city built on ancient Vastu Shastra principles. Beyond its world-famous amber walls and terracotta facades, the city thrives with historic bazaars, astronomical observatories, and generational craft guilds specializing in blue pottery, gemstone cutting, and miniature painting.',
    highlights: ['Amer Fort & Sheesh Mahal', 'Jantar Mantar UNESCO Observatory', 'Hawa Mahal & City Palace', 'Sanganer Hand-Block Printing Workshops'],
    bestTimeToVisit: 'October to March (pleasantly warm days, cool evenings)',
    nearestHub: 'Jaipur International Airport (JAI) / Jaipur Junction Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Ornate geometric courtyards and terracotta sandstone arches of Amber Palace in Jaipur, Rajasthan',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Amber Fort courtyard in Jaipur',
      width: 600,
      height: 400
    },
    guideSlug: 'three-days-in-jaipur',
    indicativeDailyCost: 2800
  },
  {
    id: 'munnar',
    slug: 'munnar-kerala',
    name: 'Munnar',
    state: 'Kerala',
    region: 'South',
    category: 'Mountains & Mist',
    budgetCategory: 'Moderate comfort',
    idealDuration: '2-3 days',
    durationDays: 3,
    tagline: 'Emerald Tea Terraces, Shola Ecosystems, and Mountain Breezes',
    shortDescription: 'Perched at 1,600 metres along the Western Ghats, Munnar unfolds across endless undulating tea carpets, misty valleys, and endangered Nilgiri Tahr habitats.',
    longDescription: 'Situated at the confluence of three mountain streams (Mudhirapuzha, Nallathanni, and Kundaly), Munnar was once the summer retreat of the British administration in South India. Today it is celebrated for its biodiversity, mist-draped shola-grassland mosaics, and sustainable estate trails where travelers experience quiet, restorative mountain life.',
    highlights: ['Eravikulam National Park (Nilgiri Tahr habitat)', 'Mattupetty Reservoir & Echo Point', 'Kolukkumalai High-Altitude Tea Estate', 'Attukad Cascading Waterfalls'],
    bestTimeToVisit: 'September to March (lush green landscapes, crisp air)',
    nearestHub: 'Cochin International Airport (COK, 110 km) / Aluva Railway Station (108 km)',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Rolling emerald green tea plantation hills under soft morning mist in Munnar, Kerala',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Misty tea gardens of Munnar',
      width: 600,
      height: 400
    },
    guideSlug: 'munnar-travel-guide',
    indicativeDailyCost: 2400
  },
  {
    id: 'rishikesh',
    slug: 'rishikesh-uttarakhand',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North',
    category: 'Weekend Escapes',
    budgetCategory: 'Budget-conscious',
    idealDuration: '2-3 days',
    durationDays: 2,
    tagline: 'Where the Himalayan Waters Meet Ancient Contemplative Wisdom',
    shortDescription: 'Nestled where the emerald Ganges tumbles from Himalayan ravines into the northern plains, Rishikesh brings together yoga, whitewater river runs, and evening aartis.',
    longDescription: 'Renowned as the world capital of yoga, Rishikesh sits gracefully on both banks of the holy river Ganga. From the historic suspension bridges of Lakshman Jhula and Ram Jhula to secluded forest ashrams and mountain trailheads, it offers an invigorating combination of mindful introspection and outdoor mountain adventure.',
    highlights: ['Triveni Ghat Evening Ganga Aarti', 'Beatles Ashram (Chaurasi Kutia)', 'Shivpuri River Expeditions', 'Neer Garh Forest Waterfall Trek'],
    bestTimeToVisit: 'September to November & February to May',
    nearestHub: 'Dehradun Jolly Grant Airport (DED, 21 km) / Yog Nagari Rishikesh Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'The holy river Ganga flowing past riverbank temples and Himalayan foothills in Rishikesh, Uttarakhand',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Ganges riverbank in Rishikesh',
      width: 600,
      height: 400
    },
    guideSlug: 'weekend-in-rishikesh',
    indicativeDailyCost: 1800
  },
  {
    id: 'hampi',
    slug: 'hampi-karnataka',
    name: 'Hampi',
    state: 'Karnataka',
    region: 'South',
    category: 'Culture & Heritage',
    budgetCategory: 'Budget-conscious',
    idealDuration: '4-5 days',
    durationDays: 4,
    tagline: 'A Surreal Granite Boulder Wonderland of the Vijayanagara Empire',
    shortDescription: 'Wander among giant balance-defying boulders, banana groves, and UNESCO World Heritage stone chariot ruins of a medieval empire along the Tungabhadra river.',
    longDescription: 'In the 14th to 16th century, Vijayanagara was one of the largest and wealthiest metropolises in the medieval world. Today, Hampi is an open-air museum set in a dramatic Martian-like topography of ochre boulders, monolithic temples, musical pillars, and tranquil coracle boat rides along the Tungabhadra.',
    highlights: ['Virupaksha Temple & Hampi Bazaar', 'Vittala Temple Stone Chariot', 'Anjaneya Hill Sunset Point', 'Lotus Mahal & Royal Enclosure'],
    bestTimeToVisit: 'October to February (cool breezy weather for outdoor cycling)',
    nearestHub: 'Jindal Vidyanagar Airport (VDY, 40 km) / Hosapete Junction (13 km)',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1600100397608-f010f443b355?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Stone carvings and historic boulder landscapes of ancient Vijayanagara ruins in Hampi, Karnataka',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1600100397608-f010f443b355?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Vijayanagara architectural ruins in Hampi',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 1600
  },
  {
    id: 'meghalaya',
    slug: 'meghalaya-cherrapunji-shillong',
    name: 'Meghalaya',
    state: 'Meghalaya',
    region: 'Northeast',
    category: 'Nature & Wildlife',
    budgetCategory: 'Moderate comfort',
    idealDuration: '6+ days',
    durationDays: 6,
    tagline: 'The Abode of Clouds, Living Root Bridges, and Crystal River Valleys',
    shortDescription: 'Trek through ancient rainforest ravines to bio-engineered living root bridges, peer into cavernous limestone grottos, and paddle atop the glass waters of Umngot.',
    longDescription: 'Meghalaya is a high plateau blessed with perpetual cloud cover, deep gorges, and extraordinary Khasi botanical ingenuity. The legendary living root bridges—intertwined Ficus elastica roots cultivated over generations—stand as a profound global model of sustainable tribal architecture and community stewardship.',
    highlights: ['Double Decker Living Root Bridge in Nongriat', 'Dawki Umngot Crystal River', 'Mawlynnong Cleanest Village', 'Nohkalikai Falls & Mawsmai Caves'],
    bestTimeToVisit: 'October to April (clear trails, pleasant weather, calm rivers)',
    nearestHub: 'Guwahati LGBI Airport (GAU, 120 km) / Guwahati Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Misty lush green valleys and natural waterfalls nestled in the Khasi Hills of Meghalaya',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Khasi hills scenery in Meghalaya',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 2600
  },
  {
    id: 'goa',
    slug: 'south-goa-slow-travel',
    name: 'South Goa',
    state: 'Goa',
    region: 'West',
    category: 'Beaches & Coastlines',
    budgetCategory: 'Moderate comfort',
    idealDuration: '4-5 days',
    durationDays: 4,
    tagline: 'Quiet Susegad, Portuguese Estuarine Mansions, and Palm-Fringed Shores',
    shortDescription: 'Escape crowded beach strips for the tranquil rhythm of South Goa—sleepy fishing villages, inland mangrove waterways, and golden crescent coastlines.',
    longDescription: 'While North Goa is renowned for nightlife, South Goa embodies the authentic Konkan philosophy of "susegad"—a content, relaxed way of being. Discover heritage Indo-Portuguese mansions in Chandor, organic spice plantations in Ponda, and serene, uncrowded shores like Agonda and Butterfly Beach.',
    highlights: ['Agonda & Cola Secluded Coastlines', 'Braganza & Menezes Heritage Mansions', 'Dr. Salim Ali Bird Sanctuary Mangrove Safari', 'Sahakari Organic Spice Plantation'],
    bestTimeToVisit: 'November to February (warm sunny days, gentle breezes)',
    nearestHub: 'Goa Dabolim Airport (GOI) or Mopa (GOX) / Madgaon Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Golden sun setting over calm waves and silhouette coconut palms on a peaceful South Goa beach',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Quiet palm-lined beach in South Goa',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 3100
  },
  {
    id: 'spiti',
    slug: 'spiti-valley-himachal',
    name: 'Spiti Valley',
    state: 'Himachal Pradesh',
    region: 'North',
    category: 'Mountains & Mist',
    budgetCategory: 'Moderate comfort',
    idealDuration: '6+ days',
    durationDays: 7,
    tagline: 'The Middle Land of High Cold Deserts and Millennium-Old Monasteries',
    shortDescription: 'Carved between Tibet and India, Spiti presents stark trans-Himalayan landscapes, star-studded celestial skies, and cliff-clinging Tibetan Buddhist gompas.',
    longDescription: 'At an average altitude over 3,800 metres, Spiti Valley is a raw, awe-inspiring wonderland of jagged mountains, turquoise glacial streams, and ancient Buddhist heritage. Monasteries like Key and Tabo preserve thousand-year-old murals, rare manuscripts, and meditative tranquility unchanged for centuries.',
    highlights: ['Key Monastery Perched on Hilltop', 'Chandratal (The Moon Lake) Trek', 'Tabo Monastery (The Ajanta of the Himalayas)', 'Highest Post Office at Hikkim'],
    bestTimeToVisit: 'June to September (roads open, alpine passes accessible)',
    nearestHub: 'Bhuntar Airport, Kullu (245 km) / Shimla or Chandigarh Railhead',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Dramatic trans-Himalayan peaks and ancient Key Monastery atop a rocky ridge in Spiti Valley, Himachal Pradesh',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Key Monastery in Spiti Valley',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 2500
  },
  {
    id: 'coorg',
    slug: 'coorg-kodagu-karnataka',
    name: 'Coorg (Kodagu)',
    state: 'Karnataka',
    region: 'South',
    category: 'Slow Travel',
    budgetCategory: 'Moderate comfort',
    idealDuration: '2-3 days',
    durationDays: 3,
    tagline: 'The Fragrant Coffee Hills and Brave Kodava Heritage of the Western Ghats',
    shortDescription: 'Wake up to the aroma of freshly roasted Arabica, wander under dense rainforest canopies, and discover traditional Kodava homestay hospitality.',
    longDescription: 'Known as the Scotland of India, Kodagu is a verdant district carpeted with shade-grown coffee, black pepper vines, and cardamom groves. It is also the sacred origin of the river Kaveri at Talakaveri, offering cool hill-station climate and rich indigenous martial culture.',
    highlights: ['Shade-Grown Coffee Plantation Walks', 'Abbey & Iruppu Cascades', 'Namdroling Golden Temple (Bylakuppe)', 'Tadiandamol Peak Trek'],
    bestTimeToVisit: 'October to March (pleasant weather, coffee harvest season)',
    nearestHub: 'Kannur International Airport (CNN, 90 km) / Mysuru Junction (120 km)',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Lush green forested hills and mist rolling over coffee plantations in Coorg, Karnataka',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Coffee hills of Coorg',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 2600
  },
  {
    id: 'varanasi',
    slug: 'varanasi-uttar-pradesh',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North',
    category: 'Culture & Heritage',
    budgetCategory: 'Budget-conscious',
    idealDuration: '2-3 days',
    durationDays: 3,
    tagline: 'The Eternal City of Sacred Ghats, Classical Music, and Silk Weavers',
    shortDescription: 'One of the world’s oldest continuously inhabited cities, Varanasi pulses along 84 stone ghats where life, philosophy, and music intertwine on the Ganga.',
    longDescription: 'Mark Twain famously observed that Varanasi is "older than history, older than tradition, older even than legend." From sunrise wooden boat rides passing Assi and Dashashwamedh Ghats to the intricate jacquard looms of Benarasi silk artisans, Varanasi is an immersion into India’s deepest spiritual and cultural currents.',
    highlights: ['Dawn Boat Ride along Historic Ghats', 'Maha Ganga Aarti at Dashashwamedh', 'Sarnath Deer Park & Dhamek Stupa', 'Heritage Silk Handloom Alleys'],
    bestTimeToVisit: 'November to February (cool mornings, pleasant afternoons)',
    nearestHub: 'Lal Bahadur Shastri International Airport (VNS, 25 km) / Varanasi Junction',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Dawn light over wooden rowboats and sacred stone bathing ghats along the river Ganga in Varanasi',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Ghats of Varanasi at sunrise',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 1900
  },
  {
    id: 'udaipur',
    slug: 'udaipur-rajasthan',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North',
    category: 'Culture & Heritage',
    budgetCategory: 'Boutique & Heritage',
    idealDuration: '2-3 days',
    durationDays: 3,
    tagline: 'The City of Mirrored Lakes, Marble Palaces, and Mewar Valor',
    shortDescription: 'Encircled by the ancient Aravalli hills, Udaipur reflects whitewashed royal havelis, lake palaces, and intricate jharokhas in the tranquil waters of Lake Pichola.',
    longDescription: 'Founded in 1559 by Maharana Udai Singh II as the capital of Mewar kingdom, Udaipur is famed for its romantic island palaces, courtyards adorned with peacock glass mosaics, and rich artistic traditions in Mewar miniature painting and silver craft.',
    highlights: ['City Palace Complex & Crystal Gallery', 'Boat Cruise on Lake Pichola to Jagmandir', 'Saheliyon-ki-Bari Royal Gardens', 'Monsoon Palace (Sajjangarh) Sunset View'],
    bestTimeToVisit: 'October to March (crisp desert evenings, bright clear days)',
    nearestHub: 'Maharana Pratap Airport (UDR, 22 km) / Udaipur City Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Illuminated marble pavilions of the City Palace reflecting on the still waters of Lake Pichola in Udaipur',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Udaipur City Palace and lake',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 3800
  },
  {
    id: 'ladakh',
    slug: 'leh-ladakh-trans-himalaya',
    name: 'Leh & Ladakh',
    state: 'Ladakh',
    region: 'North',
    category: 'Mountains & Mist',
    budgetCategory: 'Moderate comfort',
    idealDuration: '6+ days',
    durationDays: 7,
    tagline: 'High Alpine Passes, Indigo Lakes, and Buddhist Hermitages in the Sky',
    shortDescription: 'Cross Khardung La into the Nubra Valley dunes, admire the changing hues of Pangong Tso, and experience Tibetan Buddhist monastic chanting at dawn.',
    longDescription: 'Known as the Land of High Passes, Ladakh is a rugged alpine desert bordered by the Karakoram and Great Himalaya ranges. It is celebrated for its warm Ladakhi homestays, solar-powered eco-tourism, and rich Buddhist culture preserved at Hemis, Thiksey, and Diskit monasteries.',
    highlights: ['Pangong Tso High Altitude Salt Lake', 'Thiksey & Hemis Monasteries', 'Nubra Valley Hunder Sand Dunes & Bactrian Camels', 'Khardung La Pass Viewpoint'],
    bestTimeToVisit: 'May to September (warm days, open roads, vibrant festivals)',
    nearestHub: 'Kushok Bakula Rimpochee Airport (IXL, Leh)',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Pristine blue waters of a high-altitude Himalayan lake surrounded by jagged mountain ranges in Ladakh',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Ladakh alpine landscape',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 3200
  },
  {
    id: 'ziro',
    slug: 'ziro-valley-arunachal',
    name: 'Ziro Valley',
    state: 'Arunachal Pradesh',
    region: 'Northeast',
    category: 'Slow Travel',
    budgetCategory: 'Budget-conscious',
    idealDuration: '4-5 days',
    durationDays: 4,
    tagline: 'Paddy-Cum-Pisciculture and the Indigenous Wisdom of the Apatani',
    shortDescription: 'Tucked inside the lower Subansiri district, Ziro Valley is home to the Apatani people, renowned for their intricate face tattoos, bamboo groves, and sustainable farming.',
    longDescription: 'Ziro Valley is a candidate UNESCO World Heritage cultural landscape. Surrounded by pine-clad hills, the Apatani practice a unique ecological farming method where fish are reared in flooded paddy fields without modern machinery or harmful chemical inputs.',
    highlights: ['Apatani Village Cultural Immersion', 'Kardo Shiva Lingam', 'Pine-Covered Midey Ridge Walks', 'Tarin Sustainable Fish Farm'],
    bestTimeToVisit: 'March to October (lush green landscape, cultural ceremonies)',
    nearestHub: 'Hollongi Airport, Itanagar (120 km) / Naharlagun Railway Station',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Terraced emerald rice paddies and pine-covered mountain ridges in Ziro Valley, Arunachal Pradesh',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Rice terraces of Ziro Valley',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 1900
  },
  {
    id: 'orchha',
    slug: 'orchha-madhya-pradesh',
    name: 'Orchha',
    state: 'Madhya Pradesh',
    region: 'Central',
    category: 'Culture & Heritage',
    budgetCategory: 'Budget-conscious',
    idealDuration: '2-3 days',
    durationDays: 2,
    tagline: 'The Frozen Bundela Capital along the Betwa River Boulder Bends',
    shortDescription: 'Marvel at 16th-century Bundela cenotaphs (chhatris), royal palaces, and vibrant religious rituals in this tranquil heritage town frozen in time.',
    longDescription: 'Founded in 1501 by Bundela chieftain Rudra Pratap Singh, Orchha ("hidden place") boasts remarkably intact palaces such as Jahangir Mahal and Raja Mahal adorned with Bundeli frescoes, alongside the sacred Ram Raja Temple where Lord Rama is uniquely revered as a reigning monarch.',
    highlights: ['Betwa Riverbank Bundela Chhatris', 'Jahangir Mahal & Raja Mahal Frescoes', 'Ram Raja Temple Evening Aarti', 'Betwa River Kayaking & Wildlife Sanctuary'],
    bestTimeToVisit: 'October to March (cool pleasant winter days)',
    nearestHub: 'Gwalior Airport (125 km) / Jhansi Junction Railway Station (18 km)',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1600100397608-f010f443b355?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Majestic spires of historic Bundela cenotaphs reflected in the calm waters of the Betwa river in Orchha',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1600100397608-f010f443b355?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Cenotaphs of Orchha along the Betwa river',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 1700
  },
  {
    id: 'chettinad',
    slug: 'chettinad-tamil-nadu',
    name: 'Chettinad',
    state: 'Tamil Nadu',
    region: 'South',
    category: 'Culture & Heritage',
    budgetCategory: 'Boutique & Heritage',
    idealDuration: '2-3 days',
    durationDays: 2,
    tagline: 'Palatial Merchant Mansions, Handloom Athangudi Tiles, and Culinary Spices',
    shortDescription: 'Explore grand palatial mansions featuring Burmese teak and Italian marble, handmade Athangudi geometric tiles, and distinct culinary traditions.',
    longDescription: 'The Chettiars were a seafaring mercantile community who constructed opulent ancestral mansions across 74 villages in Tamil Nadu. A journey through Karaikudi and Kanadukathan reveals architectural syncretism, vegetable-dyed cotton sarees, and a culinary tradition famed for its roasted hand-ground spice blends.',
    highlights: ['Kanadukathan 1000-Window Palaces', 'Athangudi Handmade Tile Workshops', 'Chettinad Culinary Heritage Cooking', 'Kandangi Handloom Weaving Centres'],
    bestTimeToVisit: 'November to February (pleasant dry winter)',
    nearestHub: 'Madurai International Airport (IXM, 90 km) / Karaikkudi Junction',
    heroImage: {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&h=800&q=80',
      alt: 'Architectural details of a grand heritage mansion in Chettinad, Tamil Nadu with ornate pillars and courtyards',
      width: 1200,
      height: 800
    },
    thumbnailImage: {
      url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&h=400&q=80',
      alt: 'Chettinad heritage courtyard',
      width: 600,
      height: 400
    },
    indicativeDailyCost: 3300
  }
];

