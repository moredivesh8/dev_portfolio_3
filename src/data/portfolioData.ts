import { Project, SkillNode, Certification } from '../types';

export const HERO_DATA = {
  name: "DIVESH",
  title: "INNOVATIVE ENGINEER",
  role: "Full-Stack & Systems Engineer",
  tagline: "Architecting next-generation interactive systems, high-performance spatial engines, and intelligent web applications.",
  stats: [
    { label: "Years Exp", value: "7+" },
    { label: "Projects Shipped", value: "34" },
    { label: "Core Stack", value: "React • C++ • WebGL" },
    { label: "Code Quality", value: "99.9%" },
  ],
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "divesh.dev@example.com"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "aether-ai",
    title: "AETHER AI PROJECT",
    subtitle: "Spatial AI & Multimodal Engine",
    description: "Real-time multimodal neural visualizer with spatial computing interface and sub-10ms inference pipeline.",
    longDescription: "Aether AI is a cutting-edge multimodal framework that combines 3D spatial representations with real-time generative models. Built with WebGL, WebGPU, and Gemini API integration, it streams spatial embeddings into live interactive node visualizations.",
    category: "AI",
    tags: ["React", "Three.js", "Gemini API", "WebGPU"],
    metrics: "10x Latency Reduction",
    githubUrl: "https://github.com/example/aether-ai",
    liveUrl: "https://aether-ai-demo.example.com",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    featured: true,
    highlights: [
      "Custom WebGL shader pipeline for rendering 100k+ real-time latent nodes",
      "Server-side Gemini 2.0 streaming pipeline via WebSockets",
      "Zero-latency memory caching for vector queries"
    ],
    gradient: "from-purple-600 via-indigo-600 to-blue-600"
  },
  {
    id: "systems-core-engine",
    title: "AETHER AI PROJECT",
    subtitle: "High-Performance Raytracing Core",
    description: "C++20 raytracing and physics solver compiled to WebAssembly for browser-native 60 FPS spatial graphics.",
    longDescription: "Designed for high-throughput graphics calculation in the browser, this engine leverages C++ SIMD instructions and Wasm memory buffers to compute direct path tracing directly on client machines without cloud dependencies.",
    category: "SYSTEMS",
    tags: ["C++20", "WebAssembly", "WebGPU", "SIMD"],
    metrics: "60 FPS Raytracing",
    githubUrl: "https://github.com/example/systems-core",
    liveUrl: "https://systems-core.example.com",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    featured: true,
    highlights: [
      "Sub-millisecond Wasm-to-JS zero-copy shared ArrayBuffer memory architecture",
      "Hardware-accelerated BVH tree traversal for spatial collisions",
      "Cross-platform support for native desktop and browser targets"
    ],
    gradient: "from-blue-600 via-cyan-600 to-teal-500"
  },
  {
    id: "quantum-neural-vis",
    title: "AETHER AI PROJECT",
    subtitle: "Quantum Network Topological Mapper",
    description: "Graph visualization engine mapping high-dimensional tensor graphs with GPU graph-layout simulation.",
    longDescription: "A interactive dashboard for quantum network researchers. Translates complex density matrices and state vectors into intuitive 3D topological manifolds with real-time parameter tweaking.",
    category: "AI",
    tags: ["Python", "PyTorch", "Three.js", "WebGL"],
    metrics: "99.4% Precision",
    githubUrl: "https://github.com/example/quantum-vis",
    liveUrl: "https://quantum-vis.example.com",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    featured: true,
    highlights: [
      "GPU force-directed 3D particle simulation engine",
      "Interactive slice views for 4D matrix projections",
      "Export capability to CAD and GLTF 3D formats"
    ],
    gradient: "from-violet-600 via-fuchsia-600 to-pink-600"
  },
  {
    id: "adroo-ai-dashboard",
    title: "ADROO AI PROJECT",
    subtitle: "Enterprise Developer Telemetry System",
    description: "Full-stack monitoring platform visualizing distributed microservices, trace logs, and system metrics.",
    longDescription: "Adroo AI aggregates log telemetry streams across hundreds of Docker containers into an intuitive real-time dashboard featuring automated anomaly detection and instant RCA (Root Cause Analysis).",
    category: "WEB",
    tags: ["TypeScript", "Next.js", "Tailwind", "Express"],
    metrics: "500k+ MAU",
    githubUrl: "https://github.com/example/adroo-ai",
    liveUrl: "https://adroo-ai.example.com",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    featured: false,
    highlights: [
      "Ultra-fast time-series chart streaming with Recharts and Canvas",
      "Role-based multi-tenant authentication and live notifications",
      "Automated incident alert correlation via LLM summaries"
    ],
    gradient: "from-slate-700 via-zinc-800 to-neutral-900"
  },
  {
    id: "cybernetic-shader-graph",
    title: "CYBER SHADER GRAPH",
    subtitle: "Visual GLSL Node Editor",
    description: "Browser-based node visual node editor for generating production-ready procedural fragment and vertex shaders.",
    longDescription: "Allows visual artists and graphic programmers to connect noise nodes, math operators, and texture samplers visually to compile optimized GLSL shader code instantly.",
    category: "SYSTEMS",
    tags: ["GLSL", "React", "Three.js", "Zustand"],
    metrics: "120Hz Fluid Rendering",
    githubUrl: "https://github.com/example/cyber-shader",
    liveUrl: "https://cyber-shader.example.com",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    featured: false,
    highlights: [
      "Custom AST parser emitting clean, unrolled GLSL 3.0 ES code",
      "Live preview pane with multi-pass post-processing pipeline",
      "Preset library with over 50 procedural noise and distortion nodes"
    ],
    gradient: "from-emerald-600 via-teal-600 to-cyan-600"
  },
  {
    id: "threej-project",
    title: "THREEJ PROJECT",
    subtitle: "Spatial Eye Vision AI",
    description: "Sub-15ms edge vision model running directly in browser Web Workers for gaze tracking and gestures.",
    longDescription: "Implements lightweight convolutional neural networks in WebAssembly to track human gaze vector and gesture controls directly from standard webcams without storing imagery.",
    category: "AI",
    tags: ["Vision Transformer", "WebRTC", "React", "TensorFlow.js"],
    metrics: "< 15ms Latency",
    githubUrl: "https://github.com/example/spatial-eye",
    liveUrl: "https://spatial-eye.example.com",
    imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=800&auto=format&fit=crop",
    featured: false,
    highlights: [
      "In-browser WebWorker model execution preventing main-thread lag",
      "Strict privacy architecture with zero server video transmission",
      "Used by 12,000+ spatial web application testers"
    ],
    gradient: "from-rose-600 via-pink-600 to-amber-600"
  }
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: "react",
    name: "REACT",
    category: "Frameworks",
    level: 95,
    x: 32,
    y: 28,
    connections: ["threejs", "typescript", "nextjs"],
    description: "Building scalable single-page applications, custom hooks, fiber architecture & state optimization.",
    color: "#61dafb"
  },
  {
    id: "threejs",
    name: "THREE.JS",
    category: "Frameworks",
    level: 92,
    x: 52,
    y: 48,
    connections: ["react", "cpp", "webgpu", "typescript"],
    description: "Creating interactive 3D scenes, custom shaders, camera animation matrices & particle systems.",
    color: "#a855f7"
  },
  {
    id: "cpp",
    name: "C++",
    category: "Languages",
    level: 88,
    x: 36,
    y: 72,
    connections: ["threejs", "webgpu", "systems"],
    description: "Systems programming, memory management, C++20 standard, Wasm compilation & spatial math algorithms.",
    color: "#3b82f6"
  },
  {
    id: "typescript",
    name: "TYPESCRIPT",
    category: "Languages",
    level: 96,
    x: 18,
    y: 38,
    connections: ["react", "nextjs", "tools"],
    description: "Strict static typing, complex generic transformations, SDK development & AST processing.",
    color: "#3178c6"
  },
  {
    id: "nextjs",
    name: "NEXT.JS",
    category: "Frameworks",
    level: 90,
    x: 20,
    y: 60,
    connections: ["react", "typescript"],
    description: "Full-stack SSR, Server Actions, edge routing, performance tuning & ISR caching strategies.",
    color: "#ffffff"
  },
  {
    id: "webgpu",
    name: "WEBGPU / GLSL",
    category: "Systems",
    level: 85,
    x: 72,
    y: 32,
    connections: ["threejs", "cpp"],
    description: "Low-level compute shaders, vertex pipelines, deferred shading & GPU buffer synchronization.",
    color: "#f43f5e"
  },
  {
    id: "python",
    name: "PYTHON / AI",
    category: "Languages",
    level: 89,
    x: 75,
    y: 68,
    connections: ["threejs", "tools"],
    description: "PyTorch tensor operations, LLM agent orchestration, fine-tuning & vector embedding databases.",
    color: "#10b981"
  },
  {
    id: "tools",
    name: "DOCKER & CI",
    category: "Tools",
    level: 87,
    x: 88,
    y: 46,
    connections: ["python", "typescript"],
    description: "Cloud Run containerization, multi-stage Docker builds, GitHub Actions & Kubernetes deployments.",
    color: "#38bdf8"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  {
    id: "aws-solutions-architect-prof",
    title: "AWS Certified Solutions Architect – Professional",
    issuer: "Amazon Web Services",
    issuerLogo: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=200&auto=format&fit=crop",
    issueDate: "2024 - 2027",
    expiryDate: "2027",
    credentialId: "AWS-SAP-89210492",
    verificationUrl: "https://aws.amazon.com/verification",
    category: "CLOUD",
    tags: ["AWS", "Cloud Architecture", "Serverless", "Security"],
    description: "Advanced certification evaluating high-availability system architecture, multi-account governance, fault-tolerant infrastructure, and cost optimization on AWS.",
    skillsVerified: [
      "Multi-region VPC & Transit Gateway design",
      "Serverless architecture with Lambda & DynamoDB",
      "IAM security policies & Key Management Service (KMS)",
      "High-throughput load balancing & Auto Scaling"
    ],
    gradient: "from-amber-500 via-orange-600 to-amber-700"
  },
  {
    id: "gcp-cloud-architect",
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    issuerLogo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=200&auto=format&fit=crop",
    issueDate: "2024 - 2026",
    expiryDate: "2026",
    credentialId: "GCP-PCA-99014238",
    verificationUrl: "https://cloud.google.com/certification",
    category: "CLOUD",
    tags: ["GCP", "Kubernetes", "Cloud Run", "Terraform"],
    description: "Validates ability to leverage Google Cloud technologies to design, develop, manage, and secure robust, scalable, cloud-native applications.",
    skillsVerified: [
      "Google Kubernetes Engine (GKE) cluster orchestration",
      "Cloud Run & Serverless container deployments",
      "BigQuery data warehousing & Pub/Sub event pipelines",
      "Infrastructure-as-Code with Terraform"
    ],
    gradient: "from-blue-500 via-indigo-600 to-cyan-500"
  },
  {
    id: "meta-frontend-dev-prof",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issuerLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop",
    issueDate: "2023 - Lifetime",
    credentialId: "META-FE-55421980",
    verificationUrl: "https://coursera.org/verify/professional-cert/meta-fe",
    category: "WEB",
    tags: ["React", "JavaScript", "TypeScript", "UX Engineering"],
    description: "Comprehensive professional credential covering advanced React architecture, custom hooks, Web performance tuning, and accessible UI patterns.",
    skillsVerified: [
      "React Fiber architecture & state optimization",
      "Responsive design & Tailwind CSS mastery",
      "Jest & React Testing Library integration",
      "Web Vitals performance metrics optimization"
    ],
    gradient: "from-violet-600 via-indigo-600 to-purple-600"
  },
  {
    id: "deeplearning-ai-tensorflow",
    title: "TensorFlow & Neural Networks Specialist",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&auto=format&fit=crop",
    issueDate: "2023 - Lifetime",
    credentialId: "TF-DL-77312904",
    verificationUrl: "https://coursera.org/verify/specialization/deeplearning",
    category: "AI",
    tags: ["Python", "PyTorch", "TensorFlow", "Generative AI"],
    description: "Advanced deep learning credential covering Convolutional Neural Networks, Recurrent Neural Networks, Transformer models, and WebAssembly model deployment.",
    skillsVerified: [
      "Convolutional Neural Networks & Computer Vision",
      "Transformers & LLM prompt orchestration",
      "TensorFlow.js edge browser inference",
      "Model quantization & sub-15ms optimization"
    ],
    gradient: "from-emerald-500 via-teal-600 to-green-600"
  },
  {
    id: "kubernetes-cka",
    title: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation (CNCF)",
    issuerLogo: "https://images.unsplash.com/photo-1667372335854-7882b045ce73?q=80&w=200&auto=format&fit=crop",
    issueDate: "2023 - 2026",
    expiryDate: "2026",
    credentialId: "CKA-80129411",
    verificationUrl: "https://www.cncf.io/certification/cka",
    category: "SYSTEMS",
    tags: ["Kubernetes", "Docker", "Linux", "DevOps"],
    description: "Demonstrates hands-on expertise in Kubernetes cluster installation, networking configuration, storage volume management, and live troubleshooting.",
    skillsVerified: [
      "Kubernetes pod, service & ingress management",
      "Cluster security, RBAC & Service Accounts",
      "PersistentVolume storage & StatefulSets",
      "etcd backup, restore & cluster diagnostics"
    ],
    gradient: "from-sky-500 via-blue-600 to-indigo-700"
  },
  {
    id: "nvidia-cuda-parallel",
    title: "NVIDIA Parallel Computing & WebGPU Specialist",
    issuer: "NVIDIA Deep Learning Institute",
    issuerLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=200&auto=format&fit=crop",
    issueDate: "2022 - Lifetime",
    credentialId: "NV-CUDA-33019284",
    verificationUrl: "https://www.nvidia.com/dli/verification",
    category: "SYSTEMS",
    tags: ["C++", "WebGPU", "CUDA", "GPU Shaders"],
    description: "Specialized accreditation in GPU hardware acceleration, low-level parallel algorithm design, memory management, and compute shader pipelines.",
    skillsVerified: [
      "CUDA kernel development & memory hierarchy",
      "WebGPU compute shader pipelines",
      "C++ SIMD vectorization & zero-copy buffers",
      "Matrix multiplication GPU acceleration"
    ],
    gradient: "from-lime-500 via-emerald-600 to-teal-600"
  }
];

