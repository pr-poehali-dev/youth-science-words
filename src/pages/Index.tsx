import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "Все", emoji: "🌌", color: "#a855f7" },
  { id: "physics", label: "Физика", emoji: "⚛️", color: "#22d3ee" },
  { id: "chemistry", label: "Химия", emoji: "🧪", color: "#4ade80" },
  { id: "biology", label: "Биология", emoji: "🧬", color: "#f472b6" },
  { id: "math", label: "Математика", emoji: "📐", color: "#facc15" },
  { id: "astronomy", label: "Астрономия", emoji: "🔭", color: "#fb923c" },
  { id: "it", label: "IT / Кибер", emoji: "💻", color: "#a78bfa" },
  { id: "ecology", label: "Экология", emoji: "🌱", color: "#6ee7b7" },
];

const LEVELS = ["Начинающий", "Средний", "Продвинутый", "Эксперт"];
const LEVEL_COLORS = ["text-green-400", "text-yellow-400", "text-pink-400", "text-orange-400"];
const LEVEL_BG = [
  "bg-green-400/10 border-green-400/30",
  "bg-yellow-400/10 border-yellow-400/30",
  "bg-pink-400/10 border-pink-400/30",
  "bg-orange-400/10 border-orange-400/30",
];

interface Term {
  id: number;
  word: string;
  transcription: string;
  partOfSpeech: string;
  category: string;
  subcategory: string;
  section: string;
  tags: string[];
  level: number;
  definition: string;
  description: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  translation: string;
  xp: number;
  isFavorite?: boolean;
}

