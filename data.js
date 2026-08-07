// Field Ledger — content data
// To add new research: append an object to LEDGER_DATA.entries and (optionally)
// a line to LEDGER_DATA.changelog. Nothing else in the site needs to change —
// script.js reads this file and renders everything.

window.LEDGER_DATA = {
  categories: [
    { id: "flagship", label: "Primary Sources", accent: "wheat" },
    { id: "data",     label: "Data Sources",    accent: "ledger" },
    { id: "global",   label: "Companies & Pilots", accent: "shoot" },
    { id: "case",     label: "Worked Case Studies", accent: "wheat" },
    { id: "africa",   label: "Africa & Nigeria", accent: "shoot" },
    { id: "refi",     label: "ReFi & Carbon",   accent: "ledger" },
    { id: "risk",     label: "Risks & Limits",  accent: "rust" },
    { id: "academic", label: "Academic",        accent: "ledger" },
    { id: "people",   label: "People & Orgs",   accent: "shoot" },
    { id: "market",   label: "Market Sizing",   accent: "rust" },
    { id: "idea",     label: "Content Ideas",   accent: "wheat" },
    { id: "scripts",  label: "Scripts & Episodes", accent: "shoot" }
  ],

  entries: [
    // ---------- FLAGSHIP ----------
    {
      id: "fao-brief-33",
      category: "flagship",
      title: "FAO Trade Policy Brief No. 33 (2019)",
      tags: ["FAO", "trade facilitation", "primary source"],
      body: "\u201cHow can blockchain\u2019s general architecture enhance trade facilitation in agricultural supply chains?\u201d by Mischa Tripoli and Josef Schmidhuber, FAO Trade and Markets Division. Citable stats: documenting a single trade transaction costs about 7% of the value of the goods traded (Global Alliance for Trade Facilitation); Australian grain payment terms run 2\u20135 weeks, exposing producers to counterparty risk; one DLT pilot cut mango traceability from 7 days to seconds.",
      meta: "Source: FAO, 2019"
    },
    {
      id: "fao-itu-volume",
      category: "flagship",
      title: "FAO/ITU \u201cE-Agriculture in Action: Blockchain for Agriculture\u201d (2019)",
      tags: ["FAO", "ITU", "primary source", "case studies"],
      body: "Full collection edited by Gerard Sylvester, with chapters on AgriDigital, AgUnity, WFP\u2019s Building Blocks, and the FARMS Kenya scheme, plus a 60+ entry annex of blockchain-for-social-good projects compiled by Stanford University. The single strongest anchor document in this whole project.",
      meta: "Source: FAO & ITU, 2019 \u00b7 CC BY-NC-SA"
    },

    // ---------- DATA SOURCES ----------
    { id: "faostat", category: "data", title: "FAOSTAT", tags: ["stats", "FAO"], body: "UN FAO production, trade, land-use, and food security data by country and crop.", meta: "faostat.fao.org" },
    { id: "fao-knowledge-repo", category: "data", title: "FAO Knowledge Repository", tags: ["stats", "FAO"], body: "FAO\u2019s own open-access report profiling AgriDigital, AgUnity, and other pilots. Primary source, not a secondary blog.", meta: "openknowledge.fao.org" },
    { id: "usda-nass", category: "data", title: "USDA NASS", tags: ["stats", "US"], body: "US National Agricultural Statistics Service \u2014 good for comparative Global North benchmarks.", meta: "nass.usda.gov" },
    { id: "world-bank", category: "data", title: "World Bank Open Data", tags: ["stats", "global"], body: "Agriculture & Rural Development indicators, country-level.", meta: "data.worldbank.org" },
    { id: "cgiar", category: "data", title: "CGIAR", tags: ["research network", "Global South"], body: "Consultative Group on International Agricultural Research \u2014 several centers publish on digital agriculture and blockchain pilots across the Global South.", meta: "cgiar.org" },
    { id: "gsma-agritech", category: "data", title: "GSMA AgriTech", tags: ["mobile", "Africa", "Asia"], body: "Mobile-sector data on digital agriculture adoption in Africa and Asia, including blockchain-adjacent fintech-for-farmers work.", meta: "gsma.com" },
    { id: "ictforag", category: "data", title: "ICTforAg / Digital Green", tags: ["Web3", "data sovereignty"], body: "Publishes on Web3 and farmer data sovereignty \u2014 the idea that smallholders should own and control their own farm data.", meta: "weforum.org" },

    // ---------- GLOBAL COMPANIES & PILOTS ----------
    { id: "agridigital-co", category: "global", title: "AgriDigital", tags: ["Australia", "grain", "payments"], body: "Blockchain-based grain trade and payment platform. See the worked case study below.", meta: "Australia" },
    { id: "agunity-co", category: "global", title: "AgUnity", tags: ["Kenya", "PNG", "offline-first"], body: "Offline-capable smartphone app on blockchain for smallholder trust, planning, and trade. See the worked case study below.", meta: "Australia \u2192 Kenya, Bougainville" },
    { id: "te-food", category: "global", title: "TE-FOOD", tags: ["traceability", "livestock"], body: "Farm-to-table traceability platform, widely cited for livestock and food traceability.", meta: "Global" },
    { id: "ripeio", category: "global", title: "Ripe.io", tags: ["financing", "traceability"], body: "Blockchain-based agricultural financing, cited for cutting loan processing time.", meta: "Global" },
    { id: "vechain", category: "global", title: "VeChain", tags: ["retail", "supply chain"], body: "Food retailer partnerships for supply-chain tracking.", meta: "Global" },
    { id: "ibm-food-trust", category: "global", title: "IBM Food Trust", tags: ["enterprise", "traceability"], body: "Enterprise blockchain traceability platform, used by Walmart, Albertsons, and others.", meta: "Global" },
    { id: "provenance-origintrail", category: "global", title: "Provenance / OriginTrail / Ambrosus", tags: ["provenance", "sensors"], body: "Supply-chain provenance and sensor-based tracking platforms.", meta: "Global" },
    { id: "agrichain", category: "global", title: "AgriChain", tags: ["peer-to-peer"], body: "Peer-to-peer agricultural transaction platform that cuts out middlemen.", meta: "Australia" },
    { id: "ethichub", category: "global", title: "EthicHub", tags: ["lending", "smallholders"], body: "Smart-contract lending connecting global lenders directly to smallholder farmers.", meta: "Mexico / global" },
    { id: "skuchain", category: "global", title: "Skuchain", tags: ["RFID", "identifiers"], body: "Crypto-secured barcodes and RFID so individual stock-keeping units can attest digitally to their own origin across the supply chain.", meta: "Global" },
    { id: "ambrosus", category: "global", title: "Ambrosus", tags: ["sensors", "pharma", "food"], body: "Sensor plus blockchain protocol verifying product quality, safety, and origin, spanning pharma and food.", meta: "Global" },
    { id: "viant", category: "global", title: "Viant", tags: ["supply chain", "smart contracts"], body: "Blockchain platform for modeling supply-chain business processes and tracking assets via smart contracts.", meta: "Global" },
    { id: "the-seam", category: "global", title: "The Seam \u00d7 IBM", tags: ["cotton", "consortium"], body: "Cotton-industry blockchain consortium backing a $7bn+ commodities trading platform. Owners include Cargill, Louis Dreyfus, and Olam.", meta: "US-based, global cotton trade" },
    { id: "chromaway", category: "global", title: "ChromaWay", tags: ["land titles", "Sweden"], body: "Land-title registry pilot with Lantm\u00e4teriet, Sweden\u2019s land authority \u2014 a useful comparison case for the African land-documentation problem.", meta: "Sweden" },
    { id: "factom", category: "global", title: "Factom", tags: ["land titles", "Honduras"], body: "Ran a 2015 land-title blockchain pilot with the Honduran government to fight registry fraud.", meta: "Honduras, 2015" },

    // ---------- WORKED CASE STUDIES ----------
    {
      id: "case-agridigital",
      category: "case",
      title: "AgriDigital \u2014 the first blockchain grain sale",
      tags: ["Australia", "grain", "payments", "smart contracts"],
      body: "December 2016: grower David Whillock delivered 23.46 metric tons of wheat to Fletcher International Exports in Dubbo, Australia. Title transfer and payment triggered simultaneously via a smart contract on a private Ethereum instance \u2014 what AgriDigital describes as the world\u2019s first blockchain settlement of a physical commodity. Follow-on pilots: a 2017 run with CBH Group (Australia\u2019s largest grain exporter) at its Blue Lake Milling oats site, and a December 2017 proof-of-concept with Rabobank simulating three-party inventory finance settled in a bank-backed digital dollar. By early 2019 the platform had ~1,300 active grain supply-chain users and had processed 1.6M+ metric tons of grain.",
      meta: "Source: FAO/ITU 2019, AgriDigital chapter (Bridie Ohlsson)"
    },
    {
      id: "case-wfp",
      category: "case",
      title: "WFP \u201cBuilding Blocks\u201d \u2014 Jordan",
      tags: ["humanitarian", "Jordan", "Syrian refugees", "cost savings"],
      body: "WFP\u2019s Building Blocks pilot manages cash-based food assistance for Syrian refugees in Jordan, integrated with UNHCR\u2019s existing iris-scan biometric system \u2014 refugees pay with an eye scan, and blockchain only changes how the transaction is processed on the back end. Reported result: third-party financial service provider fees cut by roughly 98%, saving an estimated $150,000/month at full scale. Reached 100,000 refugees by early 2018, with a goal of covering all 500,000 refugees in Jordan.",
      meta: "Source: FAO/ITU 2019, Building Blocks chapter (Julia Bacher, WFP Innovation Accelerator)"
    },
    {
      id: "case-agunity",
      category: "case",
      title: "AgUnity \u2014 Kenya and Papua New Guinea",
      tags: ["Kenya", "PNG", "smallholders", "literacy-friendly design"],
      body: "A low-literacy-friendly smartphone app (large geometric shapes, minimal text) let smallholder farmers in Nanyuki, Kenya and Bougainville, PNG record transactions, plan crop pickups, and share equipment on a blockchain-backed ledger. Reported result: participating farmers roughly tripled their incomes in one season. In Kenya, the bottleneck was equipment access and poor seed-timing (3\u20136 bags of wheat/acre for smallholders vs 20\u201326 bags/acre for nearby commercial farms). In PNG, about half of harvested cacao was spoiling before collection due to poor farmer\u2013co-op coordination \u2014 the app\u2019s scheduling feature alone recovered most of that loss.",
      meta: "Source: FAO/ITU 2019, AgUnity chapter (Angus Rama Keck)"
    },
    {
      id: "case-farms",
      category: "case",
      title: "FARMS \u2014 a savings product, not an insurance sell (Kenya)",
      tags: ["Kenya", "smallholder finance", "drought index", "savings"],
      body: "Built by ICS (Dutch NGO), Agrics (agri-input company serving ~30,000 farmers across Kenya, Tanzania, Uganda), EARS (Dutch remote-sensing firm specializing in drought indices), and COIN22 (blockchain mobile-wallet fintech). Rather than sell full insurance \u2014 which smallholders often distrust and can\u2019t afford \u2014 FARMS lets farmers gradually save into a blockchain-based mobile wallet under a drought-index model; funds unlock automatically when satellite data confirms a bad season, and farmers graduate into overdraft/loan access as they build a savings history. A trust-building savings frame instead of a hard insurance pitch \u2014 a nuance most agri-Web3 content misses.",
      meta: "Source: FAO/ITU 2019, FARMS chapter (Violanda de Man, ICS)"
    },

    // ---------- AFRICA & NIGERIA ----------
    {
      id: "cafs-solar-dryer",
      category: "africa",
      title: "CAFS Africa \u00d7 NSPRI \u2014 blockchain solar dryers (Nigeria)",
      tags: ["Nigeria", "post-harvest loss", "UNDP", "deep dive"],
      body: "Officially \u201cIncorporation of Blockchain Technology to Access Climate-Smart Solar Dryers,\u201d unveiled 8 May 2026, backed by UNDP\u2019s Tadamon Accelerator for Food Security. NSPRI (a federal post-harvest research institute, HQ Ilorin) puts annual perishable-produce loss in Nigeria at 30-50% \u2014 falling hardest on smallholder farmers, women processors, and rural communities (Prof. Lateef Sanni, NSPRI Executive Director). The blockchain layer isn\u2019t a token or coin: it\u2019s a tamper-proof usage log for shared solar-dryer equipment, so community access stays fair and auditable rather than running on informal favoritism (Azeez Salawu, CAFS Africa founder; Dr. Michael Omodara, Project Training and Deployment Expert). Includes technician/digital-facilitator training for local youth. Gap: no public numbers yet on dryer count, farmers reached, or budget \u2014 this is a launch, not a track record.",
      meta: "Nigeria, unveiled 8 May 2026 \u00b7 sources: Nigerian NewsDirect, CoinTrust",
      link: "scripts/episode-2-cafs-solar-dryer-deepdive.md",
      linkLabel: "Read Episode 2 script \u2192"
    },
    { id: "ethereum-kenya-insurance", category: "africa", title: "Ethereum Foundation crop insurance \u2014 Kenya", tags: ["Kenya", "parametric insurance"], body: "Blockchain-based parametric crop insurance covering roughly 17,000 Kenyan farmers.", meta: "Kenya" },
    { id: "houseafrica", category: "africa", title: "HouseAfrica", tags: ["land documentation", "satellite"], body: "African proptech using satellite data plus blockchain for land documentation \u2014 relevant background for why agri-blockchain finance struggles to scale (only ~10% of Sub-Saharan African land is formally documented).", meta: "Africa" },
    { id: "cngn-refi-dao", category: "africa", title: "cNGN stablecoin / ReFi DAO Africa", tags: ["Nigeria", "land tokenization", "financial inclusion"], body: "Explores blockchain-backed land tokenization and farmer financial inclusion routed through a Naira-pegged stablecoin.", meta: "Nigeria" },
    { id: "ng-gov-2026", category: "africa", title: "Nigerian government AI + blockchain push", tags: ["Nigeria", "policy", "2026"], body: "As of mid-2026 the Ministry of Agriculture and Food Security has publicly called for AI, blockchain, and smart-logistics adoption across African agriculture \u2014 a useful \u201cpolicy angle\u201d hook.", meta: "Nigeria, 2026" },
    { id: "bitland-benben", category: "africa", title: "BitLand / BenBen (Ghana)", tags: ["Ghana", "land titles"], body: "Two independent Ghanaian startups using blockchain to manage land titles and resolve disputes, working with local land-title institutions. Good comparison case for the land-documentation angle.", meta: "Ghana" },

    // ---------- REFI & CARBON ----------
    { id: "gainforest", category: "refi", title: "GainForest", tags: ["Solana", "reforestation", "Indigenous communities"], body: "ReFi project paying Indigenous communities for forest stewardship and reforestation.", meta: "Built on Solana" },
    { id: "sunrise-stake", category: "refi", title: "Sunrise Stake", tags: ["Solana", "staking"], body: "Staking protocol directing yield to climate-positive projects.", meta: "Built on Solana" },
    { id: "regen-ecotoken", category: "refi", title: "Regen Network \u00d7 ecoToken", tags: ["cross-chain", "carbon credits"], body: "Cross-chain carbon and biodiversity credit retirement infrastructure.", meta: "Cross-chain" },
    { id: "klima-toucan", category: "refi", title: "KlimaDAO / Toucan Protocol", tags: ["carbon credits", "tokenization"], body: "Tokenized carbon credits \u2014 the reference model most on-chain carbon markets are built against.", meta: "Multi-chain" },
    { id: "hummingbird", category: "refi", title: "WEF \u201cProject Hummingbird\u201d", tags: ["Bayer", "big ag", "credit bundling"], body: "Bayer and PlanetaryX initiative bundling carbon storage, biodiversity, and soil health into single credit packages, with a stated 75%+ of funding going directly to farmers \u2014 a good example of \u201cbig ag\u201d entering the space.", meta: "World Economic Forum" },
    { id: "solana-compass", category: "refi", title: "Solana Compass \u2014 RWA/Carbon Credits", tags: ["directory", "Solana"], body: "Running directory of live sustainability dApps on Solana \u2014 useful if you want a snapshot of one chain\u2019s ecosystem specifically.", meta: "solanacompass.com" },

    // ---------- RISKS & LIMITS ----------
    { id: "dhs-flowchart", category: "risk", title: "\u201cDo you even need a blockchain?\u201d", tags: ["DHS", "decision framework"], body: "The US Department of Homeland Security publishes a decision flowchart: no shared multi-party data store needed, no real historical-immutability requirement, or no genuine trust/control dispute over who runs the data \u2014 then a normal database is the right call, not blockchain. A genuinely useful on-screen visual for an episode that pushes back on blockchain-as-default.", meta: "US DHS decision framework" },
    { id: "pow-energy", category: "risk", title: "Proof-of-work energy cost", tags: ["Bitcoin", "energy", "PoW vs PoS"], body: "Bitcoin-style proof-of-work can run roughly 275 kWh per transaction (Digiconomist\u2019s Bitcoin Energy Consumption Index) \u2014 worth contrasting with newer proof-of-stake designs.", meta: "Digiconomist" },
    { id: "standards-immature", category: "risk", title: "Standards are still immature", tags: ["ISO", "ITU-T"], body: "No mature international standard governs DLT yet. ISO Technical Committee 307 and several ITU-T focus groups are actively working on this.", meta: "ISO / ITU-T" },
    { id: "code-is-law", category: "risk", title: "Smart contracts aren\u2019t a substitute for law", tags: ["Ethereum", "hard fork", "governance"], body: "The 2016 Ethereum hard fork \u2014 after an exploit let a user withdraw roughly $50 million \u2014 is the canonical cautionary tale for why \u201ccode is law\u201d breaks down in real disputes. Especially relevant given the regulatory uncertainty in African markets.", meta: "Ethereum, 2016" },

    // ---------- ACADEMIC ----------
    { id: "sciencedirect-survey", category: "academic", title: "ScienceDirect \u2014 evaluation survey", tags: ["traceability", "adoption barriers"], body: "\u201cA survey on evaluation of blockchain-based agricultural traceability\u201d \u2014 barriers and adoption research, using the Australian grain supply chain as a case.", meta: "ScienceDirect" },
    { id: "nature-rfid", category: "academic", title: "Nature Scientific Reports \u2014 blockchain + RFID", tags: ["traceability", "systems design"], body: "Peer-reviewed traceability system design papers combining blockchain and RFID.", meta: "Nature Scientific Reports" },
    { id: "pmc-papers", category: "academic", title: "PMC / NCBI \u2014 traceability papers", tags: ["Ethereum", "peer-reviewed"], body: "Multiple peer-reviewed papers on blockchain agricultural traceability, including Ethereum-based and redactable-blockchain schemes.", meta: "PMC / NCBI" },
    { id: "search-terms", category: "academic", title: "Search terms that keep surfacing fresh papers", tags: ["research tips"], body: "\u201cblockchain agricultural traceability,\u201d \u201cblockchain smallholder finance Africa,\u201d \u201cReFi regenerative agriculture tokenization.\u201d", meta: "Research tip" },

    // ---------- PEOPLE & ORGS ----------
    { id: "onigbinde", category: "people", title: "Oluseun Onigbinde", tags: ["BudgIT", "FUNAAB", "Nigeria"], body: "BudgIT co-founder who delivered a speech at FUNAAB \u2014 your own school \u2014 on AI, big data, and blockchain driving Nigeria\u2019s \u201cagriconomy.\u201d A genuinely rare overlap between your alma mater and your niche.", meta: "Nigeria" },
    { id: "david-davies", category: "people", title: "David Davies", tags: ["AgUnity", "CEO"], body: "CEO of AgUnity, frequently interviewed on blockchain for smallholders.", meta: "AgUnity" },
    { id: "kariithi", category: "people", title: "Victoria Kariithi", tags: ["regulation", "Kenya", "law"], body: "Blockchain lawyer (Mwanyumba Kariithi Consulting) who speaks on why unclear regulation is slowing agri-blockchain adoption across Kenya and Nigeria. Possible interview target.", meta: "Kenya" },
    { id: "disruptor-daily", category: "people", title: "Disruptor Daily \u2014 Blockchain in Agriculture series", tags: ["interviews"], body: "A back-catalogue of operator interviews across this space. Good for mining talking points \u2014 attribute properly, always paraphrase.", meta: "Interview series" },
    { id: "fao-itu-contacts", category: "people", title: "Named FAO/ITU contacts", tags: ["FAO", "ITU", "contacts"], body: "Gerard Sylvester \u2014 FAO, editor of the full \u201cBlockchain for Agriculture\u201d volume (Gerard.Sylvester@fao.org). Bridie Ohlsson \u2014 AgriDigital, Strategic Projects & Engagement. Julia Bacher \u2014 WFP Innovation Accelerator, Partnerships Manager. Angus Rama Keck \u2014 AgUnity, Chief of Staff. Violanda de Man \u2014 ICS, Portfolio Manager Agribusiness.", meta: "From your FAO/ITU library" },

    // ---------- MARKET SIZING ----------
    { id: "market-disagreement", category: "market", title: "Vendors disagree by 5x \u2014 and that\u2019s the story", tags: ["market size", "skepticism"], body: "Market-research firms currently size the global blockchain-in-agri-food-supply-chain market anywhere from ~$250M to ~$1.3B for 2025/26, projecting to $16B\u2013$27B by 2032\u201335 at 21\u201337% CAGR depending on methodology. Treat any single number as directional, not authoritative \u2014 GII Research, InsightAce, and MarketGrowthReports disagree by 5x, which is itself a lesson worth putting on camera about how immature and hyped this market still is.", meta: "GII Research / InsightAce / MarketGrowthReports" },

    // ---------- SCRIPTS & EPISODES ----------
    {
      id: "ep-1-intro",
      category: "scripts",
      title: "Agriculture x Blockchain \u2014 What It Actually Is",
      tags: ["episode", "script", "intro"],
      episodeNumber: 1,
      status: "Published",
      duration: "~90 sec",
      dateLabel: "Filmed July 31, 2026",
      hook: "In December 2016, a farmer in Australia delivered a truck of wheat \u2014 and got paid the second it hit the scale. No bank. No invoice. No two-week wait.",
      body: "First substantive explainer for the series: what blockchain actually fixes in agriculture (paperwork and trust, not farming itself), told through the AgriDigital wheat story and the 7% trade-documentation-cost stat.",
      segments: [
        { label: "Hook", time: "0:00\u20130:08", text: "In December 2016, a farmer in Australia delivered a truck of wheat \u2014 and got paid the second it hit the scale. No bank. No invoice. No two-week wait. That's blockchain in agriculture. And for the next few weeks, I'm breaking down exactly what that means \u2014 especially for us." },
        { label: "What it is", time: "0:08\u20130:32", text: "Here's the boring truth first: documenting a single trade transaction can cost about 7% of the value of the goods being traded. That's before anything even ships. Blockchain doesn't fix farming. It fixes the paperwork, the trust, and the waiting around farming \u2014 payments, land records, proof your rice is actually organic, proof a cooperative didn't shortchange you." },
        { label: "The example", time: "0:32\u20130:52", text: "That wheat farmer I mentioned \u2014 a company called AgriDigital ran the whole trade on a blockchain. The moment his grain was weighed, a smart contract paid him instantly. Normal payment terms in that industry run two to five weeks. That's not a crypto pitch. That's just... faster paperwork." },
        { label: "Why it matters here", time: "0:52\u20131:15", text: "Now bring that home. Less than 10% of land in Sub-Saharan Africa is even formally documented. Smallholder farmers lose value to middlemen, bad records, and cooperatives they can't fully verify. That's the actual problem blockchain is being tested against \u2014 in Kenya, in Ghana, and now in Nigeria too." },
        { label: "Tease + CTA", time: "1:15\u20131:30", text: "This series is going to walk through the real projects, the real numbers, and the real limits \u2014 including when blockchain is the wrong tool for the job. Follow along. First deep dive drops soon." }
      ],
      altCut: {
        label: "30-second cut",
        text: "In 2016, a farmer got paid for his wheat the second it was weighed \u2014 no bank, no five-week wait, just a smart contract. That's what blockchain actually does in agriculture: it doesn't fix farming, it fixes the paperwork and trust around it. And in Africa, where less than 10% of land is even formally documented, that problem is bigger than most people realize. This series breaks down the real projects \u2014 and the real limits. Follow along."
      },
      overlays: [
        { time: "0:00", text: "Paid the second it was weighed." },
        { time: "0:20", text: "7% of trade value = just paperwork" },
        { time: "0:52", text: "<10% of African land is formally documented" }
      ],
      sourcesNote: "FAO Trade Policy Brief No. 33 (documentation cost, payment terms); FAO/ITU AgriDigital case study (2016 wheat settlement).",
      meta: "~90 sec script \u00b7 filmed July 31, 2026",
      link: "scripts/episode-1-agriculture-blockchain-intro.md",
      linkLabel: "Raw .md \u2192"
    },
    {
      id: "ep-2-cafs",
      category: "scripts",
      title: "Deep Dive: The Blockchain Solar Dryer Project \u2014 Nigeria",
      tags: ["episode", "script", "deep dive", "Nigeria"],
      episodeNumber: 2,
      status: "Published",
      duration: "~2:45\u20133:00",
      dateLabel: "Written July 31, 2026",
      hook: "A Nigerian food research institute just plugged blockchain into a solar dryer. Not a metaphor \u2014 an actual solar-powered drying rig, with a blockchain layer tracking who uses it and when.",
      body: "First deep dive. CAFS Africa x NSPRI's blockchain solar dryer project end to end: the 30-50% post-harvest loss problem, what the blockchain layer actually does, why blockchain vs. a plain database, the training/inclusion angle, and an honest gap on missing scale numbers. Built from three named, on-record sources.",
      segments: [
        { label: "Hook", time: "0:00\u20130:12", text: "A Nigerian food research institute just plugged blockchain into a solar dryer. Not a metaphor \u2014 an actual solar-powered drying rig, with a blockchain layer tracking who uses it and when. This is the Nigeria story I teased in episode one. Let's get into it." },
        { label: "The problem", time: "0:12\u20130:40", text: "Start with the number that makes this worth doing at all: Nigeria loses somewhere between 30 and 50 percent of its perishable produce every year, according to NSPRI's own Executive Director, Professor Lateef Sanni. Bad storage, weak processing, no access to preservation tech. And it doesn't hit everyone equally \u2014 smallholder farmers, women processors, and rural communities absorb most of that loss, straight out of their income." },
        { label: "The solution", time: "0:40\u20131:15", text: "So here's the fix: solar-powered dryers instead of open-air drying or fuel-burning methods \u2014 cleaner, cheaper to run, protects produce from contamination and rain. That part isn't new. What's new is the blockchain layer on top. CAFS Africa's founder, Azeez Salawu, frames it as solving an access problem, not just a drying problem \u2014 these dryers are shared community infrastructure, and blockchain gives you a transparent, tamper-proof record of who's using the equipment and when." },
        { label: "Why blockchain", time: "1:15\u20131:45", text: "Remember episode one \u2014 blockchain in agriculture is usually about fixing trust and paperwork, not farming itself. This is that exact pattern, just physical instead of financial. When equipment is shared across a community, usage never gets tracked properly and there's no accountability when something breaks. Dr. Michael Omodara, leading training and deployment, has said the blockchain piece is there for real-time monitoring and accountability. Not hype \u2014 just a fairer queue." },
        { label: "Who it's for", time: "1:45\u20132:05", text: "They're not just dropping in hardware and walking away. The project trains smallholder farmers, women processors, and young people to operate and maintain the dryers \u2014 with some trained as technicians and digital facilitators in their own communities." },
        { label: "What we don't know", time: "2:05\u20132:30", text: "The honest part: at the point this was unveiled, there's no public number yet for how many dryers, how many farmers, or the budget. It's backed by UNDP's Tadamon Accelerator, and NSPRI is a real federal research institute \u2014 credibility is there. But it's a launch, not a three-year track record. I'll bring you real numbers the moment they're public." },
        { label: "Close + CTA", time: "2:30\u20132:50", text: "This is exactly the kind of project this series exists to find \u2014 local, real, barely covered anywhere in Web3 content. Next up: tracking this one for updates, or a Kenyan project doing something similar with savings instead of hardware. Follow for that." }
      ],
      altCut: {
        label: "60-second cut",
        text: "Nigeria just unveiled a solar dryer with a blockchain layer built in \u2014 and no, it's not a token play. NSPRI, a federal food research institute, loses 30 to 50 percent of perishable produce every year to bad storage. Their fix: solar-powered dryers, shared across communities, with blockchain tracking who uses the equipment and when \u2014 so access stays fair and accountable instead of running on who-knows-who. It's backed by the UNDP's Tadamon Accelerator, and it comes with real training for farmers, women processors, and local youth technicians. What we don't have yet: hard numbers on scale or budget \u2014 this is a launch, not a track record. I'm watching it. Follow for the update."
      },
      overlays: [
        { time: "0:00", text: "Blockchain + solar dryer. Nigeria." },
        { time: "0:12", text: "30-50% of produce lost yearly \u2014 NSPRI" },
        { time: "1:15", text: "Not a token. A shared-equipment logbook." },
        { time: "2:05", text: "What we don't know yet:" }
      ],
      sourcesNote: "Nigerian NewsDirect, \u201cNGO, institute unveil blockchain-enabled solar dryer to tackle post-harvest losses,\u201d May 8, 2026. CoinTrust, \u201cNigeria Launches Blockchain Solar Dryer Food Project,\u201d May 11, 2026.",
      meta: "~2:45-3:00 script \u00b7 written July 31, 2026",
      link: "scripts/episode-2-cafs-solar-dryer-deepdive.md",
      linkLabel: "Raw .md \u2192"
    },
    {
      id: "ep-3-ai-blockchain",
      category: "scripts",
      title: "AI Meets Blockchain in Farming",
      tags: ["episode", "script", "AI", "trend"],
      episodeNumber: 3,
      status: "Scripted",
      duration: "~85 sec",
      dateLabel: "Scripted Aug 7, 2026",
      hook: "Every AI hype video promises robots will run your farm. Here's the boring truth: the real crossover happening right now isn't AI replacing farmers. It's AI feeding blockchain.",
      body: "Short explainer on the actual AI x blockchain mechanic in agriculture: AI sensors and models as the 'oracle' feeding trustworthy data to blockchain, not a sci-fi robot-farmer pitch. Anchored to a real July 2026 market report ($24.30B to $154.54B by 2035).",
      segments: [
        { label: "Hook", time: "0:00\u20130:10", text: "Every AI hype video promises robots will run your farm. Here's the boring truth: the real crossover happening right now isn't AI replacing farmers. It's AI feeding blockchain." },
        { label: "The number", time: "0:10\u20130:25", text: "A market report from July has the AI-IoT-blockchain farming space going from 24 billion dollars this year to over 150 billion by 2035. One report, take it as a signal, not gospel, you know the drill from episode one." },
        { label: "The mechanic", time: "0:25\u20131:00", text: "Sensors and AI models read your soil, your crop health, your weather risk in real time. Blockchain has a blind spot though, it can't see the outside world on its own. It needs something called an oracle to feed it real data. AI-powered sensors are becoming exactly that: soil moisture, disease detection, yield prediction, all logged in a way nobody can quietly change after the fact." },
        { label: "Close", time: "1:00\u20131:25", text: "This is the part of the hype cycle that's actually real, and actually boring, which usually means it's the part worth paying attention to. Follow for more." }
      ],
      altCut: {
        label: "30-second cut",
        text: "AI doesn't replace farmers, it feeds blockchain. Sensors read soil and crop health in real time, and blockchain becomes the notebook nobody can secretly edit. One market report has this space going from 24 billion to over 150 billion by 2035. Boring tech, real growth. Follow for more."
      },
      sourcesNote: "ResearchAndMarkets / GlobeNewswire, \u201cAI, IoT and Blockchain Market in Modern Agriculture,\u201d July 14, 2026 ($24.30B in 2025 \u2192 $154.54B by 2035, 20.32% CAGR).",
      meta: "~85 sec script \u00b7 scripted Aug 7, 2026",
      link: "scripts/episodes-3-4-5.md",
      linkLabel: "Raw .md \u2192"
    },
    {
      id: "ep-4-agunity",
      category: "scripts",
      title: "The App That Tripled Farmer Incomes",
      tags: ["episode", "script", "Kenya", "PNG", "human story"],
      episodeNumber: 4,
      status: "Scripted",
      duration: "~85 sec",
      dateLabel: "Scripted Aug 7, 2026",
      hook: "A smartphone app with almost no words on it helped farmers in Kenya roughly triple their income in one season. Here's how something that simple worked.",
      body: "Human-story episode built from the AgUnity case study already in the ledger: the Kenya wheat-yield gap and the Papua New Guinea cacao-spoilage fix, told as one tight before/after story instead of a stats dump.",
      segments: [
        { label: "Hook", time: "0:00\u20130:12", text: "A smartphone app with almost no words on it helped farmers in Kenya roughly triple their income in one season. Here's how something that simple worked." },
        { label: "Kenya", time: "0:12\u20130:40", text: "AgUnity built an app for farmers who couldn't read well, just big shapes and colors, to record trades, plan equipment sharing, and log deliveries on a blockchain. In Kenya, farmers were getting three to six bags of wheat per acre, while nearby commercial farms got twenty to twenty-six. The gap wasn't effort. It was access to equipment, and getting seed at the right time." },
        { label: "Papua New Guinea", time: "0:40\u20131:05", text: "In Papua New Guinea, the same app fixed a completely different problem. About half of harvested cacao was spoiling because farmers and buyers couldn't coordinate pickup. Just scheduling it properly on the app recovered almost that entire loss." },
        { label: "Close", time: "1:05\u20131:25", text: "Same tool, two totally different problems solved. That's usually a sign the tech is doing something real. Follow for the next one." }
      ],
      altCut: {
        label: "30-second cut",
        text: "A dead-simple app helped Kenyan farmers roughly triple their income in one season, and fixed a totally different problem for cacao farmers in Papua New Guinea, just by scheduling pickups properly on a blockchain. Same tool, two real problems solved. Follow for the next one."
      },
      sourcesNote: "FAO/ITU \u201cBlockchain for Agriculture\u201d (2019), AgUnity chapter (Angus Rama Keck) \u2014 already logged in the Field Ledger under Worked Case Studies.",
      meta: "~85 sec script \u00b7 scripted Aug 7, 2026",
      link: "scripts/episodes-3-4-5.md",
      linkLabel: "Raw .md \u2192"
    },
    {
      id: "ep-5-weird-cows",
      category: "scripts",
      title: "The Weirdest Corner of Blockchain Agriculture",
      tags: ["episode", "script", "fun", "NFT"],
      episodeNumber: 5,
      status: "Scripted",
      duration: "~85 sec",
      dateLabel: "Scripted Aug 7, 2026",
      hook: "Someone tokenized their own farts as an NFT during the pandemic. I need you to sit with that for a second. Now here's the part that's actually useful.",
      body: "The deliberate fun/lighter episode: opens on a genuinely funny tokenization story (fart NFTs) then pivots to a real, useful case, a Brazilian farmer using tokenized cows as loan collateral, plus CattleProof's blockchain cattle IDs in the US.",
      segments: [
        { label: "Hook", time: "0:00\u20130:12", text: "Someone tokenized their own farts as an NFT during the pandemic. I need you to sit with that for a second. Now here's the part that's actually useful." },
        { label: "Brazil's cows", time: "0:12\u20130:40", text: "In Brazil, a farmer used ten actual cows as collateral for a loan, about twenty thousand dollars, by giving each cow its own blockchain token tied to a digital ID. It worked. It's a real proof of concept, and the fund behind it says it could scale to eighty million dollars in livestock-backed loans." },
        { label: "CattleProof", time: "0:40\u20131:05", text: "There's also a company in the US called CattleProof, basically a digital driver's license for cows: birthplace, weight, medical history, all on a blockchain so it can't be quietly edited when the cow gets sold. No crypto wallet needed, the farmer just uses an app." },
        { label: "Punchline", time: "1:05\u20131:25", text: "So yes, someone tokenized farts. But somewhere else, tokenizing a cow just got a real farmer real credit. Wildest range this space has. Follow for more of it." }
      ],
      altCut: {
        label: "30-second cut",
        text: "Someone tokenized their own farts as an NFT. Meanwhile, a Brazilian farmer used ten actual cows as blockchain collateral and got a real loan. Same tech, wildly different outcomes. Follow for the weirdest corners of this space."
      },
      sourcesNote: "Cointelegraph, \u201cThe 10 Weirdest Things Already Finding a Home Onchain\u201d (tokenized cows + the fart NFT); Coin-Turk News, on the Brazil cow-collateral loan and Target FIDC; The Spoon / Van Trump Report, on CattleProof.",
      meta: "~85 sec script \u00b7 scripted Aug 7, 2026",
      link: "scripts/episodes-3-4-5.md",
      linkLabel: "Raw .md \u2192"
    },
    {
      id: "ep-6-farms-kenya",
      category: "scripts",
      title: "FARMS Kenya \u2014 Savings, Not Insurance",
      tags: ["episode", "script", "Kenya", "smallholder finance"],
      episodeNumber: 6,
      status: "Scripted",
      duration: "~85 sec",
      dateLabel: "Scripted Aug 7, 2026",
      hook: "Less than 1% of smallholder farmers in Kenya buy crop insurance. Not because they don't need it. Because insurance, as a product, doesn't fit how they actually think about risk.",
      body: "The Kenyan project teased at the end of Episode 2. Builds on the FARMS case study already logged under Worked Case Studies, adds fresh context: a sub-1% crop insurance adoption stat and the underlying wallet's early reach (~4,000 farmers, targeting 100,000 across Kenya/Uganda/Rwanda). Honest close: no public update yet on how the actual pilot performed post-launch.",
      segments: [
        { label: "Hook", time: "0:00\u20130:12", text: "Less than 1% of smallholder farmers in Kenya buy crop insurance. Not because they don't need it. Because insurance, as a product, doesn't fit how they actually think about risk." },
        { label: "The fix", time: "0:12\u20130:45", text: "So a group of organizations, ICS, Agrics, and a Kenyan-facing fintech called Coin22, built something different: not insurance, a savings wallet. Farmers buy what they call 'drought coins' through a mobile wallet, and at the end of the season, satellite data decides how much they can cash out, more if it was a bad season, less if it was fine. It's blockchain underneath, so nobody can quietly edit the record." },
        { label: "Why it matters", time: "0:45\u20131:05", text: "The wallet tech behind this was already reaching around four thousand farmers before this specific programme even launched, with a target of a hundred thousand across Kenya, Uganda, and Rwanda. People trust a savings account. They don't trust an insurance company they've never dealt with." },
        { label: "Honest close", time: "1:05\u20131:25", text: "I don't have a public update yet on how this exact pilot performed after it launched. I'll bring you that the moment it's out there. Follow for it." }
      ],
      altCut: {
        label: "30-second cut",
        text: "Less than 1% of Kenyan smallholders buy crop insurance, not because they don't need it, but because insurance doesn't fit how they think about risk. So ICS, Agrics, and a fintech called Coin22 built a savings wallet instead: buy 'drought coins,' and satellite data decides your payout at season's end. Trust beats a hard sell. Follow for the update on how it's performed."
      },
      overlays: [
        { time: "0:00", text: "<1% of Kenyan smallholders buy crop insurance" },
        { time: "0:45", text: "~4,000 farmers on the wallet tech already" },
        { time: "1:05", text: "What we don't know yet:" }
      ],
      sourcesNote: "FAO/ITU \u201cBlockchain for Agriculture\u201d (2019), FARMS chapter (Violanda de Man, ICS) \u2014 core case study, already logged under Worked Case Studies. NextBillion, \u201cBlockchain for Agriculture: Improving Supply Chain Efficiency and Access to Finance for Smallholder Farmers\u201d (Coin22 AgriWallet reach). CGSpace, \u201cEnhancing smallholder resilience through index-based crop insurance: Evaluation of the aMaizing Project in Kenya\u201d (sub-1% adoption stat).",
      meta: "~85 sec script \u00b7 scripted Aug 7, 2026",
      link: "scripts/episode-6-farms-kenya.md",
      linkLabel: "Raw .md \u2192"
    },

    // ---------- CONTENT IDEAS ----------
    { id: "idea-1", category: "idea", title: "What blockchain in agriculture actually solves", tags: ["episode idea"], body: "Trust, payment delay, and traceability \u2014 explained through AgriDigital or TE-FOOD as concrete cases, not hype.", meta: "Episode idea" },
    { id: "idea-2", category: "idea", title: "Nigeria deep dive: the CAFS Africa solar-dryer project", tags: ["episode idea", "Nigeria"], body: "Fresh, local, verifiable, and almost nobody else in Web3 content is covering it yet.", meta: "Episode idea" },
    { id: "idea-3", category: "idea", title: "Why land documentation is the real blocker", tags: ["episode idea", "Africa"], body: "Tie HouseAfrica and the ~10%-of-land-documented stat into why agri-blockchain finance struggles to scale in Africa.", meta: "Episode idea" },
    { id: "idea-4", category: "idea", title: "ReFi explainer", tags: ["episode idea", "ReFi"], body: "GainForest, Regen Network, KlimaDAO, Project Hummingbird \u2014 how carbon and biodiversity credits actually work on-chain, across different ecosystems.", meta: "Episode idea" },
    { id: "idea-5", category: "idea", title: "The hype vs. the data", tags: ["episode idea", "credibility"], body: "Use the 5x market-size disagreement as a lesson in reading crypto/agritech reports critically. Builds trust early in the series.", meta: "Episode idea" },
    { id: "idea-6", category: "idea", title: "Smallholder finance angle", tags: ["episode idea", "smallholders"], body: "EthicHub, AgUnity, the Kenyan crop-insurance pilot \u2014 directly relevant to Nigerian smallholders your audience likely knows personally.", meta: "Episode idea" },
    { id: "idea-7", category: "idea", title: "The first blockchain grain sale, told as a story", tags: ["episode idea", "narrative"], body: "AgriDigital and Fletcher International Exports: farmer delivers wheat, gets paid the instant title transfers, no five-week wait. Concrete, human, easy to visualize.", meta: "Episode idea" },
    { id: "idea-8", category: "idea", title: "\u201cDo you even need a blockchain?\u201d", tags: ["episode idea", "credibility"], body: "Walk through the DHS decision flowchart on screen. Positions you as someone who understands the tech\u2019s real limits, not just its hype.", meta: "Episode idea" },
    { id: "idea-9", category: "idea", title: "FARMS: savings, not insurance", tags: ["episode idea", "Kenya"], body: "Why a savings product beat an insurance product for smallholder trust and adoption in Kenya. Under-covered, nuanced angle.", meta: "Episode idea" },
    { id: "idea-10", category: "idea", title: "WFP Jordan cost-savings breakdown", tags: ["episode idea", "humanitarian"], body: "Not agriculture exactly, but the mechanism \u2014 blockchain cutting out costly intermediaries \u2014 is identical to what agri-supply-chain projects promise, and the dollar figures are concrete and verifiable.", meta: "Episode idea" }
  ],

  changelog: [
    { date: "2026-07-31", note: "First build. Ported the research base doc plus everything pulled from the two FAO/ITU PDFs (Trade Policy Brief No. 33 and the full \u201cBlockchain for Agriculture\u201d volume): worked case studies for AgriDigital, WFP Building Blocks, AgUnity, and FARMS Kenya, plus the DHS \u201cdo you need a blockchain\u201d framework." },
    { date: "2026-07-31", note: "Added \u201cField sensors\u201d: a live data panel pulling crypto/carbon token prices (CoinGecko), ReFi protocol TVL (DefiLlama), agribusiness stock & ETF quotes (Stooq), and agtech headlines (AgFunderNews, AGDAILY), refreshed via a Vercel serverless function and edge-cached for 30 minutes." },
    { date: "2026-07-31", note: "Repainted the whole site in black/white/green. Fixed the stocks panel (Stooq needed a browser-style User-Agent header) and the TVL panel (now always shows all three tracked protocols instead of silently dropping ones that don\u2019t resolve). Added FAO\u2019s official newsroom feed and Modern Farmer alongside AgFunderNews and AGDAILY. Added a mobile quick-nav bar so category filters are reachable from anywhere on the page without scrolling. Added \u201cFresh script angles\u201d: three auto-generated hook/body/CTA scaffolds built from whatever headlines are live right now." },
    { date: "2026-07-31", note: "Removed the ReFi protocol TVL panel \u2014 it was the least reliable of the four sensors and added little on its own. Field sensors is now three panels: crypto & carbon tokens, agribusiness stocks & ETFs, and AgTech signals, plus the fresh script-angle generator." },
    { date: "2026-07-31", note: "Added a \u201cScripts & Episodes\u201d category and a /scripts folder in the repo, so finished video scripts get logged and linked from the ledger as they\u2019re produced, not just researched. First entry: Episode 1, the agriculture x blockchain intro." },
    { date: "2026-07-31", note: "First deep dive: researched the CAFS Africa x NSPRI blockchain solar dryer project properly (three named on-record sources, not the one-line summary from earlier general search) and rewrote the Africa ledger entry with the real detail \u2014 the 30-50% post-harvest loss stat, what the blockchain layer actually does, and an honest note on what scale numbers aren\u2019t public yet. Logged as Episode 2." },
    { date: "2026-07-31", note: "Scripts stopped linking out to bare .md files. Episodes now render as dedicated cards (number, hook preview, status, duration) that open an in-page reader \u2014 full script broken into labeled segments, alt cut, on-screen overlay suggestions, and sources, all styled to match the rest of the site. Raw .md still linked at the bottom for anyone who wants the plain-text version." },
    { date: "2026-08-07", note: "Added Episodes 3-5, all capped under 90 seconds per new format direction. Ep 3 (AI meets blockchain) and Ep 5 (fun episode: tokenized cows and CattleProof) are freshly researched, not just pulled from the existing ledger. Ep 4 repurposes the AgUnity case study already logged under Worked Case Studies into a tight human-story script. Added a \u201cScripted\u201d status distinct from \u201cPublished,\u201d since these haven\u2019t been filmed yet." },
    { date: "2026-08-07", note: "Added Episode 6: FARMS Kenya, the project teased at the end of Episode 2. Builds on the existing FARMS case study with fresh context, a sub-1% crop insurance adoption stat for Kenya and the underlying wallet's early reach, plus an honest note that there's no public update yet on how the actual pilot performed after its 2019 launch." }
  ]
};
