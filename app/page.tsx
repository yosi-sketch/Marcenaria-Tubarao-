"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Menu,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Building2,
  ExternalLink,
  MessageCircle,
  Calculator,
  Compass,
  Maximize2,
  HelpCircle,
  Award,
  Zap,
  Hammer,
  Ruler,
  Layers,
  HeartHandshake,
  Check,
  Send,
} from "lucide-react";
import GlowingButton from "./components/GlowingButton";

// ==========================================
// DADOS OFICIAIS — MARCENARIA TUBARÃO
// ==========================================
const COMPANY_NAME = "Marcenaria Tubarão";
const COMPANY_FULL_NAME = "Marcenaria Tubarão | Móveis Planejados";
const COMPANY_SLOGAN = "Desde 1977 realizando sonhos.";
const WHATSAPP_NUMBER = "5531997673576";
const WHATSAPP_DISPLAY = "(31) 99767-3576";
const PHONE_DISPLAY = "(31) 99767-3576";
const PHONE_FIXED = "(31) 3462-8800";
const EMAIL_CONTACT = "contato@marcenariatubarao.com.br";
const EMAIL_SALES = "orcamento@marcenariatubarao.com.br";
const INSTAGRAM_URL = "https://www.instagram.com/marcenaria.tubarao/";
const INSTAGRAM_HANDLE = "@marcenaria.tubarao";

const ADDRESS_STREET = "Rua Santa Judite, 70";
const ADDRESS_NEIGHBORHOOD = "Aparecida";
const ADDRESS_CITY = "Belo Horizonte - MG";
const ADDRESS_CEP = "31250-050";
const ADDRESS_FULL = `${ADDRESS_STREET} - ${ADDRESS_NEIGHBORHOOD}, ${ADDRESS_CITY}, CEP ${ADDRESS_CEP}`;

const GOOGLE_RATING = "5,0";
const GOOGLE_REVIEW_COUNT = "7";
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Marcenaria+Tubarao+Rua+Santa+Judite+70+Aparecida+Belo+Horizonte+MG";

// Assets Oficiais Marcenaria Tubarão
const LOGO_SRC = "/logo.png";
const LOGO_HORIZONTAL_SRC = "/logo-horizontal.png";
const LOGO_HORIZONTAL_DARK_SRC = "/logo-horizontal-dark.png";

function getWhatsAppUrl(message?: string, number: string = WHATSAPP_NUMBER) {
  const defaultText =
    "Olá, Carlos! Gostaria de solicitar um orçamento de móveis planejados sob medida com a Marcenaria Tubarão.";
  return `https://wa.me/${number}?text=${encodeURIComponent(
    message || defaultText
  )}`;
}

// ==========================================
// HERO SLIDER DATA
// ==========================================
interface HeroSlideItem {
  id: string;
  title: string;
  highlight: string;
  badge: string;
  description: string;
  image: string;
  accent: string;
}

const HERO_SLIDES: HeroSlideItem[] = [
  {
    id: "cozinhas",
    title: "Cozinhas Planejadas & Ilhas Gourmet",
    highlight: "Sofisticação e Ergonomia Milimétrica",
    badge: "100% Sob Medida · Ferragens Amortecidas",
    description:
      "Aproveitamento inteligente de cada centímetro com bancadas esculpidas, gavetões de extração total, amortecimento soft-close e acabamentos nobres que resistem ao tempo.",
    image: "/images/hero/hero-cozinha-luxo.jpg",
    accent: "Cozinha dos Sonhos",
  },
  {
    id: "closets",
    title: "Closets & Suítes Master",
    highlight: "Organização Inteligente & Design de Luxo",
    badge: "Iluminação LED Embutida · Gaveteiros Aveludados",
    description:
      "Roupeiros planejados com portas de correr deslizantes, divisórias funcionais para joias e sapatos, e acabamentos aveludados pensados para o seu bem-estar diário.",
    image: "/images/hero/hero-closet-master.jpg",
    accent: "Closet Exclusivo",
  },
  {
    id: "salas",
    title: "Salas de Estar & Painéis Ripados",
    highlight: "A Elegância do Ripado Nobre Integrado",
    badge: "Home Theaters · Estantes com Fita LED",
    description:
      "Composições arquitetônicas imponentes com painéis ripados em madeira nobre, racks suspensos com passagem invisível de cabos e estantes iluminadas.",
    image: "/images/hero/hero-sala-ripado.jpg",
    accent: "Living Sofisticado",
  },
  {
    id: "corporativo",
    title: "Corporativo, Consultórios & Comércio",
    highlight: "Autoridade Visual para Sua Marca em BH",
    badge: "Recepções Imponentes · Salas de Reunião",
    description:
      "Marcenaria comercial de alto impacto para consultórios médicos, escritórios de advocacia, recepções de clínicas e lojas que encantam clientes desde o primeiro olhar.",
    image: "/images/hero/hero-corporativo-luxo.jpg",
    accent: "Espaços Comerciais",
  },
];

// ==========================================
// PORTFÓLIO / AMBIENTES PLANEJADOS
// ==========================================
type ProjectCategory =
  | "todos"
  | "cozinhas"
  | "dormitorios"
  | "salas"
  | "banheiros"
  | "corporativo"
  | "madeira";

interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  description: string;
  materials: string[];
  location: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Cozinha Gourmet com Ilha Central & Ferragens Amortecidas",
    category: "cozinhas",
    categoryLabel: "Cozinhas Planejadas",
    image: "/images/instagram/insta_real_7.jpg",
    description:
      "Projeto executado com armários superiores com abertura basculante pneumática, ilha central gourmet com nicho para torre de tomadas e gavetões profundos.",
    materials: ["MDF Ultra Resistente à Umidade", "Corrediças Ocultas Blum", "Lâmina Natural de Carvalho"],
    location: "Belvedere, Belo Horizonte",
  },
  {
    id: "p2",
    title: "Cozinha Moderna Minimalista com Puxador Cava Usinado",
    category: "cozinhas",
    categoryLabel: "Cozinhas Planejadas",
    image: "/images/instagram/insta_real_3.jpg",
    description:
      "Linhas puras sem puxadores aparentes (puxador cava usinado), cristaleira com perfil slim de alumínio preto e vidro reflecta bronze com fita LED embutida.",
    materials: ["Puxador Cava Usinado", "Vidro Reflecta Bronze", "Iluminação LED 3000K"],
    location: "Lourdes, Belo Horizonte",
  },
  {
    id: "p3",
    title: "Roupeiro & Closet Planejado com Portas Deslizantes Suaves",
    category: "dormitorios",
    categoryLabel: "Dormitórios & Closets",
    image: "/images/instagram/insta_real_4.jpg",
    description:
      "Amplo espaço planejado com nichos iluminados para bolsas e sapatos, gavetas com divisórias forradas em veludo e cabideiros com sensor de presença.",
    materials: ["Forração Interna Aveludada", "Perfis com Difusor de LED", "Vidros Canelados"],
    location: "Mangabeiras, Belo Horizonte",
  },
  {
    id: "p4",
    title: "Suíte Master com Cabeceira Ripada & Mesas Flutuantes",
    category: "dormitorios",
    categoryLabel: "Dormitórios & Closets",
    image: "/images/instagram/insta_real_5.jpg",
    description:
      "Painel ripado contínuo com arandelas embutidas, mesas de apoio flutuantes com cantos usinados e roupeiro integrado com portas deslizantes suaves.",
    materials: ["Painel Ripado em Nogueira", "Mesas Flutuantes", "Amortecedor Soft-Close"],
    location: "Funcionários, Belo Horizonte",
  },
  {
    id: "p5",
    title: "Home Theater com Painel Ripado e Rack Suspenso",
    category: "salas",
    categoryLabel: "Salas & Home Theaters",
    image: "/images/instagram/insta_real_2.jpg",
    description:
      "Painel ripado imponente para TV de 85 polegadas com passagem oculta de cabos, rack inferior chanfrado com gavetas de toque e nicho para subwoofer.",
    materials: ["MDF Nogueira Catedral", "Passagem Invisível de Cabos", "Gavetas Push-to-Open"],
    location: "Castelo, Belo Horizonte",
  },
  {
    id: "p6",
    title: "Estante sob Medida para Living com Iluminação Indireta",
    category: "salas",
    categoryLabel: "Salas & Home Theaters",
    image: "/images/instagram/insta_real_8.jpg",
    description:
      "Composição arquitetônica para livros e obras de arte, com iluminação indireta quente que cria uma atmosfera aconchegante e sofisticada na sala.",
    materials: ["Iluminação Indireta Embutida", "MDF Grafite Acetinado", "Prateleiras Reforçadas"],
    location: "Pampulha, Belo Horizonte",
  },
  {
    id: "p7",
    title: "Gabinete de Banheiro Flutuante com Proteção Naval",
    category: "banheiros",
    categoryLabel: "Banheiros & Lavabos",
    image: "/images/instagram/insta_real_6.jpg",
    description:
      "Gabinete suspenso com proteção naval antimofo, gavetão com recorte ergonômico para sifão e espelho lapidado com iluminação retroiluminada.",
    materials: ["Compensado Naval Selado", "Fita de Borda PUR Termofusível", "Espelho Retroiluminado"],
    location: "Santo Agostinho, Belo Horizonte",
  },
  {
    id: "p8",
    title: "Escritório Corporativo & Sala de Reunião Executiva",
    category: "corporativo",
    categoryLabel: "Comercial & Corporativo",
    image: "/images/instagram/insta_real_9.jpg",
    description:
      "Mesa de diretoria sob medida com calha oculta de conectividade e energia, armários embutidos de arquivo com fechadura e painel de fundo amadeirado.",
    materials: ["Calhas de Conectividade Embutidas", "MDF Premium Texturizado", "Painéis Acústicos"],
    location: "Savassi, Belo Horizonte",
  },
  {
    id: "p9",
    title: "Porta Pivotante em Madeira Maciça Artesanal (Desde 1977)",
    category: "madeira",
    categoryLabel: "Tradição & Madeira Maciça",
    image: "/images/instagram/insta_real_10.jpg",
    description:
      "Porta de entrada monumental com eixo pivotante de 300kg, usinagem artística na madeira e puxador artesanal. A tradição de marcenaria viva desde 1977.",
    materials: ["Madeira Maciça Selecionada", "Eixo Pivotante em Aço Inox", "Verniz Náutico UV"],
    location: "Nova Lima / BH",
  },
  {
    id: "p10",
    title: "Cristaleira & Bar Gourmet com Portas em Vidro Reflecta",
    category: "salas",
    categoryLabel: "Salas & Home Theaters",
    image: "/images/instagram/insta_real_11.jpg",
    description:
      "Espaço gourmet planejado para apreciadores de vinhos, com nichos horizontais em colmeia para garrafas, gaveta para saca-rolhas e cristaleira com portas de vidro.",
    materials: ["Colmeia de Madeira Natural", "Vidro Temperado", "Iluminação LED sem Emissão de Calor"],
    location: "Vila da Serra, Belo Horizonte",
  },
];

