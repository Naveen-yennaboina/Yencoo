"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export function QuizView({ questions, onComplete }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctOptionId;

  const handleSubmit = () => {
    if (!selectedOption) return;
    
    setIsSubmitted(true);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      if (onComplete) onComplete(score + (isCorrect ? 1 : 0), questions.length);
    }
  };

  if (isFinished) {
    return (
      <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto">
        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="text-muted-foreground mt-2">
            You scored {score} out of {questions.length} correct.
          </p>
        </div>
        <Button variant="outline" onClick={() => {
          setCurrentIndex(0);
          setSelectedOption(null);
          setIsSubmitted(false);
          setScore(0);
          setIsFinished(false);
        }}>
          Retry Quiz
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out" 
          style={{ width: `${((currentIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Question {currentIndex + 1} of {questions.length}
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold mb-8">
          {currentQ.question}
        </h3>

        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrectOption = opt.id === currentQ.correctOptionId;
            
            let buttonClass = "w-full justify-start text-left h-auto py-4 px-5 whitespace-normal border-2 ";
            
            if (!isSubmitted) {
              buttonClass += isSelected 
                ? "border-primary bg-primary/5 text-primary" 
                : "border-border bg-card hover:border-primary/50 text-foreground";
            } else {
              if (isCorrectOption) {
                buttonClass += "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
              } else if (isSelected && !isCorrectOption) {
                buttonClass += "border-destructive bg-destructive/10 text-destructive";
              } else {
                buttonClass += "border-border bg-card opacity-50";
              }
            }

            return (
              <Button
                key={opt.id}
                variant="outline"
                className={buttonClass}
                onClick={() => !isSubmitted && setSelectedOption(opt.id)}
                disabled={isSubmitted}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{opt.text}</span>
                  {isSubmitted && isCorrectOption && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrectOption && <XCircle className="h-5 w-5 text-destructive" />}
                </div>
              </Button>
            );
          })}
        </div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className={`p-4 rounded-lg mb-8 ${isCorrect ? 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300' : 'bg-destructive/10 text-destructive-foreground dark:text-red-300'}`}
            >
              <div className="font-semibold mb-1">
                {isCorrect ? "Correct!" : "Incorrect"}
              </div>
              {currentQ.explanation && (
                <div className="text-sm opacity-90">{currentQ.explanation}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedOption} size="lg">
              Check Answer
            </Button>
          ) : (
            <Button onClick={handleNext} size="lg" className="gap-2">
              {currentIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