export const INITIAL_TERMINAL_OUTPUT = [
  { id: '1', type: 'system', content: 'Divesh Portfolio Shell v2.4.0 (x86_64-apple-darwin)' },
  { id: '2', type: 'system', content: 'Type "help" to view available interactive commands.' },
  { id: '3', type: 'input', content: 'divesh@portfolio:~$ /projects' },
  { id: '4', type: 'output', content: '• AETHER AI PROJECT - Multimodal Spatial Engine\n• SYSTEMS CORE - C++ Wasm Raytracer\n• QUANTUM NEURAL VISUALIZER - GPU Topological Mapper\n• ADROO AI DASHBOARD - Enterprise Telemetry Platform' },
  { id: '5', type: 'input', content: 'divesh@portfolio:~$ /about' },
  { id: '6', type: 'output', content: 'Full-Stack & Systems Engineer with 7+ years building spatial 3D web apps, high-throughput engines, and modern React platforms.' },
  { id: '7', type: 'input', content: 'divesh@portfolio:~$ help' },
  { id: '8', type: 'output', content: 'Commands:\n  help      - Show this manual\n  /projects - List featured engineering builds\n  /about    - View engineer bio & stats\n  /skills   - Display technical skill breakdown\n  /contact  - Focus contact message form\n  /clear    - Clear terminal screen\n  /matrix   - Launch digital rain visual stream' }
] as const;
