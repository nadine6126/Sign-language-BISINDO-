import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Maximize2 } from "lucide-react";
import bisindoA from "@/assets/bisindo-a.png";
import bisindoB from "@/assets/bisindo-b.png";
import bisindoC from "@/assets/bisindo-c.png";
import bisindoD from "@/assets/bisindo-d.png";
import bisindoE from "@/assets/bisindo-e.png";
import bisindoF from "@/assets/bisindo-f.png";
import bisindoG from "@/assets/bisindo-g.png";
import bisindoH from "@/assets/bisindo-h.png";
import bisindoI from "@/assets/bisindo-i.png";
import bisindoJ from "@/assets/bisindo-j.png";
import bisindoK from "@/assets/bisindo-k.png";
import bisindoL from "@/assets/bisindo-l.png";
import bisindoM from "@/assets/bisindo-m.png";
import bisindoN from "@/assets/bisindo-n.png";
import bisindoO from "@/assets/bisindo-o.png";
import bisindoP from "@/assets/bisindo-p.png";
import bisindoQ from "@/assets/bisindo-q.png";
import bisindoR from "@/assets/bisindo-r.png";
import bisindoS from "@/assets/bisindo-s.png";
import bisindoT from "@/assets/bisindo-t.png";
import bisindoU from "@/assets/bisindo-u.png";
import bisindoV from "@/assets/bisindo-v.png";
import bisindoW from "@/assets/bisindo-w.png";
import bisindoX from "@/assets/bisindo-x.png";
import bisindoY from "@/assets/bisindo-y.png";
import bisindoZ from "@/assets/bisindo-z.png";

// Alphabet data - in a real app, this would come from an API
const alphabetData = [
  { letter: "A", image: bisindoA, description: "Bring both hands together with your index fingers touching at the top to form a point, and your thumbs touching at the bottom to make a triangle shape. The rest of your fingers stay curled inward, forming a closed fist." },
  { letter: "B", image: bisindoB, description: "Raise one hand with your fingers extended and close together, keeping them straight upward. Fold your thumb across your palm so it rests in front of your hand. The shape of your hand should look like the uppercase letter B." },
  { letter: "C", image: bisindoC, description: "Raise one hand and curve all your fingers along with your thumb to form a half-circle, just like the shape of the letter C." },
  { letter: "D", image: bisindoD, description: "Make a closed fist with one hand. Extend your index finger straight upward. With your other hand, place your thumb and fingers around the extended index finger to form a half-circle, so together they resemble the shape of the letter D." },
  { letter: "E", image: bisindoE, description: "Extend your hand forward with your palm facing sideways. Bend your fingers slightly at the knuckles so they curve inward toward your palm, while keeping them close together. Your thumb rests lightly against the side of your fingers." },
  { letter: "F", image: bisindoF, description: "Form a fist with one hand, keeping it steady. With your other hand, extend your index finger and place it horizontally across the top of the closed fist, like a short bar." },
  { letter: "G", image: bisindoG, description: "Make a fist with one hand and hold it upright. With your other hand, form another fist and place it horizontally across the top of the first fist, as if locking them together." },
  { letter: "H", image: bisindoH, description: "Extend your index and middle fingers together, pointing upward, while the other fingers curl into your palm. With your other hand, place the index finger horizontally across the two extended fingers." },
  { letter: "I", image: bisindoI, description: "Raise your little finger (pinky) upward while curling the other fingers into your palm. Keep the thumb tucked against the fingers." },
  { letter: "J", image: bisindoJ, description: "Start with the same handshape as I (little finger extended upward, others curled in). Then, move your hand to trace a small curve in the air, like drawing the letter J." },
  { letter: "K", image: bisindoK, description: "Start with your left index finger pointing upward. Then, use the right index and middle fingers to “pinch” the base of the left index, forming a cross shape. Hold the position steady to show the letter K." },
  { letter: "L", image: bisindoL, description: "Extend your thumb and index finger to form an “L” shape, while keeping the other fingers curled into your palm. Hold your hand upright with the palm facing outward." },
  { letter: "M", image: bisindoM, description: "Place your left hand open with fingers spread upward. Then, cross your right hand over it, with three fingers (index, middle, and ring) touching the palm of your left hand, forming the shape of the letter M." },
  { letter: "N", image: bisindoN, description: "Hold your left hand open with fingers spread upward. Then, cross your right hand over it, placing two fingers (index and middle) on the palm of your left hand to represent the letter N." },
  { letter: "O", image: bisindoO, description: "Curl all your fingers and thumb together to make a round “O” shape with your hand." },
  { letter: "P", image: bisindoP, description: "Raise your left index finger pointing upward. Then, place your right index finger horizontally across the top, forming a “corner” shape like the letter P." },
  { letter: "Q", image: bisindoQ, description: "Form a circle shape with your left thumb and index finger, like making the letter O. Then, use your right index finger to touch the side of that circle, turning it into the letter Q." },
  { letter: "R", image: bisindoR, description: "Hold up your right hand with the index finger pointing upward. Then, flick your finger against your thumb so it makes a small snapping sound—this movement represents the letter R." },
  { letter: "S", image: bisindoS, description: "Raise both hands. Shape your left hand like the letter 'C'. Then, place your right index finger horizontally across the opening of the 'C', forming a closed shape — this represents the letter S." },
  { letter: "T", image: bisindoT, description: "Raise your left hand with the index finger pointing upward. Then, place your right hand horizontally across the top of the left index finger — forming a shape like the letter “T”" },
  { letter: "U", image: bisindoU, description: "Raise your hand with the thumb finger and the index finger extended upward, while the other fingers fold into the palm. The shape looks like two points standing together, symbolizing the letter U." },
  { letter: "V", image: bisindoV, description: "Raise your index and middle fingers together, pointing straight upward, while curling the other fingers into your palm." },
  { letter: "W", image: bisindoW, description: "Raise both hands. Extend your index fingers upward, while the thumbs touch each other at the tips. This forms a wide shape like the letter “W”" },
  { letter: "X", image: bisindoX, description: "Cross both index fingers in front of you to form an “X” shape. Keep the remaining fingers curled into your palms, forming closed fists with both hands." },
  { letter: "Y", image: bisindoY, description: "Hold one hand in a fist. Extend your thumb upward and your index finger outward to the side, while keeping the other fingers curled into your palm. Raise your index from other hand and pit it vertically in front of the other palm." },
  { letter: "Z", image: bisindoZ, description: "Raise one arm with the elbow bent so the upper arm is vertical. Extend your hand forward with the palm facing down, and keep the fingers straight together. The shape of the bent arm and flat hand forms the letter “Z.”" },
];

