export const CANDIDATE = {
  fullName: 'Pranav Buradi',
  legalName: 'Pranav R Buradi',
  primaryTitle: 'Data Analyst',
  supportingTitle: 'Python & SQL Developer · CSE Graduate (VTU 2026, CGPA: 7.3/10)',
  headline: 'Turning Data Into Insights. Accelerating Solutions with Modern AI.',
  bioSummary:
    'Computer Science graduate (VTU 2026, CGPA 7.3) passionate about Data Analytics, ETL pipeline engineering, and modern AI toolchains. Well-versed in leveraging generative AI workflows, LLM prompts, and automated coding agents alongside core SQL and Python to build, test, and ship analytical solutions 3x faster.',
  location: 'Gadag, Karnataka, India',
  email: 'pranavburadi@gmail.com',
  emailHref: 'mailto:pranavburadi@gmail.com',
  phoneDisplay: '+91 84319 54871',
  phoneHref: 'tel:+918431954871',
  resumePdf: '/assets/aistudio/Pranav_B_a2af4007.pdf',
  resumeHtml: '/Pranav-Buradi-Resume.html',
  instagram: 'https://www.instagram.com/barelypranav/',
  instagramHandle: '@barelypranav',
  linkedin: 'https://linkedin.com/in/pranavburadi',
  github: 'https://github.com/pranavburadi',
  avatarPath: '/images/profile/pranav-portrait.jpg',
};

export interface TerminalTab {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
  outputLines: string[];
  finalStatus: string;
}

export interface CarouselVideo {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  src: string;
  poster: string;
  tag: string;
}

export const CAROUSEL_VIDEOS: CarouselVideo[] = [
  {
    id: 'top-bins',
    label: '01 · Top Bins',
    title: 'Top Bins Free-Kick Strike',
    subtitle: 'Set-piece precision & composure on target',
    src: '/assets/aistudio/top_bins_89df12d5.mp4',
    poster: '/assets/aistudio/poster_top_bins.jpg',
    tag: 'Football Reel',
  },
  {
    id: 'visual-story',
    label: '02 · Visual Edit',
    title: 'Perspective & Visual Storytelling',
    subtitle: 'Creative pacing, framing & color grading (@barelypranav)',
    src: '/assets/aistudio/0705_4__19b7ff78.mp4',
    poster: '/assets/aistudio/poster_visual.jpg',
    tag: 'Creative Reel',
  },
  {
    id: 'turf-match',
    label: '03 · Matchplay',
    title: 'Turf Matchplay · Attacking Third',
    subtitle: '1v1 progression, spatial awareness & link-up play',
    src: '/assets/aistudio/1109-copy_1__61078dcc.mp4',
    poster: '/assets/aistudio/poster_match.jpg',
    tag: 'Match Highlights',
  },
  {
    id: 'interceptor-650',
    label: '04 · 650 Reel',
    title: 'Interceptor 650',
    subtitle: 'Visual reel (@barelypranav)',
    src: '/assets/aistudio/650_781ec2c2.mp4',
    poster: '/assets/aistudio/poster_650.jpg',
    tag: 'Lifestyle Reel',
  },
];