const TERMS: Term[] = [
  {
    id: 1,
    word: "Квантовая суперпозиция",
    transcription: "[кван-то-ва-я су-пер-по-зи-ци-я]",
    partOfSpeech: "существительное",
    category: "physics",
    subcategory: "Квантовая физика",
    section: "Кинематика квантовых объектов",
    tags: ["квантовый мир", "волна", "частица", "пространство"],
    level: 2,
    definition: "Состояние квантового объекта, при котором он одновременно находится в нескольких состояниях до момента измерения.",
    description: "Представь, что монетка в воздухе — и орёл, и решка одновременно. Только когда ловишь её — она «выбирает». Именно так ведут себя электроны и фотоны в квантовом мире.",
    examples: [
      "Кот Шрёдингера находится в суперпозиции живого и мёртвого состояния.",
      "Электрон существует в суперпозиции нескольких энергетических уровней.",
    ],
    synonyms: ["квантовое наложение"],
    antonyms: ["коллапс волновой функции", "декогеренция"],
    collocations: ["принцип суперпозиции", "суперпозиция состояний", "суперпозиция волн"],
    translation: "Quantum superposition (EN)",
    xp: 150,
  },
  {
    id: 2,
    word: "Пространство-время",
    transcription: "[прос-транст-во-вре-мя]",
    partOfSpeech: "существительное",
    category: "physics",
    subcategory: "Квантовая физика",
    section: "Теория Эйнштейна",
    tags: ["пространство", "время", "теория относительности", "континуум"],
    level: 3,
    definition: "Четырёхмерная модель, объединяющая три пространственных координаты и время в единый физический объект.",
    description: "Эйнштейн показал: время — не просто тикающие часы, а часть пространства. Вместе они образуют ткань Вселенной, которую могут изгибать массивные объекты вроде чёрных дыр.",
    examples: [
      "Чёрная дыра искривляет пространство-время вокруг себя.",
      "Время на МКС течёт немного медленнее из-за кривизны пространства-времени.",
    ],
    synonyms: ["пространственно-временной континуум", "4D-многообразие"],
    antonyms: [],
    collocations: ["искривление пространства-времени", "ткань пространства-времени", "континуум Минковского"],
    translation: "Spacetime (EN)",
    xp: 200,
  },
  {
    id: 3,
    word: "Фотосинтез",
    transcription: "[фо-то-синт-тез]",
    partOfSpeech: "существительное",
    category: "biology",
    subcategory: "Клеточная биология",
    section: "Энергетика клетки",
    tags: ["клетка", "свет", "энергия", "хлорофилл", "растения"],
    level: 0,
    definition: "Процесс преобразования световой энергии в химическую энергию в клетках растений и некоторых бактерий.",
    description: "Растения — живые солнечные батарейки. Они ловят фотоны света хлорофиллом и превращают воду и CO₂ в сахар, выделяя кислород, которым мы дышим.",
    examples: [
      "Благодаря фотосинтезу джунгли производят кислород для целых континентов.",
      "Водоросли в океане обеспечивают 50% фотосинтеза на Земле.",
    ],
    synonyms: ["ассимиляция углерода"],
    antonyms: ["клеточное дыхание"],
    collocations: ["световая фаза фотосинтеза", "тёмная фаза", "хлорофилл"],
    translation: "Photosynthesis (EN)",
    xp: 80,
  },
  {
    id: 4,
    word: "Алгоритм",
    transcription: "[ал-го-ритм]",
    partOfSpeech: "существительное",
    category: "it",
    subcategory: "Информатика",
    section: "Основы программирования",
    tags: ["программирование", "вычисление", "последовательность", "задача"],
    level: 0,
    definition: "Точная конечная последовательность инструкций для решения определённой задачи.",
    description: "Рецепт — это алгоритм для готовки. Маршрут навигатора — алгоритм для езды. Любая программа — набор алгоритмов, который компьютер выполняет шаг за шагом.",
    examples: [
      "Алгоритм сортировки расставляет числа от меньшего к большему.",
      "ИИ-алгоритм Netflix подбирает фильмы под твои вкусы.",
    ],
    synonyms: ["процедура", "метод", "инструкция"],
    antonyms: ["случайный процесс", "эвристика"],
    collocations: ["алгоритм сортировки", "алгоритм поиска", "машинное обучение"],
    translation: "Algorithm (EN)",
    xp: 60,
  },
  {
    id: 5,
    word: "Тёмная материя",
    transcription: "[тём-на-я ма-те-ри-я]",
    partOfSpeech: "существительное",
    category: "astronomy",
    subcategory: "Космология",
    section: "Структура Вселенной",
    tags: ["вселенная", "гравитация", "невидимое", "масса", "космос"],
    level: 3,
    definition: "Гипотетическая форма материи, не взаимодействующая с электромагнитным излучением, но проявляющаяся через гравитационные эффекты.",
    description: "Учёные заметили: галактики вращаются слишком быстро для своей видимой массы. Значит, где-то есть невидимое вещество — тёмная материя. Её примерно 27% Вселенной, но никто её пока не «потрогал».",
    examples: [
      "Тёмная материя удерживает галактики от разлёта.",
      "Детекторы XENON пытаются уловить частицы тёмной материи.",
    ],
    synonyms: ["скрытая масса"],
    antonyms: ["барионная материя", "тёмная энергия"],
    collocations: ["ореол тёмной материи", "WIMP-частицы", "гравитационное линзирование"],
    translation: "Dark matter (EN)",
    xp: 250,
  },
  {
    id: 6,
    word: "Молярная масса",
    transcription: "[мо-ляр-на-я мас-са]",
    partOfSpeech: "существительное",
    category: "chemistry",
    subcategory: "Общая химия",
    section: "Стехиометрия",
    tags: ["вещество", "атом", "молекула", "масса", "моль"],
    level: 1,
    definition: "Масса одного моля вещества, выраженная в граммах на моль (г/моль).",
    description: "Один моль — это ровно 6×10²³ частиц (атомов или молекул). Молярная масса воды H₂O = 18 г/моль: значит 18 грамм воды содержат астрономическое количество молекул.",
    examples: [
      "Молярная масса NaCl (соли) = 58,5 г/моль.",
      "Зная молярную массу, химик рассчитывает, сколько вещества нужно для реакции.",
    ],
    synonyms: ["мол. вес"],
    antonyms: [],
    collocations: ["молярная масса вещества", "число Авогадро", "количество вещества"],
    translation: "Molar mass (EN)",
    xp: 90,
  },
  {
    id: 7,
    word: "Энтропия",
    transcription: "[эн-тро-пи-я]",
    partOfSpeech: "существительное",
    category: "physics",
    subcategory: "Термодинамика",
    section: "Начала термодинамики",
    tags: ["хаос", "порядок", "тепло", "термодинамика", "необратимость"],
    level: 2,
    definition: "Термодинамическая величина, характеризующая степень беспорядка или неопределённости в системе.",
    description: "Твоя комната сама по себе становится грязнее — но никогда не убирается сама. Вселенная всегда стремится к большему хаосу. Это и есть рост энтропии — второй закон термодинамики.",
    examples: [
      "Растворение сахара в воде сопровождается ростом энтропии.",
      "Жизнь — это локальное уменьшение энтропии за счёт потребления энергии.",
    ],
    synonyms: ["мера беспорядка", "мера неопределённости"],
    antonyms: ["негэнтропия", "порядок"],
    collocations: ["рост энтропии", "второй закон термодинамики", "энтропия Больцмана"],
    translation: "Entropy (EN)",
    xp: 170,
  },
  {
    id: 8,
    word: "ДНК",
    transcription: "[Де-эН-Ка]",
    partOfSpeech: "существительное (аббревиатура)",
    category: "biology",
    subcategory: "Генетика",
    section: "Молекулярная биология",
    tags: ["ген", "наследственность", "белок", "информация", "жизнь"],
    level: 1,
    definition: "Дезоксирибонуклеиновая кислота — молекула, хранящая генетическую информацию всех живых организмов.",
    description: "ДНК — это инструкция по сборке организма. В каждой клетке твоего тела есть 2 метра ДНК, свёрнутые в крошечное ядро. Там записан полный «код» тебя.",
    examples: [
      "Судебная экспертиза по ДНК устанавливает личность с точностью 99,9%.",
      "CRISPR позволяет редактировать ДНК как текст в Word.",
    ],
    synonyms: ["дезоксирибонуклеиновая кислота"],
    antonyms: [],
    collocations: ["двойная спираль ДНК", "репликация ДНК", "геном человека"],
    translation: "DNA (EN)",
    xp: 100,
  },
];

