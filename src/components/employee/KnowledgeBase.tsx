import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, BookOpen } from "lucide-react";
import { knowledgeBaseArticles } from "@/utils/mockData";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const filteredArticles = knowledgeBaseArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      vpn: "bg-primary/10 text-primary border-primary/20",
      printer: "bg-secondary/10 text-secondary border-secondary/20",
      sap: "bg-warning/10 text-warning border-warning/20",
      network: "bg-success/10 text-success border-success/20",
      hardware: "bg-destructive/10 text-destructive border-destructive/20"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Knowledge Base</h2>
        <p className="text-muted-foreground">Search for solutions and guides</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 shadow-sm"
          />
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Articles Found</h3>
          <p className="text-muted-foreground">Try a different search term</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="p-6 hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedArticle(selectedArticle === article.id ? null : article.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={`${getCategoryColor(article.category)} border`}>
                      {article.category.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views} views
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  {selectedArticle === article.id && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <p className="text-muted-foreground leading-relaxed">
                        {article.content}
                      </p>
                    </div>
                  )}
                </div>
                <BookOpen className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
