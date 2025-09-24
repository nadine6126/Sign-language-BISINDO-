import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Trophy } from "lucide-react";
import Webcam from "react-webcam";

type TestMode = "text-to-sign" | "sign-to-text" | null;
type TestState = "setup" | "testing" | "results";

interface Question {
  question: string;
  answer: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TEXTS = [
  "HELLO",
  "THANK YOU",
  "GOOD MORNING",
  "HOW ARE YOU",
  "INDONESIA",
  "I LOVE YOU",
  "SEE YOU",
  "FRIEND",
  "STUDY",
  "HAPPY",
];

export default function Test() {
  const [testMode, setTestMode] = useState<TestMode>(null);
  const [testState, setTestState] = useState<TestState>("setup");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [answersSoFar, setAnswersSoFar] = useState<string[]>([]);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false); // Added to prevent multiple transitions

  const webcamRef = useRef<Webcam>(null);
  const totalQuestions = 5;

  // generate random soal pas pilih mode
  useEffect(() => {
    if (testMode === "sign-to-text") {
      const randomLetters = [...ALPHABETS]
        .sort(() => 0.5 - Math.random())
        .slice(0, totalQuestions);
      setQuestions(
        randomLetters.map((letter) => ({
          question: `Show the sign for ${letter}`,
          answer: letter,
        }))
      );
    } else if (testMode === "text-to-sign") {
      const randomTexts = [...TEXTS]
        .sort(() => 0.5 - Math.random())
        .slice(0, totalQuestions);
      setQuestions(
        randomTexts.map((txt) => ({
          question: txt,
          answer: txt.replace(/\s/g, ""),
        }))
      );
    }
  }, [testMode]);

  // capture & detect pakai backend
  const captureAndDetect = async () => {
    if (!webcamRef.current || isProcessing || isTransitioning) return;

    setIsProcessing(true);

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) return;

      const blob = await fetch(imageSrc).then((res) => res.blob());
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      // Update prediction display (this can change every time)
      setPrediction(data.prediction);
      setConfidence(data.confidence);

