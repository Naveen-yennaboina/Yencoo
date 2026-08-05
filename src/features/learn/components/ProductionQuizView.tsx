"use client";

import React, { useState, useTransition } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { submitQuizAttempt } from "@/actions/quiz-actions";
import { usePathname } from "next/navigation";

export interface ProductionQuizOption {
  id: string;
  text: string;
}

export interface ProductionQuizQuestion {
  id: string;
  text: string;
  options: ProductionQuizOption[];
}

export interface ProductionQuizViewProps {
  quizId: string;
  lessonId: string;
  questions: ProductionQuizQuestion[];
  passingScore: number;
}

export function ProductionQuizView({ quizId, lessonId, questions, passingScore }: ProductionQuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const [result, setResult] = useState<{
    score: number;
    passed: boolean;
    results: any[];
  } | null>(null);

  const pathname = usePathname();
  const currentQ = questions[currentIndex];

  const handleOptionSelect = (optionId: string) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleSubmit = () => {
    // Only submit if all questions answered
    if (Object.keys(answers).length < questions.length) return;
    
    startTransition(async () => {
      const res = await submitQuizAttempt(quizId, lessonId, answers, pathname);
      setResult(res);
      setIsSubmitted(true);
    });
  };

  if (isSubmitted && result) {
    return (
      <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${result.passed ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
          {result.passed ? <CheckCircle2 className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{result.passed ? "Quiz Passed!" : "Quiz Failed"}</h2>
          <p className="text-muted-foreground mt-2">
            You scored {result.score}% (Passing score is {passingScore}%)
          </p>
        </div>
        
        <div className="text-left mt-8 space-y-6 max-h-[500px] overflow-y-auto pr-4">
          {result.results.map((r, i) => {
            const q = questions.find(q => q.id === r.questionId);
            return (
              <div key={r.questionId} className="border p-4 rounded-lg bg-card">
                <p className="font-medium mb-3">{i + 1}. {q?.text}</p>
                <div className="space-y-2 text-sm">
                  {q?.options.map(opt => {
                    let className = "p-3 rounded-md border ";
                    if (opt.id === r.correctOptionId) {
                      className += "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                    } else if (opt.id === r.selectedOptionId && !r.isCorrect) {
                      className += "bg-destructive/10 border-destructive text-destructive";
                    } else {
                      className += "bg-background border-border text-muted-foreground";
                    }
                    return (
                      <div key={opt.id} className={className}>
                        {opt.text}
                      </div>
                    )
                  })}
                </div>
                {r.explanation && (
                  <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    <strong>Explanation:</strong> {r.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Button variant="outline" onClick={() => {
            setCurrentIndex(0);
            setAnswers({});
            setIsSubmitted(false);
            setResult(null);
          }}>
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  const isLastQuestion = currentIndex === questions.length - 1;
  const isAnswered = !!answers[currentQ.id];
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Question {currentIndex + 1} of {questions.length}
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold mb-8">
          {currentQ.text}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.id;
            
            let buttonClass = "w-full justify-start text-left h-auto py-4 px-5 whitespace-normal border-2 ";
            
            buttonClass += isSelected 
              ? "border-primary bg-primary/5 text-primary" 
              : "border-border bg-card hover:border-primary/50 text-foreground";

            return (
              <Button
                key={opt.id}
                variant="outline"
                className={buttonClass}
                onClick={() => handleOptionSelect(opt.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{opt.text}</span>
                  {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
              </Button>
            );
          })}
        </div>

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="ghost" onClick={handlePrev} disabled={currentIndex === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          
          {!isLastQuestion ? (
            <Button onClick={handleNext} disabled={!isAnswered}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!allAnswered || isPending} className="px-8">
              {isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
