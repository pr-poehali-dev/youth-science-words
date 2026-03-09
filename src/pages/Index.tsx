import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Словарная база ───────────────────────────────────────────────────────────

interface Term {
  id: number;
  word: string;
  transcription: string;
  partOfSpeech: string;
  category: string;
  level: "Начальный" | "Средний" | "Продвинутый" | "Экспертный";
  definition: string;
  description: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  translation: string;
  tags: string[];
}

const TERMS: Term[] = [
  {
    id: 1,
    word: "Квантовая суперпозиция",
    transcription: "[кван·то·ва·я су·пер·по·зи·ци·я]",
    partOfSpeech: "сущ., ж.р.",
    category: "Физика",
    level: "Продвинутый",
    definition: "Состояние квантового объекта, при котором он одновременно находится в нескольких состояниях до момента измерения.",
    description: "Представь монетку в воздухе — она и орёл, и решка одновременно. Только когда её ловишь — она «выбирает». Так ведут себя электроны и фотоны.",
    examples: [
      "Кот Шрёдингера находится в суперпозиции живого и мёртвого состояния.",
      "Электрон существует в суперпозиции нескольких энергетических уровней.",
    ],
    synonyms: ["квантовое наложение"],
    antonyms: ["декогеренция", "коллапс волновой функции"],
    collocations: ["принцип суперпозиции", "суперпозиция состояний"],
    translation: "Quantum superposition",
    tags: ["квантовая физика", "волна", "частица", "измерение", "квант", "электрон", "неопределённость"],
  },
  {
    id: 2,
    word: "Пространство-время",
    transcription: "[прос·тра·нство·вре·мя]",
    partOfSpeech: "сущ., ср.р.",
    category: "Физика",
    level: "Экспертный",
    definition: "Четырёхмерная модель, объединяющая три пространственных координаты и время в единый физический континуум.",
    description: "Эйнштейн показал: время — не просто тикающие часы, а часть пространства. Вместе они образуют ткань Вселенной, изгибаемую массой.",
    examples: [
      "Чёрная дыра искривляет пространство-время вокруг себя.",
      "Время на МКС течёт немного медленнее из-за кривизны пространства-времени.",
    ],
    synonyms: ["пространственно-временной континуум"],
    antonyms: [],
    collocations: ["искривление пространства-времени", "ткань пространства-времени"],
    translation: "Spacetime",
    tags: ["теория относительности", "Эйнштейн", "гравитация", "четыре измерения", "континуум", "время", "пространство"],
  },
  {
    id: 3,
    word: "Энтропия",
    transcription: "[эн·тро·пи·я]",
    partOfSpeech: "сущ., ж.р.",
    category: "Физика",
    level: "Продвинутый",
    definition: "Термодинамическая величина, характеризующая степень беспорядка или неопределённости в системе.",
    description: "Твоя комната сама по себе становится грязнее — но никогда не убирается сама. Вселенная стремится к большему хаосу. Это и есть рост энтропии.",
    examples: [
      "Растворение сахара в воде сопровождается ростом энтропии.",
      "Жизнь — это локальное уменьшение энтропии за счёт потребления энергии.",
    ],
    synonyms: ["мера беспорядка"],
    antonyms: ["негэнтропия"],
    collocations: ["рост энтропии", "второй закон термодинамики"],
    translation: "Entropy",
    tags: ["термодинамика", "беспорядок", "хаос", "тепло", "второй закон", "необратимость"],
  },
  {
    id: 4,
    word: "Фотосинтез",
    transcription: "[фо·то·синтез]",
    partOfSpeech: "сущ., м.р.",
    category: "Биология",
    level: "Начальный",
    definition: "Процесс преобразования световой энергии в химическую в клетках растений и некоторых бактерий.",
    description: "Растения — живые солнечные батарейки. Хлорофилл ловит фотоны и превращает воду и CO₂ в сахар, выделяя кислород.",
    examples: [
      "Благодаря фотосинтезу джунгли производят кислород для целых континентов.",
      "Водоросли обеспечивают 50% фотосинтеза на Земле.",
    ],
    synonyms: ["ассимиляция углерода"],
    antonyms: ["клеточное дыхание"],
    collocations: ["световая фаза", "хлорофилл", "тёмная фаза"],
    translation: "Photosynthesis",
    tags: ["растения", "свет", "хлорофилл", "кислород", "клетка", "биохимия", "энергия"],
  },
  {
    id: 5,
    word: "ДНК",
    transcription: "[де·эн·ка]",
    partOfSpeech: "сущ., аббр.",
    category: "Биология",
    level: "Средний",
    definition: "Дезоксирибонуклеиновая кислота — молекула, хранящая генетическую информацию всех живых организмов.",
    description: "ДНК — инструкция по сборке организма. В каждой клетке 2 метра ДНК, свёрнутые в крошечное ядро. Там записан полный «код» тебя.",
    examples: [
      "Судебная экспертиза по ДНК устанавливает личность с точностью 99,9%.",
      "CRISPR позволяет редактировать ДНК как текст в Word.",
    ],
    synonyms: ["дезоксирибонуклеиновая кислота", "геном"],
    antonyms: [],
    collocations: ["двойная спираль", "репликация ДНК", "геном человека"],
    translation: "DNA",
    tags: ["ген", "наследственность", "генетика", "молекула", "хромосома", "белок", "код жизни"],
  },
  {
    id: 6,
    word: "Тёмная материя",
    transcription: "[тём·на·я ма·те·ри·я]",
    partOfSpeech: "сущ., ж.р.",
    category: "Астрономия",
    level: "Экспертный",
    definition: "Гипотетическая форма материи, не взаимодействующая с электромагнитным излучением, но проявляющаяся через гравитационные эффекты.",
    description: "Галактики вращаются слишком быстро для своей видимой массы. Значит, есть невидимое вещество — тёмная материя. Её примерно 27% Вселенной.",
    examples: [
      "Тёмная материя удерживает галактики от разлёта.",
      "Детекторы XENON пытаются уловить её частицы.",
    ],
    synonyms: ["скрытая масса"],
    antonyms: ["барионная материя", "тёмная энергия"],
    collocations: ["ореол тёмной материи", "гравитационное линзирование"],
    translation: "Dark matter",
    tags: ["космос", "галактика", "гравитация", "невидимое", "вселенная", "WIMP", "частицы"],
  },
  {
    id: 7,
    word: "Молярная масса",
    transcription: "[мо·ляр·на·я мас·са]",
    partOfSpeech: "сущ., ж.р.",
    category: "Химия",
    level: "Средний",
    definition: "Масса одного моля вещества, выраженная в граммах на моль (г/моль).",
    description: "Один моль — 6×10²³ частиц. Молярная масса воды H₂O = 18 г/моль: 18 грамм воды содержат астрономическое число молекул.",
    examples: [
      "Молярная масса NaCl (поваренной соли) = 58,5 г/моль.",
      "Зная молярную массу, химик рассчитывает количество вещества для реакции.",
    ],
    synonyms: ["молекулярная масса", "мол. вес"],
    antonyms: [],
    collocations: ["число Авогадро", "количество вещества", "стехиометрия"],
    translation: "Molar mass",
    tags: ["химия", "моль", "атом", "молекула", "стехиометрия", "концентрация", "реакция"],
  },
  {
    id: 8,
    word: "Алгоритм",
    transcription: "[ал·го·ритм]",
    partOfSpeech: "сущ., м.р.",
    category: "Информатика",
    level: "Начальный",
    definition: "Точная конечная последовательность инструкций для решения определённой задачи.",
    description: "Рецепт — алгоритм для готовки. Маршрут навигатора — алгоритм для езды. Любая программа — набор алгоритмов.",
    examples: [
      "Алгоритм сортировки расставляет числа от меньшего к большему.",
      "ИИ-алгоритм Netflix подбирает фильмы под твои вкусы.",
    ],
    synonyms: ["процедура", "метод", "инструкция"],
    antonyms: ["случайный процесс"],
    collocations: ["алгоритм сортировки", "алгоритм поиска"],
    translation: "Algorithm",
    tags: ["программирование", "инструкция", "компьютер", "задача", "шаги", "вычисление", "ИИ"],
  },
  {
    id: 9,
    word: "Нейрон",
    transcription: "[ней·рон]",
    partOfSpeech: "сущ., м.р.",
    category: "Биология",
    level: "Начальный",
    definition: "Структурная и функциональная единица нервной системы, передающая электрические импульсы.",
    description: "Нейрон — клетка мозга с длинными «проводами» (аксонами). Мозг содержит около 86 млрд нейронов, которые образуют триллионы связей.",
    examples: [
      "При изучении нового навыка между нейронами формируются новые связи.",
      "Искусственные нейронные сети созданы по образцу биологических нейронов.",
    ],
    synonyms: ["нервная клетка"],
    antonyms: [],
    collocations: ["нейронная сеть", "аксон", "синапс", "нервный импульс"],
    translation: "Neuron",
    tags: ["мозг", "нервная система", "клетка", "синапс", "аксон", "нейросеть", "импульс"],
  },
  {
    id: 10,
    word: "Катализатор",
    transcription: "[ка·та·ли·за·тор]",
    partOfSpeech: "сущ., м.р.",
    category: "Химия",
    level: "Средний",
    definition: "Вещество, ускоряющее химическую реакцию, но не расходующееся в её процессе.",
    description: "Катализатор — как тренер: помогает молекулам «выступить» быстрее, сам не участвуя в реакции. Он снижает энергетический барьер.",
    examples: [
      "Платина — катализатор в автомобильных нейтрализаторах выхлопа.",
      "Ферменты — биологические катализаторы в живых клетках.",
    ],
    synonyms: ["ускоритель реакции"],
    antonyms: ["ингибитор"],
    collocations: ["каталитическая реакция", "фермент", "катализ"],
    translation: "Catalyst",
    tags: ["химия", "реакция", "ускорение", "фермент", "промышленность", "биохимия"],
  },
  {
    id: 11,
    word: "Электромагнитный спектр",
    transcription: "[э·лек·тро·маг·нит·ный спектр]",
    partOfSpeech: "сущ., м.р.",
    category: "Физика",
    level: "Средний",
    definition: "Совокупность всех видов электромагнитного излучения, упорядоченная по длине волны или частоте.",
    description: "Видимый свет — лишь тонкая полоска в огромном диапазоне: от радиоволн до гамма-излучения. Всё это — одно явление с разной энергией.",
    examples: [
      "Рентгеновские лучи — часть спектра с очень короткой длиной волны.",
      "Wi-Fi и мобильная связь используют радиодиапазон спектра.",
    ],
    synonyms: ["ЭМ спектр"],
    antonyms: [],
    collocations: ["длина волны", "частота излучения", "видимый свет"],
    translation: "Electromagnetic spectrum",
    tags: ["свет", "волна", "излучение", "радио", "рентген", "частота", "оптика"],
  },
  {
    id: 12,
    word: "Митоз",
    transcription: "[ми·тоз]",
    partOfSpeech: "сущ., м.р.",
    category: "Биология",
    level: "Средний",
    definition: "Способ деления клетки, при котором каждая дочерняя клетка получает идентичный набор хромосом.",
    description: "Митоз — это как ксерокс для клеток. Клетка копирует ДНК и делится надвое, давая двух точных близнецов.",
    examples: [
      "Раны заживают благодаря митозу — делению клеток кожи.",
      "Рост организма происходит за счёт митотического деления клеток.",
    ],
    synonyms: ["соматическое деление"],
    antonyms: ["мейоз"],
    collocations: ["деление клетки", "хромосомы", "фазы митоза"],
    translation: "Mitosis",
    tags: ["клетка", "деление", "хромосомы", "рост", "ДНК", "размножение", "ядро"],
  },
];

