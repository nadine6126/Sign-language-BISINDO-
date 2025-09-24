import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Isyaratku</h3>
            <p className="text-sm text-muted-foreground">
              Making BISINDO (Bahasa Isyarat Indonesia) accessible to everyone through 
              interactive learning and modern technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/learn" className="hover:text-primary transition-colors">Learn Alphabet</a></li>
              <li><a href="/test" className="hover:text-primary transition-colors">Practice Tests</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About BISINDO</a></li>
            </ul>
          </div>

          {/* Credits */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">GROUP 1</h3>
            <p className="text-sm text-muted-foreground">
              Adel • Anjelin • Jolina • Nasywa • Nadine
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Connecting Hands, Connecting Hearts <Heart className="inline w-4 h-4 text-red-500" /> <Heart className="inline w-4 h-4 text-red-500" /> 
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            Learning BISINDO • Building Bridges
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;