const ACHIEVEMENTS = [
  { id: 1, emoji: "🚀", title: "Первый старт", desc: "Открыл первый термин", unlocked: true },
  { id: 2, emoji: "🔥", title: "В потоке", desc: "5 терминов подряд", unlocked: true },
  { id: 3, emoji: "🧠", title: "Эрудит", desc: "25 изученных терминов", unlocked: false },
  { id: 4, emoji: "⭐", title: "Коллекционер", desc: "10 избранных", unlocked: false },
  { id: 5, emoji: "🏆", title: "Учёный", desc: "100 терминов изучено", unlocked: false },
  { id: 6, emoji: "🌌", title: "Космонавт", desc: "Все темы астрономии", unlocked: false },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

type Tab = "home" | "search" | "catalog" | "my" | "game" | "profile";

function XPBar({ xp, level }: { xp: number; level: number }) {
  const nextXP = level * 500;
  const progress = Math.min((xp / nextXP) * 100, 100);
  return (
    <div className="flex items-center gap-2">
      <div className="bg-purple-500/20 border border-purple-500/30 rounded-full px-2.5 py-0.5">
        <span className="text-purple-300 text-xs font-bold">Ур.{level}</span>
      </div>
      <div className="flex-1 min-w-[60px]">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="xp-bar h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-[9px] text-white/30 mt-0.5">{xp} XP</div>
      </div>
    </div>
  );
}

function NavBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const items: { id: Tab; icon: string; label: string }[] = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "catalog", icon: "BookOpen", label: "Каталог" },
    { id: "my", icon: "Star", label: "Мои" },
    { id: "game", icon: "Zap", label: "Игра" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 card-glass border-t border-white/10">
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${
              active === item.id ? "text-purple-400" : "text-white/40 hover:text-white/70"
            }`}
          >
            <Icon name={item.icon} size={20} />
            <span className="text-[9px] font-medium font-golos">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function TermCard({ term, onClick, compact = false }: { term: Term; onClick: () => void; compact?: boolean }) {
  const cat = CATEGORIES.find((c) => c.id === term.category);
  return (
    <div
      onClick={onClick}
      className={`card-glass card-hover rounded-2xl cursor-pointer border-l-4 ${
        term.level === 0 ? "level-beginner" :
        term.level === 1 ? "level-medium" :
        term.level === 2 ? "level-hard" : "level-expert"
      } ${compact ? "p-3" : "p-4"}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-base">{cat?.emoji}</span>
            <h3 className={`font-montserrat font-bold text-white ${compact ? "text-sm" : "text-base"}`}>
              {term.word}
            </h3>
          </div>
          {!compact && (
            <p className="text-white/40 text-xs mt-0.5 font-golos">{term.transcription}</p>
          )}
          <p className={`text-white/65 mt-1.5 font-golos leading-snug ${compact ? "text-xs line-clamp-1" : "text-sm line-clamp-2"}`}>
            {term.definition}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LEVEL_BG[term.level]} ${LEVEL_COLORS[term.level]}`}>
            {LEVELS[term.level]}
          </span>
          <span className="text-[10px] text-yellow-400 font-bold">+{term.xp} XP</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {term.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[10px] bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function TermModal({ term, onClose, onToggleFavorite }: { term: Term; onClose: () => void; onToggleFavorite: (id: number) => void }) {
  const cat = CATEGORIES.find((c) => c.id === term.category);
  const catLabel = cat?.label ?? term.category;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0d0d1c] border border-white/10 rounded-3xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative p-6 pb-4"
          style={{ background: `linear-gradient(135deg, ${cat?.color}18, transparent)` }}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xl">{cat?.emoji}</span>
            <span className="text-xs text-white/40 font-golos">
              {catLabel} → {term.subcategory} → {term.section}
            </span>
          </div>
          <h2 className="text-2xl font-montserrat font-black text-white mt-2">{term.word}</h2>
          <p className="text-white/40 text-sm font-golos">
            {term.transcription} · <em>{term.partOfSpeech}</em>
          </p>
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${LEVEL_BG[term.level]} ${LEVEL_COLORS[term.level]}`}>
              {LEVELS[term.level]}
            </span>
            <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full">
              +{term.xp} XP
            </span>
            <button
              onClick={() => onToggleFavorite(term.id)}
              className={`ml-auto p-2 rounded-xl transition-all ${term.isFavorite ? "text-yellow-400 bg-yellow-400/10" : "text-white/30 hover:text-yellow-400"}`}
            >
              <Icon name="Star" size={18} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Definition */}
          <div>
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-1.5">Определение</h4>
            <p className="text-white font-golos text-sm leading-relaxed">{term.definition}</p>
          </div>

          {/* Friendly description */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">💡</span>
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Простыми словами</h4>
            </div>
            <p className="text-white/80 font-golos text-sm leading-relaxed">{term.description}</p>
          </div>

          {/* Translation */}
          <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
            <Icon name="Globe" size={16} className="text-blue-400 shrink-0" />
            <div>
              <span className="text-xs text-white/40">Перевод: </span>
              <span className="text-blue-300 font-golos text-sm font-medium">{term.translation}</span>
            </div>
          </div>

          {/* Examples */}
          <div>
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-2">Примеры</h4>
            <div className="space-y-2">
              {term.examples.map((ex, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                  <p className="text-white/65 font-golos text-sm italic">«{ex}»</p>
                </div>
              ))}
            </div>
          </div>

          {/* Synonyms / Antonyms */}
          <div className="grid grid-cols-2 gap-3">
            {term.synonyms.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-green-400/70 uppercase tracking-wider mb-1.5">Синонимы</h4>
                <div className="flex flex-wrap gap-1">
                  {term.synonyms.map((s) => (
                    <span key={s} className="text-xs bg-green-400/10 border border-green-400/20 text-green-300 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {term.antonyms.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-pink-400/70 uppercase tracking-wider mb-1.5">Антонимы</h4>
                <div className="flex flex-wrap gap-1">
                  {term.antonyms.map((a) => (
                    <span key={a} className="text-xs bg-pink-400/10 border border-pink-400/20 text-pink-300 px-2 py-0.5 rounded-full">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Collocations */}
          {term.collocations.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-1.5">Устойчивые выражения</h4>
              <div className="flex flex-wrap gap-1.5">
                {term.collocations.map((c) => (
                  <span key={c} className="text-xs badge-gradient text-white/80 px-2.5 py-1 rounded-full font-golos">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h4 className="text-xs font-bold text-white/35 uppercase tracking-wider mb-1.5">Теги / темы</h4>
            <div className="flex flex-wrap gap-1">
              {term.tags.map((tag) => (
                <span key={tag} className="text-xs bg-white/5 text-white/45 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function HomePage({ onOpen, terms }: { onOpen: (t: Term) => void; terms: Term[] }) {
  const featured = terms[4];
  const recent = terms.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div
        className="relative rounded-3xl overflow-hidden p-6"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.18) 0%, rgba(34,211,238,0.08) 100%)",
          border: "1px solid rgba(168,85,247,0.3)",
        }}
      >
        <div className="animate-spin-slow absolute -top-12 -right-12 w-48 h-48 rounded-full border border-purple-500/10" />
        <div
          className="animate-spin-slow absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-cyan-500/10"
          style={{ animationDirection: "reverse" }}
        />
        <div className="relative z-10">
          <div className="text-3xl mb-2 animate-float">🔬</div>
          <h1 className="font-montserrat font-black text-2xl text-white leading-tight">ТермоСфера</h1>
          <p className="text-white/55 text-sm font-golos mt-1">Научный словарь для тех, кто хочет понимать мир</p>
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1">
              <span className="text-yellow-400 text-xs">⚡</span>
              <span className="text-white/65 text-xs font-golos">350 XP набрано</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1">
              <span className="text-green-400 text-xs">📚</span>
              <span className="text-white/65 text-xs font-golos">5 терминов изучено</span>
            </div>
          </div>
        </div>
      </div>

      {/* Term of the day */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⭐</span>
          <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Термин дня</h2>
        </div>
        <TermCard term={featured} onClick={() => onOpen(featured)} />
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🗂</span>
          <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Разделы науки</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.slice(1).map((cat) => (
            <div key={cat.id} className="card-glass rounded-2xl p-3 flex flex-col items-center gap-1.5 cursor-pointer card-hover">
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[10px] text-white/55 font-golos text-center leading-tight">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🕐</span>
          <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Недавние термины</h2>
        </div>
        <div className="space-y-2">
          {recent.map((t) => (
            <TermCard key={t.id} term={t} onClick={() => onOpen(t)} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPage({ onOpen, terms }: { onOpen: (t: Term) => void; terms: Term[] }) {
  const [query, setQuery] = useState("");
  const [aiMode, setAiMode] = useState(false);
  const [aiResult, setAiResult] = useState<Term[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const filtered = query.trim()
    ? terms.filter(
        (t) =>
          t.word.toLowerCase().includes(query.toLowerCase()) ||
          t.definition.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          t.subcategory.toLowerCase().includes(query.toLowerCase()) ||
          t.section.toLowerCase().includes(query.toLowerCase())
      )
    : terms;

  const handleAiSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      const q = query.toLowerCase();
      const res = terms.filter(
        (t) =>
          t.tags.some((tag) => q.includes(tag)) ||
          t.word.toLowerCase().split(" ").some((w) => q.includes(w)) ||
          q.includes(t.subcategory.toLowerCase()) ||
          q.includes(t.section.toLowerCase()) ||
          q.includes(t.category)
      );
      setAiResult(res.length ? res : terms.slice(0, 2));
      setLoading(false);
      setSearched(true);
    }, 1400);
  };

  return (
    <div className="space-y-4">
      <h1 className="font-montserrat font-black text-xl text-white">Поиск</h1>

      {/* Mode toggle */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-2xl">
        <button
          onClick={() => setAiMode(false)}
          className={`flex-1 py-2 rounded-xl text-sm font-golos font-medium transition-all ${!aiMode ? "bg-purple-500 text-white shadow-lg" : "text-white/50 hover:text-white/70"}`}
        >
          🔍 По слову
        </button>
        <button
          onClick={() => setAiMode(true)}
          className={`flex-1 py-2 rounded-xl text-sm font-golos font-medium transition-all ${aiMode ? "bg-purple-500 text-white shadow-lg" : "text-white/50 hover:text-white/70"}`}
        >
          🤖 AI-помощник
        </button>
      </div>

      {/* Input */}
      <div className={`flex gap-2 items-center bg-white/5 border rounded-2xl px-4 py-3 search-glow transition-all ${aiMode ? "border-purple-500/40" : "border-white/10"}`}>
        <Icon name="Search" size={18} className="text-white/35 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && aiMode && handleAiSearch()}
          placeholder={
            aiMode
              ? "Опиши: «Физика, квантовая, пространство-время»"
              : "Введи термин, тему или тег..."
          }
          className="flex-1 bg-transparent text-white placeholder-white/25 font-golos text-sm outline-none"
        />
        {aiMode && (
          <button
            onClick={handleAiSearch}
            className="bg-purple-500 hover:bg-purple-400 text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-colors shrink-0"
          >
            Найти
          </button>
        )}
      </div>

      {/* AI hint */}
      {aiMode && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-3">
          <p className="text-white/55 text-xs font-golos leading-relaxed">
            💡 Опиши что ищешь: раздел науки, отрасль, тему. Например:{" "}
            <em>«Физика, квантовая физика, кинематика, пространство-время»</em>
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8 gap-3">
          <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-white/55 font-golos text-sm">AI ищет подходящие термины...</span>
        </div>
      )}

      {/* Results */}
      {!loading && (
        <div className="space-y-2">
          {(aiMode ? (searched ? aiResult : []) : filtered).map((t) => (
            <TermCard key={t.id} term={t} onClick={() => onOpen(t)} compact />
          ))}
          {!aiMode && query && filtered.length === 0 && (
            <div className="text-center py-8 text-white/40 font-golos">Ничего не найдено. Попробуй AI-помощника 🤖</div>
          )}
          {aiMode && searched && aiResult.length === 0 && (
            <div className="text-center py-8 text-white/40 font-golos">Не нашлось. Переформулируй запрос 🤔</div>
          )}
          {aiMode && !searched && !loading && (
            <div className="text-center py-8 text-white/30 font-golos">Введи описание и нажми «Найти»</div>
          )}
        </div>
      )}
    </div>
  );
}

function CatalogPage({ onOpen, terms }: { onOpen: (t: Term) => void; terms: Term[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLevel, setActiveLevel] = useState<number | null>(null);

  const filtered = terms.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchLevel = activeLevel === null || t.level === activeLevel;
    return matchCat && matchLevel;
  });

  return (
    <div className="space-y-4">
      <h1 className="font-montserrat font-black text-xl text-white">Каталог терминов</h1>

      {/* Category scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-golos font-medium whitespace-nowrap transition-all shrink-0 ${
              activeCategory === cat.id ? "pill-active" : "bg-white/5 text-white/55 hover:bg-white/10"
            }`}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Level filter */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => setActiveLevel(null)}
          className={`px-3 py-1 rounded-full text-xs font-golos transition-all ${activeLevel === null ? "bg-white/20 text-white" : "bg-white/5 text-white/40"}`}
        >
          Все уровни
        </button>
        {LEVELS.map((l, i) => (
          <button
            key={i}
            onClick={() => setActiveLevel(activeLevel === i ? null : i)}
            className={`px-3 py-1 rounded-full text-xs font-golos transition-all border ${activeLevel === i ? `${LEVEL_BG[i]} ${LEVEL_COLORS[i]}` : "border-white/10 text-white/40"}`}
          >
            {l}
          </button>
        ))}
      </div>

      <p className="text-white/35 text-xs font-golos">Найдено: {filtered.length} терминов</p>

      <div className="space-y-2">
        {filtered.map((t, i) => (
          <div key={t.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}>
            <TermCard term={t} onClick={() => onOpen(t)} />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-white/35 font-golos">В этом разделе пока нет терминов</div>
        )}
      </div>
    </div>
  );
}

function MyPage({ onOpen, terms }: { onOpen: (t: Term) => void; terms: Term[] }) {
  const favorites = terms.filter((t) => t.isFavorite);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ word: "", definition: "", tags: "" });
  const [added, setAdded] = useState(false);

  const handleSave = () => {
    if (!form.word.trim()) return;
    setAdded(true);
    setAddOpen(false);
    setForm({ word: "", definition: "", tags: "" });
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-montserrat font-black text-xl text-white">Мои термины</h1>
        <button
          onClick={() => setAddOpen(!addOpen)}
          className="flex items-center gap-1.5 bg-purple-500 hover:bg-purple-400 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors"
        >
          <Icon name="Plus" size={14} />
          Добавить
        </button>
      </div>

      {addOpen && (
        <div className="card-glass border border-purple-500/30 rounded-2xl p-4 space-y-3 animate-scale-in">
          <h3 className="font-montserrat font-bold text-white text-sm">Новый термин</h3>
          <input
            value={form.word}
            onChange={(e) => setForm({ ...form, word: e.target.value })}
            placeholder="Название термина"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-golos outline-none focus:border-purple-500/50 placeholder-white/25"
          />
          <textarea
            value={form.definition}
            onChange={(e) => setForm({ ...form, definition: e.target.value })}
            placeholder="Определение / описание"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-golos outline-none focus:border-purple-500/50 resize-none placeholder-white/25"
          />
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="Теги через запятую"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-golos outline-none focus:border-purple-500/50 placeholder-white/25"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-xl text-sm font-bold transition-colors">
              Сохранить
            </button>
            <button onClick={() => setAddOpen(false)} className="px-4 bg-white/5 text-white/60 py-2 rounded-xl text-sm font-golos transition-colors hover:bg-white/10">
              Отмена
            </button>
          </div>
        </div>
      )}

      {added && (
        <div className="bg-green-400/10 border border-green-400/30 rounded-2xl p-3 flex items-center gap-2 animate-scale-in">
          <Icon name="CheckCircle" size={16} className="text-green-400 shrink-0" />
          <span className="text-green-300 text-sm font-golos">Термин добавлен в личный словарь!</span>
        </div>
      )}

      {/* Favorites */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">⭐</span>
          <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Избранные</h2>
          <span className="text-white/30 text-xs">({favorites.length})</span>
        </div>
        {favorites.length === 0 ? (
          <div className="card-glass rounded-2xl p-6 text-center">
            <div className="text-3xl mb-2">🌟</div>
            <p className="text-white/45 font-golos text-sm">Открывай термины и добавляй в избранное через ⭐</p>
          </div>
        ) : (
          <div className="space-y-2">
            {favorites.map((t) => (
              <TermCard key={t.id} term={t} onClick={() => onOpen(t)} compact />
            ))}
          </div>
        )}
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base">🏆</span>
          <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Достижения</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              className={`card-glass rounded-2xl p-3 text-center transition-all ${a.unlocked ? "border border-yellow-400/30 bg-yellow-400/5" : "opacity-40"}`}
            >
              <div className="text-2xl mb-1">{a.emoji}</div>
              <p className="text-white text-[10px] font-bold font-montserrat leading-tight">{a.title}</p>
              <p className="text-white/40 text-[9px] font-golos mt-0.5">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GamePage({ terms, onXP }: { terms: Term[]; onXP: (n: number) => void }) {
  const [mode, setMode] = useState<"menu" | "quiz" | "result">("menu");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [quizTerms, setQuizTerms] = useState<Term[]>([]);
  const [options, setOptions] = useState<string[]>([]);

  function generateOptions(term: Term, allTerms: Term[]) {
    const wrong = allTerms
      .filter((t) => t.id !== term.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((t) => t.word);
    return [...wrong, term.word].sort(() => Math.random() - 0.5);
  }

  const startQuiz = () => {
    const shuffled = [...terms].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuizTerms(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setOptions(generateOptions(shuffled[0], terms));
    setMode("quiz");
  };

  const handleAnswer = (ans: string) => {
    if (selected) return;
    setSelected(ans);
    const correct = ans === quizTerms[current].word;
    const newScore = score + (correct ? 1 : 0);
    setTimeout(() => {
      if (current + 1 >= quizTerms.length) {
        onXP(newScore * 30);
        setScore(newScore);
        setMode("result");
      } else {
        const next = current + 1;
        if (correct) setScore((s) => s + 1);
        setCurrent(next);
        setOptions(generateOptions(quizTerms[next], terms));
        setSelected(null);
      }
    }, 900);
  };

  if (mode === "menu")
    return (
      <div className="space-y-5">
        <h1 className="font-montserrat font-black text-xl text-white">Игры и квизы</h1>
        <div className="space-y-3">
          <button onClick={startQuiz} className="w-full card-glass border border-purple-500/30 rounded-2xl p-5 text-left card-hover">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="font-montserrat font-bold text-white">Угадай термин</h3>
            <p className="text-white/50 text-sm font-golos mt-1">Читай определение — выбирай слово. 5 вопросов, +30 XP за верный.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full">Квиз</span>
              <span className="text-xs text-yellow-300 bg-yellow-500/20 px-2 py-0.5 rounded-full">+150 XP макс</span>
            </div>
          </button>
          <div className="card-glass border border-white/8 rounded-2xl p-5 opacity-50 cursor-not-allowed">
            <div className="text-3xl mb-2">🃏</div>
            <h3 className="font-montserrat font-bold text-white">Флэш-карточки</h3>
            <p className="text-white/50 text-sm font-golos mt-1">Интервальные повторения для глубокого запоминания.</p>
            <div className="mt-3"><span className="text-xs text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full">Скоро</span></div>
          </div>
          <div className="card-glass border border-white/8 rounded-2xl p-5 opacity-50 cursor-not-allowed">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-montserrat font-bold text-white">Скоростной раунд</h3>
            <p className="text-white/50 text-sm font-golos mt-1">60 секунд, максимум терминов.</p>
            <div className="mt-3"><span className="text-xs text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full">Скоро</span></div>
          </div>
        </div>
      </div>
    );

  if (mode === "result")
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="text-6xl animate-float">{score >= 4 ? "🏆" : score >= 2 ? "👍" : "💪"}</div>
        <div>
          <h2 className="font-montserrat font-black text-2xl text-white">Результат</h2>
          <p className="text-white/55 font-golos mt-1">
            {score} из {quizTerms.length} правильных
          </p>
        </div>
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-6 py-3">
          <span className="text-yellow-400 font-bold text-xl">+{score * 30} XP</span>
        </div>
        <div className="flex gap-3">
          <button onClick={startQuiz} className="bg-purple-500 hover:bg-purple-400 text-white px-6 py-3 rounded-2xl font-bold font-montserrat transition-colors">
            Ещё раз
          </button>
          <button onClick={() => setMode("menu")} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-golos transition-colors">
            В меню
          </button>
        </div>
      </div>
    );

  if (mode === "quiz" && quizTerms.length > 0) {
    const term = quizTerms[current];
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-montserrat font-black text-xl text-white">Угадай термин</h1>
          <span className="text-white/40 font-golos text-sm">
            {current + 1} / {quizTerms.length}
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <div className="xp-bar h-1.5 transition-all duration-500" style={{ width: `${(current / quizTerms.length) * 100}%` }} />
        </div>
        <div className="card-glass border border-purple-500/20 rounded-2xl p-5">
          <p className="text-white/45 text-xs font-golos mb-2 uppercase tracking-wider">Что это значит?</p>
          <p className="text-white font-golos text-base leading-relaxed">{term.definition}</p>
          <p className="text-white/35 text-xs mt-3 italic">«{term.description.slice(0, 90)}...»</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {options.map((opt) => {
            const correct = opt === term.word;
            const isSelected = selected === opt;
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`w-full p-4 rounded-2xl text-left font-golos text-sm font-medium transition-all border ${
                  !selected
                    ? "card-glass border-white/10 text-white hover:border-purple-500/40"
                    : isSelected && correct
                    ? "bg-green-400/20 border-green-400/50 text-green-300"
                    : isSelected && !correct
                    ? "bg-red-400/20 border-red-400/50 text-red-300"
                    : correct
                    ? "bg-green-400/10 border-green-400/30 text-green-300"
                    : "opacity-30 border-white/5 text-white/40"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

function ProfilePage({ xp, userLevel }: { xp: number; userLevel: number }) {
  const nextXP = userLevel * 500;
  const progress = Math.min((xp / nextXP) * 100, 100);
  return (
    <div className="space-y-5">
      <h1 className="font-montserrat font-black text-xl text-white">Профиль</h1>

      {/* Card */}
      <div
        className="card-glass rounded-3xl p-5"
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(34,211,238,0.05) 100%)",
          border: "1px solid rgba(168,85,247,0.25)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-3xl">
              🧑‍🔬
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-black text-[10px] font-black px-1.5 rounded-full">
              {userLevel}
            </div>
          </div>
          <div>
            <h2 className="font-montserrat font-bold text-white text-lg">Юный учёный</h2>
            <p className="text-white/50 text-sm font-golos">Исследователь · {xp} XP</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-white/40 font-golos">Прогресс уровня {userLevel}</span>
            <span className="text-xs text-purple-300 font-golos">
              {xp} / {nextXP} XP
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="xp-bar h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Терминов", value: "8", emoji: "📚" },
          { label: "Квизов", value: "3", emoji: "🧠" },
          { label: "Серия", value: "5д", emoji: "🔥" },
        ].map((s) => (
          <div key={s.label} className="card-glass rounded-2xl p-3 text-center">
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className="font-montserrat font-black text-white text-xl">{s.value}</div>
            <div className="text-white/40 text-[10px] font-golos">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">🏆 Достижения</h2>
        <div className="space-y-2">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              className={`card-glass rounded-2xl p-3 flex items-center gap-3 ${a.unlocked ? "border border-yellow-400/20" : "opacity-40"}`}
            >
              <span className="text-2xl">{a.emoji}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-bold font-montserrat">{a.title}</p>
                <p className="text-white/45 text-xs font-golos">{a.desc}</p>
              </div>
              {a.unlocked && (
                <span className="text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-0.5 rounded-full">Получено</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div>
        <h2 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider mb-3">⚙️ Настройки</h2>
        <div className="card-glass rounded-2xl divide-y divide-white/5">
          {["Уведомления", "Язык интерфейса", "Поделиться словарём", "О приложении"].map((item) => (
            <button key={item} className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors">
              <span className="text-white/65 font-golos text-sm">{item}</span>
              <Icon name="ChevronRight" size={16} className="text-white/30" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function Index() {
  const [tab, setTab] = useState<Tab>("home");
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [terms, setTerms] = useState<Term[]>(TERMS);
  const [xp, setXP] = useState(350);
  const userLevel = Math.floor(xp / 500) + 1;

  const toggleFavorite = (id: number) => {
    setTerms((prev) => prev.map((t) => (t.id === id ? { ...t, isFavorite: !t.isFavorite } : t)));
    setSelectedTerm((prev) => (prev && prev.id === id ? { ...prev, isFavorite: !prev.isFavorite } : prev));
  };

  const openTerm = (t: Term) => {
    setSelectedTerm(t);
    setXP((p) => p + 10);
  };

  return (
    <div className="bg-cosmic min-h-screen relative">
      <div className="stars-bg" />
      <div className="relative z-10 max-w-lg mx-auto px-4 pt-5 pb-28">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl animate-float">🔬</span>
            <span className="font-montserrat font-black text-white text-lg">ТермоСфера</span>
          </div>
          <XPBar xp={xp} level={userLevel} />
        </div>

        {tab === "home" && <HomePage onOpen={openTerm} terms={terms} />}
        {tab === "search" && <SearchPage onOpen={openTerm} terms={terms} />}
        {tab === "catalog" && <CatalogPage onOpen={openTerm} terms={terms} />}
        {tab === "my" && <MyPage onOpen={openTerm} terms={terms} />}
        {tab === "game" && <GamePage terms={terms} onXP={(n) => setXP((p) => p + n)} />}
        {tab === "profile" && <ProfilePage xp={xp} userLevel={userLevel} />}
      </div>

      <NavBar active={tab} onChange={setTab} />

      {selectedTerm && (
        <TermModal
          term={selectedTerm}
          onClose={() => setSelectedTerm(null)}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
