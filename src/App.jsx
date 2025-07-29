import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  Heart,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
} from "lucide-react";

// Images en base64 (remplacez par vos propres images)
const toolImages = {
  formBuilder: "/tools_images/image.png",
  ListeTache: "/tools_images/image2.png"
};

const UtilityTools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedTool, setSelectedTool] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("name");

  const categories = [
    { id: "all", name: "Tous", color: "bg-gray-600" },
    { id: "web", name: "Web", color: "bg-blue-600" },
    { id: "mobile", name: "Mobile", color: "bg-purple-600" },
    { id: "automation", name: "Automatisation", color: "bg-emerald-600" },
    { id: "security", name: "Sécurité", color: "bg-red-600" },
    { id: "data", name: "Data", color: "bg-indigo-600" },
  ];

  const tools = [
    {
      id: 1,
      name: "Form-Buider",
      category: "web",
      description:
        "FormBuilder est un générateur de formulaires interactif qui permet aux utilisateurs de créer des formulaires personnalisés via une interface graphique intuitive, puis de générer automatiquement le code HTML et CSS correspondant.",
      features: [
        "Workflows visuels",
        "Intégrations API",
        "Déclencheurs multiples",
      ],
      rating: 4.8,
      downloads: "2.3k",
      image: toolImages.formBuilder,
      isNew: true,
      downloadLink: "https://formbuilder06.netlify.app/",
    },
    {
      id: 2,
      name: "Tâche-Liste",
      category: "web",
      description: "Tâche-Liste est une application de gestion de tâches minimaliste qui permet à l’utilisateur de créer, modifier, compléter et supprimer des tâches via une interface claire et responsive.",
      features: [
        "créer ",
        " modifier",
        " compléter",
        "Déclencheurs multiples",
        "supprimer"
      ],
      rating: 4.1,
      downloads: "2.8k",
      image: toolImages.ListeTache,
      isNew: true,
      downloadLink: "https://tacheliste.netlify.app/",
    }
  ];

  const filteredTools = useMemo(() => {
    let filtered = tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "downloads":
          return b.downloads.localeCompare(a.downloads);
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [searchTerm, selectedCategory, sortBy]);

  const toggleFavorite = (toolId) => {
    setFavorites(
      favorites.includes(toolId)
        ? favorites.filter((id) => id !== toolId)
        : [...favorites, toolId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-violet-900 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">DevTools Pro</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Des outils open-source premium pour les développeurs modernes
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un outil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-md`
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-gray-500 text-sm">Trier par :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-700 focus:outline-none border-none"
            >
              <option value="name">Nom</option>
              <option value="rating">Note</option>
              <option value="downloads">Popularité</option>
            </select>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden group"
            >
              {/* Tool Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center p-6">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="h-full w-auto object-contain"
                />
                {tool.isNew && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Nouveau
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(tool.id)}
                  className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm ${
                    favorites.includes(tool.id)
                      ? "text-red-500 bg-white/90"
                      : "text-gray-300 bg-white/70 hover:text-red-400"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(tool.id) ? "fill-current" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Tool Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      categories.find((c) => c.id === tool.category)?.color ||
                      "bg-gray-600"
                    } text-white`}
                  >
                    {categories.find((c) => c.id === tool.category)?.name}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {tool.rating}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{tool.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {tool.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    <span>{tool.downloads}</span>
                  </div>
                  <a
                    href={tool.downloadLink}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                  >
                    Visiter <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              Aucun outil trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        {/* Effet de vague subtil */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/10 to-transparent"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500">
                DevTools Pro
              </h3>
              <p className="text-gray-400 max-w-md">
                Nous transformons des idées complexes en outils élégants et
                performants.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">
                  Produits
                </h4>
                <ul className="space-y-3">
                  {categories.slice(0, 3).map((category) => (
                    <li key={category.id}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-blue-300 transition-colors flex items-center"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">
                  infos
                </h4>
                <ul className="space-y-3 text-gray-400">
                  <li>
                    <a
                      href="ezechielben06@gmail.com"
                      className="hover:text-blue-300 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ezechielben06.netlify.app/"
                      className="hover:text-blue-300 transition-colors"
                    >
                      portfolio
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-200">
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 rounded-r-lg hover:opacity-90 transition-opacity">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Recevez les dernières mises à jour
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="https://github.com/ezechielben06"
                className="text-gray-400 hover:text-blue-300 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DevTools Pro| ezechielben06-Tous
              droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UtilityTools;