// ==========================================
// INSTAGRAM OFICIAL DATA (@marcenaria.tubarao)
// ==========================================
interface InstagramPost {
  id: string;
  image: string;
  title: string;
  tag: string;
  likes: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    image: "/images/instagram/insta_real_1.jpg",
    title: "Cozinha Planejada com Torre Quente & Nichos Iluminados",
    tag: "#CozinhaPlanejadaBH",
    likes: "54",
  },
  {
    id: "ig-2",
    image: "/images/instagram/insta_real_2.jpg",
    title: "Painel Ripado em Nogueira & Rack Suspenso",
    tag: "#PainelRipadoBH",
    likes: "68",
  },
  {
    id: "ig-3",
    image: "/images/instagram/insta_real_3.jpg",
    title: "Armários de Cozinha Sob Medida com Puxador Cava",
    tag: "#MarcenariaBH",
    likes: "61",
  },
  {
    id: "ig-4",
    image: "/images/instagram/insta_real_4.jpg",
    title: "Roupeiro Planejado com Portas Deslizantes",
    tag: "#ClosetSobMedida",
    likes: "49",
  },
  {
    id: "ig-5",
    image: "/images/instagram/insta_real_5.jpg",
    title: "Cabeceira Ripada & Mesas de Apoio Suspensas",
    tag: "#QuartoSobMedida",
    likes: "63",
  },
  {
    id: "ig-6",
    image: "/images/instagram/insta_real_6.jpg",
    title: "Gabinete de Banheiro Flutuante em Compensado Naval",
    tag: "#BanheiroPlanejado",
    likes: "42",
  },
  {
    id: "ig-7",
    image: "/images/instagram/insta_real_7.jpg",
    title: "Ilha Gourmet com Gavetões de Amortecimento",
    tag: "#IlhaGourmet",
    likes: "79",
  },
  {
    id: "ig-8",
    image: "/images/instagram/insta_real_8.jpg",
    title: "Estante sob Medida para Living com Fita LED",
    tag: "#HomeTheaterBH",
    likes: "58",
  },
  {
    id: "ig-9",
    image: "/images/instagram/insta_real_9.jpg",
    title: "Escritório Corporativo & Mesa Diretiva",
    tag: "#MoveisCorporativos",
    likes: "47",
  },
  {
    id: "ig-10",
    image: "/images/instagram/insta_real_10.jpg",
    title: "Porta Pivotante em Madeira Maciça Artesanal",
    tag: "#PortaPivotante",
    likes: "94",
  },
  {
    id: "ig-11",
    image: "/images/instagram/insta_real_11.jpg",
    title: "Bancada e Cristaleira com Vidro Reflecta",
    tag: "#CristaleiraBH",
    likes: "72",
  },
  {
    id: "ig-12",
    image: "/images/instagram/insta_real_12.jpg",
    title: "Detalhe de Acabamento e Encaixe de Precisão",
    tag: "#MarcenariaFina",
    likes: "56",
  },
];

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// ==========================================
// DEPOIMENTOS REAIS DO GOOGLE MAPS (NOTA 5,0★)
// ==========================================
interface TestimonialItem {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  meta: string;
  highlightText: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    name: "Bruna Tourinho",
    rating: 5,
    timeAgo: "2 anos atrás",
    text: "Excelente profissional, acabamento e serviço impecável. Minha casa só tem armários feito por eles! Super recomendo!",
    meta: "3 avaliações · 6 fotos",
    highlightText: "Minha casa só tem armários feito por eles! Acabamento impecável.",
  },
  {
    id: "t2",
    name: "Ercilio Anjos",
    rating: 5,
    timeAgo: "2 anos atrás",
    text: "Já fiz vários serviços na Marcenaria Tubarão com o Carlos que me atendeu muito bem. Sempre prestativo, educado e disponível para a execução dos serviços necessitados.",
    meta: "4 avaliações",
    highlightText: "Com o Carlos que me atendeu muito bem. Sempre prestativo e educado.",
  },
  {
    id: "t3",
    name: "Eduardo Sanches",
    rating: 5,
    timeAgo: "2 anos atrás",
    text: "Excelente profissional. Serviço impecável! Entregaram o serviço dentro do praso.",
    meta: "5 avaliações",
    highlightText: "Serviço impecável! Entregaram dentro do prazo.",
  },
  {
    id: "t4",
    name: "Gustavo Rodrigues",
    rating: 5,
    timeAgo: "2 anos atrás",
    text: "Fizeram um excelente serviço em minha casa; entregaram antes do prazo! 👏🏻👏🏻👏🏻",
    meta: "3 avaliações",
    highlightText: "Entregaram antes do prazo! Excelente serviço.",
  },
  {
    id: "t5",
    name: "Flávia Nunes",
    rating: 5,
    timeAgo: "3 anos atrás",
    text: "Gostei muito dos móveis da minha casa, parabéns!!!!",
    meta: "7 avaliações · 2 fotos",
    highlightText: "Gostei muito dos móveis da minha casa, parabéns!",
  },
  {
    id: "t6",
    name: "Deia Nunes",
    rating: 5,
    timeAgo: "3 anos atrás",
    text: "Muito pontuais e detalhistas. Muito bom!!",
    meta: "7 avaliações · 2 fotos",
    highlightText: "Muito pontuais e detalhistas. Muito bom!",
  },
];