      // But only validate/collect if it's a good prediction and not transitioning
      if (!isTransitioning) {
        validateAnswer(data.prediction, data.confidence);
      }
    } catch (err) {
      console.error("Detection error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // loop deteksi otomatis
  useEffect(() => {
    if (testState !== "testing" || questions.length === 0 || isTransitioning) return;

    const interval = setInterval(() => {
      captureAndDetect();
    }, 1500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testState, questions.length, isTransitioning, currentQuestion]);

  // cek jawaban
  const validateAnswer = (pred: string, conf: number) => {
    if (isTransitioning || questions.length === 0 || !questions[currentQuestion]) return;
    
    const current = questions[currentQuestion];

    // Normalisasi prediksi & jawaban
    const normalizedPred = pred.trim().toUpperCase();
    const normalizedAnswer = current.answer.trim().toUpperCase();

    // Confidence threshold
    const minConfidence = 0.8;

    console.log("Validating:", {
      pred: normalizedPred,
      answer: normalizedAnswer,
      confidence: conf,
      mode: testMode,
      question: currentQuestion + 1,
      currentAnswers: answersSoFar,
      isTransitioning,
    });

    if (testMode === "sign-to-text") {
      // Untuk soal huruf (A-Z)
      if (normalizedPred === normalizedAnswer && conf >= minConfidence) {
        console.log("✅ Correct answer:", normalizedPred);
        handleCorrect();
      } else {
        console.log("❌ Wrong or low confidence:", {
          prediction: normalizedPred,
          expected: normalizedAnswer,
          confidence: conf,
          meetsThreshold: conf >= minConfidence,
        });
      }
    } else if (testMode === "text-to-sign") {
      // Untuk soal kata - collect letters satu per satu
      const uniqueLetters = Array.from(new Set(normalizedAnswer.split("")));

      console.log("=== VALIDATION CHECK ===");
      console.log("Target letters needed:", uniqueLetters);
      console.log("Currently collected letters:", answersSoFar);
      console.log(
        "Just detected:",
        normalizedPred,
        "with confidence:",
        (conf * 100).toFixed(1) + "%"
      );

      if (
        normalizedPred !== "UNKNOWN" &&
        uniqueLetters.includes(normalizedPred) &&
        conf >= minConfidence
      ) {
        if (!answersSoFar.includes(normalizedPred)) {
          setAnswersSoFar((prev) => {
            const newCollection = [...prev, normalizedPred];
            console.log("✅ ADDING letter:", normalizedPred);
            console.log("📦 New collection:", newCollection);

            // Check if complete
            const stillNeeded = uniqueLetters.filter(
              (letter) => !newCollection.includes(letter)
            );
            if (stillNeeded.length === 0) {
              console.log("🎉 ALL LETTERS COLLECTED! Moving to next question...");
              setTimeout(() => {
                handleCorrect();
              }, 1500);
            }

            return newCollection;
          });
        } else {
          console.log("⚠️ Letter already collected - ignoring:", normalizedPred);
        }
      } else {
        if (!uniqueLetters.includes(normalizedPred)) {
          console.log("❌ Not needed:", normalizedPred);
        }
        if (conf < minConfidence) {
          console.log(
            "❌ Confidence too low:",
            (conf * 100).toFixed(1) + "% < " + minConfidence * 100 + "%"
          );
        }
      }

      console.log("=== END VALIDATION ===");
    }
  };

  const handleCorrect = () => {
    if (isTransitioning) return; // Prevent multiple calls
    
    setIsTransitioning(true);
    console.log("🎉 Moving to next question...");

    setScore((s) => s + 1);

    // Reset answers for next question
    setAnswersSoFar([]);
    setPrediction("");
    setConfidence(0);

    setTimeout(() => {
      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion((q) => q + 1);
        console.log("Next question:", currentQuestion + 2);
        setIsTransitioning(false);
      } else {
        console.log("Test completed!");
        setTestState("results");
        setIsTransitioning(false);
      }
    }, 2000); // 2 second delay before moving to next question
  };

  const resetTest = () => {
    setTestMode(null);
    setTestState("setup");
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setAnswersSoFar([]);
    setPrediction("");
    setConfidence(0);
    setIsProcessing(false);
    setIsTransitioning(false);
  };

  // --- UI ---
  if (testState === "setup") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 to-pink-200">
        <h1 className="text-5xl font-bold mb-8 text-indigo-700">
          BISINDO Practice Test
        </h1>
        <div className="flex gap-6">
          <Button
            className="text-lg px-6 py-4"
            onClick={() => {
              setTestMode("sign-to-text");
              setTestState("testing");
            }}
          >
            Start Sign → Text
          </Button>
          <Button
            className="text-lg px-6 py-4"
            onClick={() => {
              setTestMode("text-to-sign");
              setTestState("testing");
            }}
          >
            Start Text → Sign
          </Button>
        </div>
      </div>
    );
  }

  if (testState === "testing") {
    const progress =
      questions.length > 0
        ? ((currentQuestion + 1) / totalQuestions) * 100
        : 0;

    if (questions.length === 0 || !questions[currentQuestion]) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl">Loading questions...</p>
        </div>
      );
    }

    const current = questions[currentQuestion];

    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <Progress value={progress} className="h-3 mb-6" />
        
        {isTransitioning && (
          <div className="mb-4 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-center">
            <p className="text-green-700 font-bold text-lg">
              ✅ Correct! Moving to next question...
            </p>
          </div>
        )}

        <Card className="shadow-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>
              {testMode === "sign-to-text"
                ? "What sign is this?"
                : "Perform this in BISINDO:"}
            </CardTitle>
            <Badge>
              Q {currentQuestion + 1} / {totalQuestions}
            </Badge>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl font-bold mb-4">{current.question}</div>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-md mx-auto w-80 h-60 mb-4"
            />
            <div className="mt-4 text-muted-foreground">
              <p>
                Currently detecting:{" "}
                <b className="text-blue-600">{prediction || "-"}</b>
                {isProcessing && (
                  <span className="ml-2 text-blue-500">Processing...</span>
                )}
              </p>
              <p>
                Confidence:{" "}
                <span
                  className={
                    confidence >= 0.8
                      ? "text-green-600 font-bold"
                      : "text-red-500"
                  }
                >
                  {(confidence * 100).toFixed(1)}%
                </span>
              </p>
              <p className="text-sm mt-1">
                Need 80%+ confidence to collect letter
              </p>
              <p className="text-xs text-orange-600 mt-1">
                {testMode === "text-to-sign"
                  ? "Sign ONE letter at a time - each letter will be collected and stay collected!"
                  : ""}
              </p>

              {testMode === "text-to-sign" && (
                <div className="mt-4">
                  <p className="text-sm mb-3 text-blue-600 font-medium">
                    Sign each letter individually - one at a time:
                  </p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {Array.from(new Set(current.answer.split(""))).map(
                      (letter, idx) => {
                        const isCollected = answersSoFar.includes(letter);
                        return (
                          <div
                            key={idx}
                            className={`relative text-4xl font-bold px-4 py-3 rounded-xl border-3 transition-all duration-700 ${
                              isCollected
                                ? "bg-green-500 text-white border-green-600 shadow-2xl transform scale-125 ring-4 ring-green-300"
                                : "bg-white text-gray-700 border-gray-400 shadow-md hover:shadow-lg"
                            }`}
                          >
                            {letter}
                            {isCollected && (
                              <div className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                ✓
                              </div>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 font-medium">
                      Progress: {answersSoFar.length} /{" "}
                      {Array.from(new Set(current.answer.split(""))).length}{" "}
                      letters collected
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{
                          width: `${
                            (answersSoFar.length /
                              Array.from(
                                new Set(current.answer.split(""))
                              ).length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {answersSoFar.length > 0 && (
                    <div className="mt-4 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        ✅ <span className="font-bold">Collected so far:</span> [
                        {answersSoFar.join(", ")}]
                      </p>
                    </div>
                  )}

                  {answersSoFar.length <
                    Array.from(new Set(current.answer.split(""))).length && (
                    <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <span className="font-bold">Still need to sign:</span> [
                        {Array.from(new Set(current.answer.split("")))
                          .filter((letter) => !answersSoFar.includes(letter))
                          .join(", ")}
                        ]
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-left">
              <p>
                <strong>Debug Info:</strong>
              </p>
              <p>Mode: {testMode}</p>
              <p>Question: {current.question}</p>
              <p>Expected Answer: {current.answer}</p>
              <p>
                Unique Letters Needed:{" "}
                {Array.from(new Set(current.answer.split(""))).join(", ")}
              </p>
              <p>Current Prediction: {prediction || "None"}</p>
              <p>Confidence: {(confidence * 100).toFixed(1)}%</p>
              <p>Is Transitioning: {isTransitioning ? "Yes" : "No"}</p>
              <p>
                Score: {score}/{totalQuestions}
              </p>
              {testMode === "text-to-sign" && (
                <>
                  <p>Letters Collected: [{answersSoFar.join(", ")}]</p>
                  <p>
                    Still Need: [
                    {Array.from(new Set(current.answer.split("")))
                      .filter((letter) => !answersSoFar.includes(letter))
                      .join(", ")}
                    ]
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (testState === "results") {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-indigo-200 to-pink-200 relative">
        {percentage === 100 && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-pulse text-6xl">🎉</div>
          </div>
        )}
        <Trophy className="w-16 h-16 text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Test Complete!</h1>
        <p className="text-xl mb-2">
          Your score: {score} / {totalQuestions} ({percentage}%)
        </p>
        <Button onClick={resetTest}>
          <RotateCcw className="mr-2 w-4 h-4" /> Restart
        </Button>
      </div>
    );
  }

  return null;
}