export const TERMINAL_TABS: TerminalTab[] = [
  {
    id: 'pipeline',
    filename: 'pipeline_orchestrator.py',
    language: 'Python 3.12',
    description: 'Automated ingestion verifying 52,000+ OmniFlow records.',
    code: `import pandas as pd
from omniflow.validators import validate_schema, alert_webhook

def run_etl_batch(source_uri: str) -> dict:
    df = pd.read_parquet(source_uri)
    raw_count = len(df)

    cleaned = (
        df.drop_duplicates(subset=["shipment_id", "stage_ts"])
          .pipe(validate_schema, strict=True)
    )

    if cleaned.sla_breach_flag.any():
        alert_webhook(cleaned[cleaned.sla_breach_flag])

    return {
        "rows_ingested": len(cleaned),
        "deduped": raw_count - len(cleaned),
        "collisions": 0,
        "latency_ms": 8.2,
    }`,
    outputLines: [
      '$ python pipeline_orchestrator.py --batch=omniflow_q4',
      '> Loading multi-source staging frames...',
      '> Deduplicating shipment_id + stage_ts keys... 0 collisions',
      '> SLA webhook alerts dispatched (-35% MTTR)',
    ],
    finalStatus: '[STATUS: 52,000 ROWS INGESTED IN 8.2ms // 0 COLLISIONS // AI PIPELINE VERIFIED]',
  },
  {
    id: 'sql',
    filename: 'carrier_sla_breach.sql',
    language: 'MySQL 8.0',
    description: 'Logistics delay analytics & carrier OTIF penalty query.',
    code: `WITH carrier_metrics AS (
  SELECT
    carrier_code,
    COUNT(*) AS total_shipments,
    SUM(actual_delivery <= promised_delivery) AS on_time,
    ROUND(AVG(GREATEST(
      TIMESTAMPDIFF(HOUR, promised_delivery, actual_delivery), 0
    )), 2) AS avg_delay_hrs
  FROM omniflow_shipments
  WHERE dispatch_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
  GROUP BY carrier_code
)
SELECT
  carrier_code,
  total_shipments,
  ROUND((on_time * 100.0) / total_shipments, 2) AS otif_pct,
  avg_delay_hrs,
  ROUND((total_shipments - on_time) * 145.00, 2) AS penalty_usd
FROM carrier_metrics
ORDER BY otif_pct ASC;`,
    outputLines: [
      '$ mysql < carrier_sla_breach.sql',
      '> Scanning 52,418 indexed shipment partitions...',
      '> Computed OTIF% & SLA penalties across 6 regional carriers',
      '> Top outlier flagged: CARRIER-X (89.4% OTIF · 4.6h avg delay)',
    ],
    finalStatus: '[QUERY: 6 CARRIERS RANKED // 52,418 RECORDS SCANNED IN 6.4ms // OTIF MODEL READY]',
  },
  {
    id: 'copilot',
    filename: 'ai_data_copilot.py',
    language: 'Python + LLM',
    description: 'Anomaly detection paired with structured LLM prompts.',
    code: `import numpy as np
from ai_workflow import structured_prompt

def detect_anomalies(series: np.ndarray, metric: str):
    z_scores = (series - np.mean(series)) / np.std(series)
    outliers = np.where(np.abs(z_scores) > 2.75)[0]

    summary = structured_prompt(
        model="claude-3.5-sonnet",
        system="Return root-cause SQL checks for numeric spikes.",
        context={"metric": metric, "indices": outliers.tolist()}
    )
    return {"outliers": len(outliers), "next_check": summary}`,
    outputLines: [
      '$ python ai_data_copilot.py --target=carrier_delay_hrs',
      '> Computing rolling Z-scores (threshold |z| > 2.75)...',
      '> 3 statistical variance spikes isolated in Hub-West',
      '> Generated verified SQL verification query via prompt pipeline',
    ],
    finalStatus: '[AI COPILOT: 3 ANOMALIES ISOLATED // ROOT-CAUSE SQL SYNTHESIZED // 3X VELOCITY]',
  },
];

export const MARQUEE_ITEMS = [
  'WELL-VERSED WITH AI TOOLS (CURSOR, CHATGPT, CLAUDE, V0)',
  '52,000+ OMNIFLOW RECORDS',
  '35% FASTER FAILURE RESOLUTION',
  'MYSQL & SPRING BOOT',
  'ZERO DOUBLE-BOOKING COLLISIONS',
  'POWER BI & TABLEAU',
  'NATIONAL U-14 RUNNERS-UP (IMPHAL SILVER)',
  'VTU B.E. CSE 7.3 CGPA',
];

export const OVERVIEW_PILLARS = [
  {
    index: '01',
    title: 'Data Hygiene & ETL Pipelines',
    description:
      'Schema validation, deduplication routines, and delivery SLA error handling built to keep multi-source analytical datasets reliable.',
    metric: '52,000+ Records Processed',
    accent: 'cyan' as const,
  },
  {
    index: '02',
    title: 'AI-Augmented Development',
    description:
      'Well-versed with modern AI tools (ChatGPT, Claude, Gemini, Cursor AI, GitHub Copilot, v0) for automated testing, prompt-driven prototyping, and edge-case validation.',
    metric: '3x Build & Query Velocity',
    accent: 'purple' as const,
  },
  {
    index: '03',
    title: 'Business Intelligence & Metrics',
    description:
      'Throughput latency, carrier OTIF benchmarks, and investor portfolio return models translated into clear executive metrics.',
    metric: '35% Faster SLA Resolution',
    accent: 'cobalt' as const,
  },
  {
    index: '04',
    title: 'Athletic Composure & Teamwork',
    description:
      'Competitive national tournament football player bringing high-pressure resilience and spatial tactics into data engineering.',
    metric: 'National U-14 Silver Medalist',
    accent: 'green' as const,
  },
];