const Learn = () => {
  const [selectedLetter, setSelectedLetter] = useState<typeof alphabetData[0] | null>(null);

  const handleCardClick = (letter: typeof alphabetData[0]) => {
    setSelectedLetter(letter);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BISINDO Alphabet</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Learn the complete BISINDO alphabet. Click on any letter to see detailed instructions.
          </p>
          <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
            26 Letters Available
          </Badge>
        </div>
      </div>

      {/* Alphabet Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {alphabetData.map((item) => (
            <div
              key={item.letter}
              className="letter-card cursor-pointer group"
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(item);
                }
              }}
              aria-label={`Learn letter ${item.letter}`}
            >
              <div className="aspect-square relative overflow-hidden rounded-lg mb-3">
                <img
                  src={item.image}
                  alt={`BISINDO sign for letter ${item.letter}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <Maximize2 className="absolute top-2 right-2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary mb-1">{item.letter}</h3>
                <p className="text-sm text-muted-foreground">Click to learn</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-muted/50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Learning Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-card rounded-xl">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✋</span>
              </div>
              <h3 className="font-semibold mb-2">Practice Daily</h3>
              <p className="text-sm text-muted-foreground">
                Consistent practice is key to mastering sign language. Start with 10 minutes daily.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👀</span>
              </div>
              <h3 className="font-semibold mb-2">Watch Carefully</h3>
              <p className="text-sm text-muted-foreground">
                Pay attention to hand position, finger placement, and movement direction.
              </p>
            </div>
            <div className="text-center p-6 bg-card rounded-xl">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Practice with Others</h3>
              <p className="text-sm text-muted-foreground">
                Sign language is about communication. Practice with friends or family.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Letter Detail Modal */}
      <Dialog open={!!selectedLetter} onOpenChange={() => setSelectedLetter(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Letter {selectedLetter?.letter}
            </DialogTitle>
          </DialogHeader>
          {selectedLetter && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={selectedLetter.image}
                  alt={`BISINDO sign for letter ${selectedLetter.letter}`}
                  className="max-w-xs rounded-lg shadow-lg"
                />
              </div>
              <div className="text-center space-y-4">
                <div className="text-6xl font-bold text-primary">
                  {selectedLetter.letter}
                </div>
                <p className="text-lg text-muted-foreground">
                  {selectedLetter.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Learn;