// ==========================================
// FAQ DATA
// ==========================================
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Como funciona o processo de orçamento e projeto na Marcenaria Tubarão?",
    answer:
      "É muito simples e direto! Você entra em contato conosco pelo WhatsApp (31) 99767-3576, conversa diretamente com o Carlos e nossa equipe técnica, envia a planta ou fotos do espaço e nós agendamos uma visita técnica para medição no local. Desenvolvemos o projeto 3D para você visualizar exatamente como ficarão os móveis antes da fabricação.",
  },
  {
    question: "Qual é o prazo médio de entrega dos móveis sob medida?",
    answer:
      "A pontualidade é a nossa maior marca e orgulho há mais de 47 anos! Nossos clientes com frequência destacam nos comentários do Google que entregamos dentro ou até antes do prazo combinado. O tempo exato varia de 25 a 45 dias úteis de acordo com a complexidade e quantidade de ambientes do projeto.",
  },
  {
    question: "Quais materiais e ferragens a Marcenaria Tubarão utiliza?",
    answer:
      "Trabalhamos exclusivamente com MDF de primeira linha 100% de alta densidade (com opções de compensado naval resistente a água para banheiros e lavabos), fitamento de borda termofusível de alta aderência contra umidade, além de ferragens premium com amortecimento suave (slow-motion), corrediças ocultas e perfis de alumínio anodizado.",
  },
  {
    question: "Vocês atendem arquitetos e designers de interiores em BH?",
    answer:
      "Sim, com grande honra! Temos parceria contínua com renomados arquitetos e designers de Belo Horizonte e Região Metropolitana, executando fielmente detalhamentos técnicos, paginações complexas de ripados, iluminação embutida e projetos com tolerância milimétrica.",
  },
  {
    question: "Quais são as formas de pagamento facilitadas?",
    answer:
      "Oferecemos condições facilitadas com entrada e saldo parcelado durante a fabricação e entrega, além de parcelamento no cartão de crédito e descontos especiais para pagamentos à vista.",
  },
  {
    question: "Vocês realizam móveis para ambientes comerciais e corporativos?",
    answer:
      "Com certeza! Desenvolvemos recepções imponentes, salas de reunião, consultórios médicos e odontológicos, escritórios de advocacia, lojas e restaurantes com acabamentos que transmitem autoridade e durabilidade extrema.",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("todos");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Simulador de briefing state
  const [simAmbientes, setSimAmbientes] = useState<string[]>(["Cozinha"]);
  const [simEstilo, setSimEstilo] = useState<string>("Moderno com Iluminação LED");
  const [simPrazo, setSimPrazo] = useState<string>("Próximos 30 a 60 dias");
  const [simNome, setSimNome] = useState<string>("");

  // Slide auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "todos") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const toggleAmbiente = (amb: string) => {
    setSimAmbientes((prev) =>
      prev.includes(amb) ? prev.filter((a) => a !== amb) : [...prev, amb]
    );
  };

  const handleSimuladorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, Carlos! Gostaria de um orçamento na Marcenaria Tubarão.\n\n👤 Nome: ${
      simNome || "Cliente"
    }\n🏠 Ambientes: ${
      simAmbientes.length > 0 ? simAmbientes.join(", ") : "A definir"
    }\n✨ Estilo: ${simEstilo}\n⏱️ Previsão de Início: ${simPrazo}\n\nGostaria de agendar uma conversa para ver o projeto 3D!`;
    window.open(getWhatsAppUrl(text), "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#00B4D8] selection:text-white">
      {/* ==================================================== */}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {/* ==================================================== */}
      <div className="bg-[#0B1320] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00B4D8]/20 text-[#38BDF8] font-bold text-[11px] border border-[#00B4D8]/30 shrink-0">
              <Sparkles className="w-3 h-3" /> DESDE 1977
            </span>
            <span className="hidden sm:inline">Marcenaria Tubarão: 47+ anos realizando sonhos em Belo Horizonte e Região</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 shrink-0">
            <div className="flex items-center gap-1 text-[#FACC15] font-semibold whitespace-nowrap">
              <Star className="w-3.5 h-3.5 fill-[#FACC15]" />
              <span>5,0 no Google Reviews</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href={getWhatsAppUrl("Olá Carlos! Gostaria de falar sobre um projeto de móveis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-[#00B4D8] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#00B4D8]" />
              <span>Fale direto com o Carlos: <strong className="text-white">(31) 99767-3576</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. MAIN HEADER & NAVIGATION */}
      {/* ==================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity (shrink-0 to prevent overlap) */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#00B4D8] shadow-md group-hover:scale-105 transition-transform duration-300 bg-white flex items-center justify-center p-0.5 shrink-0">
              <Image
                src={LOGO_SRC}
                alt="Logo Marcenaria Tubarão"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col shrink-0">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0B1320] font-heading whitespace-nowrap">
                  MARCENARIA
                </span>
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#00B4D8] font-heading whitespace-nowrap">
                  TUBARÃO
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-slate-500 uppercase whitespace-nowrap">
                Móveis Planejados · Desde 1977
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (whitespace-nowrap & concise labels) */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-7 text-[13px] xl:text-[14px] font-semibold text-slate-700 shrink-0">
            <a href="#ambientes" className="hover:text-[#00B4D8] transition-colors whitespace-nowrap">
              Portfólio
            </a>
            <a href="#diferenciais" className="hover:text-[#00B4D8] transition-colors whitespace-nowrap">
              Diferenciais
            </a>
            <a href="#historia" className="hover:text-[#00B4D8] transition-colors whitespace-nowrap">
              Tradição 1977
            </a>
            <a href="#simulador" className="hover:text-[#00B4D8] transition-colors whitespace-nowrap">
              Simulador 3D
            </a>
            <a href="#depoimentos" className="hover:text-[#00B4D8] transition-colors flex items-center gap-1 whitespace-nowrap">
              <span>Avaliações</span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] xl:text-[11px] rounded font-bold">5,0★</span>
            </a>
            <a href="#localizacao" className="hover:text-[#00B4D8] transition-colors whitespace-nowrap">
              Localização
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <GlowingButton
              href={getWhatsAppUrl()}
              target="_blank"
              variant="whatsapp"
              size="md"
              className="gap-2 text-[13px] xl:text-[14px] px-3.5 xl:px-5 py-2.5 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white shrink-0" />
              <span className="hidden xl:inline">Pedir Orçamento no WhatsApp</span>
              <span className="inline xl:hidden">Orçamento WhatsApp</span>
            </GlowingButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none shrink-0"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl"
            >
              <div className="flex flex-col gap-4 text-base font-semibold text-slate-800">
                <a
                  href="#ambientes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8]"
                >
                  Ambientes & Portfólio
                </a>
                <a
                  href="#diferenciais"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8]"
                >
                  Diferenciais de Qualidade
                </a>
                <a
                  href="#historia"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8]"
                >
                  História Desde 1977
                </a>
                <a
                  href="#simulador"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8]"
                >
                  Simulador de Orçamento
                </a>
                <a
                  href="#depoimentos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8] flex items-center justify-between"
                >
                  <span>Avaliações de Clientes</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full font-bold">5,0★</span>
                </a>
                <a
                  href="#localizacao"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 hover:text-[#00B4D8]"
                >
                  Localização em Belo Horizonte
                </a>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a
                    href={`tel:${WHATSAPP_NUMBER}`}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <Phone className="w-4 h-4 text-[#00B4D8]" />
                    <span>Ligar: {WHATSAPP_DISPLAY}</span>
                  </a>
                  <GlowingButton
                    href={getWhatsAppUrl()}
                    target="_blank"
                    variant="whatsapp"
                    size="lg"
                    className="w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Orçamento no WhatsApp</span>
                  </GlowingButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================================================== */}
      {/* 3. HERO SECTION (INTERACTIVE SLIDER & HOOK) */}
      {/* ==================================================== */}
      <section className="relative bg-[#0B1320] text-white overflow-hidden py-16 lg:py-24">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#0284C7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (Text & Call to Actions) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 mb-6 shadow-sm"
              >
                <div className="flex items-center gap-0.5 text-[#FACC15]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FACC15]" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-200">
                  5,0 NO GOOGLE REVIEWS
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-xs font-medium text-[#38BDF8]">
                  47+ ANOS DE HISTÓRIA EM BH
                </span>
              </motion.div>

              {/* Main Headline (H1) */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight leading-[1.12] text-white font-heading"
              >
                Móveis Sob Medida &amp; Marcenaria de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] via-[#38BDF8] to-[#00AEEF]">
                  Alto Padrão em BH
                </span>
              </motion.h1>

              {/* Subheadline / Value Proposition */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl"
              >
                <strong>Desde 1977 realizando sonhos.</strong> Unimos a nobreza e a precisão da
                marcenaria tradicional à tecnologia moderna de projetos 3D para transformar
                cozinhas, closets, salas e ambientes corporativos em espaços exclusivos com{" "}
                <strong className="text-white">acabamento impecável</strong> e{" "}
                <strong className="text-[#38BDF8]">entrega rigorosamente no prazo</strong>.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
              >
                <GlowingButton
                  href={getWhatsAppUrl("Olá Carlos! Gostaria de solicitar um orçamento para o meu projeto de móveis.")}
                  target="_blank"
                  variant="whatsapp"
                  size="xl"
                  className="shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Falar com o Carlos no WhatsApp</span>
                </GlowingButton>

                <GlowingButton
                  href="#ambientes"
                  variant="outlineCyan"
                  size="xl"
                  className="gap-2"
                >
                  <span>Explorar Ambientes</span>
                  <ArrowRight className="w-4 h-4" />
                </GlowingButton>
              </motion.div>

              {/* Quick Trust Pillars (4 Pills) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00B4D8]/15 border border-[#00B4D8]/30 flex items-center justify-center text-[#38BDF8]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Desde 1977</p>
                    <p className="text-[11px] text-slate-400">47+ anos em BH</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#FACC15]">
                    <Star className="w-4 h-4 fill-[#FACC15]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Nota 5,0★</p>
                    <p className="text-[11px] text-slate-400">Google Reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#16A34A]/15 border border-[#16A34A]/30 flex items-center justify-center text-[#22C55E]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Pontualidade</p>
                    <p className="text-[11px] text-slate-400">Entrega garantida</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">100% Sob Medida</p>
                    <p className="text-[11px] text-slate-400">Projeto exclusivo</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Content (Interactive Photography Showcase Slider) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl group aspect-[4/3] sm:aspect-[16/11]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={HERO_SLIDES[activeSlide].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={HERO_SLIDES[activeSlide].image}
                      alt={HERO_SLIDES[activeSlide].title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/40 to-transparent" />

                    {/* Overlay Slide Info */}
                    <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#00B4D8] text-[#0B1320] font-bold text-xs w-max mb-2 shadow">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{HERO_SLIDES[activeSlide].badge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                        {HERO_SLIDES[activeSlide].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                        {HERO_SLIDES[activeSlide].description}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                      )
                    }
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#00B4D8] text-white flex items-center justify-center transition-colors"
                    aria-label="Slide anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
                    }
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#00B4D8] text-white flex items-center justify-center transition-colors"
                    aria-label="Próximo slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === idx
                        ? "w-8 bg-[#00B4D8]"
                        : "w-2 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Ver slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. SHOWCASE DE AMBIENTES & PORTFÓLIO */}
      {/* ==================================================== */}
      <section id="ambientes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3 border border-sky-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Portfólio de Ambientes Exclusivos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
              Cada Detalhe Pensado Para Encantar e Durar
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Navegue pelos projetos executados pela Marcenaria Tubarão em Belo Horizonte.
              Do corte milimétrico ao ajuste fino na instalação, entregamos ambientes que aliam
              beleza atemporal, máxima ergonomia e resistência.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {[
              { id: "todos", label: "Todos os Ambientes" },
              { id: "cozinhas", label: "Cozinhas Gourmet" },
              { id: "dormitorios", label: "Dormitórios & Closets" },
              { id: "salas", label: "Salas & Ripados" },
              { id: "banheiros", label: "Banheiros Nobres" },
              { id: "corporativo", label: "Comercial & Corporativo" },
              { id: "madeira", label: "Madeira Maciça (1977)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as ProjectCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === tab.id
                    ? "bg-[#0B1320] text-white shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Project Image */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B1320]/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {project.categoryLabel}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="absolute inset-0 bg-[#0B1320]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-semibold text-sm cursor-pointer"
                    >
                      <Maximize2 className="w-5 h-5" />
                      <span>Ver Especificações</span>
                    </button>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#0B1320] font-heading group-hover:text-[#00B4D8] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Materials tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.materials.map((mat, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                          >
                            ✓ {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#00B4D8]" />
                        {project.location}
                      </span>
                      <a
                        href={getWhatsAppUrl(`Olá Carlos! Vi a foto do projeto "${project.title}" no site da Marcenaria Tubarão e gostaria de fazer algo parecido.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-[#00B4D8] hover:text-[#0284C7] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Quero esse estilo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Under-gallery CTA */}
          <div className="mt-14 text-center bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-xl font-bold text-[#0B1320] font-heading">
              Tem uma foto ou referência do Pinterest ou Instagram que amou?
            </h3>
            <p className="text-slate-600 text-sm mt-2 max-w-xl mx-auto">
              Envie a foto ou a planta para o Carlos pelo WhatsApp! Adaptamos as referências
              às medidas exatas do seu espaço com projeto 3D realista.
            </p>
            <div className="mt-5">
              <GlowingButton
                href={getWhatsAppUrl("Olá Carlos! Tenho algumas referências de móveis que gostaria de enviar para você avaliar.")}
                target="_blank"
                variant="whatsapp"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Enviar Foto de Referência no WhatsApp</span>
              </GlowingButton>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 5. INSTAGRAM OFICIAL: @marcenaria.tubarao (FOTOS REAIS) */}
      {/* ==================================================== */}
      <section id="instagram" className="py-20 bg-[#0B1320] text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-gradient-to-tr from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header with Instagram Branding */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 text-[#f09433] text-xs font-bold uppercase tracking-wider mb-3 border border-[#dc2743]/30">
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram Oficial · @marcenaria.tubarao</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
                Direto da Oficina &amp; Obras Reais Entregues em BH
              </h2>
              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">
                Acompanhe o dia a dia da nossa produção na Rua Santa Judite 70, bastidores de montagens
                reais em apartamentos e casas, e novos ambientes finalizados pela equipe do Carlos.
              </p>
            </div>

            {/* Profile Pill Card */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 p-4 rounded-2xl flex items-center gap-4 transition-all hover:border-[#dc2743] hover:scale-102 group shadow-lg shrink-0"
            >
              <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shrink-0">
                <div className="w-full h-full rounded-full bg-white overflow-hidden p-0.5 flex items-center justify-center">
                  <Image
                    src={LOGO_SRC}
                    alt="@marcenaria.tubarao"
                    width={44}
                    height={44}
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-sm group-hover:text-[#f09433] transition-colors">
                    {INSTAGRAM_HANDLE}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span><strong>109</strong> posts</span>
                  <span>•</span>
                  <span><strong>483</strong> seguidores</span>
                </div>
              </div>
              <div className="ml-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold flex items-center gap-1 shadow">
                <span>Seguir</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </a>
          </div>

          {/* Grid of 12 real Instagram photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <div
                key={post.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-md hover:border-[#00B4D8] transition-all duration-300"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-white text-[11px] font-bold">
                    <span className="inline-flex items-center gap-1 text-[#f09433]">
                      <InstagramIcon className="w-3 h-3" />
                    </span>
                    <span className="flex items-center gap-0.5 text-rose-400">
                      ❤️ {post.likes}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-[11px] font-semibold line-clamp-2 leading-tight">
                      {post.title}
                    </p>
                    <a
                      href={getWhatsAppUrl(`Olá Carlos! Vi a foto no Instagram da Marcenaria Tubarão ("${post.title}") e gostaria de um orçamento para fazer algo assim.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full py-1 px-2 rounded bg-[#16A34A] hover:bg-[#15803D] text-white text-[10px] font-bold text-center block transition-colors"
                    >
                      Quero Móvel Igual
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer of the section */}
          <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-sm shadow-lg transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Ver Todas as Publicações no Instagram Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <GlowingButton
              href={getWhatsAppUrl("Olá Carlos! Vi as fotos no Instagram de vocês e gostaria de pedir um orçamento para minha casa.")}
              target="_blank"
              variant="whatsapp"
              size="md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Falar com o Carlos no WhatsApp</span>
            </GlowingButton>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. DIFERENCIAIS DA MARCENARIA TUBARÃO */}
      {/* ==================================================== */}
      <section id="diferenciais" className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/60 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Por Que Escolher a Marcenaria Tubarão?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
              A Diferença Entre um Móvel Comum e uma Obra de Arte
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Enquanto muitas marcenarias terceirizam processos ou atrasam cronogramas,
              nós mantemos a produção 100% própria com rigor e pontualidade elogiados pelos clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 1. Tradição 1977 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#00B4D8]/10 text-[#00B4D8] flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                Desde 1977 em Belo Horizonte
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Mais de 47 anos de atuação contínua no mercado mineiro. Maestria artesanal transmitida
                entre mestres marceneiros com reputação impecável e solidez inabalável.
              </p>
            </div>

            {/* 2. Pontualidade Rigorosa */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-[#16A34A] flex items-center justify-center mb-5">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                Pontualidade Inegociável
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Entregamos no prazo ou antes do prazo acordado. Nossos depoimentos comprovam que
                respeitamos o seu cronograma de obra e mudança sem desculpas.
              </p>
            </div>

            {/* 3. Atendimento com o Carlos */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                Atendimento Consultivo Direto
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Você conversa diretamente com o Carlos e nossa equipe técnica. Sem intermediários,
                com transparência, atenção a cada detalhe e dedicação total ao seu projeto.
              </p>
            </div>

            {/* 4. Acabamento Milimétrico */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#0284C7] flex items-center justify-center mb-5">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                Acabamento &amp; Detalhismo
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fita de borda PUR termofusível sem emendas aparentes, cantos milimetricamente
                alinhados, portas reguladas com perfeição e cortes sem rebarbas.
              </p>
            </div>

            {/* 5. Ferragens de Alta Linha */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                Ferragens com Amortecimento
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Corrediças telescópicas e dobradiças com pistão pneumático soft-close. Suas gavetas e
                portas fecham com suavidade silenciosa, sem bater nem desregular.
              </p>
            </div>

            {/* 6. Matéria-prima Nobre */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1320] font-heading mb-2">
                100% MDF &amp; Compensado Naval
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utilizamos chapas de primeira linha com tratamento anticupim, resistência à
                umidade em áreas molhadas e lâminas nobres para máxima durabilidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 6. HISTÓRIA & TRADIÇÃO: DESDE 1977 */}
      {/* ==================================================== */}
      <section id="historia" className="py-20 bg-[#0B1320] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00B4D8]/30">
                <Clock className="w-3.5 h-3.5" />
                <span>Nossa Origem &amp; Compromisso</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
                Quase Meio Século de Dedicação à Marcenaria em Belo Horizonte
              </h2>
              <div className="mt-6 space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  Fundada em <strong className="text-white">1977</strong>, a{" "}
                  <strong className="text-[#00B4D8]">Marcenaria Tubarão</strong> nasceu com uma
                  missão clara: honrar a verdadeira arte da marcenaria em Minas Gerais, aliando o
                  cuidado artesanal dos mestres da madeira à evolução do design de interiores.
                </p>
                <p>
                  Sediada na tradicional{" "}
                  <strong className="text-white">Rua Santa Judite, 70, no Bairro Aparecida</strong>,
                  nossa oficina já transformou milhares de lares e empresas em Belo Horizonte,
                  passando de geração em geração o valor da palavra cumprida, do corte perfeito e da
                  pontualidade na entrega.
                </p>
                <p>
                  Hoje, sob a liderança dedicada do <strong className="text-white">Carlos</strong>,
                  unimos maquinário de alta precisão e software de modelagem 3D à mesma paixão dos
                  primeiros dias, entregando móveis planejados que valorizam o seu patrimônio por
                  décadas.
                </p>
              </div>

              {/* Timeline Metrics */}
              <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#00B4D8] font-heading">
                    1977
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Ano de Fundação</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#FACC15] font-heading">
                    5,0★
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Google Reviews</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                    100%
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">Pontualidade</p>
                </div>
              </div>

              <div className="mt-8">
                <GlowingButton
                  href={getWhatsAppUrl("Olá Carlos! Gostaria de conversar sobre um projeto com a Marcenaria Tubarão.")}
                  target="_blank"
                  variant="primary"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Conhecer Mais e Falar com o Carlos</span>
                </GlowingButton>
              </div>
            </div>

            {/* Story Visual Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-700 shadow-lg">
                  <Image
                    src="/images/detalhes/marcenaria-artesanal-precisao.jpg"
                    alt="Oficina de Marcenaria Artesanal"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-slate-700 shadow-lg">
                  <Image
                    src="/images/detalhes/ferragens-e-acabamento.jpg"
                    alt="Ferragens de amortecimento"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative rounded-2xl overflow-hidden aspect-square border border-slate-700 shadow-lg">
                  <Image
                    src="/images/detalhes/materiais-nobres-mdf.jpg"
                    alt="Lâminas nobres de madeira"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-slate-700 shadow-lg">
                  <Image
                    src="/images/detalhes/projeto-3d-arquitetura.jpg"
                    alt="Projeto 3D arquitetônico"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 7. SIMULADOR INTERATIVO DE BRIEFING / ORÇAMENTO */}
      {/* ==================================================== */}
      <section id="simulador" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-200">
              <Calculator className="w-3.5 h-3.5" />
              <span>Simulador Rápido de Briefing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
              Planeje Seu Projeto em Menos de 1 Minuto
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Selecione os ambientes desejados e envie os dados direto para o WhatsApp do Carlos.
              Ele responderá pessoalmente com as melhores orientações e estimativas!
            </p>
          </div>

          <form
            onSubmit={handleSimuladorSubmit}
            className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg"
          >
            {/* Step 1: Ambientes */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#0B1320] mb-3">
                1. Quais ambientes você deseja mobiliar? (Selecione quantos desejar)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Cozinha Gourmet",
                  "Closet & Suíte",
                  "Sala & Home Theater",
                  "Banheiro / Lavabo",
                  "Apartamento Completo",
                  "Comercial / Escritório",
                ].map((amb) => {
                  const isChecked = simAmbientes.includes(amb);
                  return (
                    <button
                      type="button"
                      key={amb}
                      onClick={() => toggleAmbiente(amb)}
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? "bg-[#0B1320] text-white border-[#0B1320] shadow-sm"
                          : "bg-white text-slate-700 border-slate-200 hover:border-[#00B4D8]"
                      }`}
                    >
                      <span>{amb}</span>
                      {isChecked ? (
                        <Check className="w-4 h-4 text-[#00B4D8]" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Estilo / Padrão */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-[#0B1320] mb-3">
                2. Qual padrão de acabamento você tem em mente?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    title: "Moderno com Iluminação LED",
                    desc: "Linhas retas, puxador cava e perfis de LED",
                  },
                  {
                    title: "Amadeirado com Ripado",
                    desc: "Aconchego da madeira nobre e painéis ripados",
                  },
                  {
                    title: "Clássico com Vidro Reflecta",
                    desc: "Portas espelhadas bronze e cristaleiras",
                  },
                ].map((estilo) => (
                  <button
                    type="button"
                    key={estilo.title}
                    onClick={() => setSimEstilo(estilo.title)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      simEstilo === estilo.title
                        ? "bg-[#00B4D8]/10 border-[#00B4D8] text-[#0B1320] ring-2 ring-[#00B4D8]/20"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <p className="font-bold text-xs sm:text-sm">{estilo.title}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{estilo.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Prazo e Nome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-bold text-[#0B1320] mb-2">
                  3. Previsão para início ou entrega:
                </label>
                <select
                  value={simPrazo}
                  onChange={(e) => setSimPrazo(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#00B4D8]"
                >
                  <option value="Imediato (o quanto antes)">Imediato (o quanto antes)</option>
                  <option value="Próximos 30 a 60 dias">Próximos 30 a 60 dias</option>
                  <option value="Obra em andamento (3 a 6 meses)">Obra em andamento (3 a 6 meses)</option>
                  <option value="Pesquisando orçamentos">Apenas pesquisando orçamentos</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B1320] mb-2">
                  Seu Nome ou Como Prefere ser Chamado:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Dra. Camila ou Roberto"
                  value={simNome}
                  onChange={(e) => setSimNome(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 focus:outline-none focus:border-[#00B4D8]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#22C55E] hover:to-[#16A34A] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <Send className="w-5 h-5" />
              <span>Gerar Meu Briefing &amp; Enviar no WhatsApp do Carlos</span>
            </button>
            <p className="text-center text-xs text-slate-500 mt-3">
              🔒 Sem compromisso. Você será redirecionado para o WhatsApp com os dados pré-preenchidos.
            </p>
          </form>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 8. PROVA SOCIAL: GOOGLE REVIEWS 5,0★ */}
      {/* ==================================================== */}
      <section id="depoimentos" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
                <Star className="w-3.5 h-3.5 fill-[#FACC15] text-[#FACC15]" />
                <span>Avaliações Reais de Clientes no Google</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
                Nota Máxima 5,0★ no Google Maps
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                A melhor garantia é a palavra de quem já confiou o seu lar e sua empresa à Marcenaria Tubarão.
              </p>
            </div>

            {/* Google Rating Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 shrink-0">
              <div className="text-center">
                <p className="text-4xl font-black text-[#0B1320] font-heading">5,0</p>
                <div className="flex items-center gap-0.5 text-[#FACC15] mt-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FACC15]" />
                  ))}
                </div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <p className="text-xs font-bold text-slate-800">Classificação Máxima</p>
                <p className="text-xs text-slate-500">100% de avaliações 5 estrelas</p>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#00B4D8] hover:underline flex items-center gap-1 mt-1"
                >
                  <span>Ver no Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Stars & Time */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5 text-[#FACC15]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FACC15]" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{t.timeAgo}</span>
                  </div>

                  {/* Highlight */}
                  <p className="text-sm font-bold text-[#0B1320] mb-2">
                    &ldquo;{t.highlightText}&rdquo;
                  </p>

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] font-bold text-sm flex items-center justify-center font-heading">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1320]">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.meta} · Google</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 9. COMO FUNCIONA O PROCESSO (4 ETAPAS) */}
      {/* ==================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Etapas Claras e Sem Surpresas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
              Do Rascunho à Instalação Perfeita
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Nosso método garante que o seu móvel saia exatamente como você sonhou, sem atrasos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: "01",
                title: "Atendimento & Visita Técnica",
                desc: "Conversamos sobre suas necessidades, tiramos as medidas milimétricas e entendemos cada detalhe funcional da sua rotina.",
              },
              {
                step: "02",
                title: "Projeto 3D & Aprovação",
                desc: "Apresentamos o projeto em 3D realista para você visualizar cores, ferragens, divisórias e iluminação antes de fabricar.",
              },
              {
                step: "03",
                title: "Fabricação na Oficina Própria",
                desc: "Produção com maquinário de ponta na Rua Santa Judite, 70 (Aparecida/BH), com cortes sem rebarbas e fitamento PUR.",
              },
              {
                step: "04",
                title: "Montagem Limpa & Pontual",
                desc: "Nossos montadores próprios realizam a instalação com proteção ao piso, limpeza final e ajuste milimétrico de cada porta.",
              },
            ].map((st, i) => (
              <div
                key={st.step}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative group hover:border-[#00B4D8] transition-colors"
              >
                <div className="text-3xl font-black text-[#00B4D8] font-heading mb-3">
                  {st.step}
                </div>
                <h3 className="font-bold text-lg text-[#0B1320] font-heading mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 10. FAQ / DÚVIDAS FREQUENTES */}
      {/* ==================================================== */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100/60 text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Perguntas Frequentes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1320] font-heading tracking-tight">
              Tire Suas Dúvidas Sobre Móveis Planejados
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#0B1320] hover:text-[#00B4D8] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180 text-[#00B4D8]" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 11. LOCALIZAÇÃO, SEDE & CONTATOS */}
      {/* ==================================================== */}
      <section id="localizacao" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B1320] rounded-3xl overflow-hidden text-white shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12">
            {/* Contact Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#38BDF8] text-xs font-bold uppercase tracking-wider mb-4 border border-[#00B4D8]/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sede &amp; Oficina em BH</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-white">
                  Venha Tomar um Café Conosco na Nossa Oficina
                </h2>
                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  Conheça nossa estrutura, toque nos padrões de MDF, teste as corrediças e veja
                  pessoalmente o acabamento milimétrico que faz da Marcenaria Tubarão uma
                  referência desde 1977.
                </p>

                <div className="mt-8 space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Endereço da Oficina:</strong>
                      <span>{ADDRESS_FULL}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Telefone &amp; WhatsApp:</strong>
                      <span>{WHATSAPP_DISPLAY} (WhatsApp direto com o Carlos)</span>
                      <span className="block text-slate-400 text-xs">Fixo: {PHONE_FIXED}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Horário de Funcionamento:</strong>
                      <span>Segunda a Sexta: 08:00 às 18:00</span>
                      <span className="block">Sábado: 08:00 às 13:00</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#00B4D8] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">E-mails de Contato:</strong>
                      <span>{EMAIL_CONTACT}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <GlowingButton
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  variant="outlineCyan"
                  size="md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Abrir no Google Maps</span>
                </GlowingButton>

                <GlowingButton
                  href={getWhatsAppUrl("Olá Carlos! Gostaria de agendar uma visita na oficina da Marcenaria Tubarão.")}
                  target="_blank"
                  variant="whatsapp"
                  size="md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Agendar Visita no WhatsApp</span>
                </GlowingButton>
              </div>
            </div>

            {/* Interactive Map Embed / Preview */}
            <div className="lg:col-span-6 bg-slate-800 relative min-h-[350px] lg:min-h-full">
              <iframe
                title="Mapa Marcenaria Tubarão"
                src="https://maps.google.com/maps?q=Rua+Santa+Judite+70+Aparecida+Belo+Horizonte+MG&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[350px] grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 12. FOOTER */}
      {/* ==================================================== */}
      <footer className="bg-[#0B1320] text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1: Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#00B4D8] bg-white p-0.5">
                  <Image
                    src={LOGO_SRC}
                    alt="Logo Marcenaria Tubarão"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-extrabold text-white text-base tracking-tight font-heading">
                    MARCENARIA TUBARÃO
                  </p>
                  <p className="text-[11px] text-[#00B4D8] font-bold">DESDE 1977</p>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Móveis sob medida para ambientes residenciais e comerciais em Belo Horizonte.
                Acabamento artesanal com rigor e pontualidade há mais de 47 anos.
              </p>
              <div className="mt-4 flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>5,0 Estrelas no Google Reviews</span>
              </div>
            </div>

            {/* Col 2: Ambientes */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                Ambientes Planejados
              </p>
              <ul className="space-y-2 text-xs">
                <li><a href="#ambientes" className="hover:text-white transition-colors">Cozinhas Planejadas &amp; Ilhas</a></li>
                <li><a href="#ambientes" className="hover:text-white transition-colors">Closets &amp; Suítes Master</a></li>
                <li><a href="#ambientes" className="hover:text-white transition-colors">Salas &amp; Painéis Ripados</a></li>
                <li><a href="#ambientes" className="hover:text-white transition-colors">Banheiros &amp; Lavabos Nobres</a></li>
                <li><a href="#ambientes" className="hover:text-white transition-colors">Corporativo &amp; Consultórios</a></li>
                <li><a href="#ambientes" className="hover:text-white transition-colors">Madeira Maciça &amp; Portas Pivotantes</a></li>
              </ul>
            </div>

            {/* Col 3: Navegação & Tradição */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                Institucional
              </p>
              <ul className="space-y-2 text-xs">
                <li><a href="#historia" className="hover:text-white transition-colors">História Desde 1977</a></li>
                <li><a href="#diferenciais" className="hover:text-white transition-colors">Diferenciais Construtivos</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Avaliações de Clientes (5,0★)</a></li>
                <li><a href="#simulador" className="hover:text-white transition-colors">Simulador de Projeto 3D</a></li>
                <li><a href="#localizacao" className="hover:text-white transition-colors">Oficina em Belo Horizonte</a></li>
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5 text-[#38BDF8]"
                  >
                    <span>Instagram Oficial: {INSTAGRAM_HANDLE}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Contato Rápido */}
            <div>
              <p className="font-bold text-white text-sm mb-4 uppercase tracking-wider">
                Fale Conosco
              </p>
              <p className="text-xs text-slate-400 mb-2">
                Fale diretamente com o Carlos para tirar dúvidas ou orçar seu projeto:
              </p>
              <p className="text-white font-bold text-sm mb-1">{WHATSAPP_DISPLAY}</p>
              <p className="text-xs text-slate-400 mb-3">{ADDRESS_STREET} - {ADDRESS_NEIGHBORHOOD}, BH/MG</p>
              <GlowingButton
                href={getWhatsAppUrl()}
                target="_blank"
                variant="whatsapp"
                size="sm"
                className="w-full justify-center text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Conversar no WhatsApp</span>
              </GlowingButton>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>
              © 1977 - 2026 {COMPANY_FULL_NAME}. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1">
              <span>Belo Horizonte - Minas Gerais · Tradição que atravessa gerações.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ==================================================== */}
      {/* 13. FLOATING WHATSAPP BUTTON (CONVERSION ACCELERATOR) */}
      {/* ==================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Helper tooltip card */}
        <a
          href={getWhatsAppUrl("Olá Carlos! Gostaria de tirar uma dúvida sobre um projeto.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2.5 bg-white text-[#0B1320] px-4 py-2.5 rounded-full shadow-2xl border border-slate-200/90 hover:scale-105 transition-all text-xs font-bold"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
          <span>Fale com o Carlos no WhatsApp</span>
        </a>

        {/* WhatsApp Icon Button */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#16A34A] to-[#22C55E] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white focus:outline-none"
          aria-label="Abrir WhatsApp da Marcenaria Tubarão"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
        </a>
      </div>

      {/* ==================================================== */}
      {/* 14. PROJECT DETAILS MODAL */}
      {/* ==================================================== */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col"
            >
              <div className="relative aspect-video bg-slate-100">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fechar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                <span className="text-xs font-bold text-[#00B4D8] uppercase tracking-wider">
                  {selectedProject.categoryLabel} · {selectedProject.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1320] font-heading mt-1">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="mt-5">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Especificações Técnicas do Projeto:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span>{mat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500">
                    Projetado e fabricado com precisão milimétrica.
                  </div>
                  <GlowingButton
                    href={getWhatsAppUrl(`Olá Carlos! Gostaria de fazer um projeto similar a "${selectedProject.title}". Como podemos começar?`)}
                    target="_blank"
                    variant="whatsapp"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Quero um Projeto Como Este</span>
                  </GlowingButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