// ─── Поиск по описанию ────────────────────────────────────────────────────────

function searchByDescription(query: string, terms: Term[]): Term[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = terms.map((term) => {
    let score = 0;
    const words = q.split(/\s+/).filter((w) => w.length >= 2);
    words.forEach((w) => {
      if (term.word.toLowerCase().includes(w)) score += 10;
      if (term.definition.toLowerCase().includes(w)) score += 5;
      if (term.description.toLowerCase().includes(w)) score += 3;
      if (term.tags.some((t) => t.toLowerCase().includes(w))) score += 4;
      if (term.category.toLowerCase().includes(w)) score += 4;
      if (term.synonyms.some((s) => s.toLowerCase().includes(w))) score += 3;
      if (term.collocations.some((c) => c.toLowerCase().includes(w))) score += 2;
      if (term.translation.toLowerCase().includes(w)) score += 2;
    });
    return { term, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.term);
}

// ─── Константы ────────────────────────────────────────────────────────────────

const CATEGORIES = ["Все", "Физика", "Биология", "Химия", "Астрономия", "Информатика"];

const LEVEL_STYLE: Record<string, string> = {
  "Начальный": "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  "Средний": "text-amber-400 bg-amber-400/10 border-amber-400/25",
  "Продвинутый": "text-pink-400 bg-pink-400/10 border-pink-400/25",
  "Экспертный": "text-orange-400 bg-orange-400/10 border-orange-400/25",
};

const LEVEL_DOT: Record<string, string> = {
  "Начальный": "bg-emerald-400",
  "Средний": "bg-amber-400",
  "Продвинутый": "bg-pink-400",
  "Экспертный": "bg-orange-400",
};

const CAT_EMOJI: Record<string, string> = {
  "Физика": "⚛️",
  "Биология": "🧬",
  "Химия": "🧪",
  "Астрономия": "🔭",
  "Информатика": "💻",
};

const HINTS = [
  "клетка делится и копирует ДНК",
  "свет превращается в энергию растениями",
  "невидимая материя во вселенной",
  "беспорядок в термодинамике",
];

// ─── Компоненты ───────────────────────────────────────────────────────────────

function TermDrawer({ term, onClose }: { term: Term; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl bg-[#0b0b16] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden animate-scale-in max-h-[92vh] overflow-y-auto"
        style={{ boxShadow: "0 -4px 60px rgba(168,85,247,0.14)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-5 border-b border-white/8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm text-white/40 font-golos">
                  {CAT_EMOJI[term.category]} {term.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LEVEL_STYLE[term.level]}`}>
                  {term.level}
                </span>
              </div>
              <h2 className="text-2xl font-montserrat font-black text-white leading-tight">{term.word}</h2>
              <p className="text-white/30 text-sm font-golos mt-0.5">
                {term.transcription} · <em>{term.partOfSpeech}</em>
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white/50 hover:text-white transition-all"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
            <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">EN</span>
            <span className="text-blue-300 text-sm font-golos">{term.translation}</span>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1.5">Определение</p>
            <p className="text-white font-golos text-[15px] leading-relaxed">{term.definition}</p>
          </div>

          <div className="rounded-2xl bg-purple-500/8 border border-purple-500/15 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span>💡</span>
              <p className="text-[10px] text-purple-300 uppercase tracking-widest font-bold">Простыми словами</p>
            </div>
            <p className="text-white/75 font-golos text-sm leading-relaxed">{term.description}</p>
          </div>

          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Примеры</p>
            <div className="space-y-2">
              {term.examples.map((ex, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <span className="text-purple-400/50 mt-1 shrink-0 text-xs">▸</span>
                  <p className="text-white/60 font-golos text-sm italic leading-relaxed">«{ex}»</p>
                </div>
              ))}
            </div>
          </div>

          {(term.synonyms.length > 0 || term.antonyms.length > 0) && (
            <div className="grid grid-cols-2 gap-4">
              {term.synonyms.length > 0 && (
                <div>
                  <p className="text-[10px] text-emerald-400/60 uppercase tracking-widest font-bold mb-1.5">Синонимы</p>
                  <div className="flex flex-wrap gap-1">
                    {term.synonyms.map((s) => (
                      <span key={s} className="text-xs bg-emerald-400/8 border border-emerald-400/18 text-emerald-300 px-2 py-0.5 rounded-full font-golos">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {term.antonyms.length > 0 && (
                <div>
                  <p className="text-[10px] text-pink-400/60 uppercase tracking-widest font-bold mb-1.5">Антонимы</p>
                  <div className="flex flex-wrap gap-1">
                    {term.antonyms.map((a) => (
                      <span key={a} className="text-xs bg-pink-400/8 border border-pink-400/18 text-pink-300 px-2 py-0.5 rounded-full font-golos">{a}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {term.collocations.length > 0 && (
            <div>
              <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Устойчивые сочетания</p>
              <div className="flex flex-wrap gap-1.5">
                {term.collocations.map((c) => (
                  <span key={c} className="text-xs px-2.5 py-1 rounded-full font-golos text-white/60 badge-gradient">{c}</span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-2">Темы</p>
            <div className="flex flex-wrap gap-1">
              {term.tags.map((tag) => (
                <span key={tag} className="text-[11px] bg-white/4 text-white/35 px-2 py-0.5 rounded-full font-golos">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermRow({ term, onClick }: { term: Term; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left group flex items-start gap-4 py-4 border-b border-white/6 hover:bg-white/2 transition-colors rounded-sm"
    >
      <div className="shrink-0 mt-2">
        <div className={`w-2 h-2 rounded-full ${LEVEL_DOT[term.level]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-montserrat font-bold text-white text-[15px] group-hover:text-purple-300 transition-colors">
            {term.word}
          </span>
          <span className="text-white/25 text-xs font-golos hidden sm:inline">{term.transcription}</span>
          <span className="text-white/25 text-xs font-golos">{CAT_EMOJI[term.category]} {term.category}</span>
        </div>
        <p className="text-white/45 text-sm font-golos mt-0.5 line-clamp-1 leading-snug">{term.definition}</p>
      </div>
      <Icon name="ChevronRight" size={16} className="text-white/15 group-hover:text-purple-400 shrink-0 mt-1.5 transition-colors" />
    </button>
  );
}

// ─── Главная страница ─────────────────────────────────────────────────────────

export default function Index() {
  const [query, setQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [aiResults, setAiResults] = useState<Term[] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [tab, setTab] = useState<"catalog" | "search">("catalog");
  const aiInputRef = useRef<HTMLInputElement>(null);

  const catalogTerms = TERMS.filter((t) => {
    const matchCat = activeCategory === "Все" || t.category === activeCategory;
    const matchQ =
      !query.trim() ||
      t.word.toLowerCase().includes(query.toLowerCase()) ||
      t.definition.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const handleDescriptionSearch = (q?: string) => {
    const searchQ = q ?? aiQuery;
    if (!searchQ.trim()) return;
    if (q) setAiQuery(q);
    setAiLoading(true);
    setAiResults(null);
    setTimeout(() => {
      setAiResults(searchByDescription(searchQ, TERMS));
      setAiLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-cosmic">
      <div className="stars-bg" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-6 pb-12">

        {/* Шапка */}
        <header className="mb-7">
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-xl">🔬</span>
            <h1 className="font-montserrat font-black text-xl text-white tracking-tight">ТермоСфера</h1>
          </div>
          <p className="text-white/35 text-sm font-golos ml-9">Научный словарь · {TERMS.length} терминов</p>
        </header>

        {/* Вкладки */}
        <div className="flex gap-1 p-1 bg-white/5 rounded-2xl mb-6">
          <button
            onClick={() => setTab("catalog")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-golos font-medium transition-all ${
              tab === "catalog"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Icon name="BookOpen" size={15} />
            Словарь
          </button>
          <button
            onClick={() => { setTab("search"); setTimeout(() => aiInputRef.current?.focus(), 80); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-golos font-medium transition-all ${
              tab === "search"
                ? "bg-purple-500/20 text-purple-200 border border-purple-500/25"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Icon name="Sparkles" size={15} />
            По описанию
          </button>
        </div>

        {/* ── СЛОВАРЬ ── */}
        {tab === "catalog" && (
          <div>
            <div className="flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl px-4 py-3 mb-4 search-glow">
              <Icon name="Search" size={16} className="text-white/25 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию..."
                className="flex-1 bg-transparent text-white text-sm font-golos placeholder-white/22 outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-white/25 hover:text-white/55 transition-colors">
                  <Icon name="X" size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 -mx-4 px-4" style={{ scrollbarWidth: "none" }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-golos font-medium whitespace-nowrap shrink-0 transition-all ${
                    activeCategory === cat ? "pill-active" : "bg-white/5 text-white/45 hover:bg-white/10"
                  }`}
                >
                  {cat !== "Все" && <span>{CAT_EMOJI[cat]}</span>}
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-white/22 text-xs font-golos mb-0.5">{catalogTerms.length} терминов</p>

            <div>
              {catalogTerms.map((term, i) => (
                <div key={term.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}>
                  <TermRow term={term} onClick={() => setSelectedTerm(term)} />
                </div>
              ))}
              {catalogTerms.length === 0 && (
                <div className="py-16 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-white/30 font-golos text-sm">Ничего не найдено</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ПОИСК ПО ОПИСАНИЮ ── */}
        {tab === "search" && (
          <div>
            <div
              className="rounded-3xl p-5 mb-5"
              style={{
                background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(34,211,238,0.04))",
                border: "1px solid rgba(168,85,247,0.22)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>✨</span>
                <h2 className="font-montserrat font-bold text-white text-base">Поиск по описанию</h2>
              </div>
              <p className="text-white/45 text-sm font-golos mb-4 leading-relaxed">
                Опиши явление своими словами — найдём термин.
              </p>

              <div className="flex gap-2 mb-3">
                <div className="flex-1 flex items-center gap-3 bg-white/6 border border-white/10 rounded-2xl px-4 py-3 search-glow">
                  <Icon name="MessageSquare" size={16} className="text-purple-400 shrink-0" />
                  <input
                    ref={aiInputRef}
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleDescriptionSearch()}
                    placeholder="Например: когда клетка делится на две..."
                    className="flex-1 bg-transparent text-white text-sm font-golos placeholder-white/22 outline-none"
                  />
                  {aiQuery && (
                    <button onClick={() => { setAiQuery(""); setAiResults(null); }} className="text-white/25 hover:text-white/55 transition-colors">
                      <Icon name="X" size={14} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => handleDescriptionSearch()}
                  disabled={!aiQuery.trim() || aiLoading}
                  className="shrink-0 bg-purple-500 hover:bg-purple-400 disabled:opacity-35 disabled:cursor-not-allowed text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
                >
                  {aiLoading
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <Icon name="Search" size={16} />
                  }
                </button>
              </div>

              {/* Подсказки */}
              <div className="flex flex-wrap gap-1.5">
                {HINTS.map((hint) => (
                  <button
                    key={hint}
                    onClick={() => handleDescriptionSearch(hint)}
                    className="text-[11px] bg-white/5 hover:bg-purple-500/18 border border-white/8 hover:border-purple-500/28 text-white/40 hover:text-purple-300 px-2.5 py-1 rounded-full font-golos transition-all"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>

            {/* Результаты */}
            {aiLoading && (
              <div className="flex items-center justify-center py-14 gap-3">
                <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-white/40 font-golos text-sm">Ищу совпадения...</span>
              </div>
            )}

            {!aiLoading && aiResults !== null && (
              <div>
                <p className="text-white/22 text-xs font-golos mb-1">
                  {aiResults.length > 0
                    ? `${aiResults.length} совпадений · по релевантности`
                    : "Ничего не нашлось — попробуй переформулировать"}
                </p>
                {aiResults.map((term, i) => (
                  <div key={term.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
                    <TermRow term={term} onClick={() => setSelectedTerm(term)} />
                  </div>
                ))}
                {aiResults.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="text-4xl mb-3">🤔</div>
                    <p className="text-white/30 font-golos text-sm">Попробуй другие слова</p>
                  </div>
                )}
              </div>
            )}

            {!aiLoading && aiResults === null && (
              <div className="py-16 text-center">
                <div className="text-5xl mb-4 opacity-50">🧭</div>
                <p className="text-white/28 font-golos text-sm">Введи описание и нажми Enter или →</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedTerm && (
        <TermDrawer term={selectedTerm} onClose={() => setSelectedTerm(null)} />
      )}
    </div>
  );
}