export interface ToolkitCategory {
  id: string;
  title: string;
  priorityTag?: string;
  accent: 'cyan' | 'purple' | 'cobalt' | 'green';
  summary: string;
  tools: string[];
}

export const TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  {
    id: 'ai-tools',
    title: 'AI Tools & Accelerators',
    priorityTag: 'Top Priority',
    accent: 'purple',
    summary: 'Daily driver LLM and agentic coding stack for rapid analysis, SQL synthesis, and test coverage.',
    tools: [
      'ChatGPT (Advanced Data Analysis)',
      'Claude 3.5 Sonnet',
      'Google Gemini',
      'Cursor AI',
      'GitHub Copilot',
      'v0.dev',
      'Prompt Engineering',
      'LLM Workflow Automation',
    ],
  },
  {
    id: 'programming',
    title: 'Programming & Querying',
    accent: 'cyan',
    summary: 'Core analytical and backend languages for querying relational engines and transforming datasets.',
    tools: ['Python', 'SQL (MySQL, PostgreSQL)', 'Java', 'DuckDB'],
  },
  {
    id: 'data-ml',
    title: 'Data Analysis & ML',
    accent: 'cobalt',
    summary: 'Statistical exploration, dataframe vectorization, and predictive baseline modeling.',
    tools: [
      'Pandas',
      'NumPy',
      'Scikit-Learn',
      'Exploratory Data Analysis (EDA)',
      'Feature Engineering',
    ],
  },
  {
    id: 'bi-viz',
    title: 'BI & Visualization',
    accent: 'cyan',
    summary: 'Decision-ready dashboards, distribution storytelling, and pivot-driven financial reporting.',
    tools: [
      'Power BI',
      'Tableau',
      'Matplotlib',
      'Seaborn',
      'Microsoft Excel (Pivot Tables, VLOOKUP, Power Query)',
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering Frameworks',
    accent: 'green',
    summary: 'Production relational persistence, API services, version control, and endpoint verification.',
    tools: ['MySQL', 'Git', 'GitHub', 'Jupyter Notebook', 'RESTful APIs', 'Spring Boot', 'Postman', 'VS Code'],
  },
];

export const PITCH_POSITIONS = [
  {
    code: 'ST',
    name: 'Striker / Centre Forward',
    traits: ['Finishing', 'Clinical Movement', 'Composure'],
    x: 84,
    y: 50,
    summary: 'Primary focal attacker tasked with high-percentage box movement and decisive finishing.',
  },
  {
    code: 'CAM',
    name: 'Central Attacking Midfielder',
    traits: ['Vision', 'Line-Breaking Passes', 'Playmaking'],
    x: 64,
    y: 50,
    summary: 'Creative link between midfield and front line, scanning half-spaces to unlock compact defenses.',
  },
  {
    code: 'RW',
    name: 'Right Winger',
    traits: ['Pace', '1v1 Progression', 'Crossing & Cutbacks'],
    x: 75,
    y: 18,
    summary: 'Wide touchline threat stretching defensive blocks and delivering sharp cutbacks into the penalty box.',
  },
];

export const CERTIFICATIONS = [
  {
    title: 'IBM Certification in Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    category: 'Artificial Intelligence',
  },
  {
    title: 'Advanced AI & Machine Learning',
    issuer: 'Infosys Springboard',
    category: 'Machine Learning',
  },
  {
    title: 'Full Stack Java Internship Certificate',
    issuer: 'Genesis Training & Consulting Services Pvt. Ltd.',
    category: 'Industry Experience',
  },
  {
    title: 'National U-14 Football Championship Participant & Imphal Silver Medalist',
    issuer: 'Student Olympics (Pune & Imphal, Manipur)',
    category: 'National Athletics',
  },
];

export const EDUCATION_RECORDS = [
  {
    degree: 'B.E. Computer Science & Engineering',
    institution: 'Tontadarya College of Engineering, VTU',
    period: '2022–2026',
    score: 'CGPA: 7.3/10',
  },
  {
    degree: 'Higher Secondary (PUC)',
    institution: 'Sanmarg Pre-University Science & Commerce College',
    period: '2020–2022',
    score: '66%',
  },
  {
    degree: 'Secondary Education',
    institution: 'Jaycee High School',
    period: '2008–2020',
    score: '75%',
  },
];
