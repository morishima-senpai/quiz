import React, { useState } from 'react';
import { Question } from '../../types';
import Button from '../Common/Button';

interface QuizQuestionProps {
    question: Question;
    onAnswerSelect: (optionId: string) => void;
    onSkipClicked: () => void;
    disabled?: boolean;
}



const QuizQuestion: React.FC<QuizQuestionProps> = ({ question,  onAnswerSelect, onSkipClicked, disabled = false }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedOption && !disabled) {
            onAnswerSelect(selectedOption);
            setSelectedOption(null);
        }
    };


    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        question.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                    }`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                    {question.text}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <label
                            key={option.id}
                            className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors
                                ${disabled ? 'opacity-75 cursor-not-allowed' : ''}
                                ${selectedOption === option.id 
                                    ? 'border-blue-500 bg-blue-50' 
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="answer"
                                    value={option.id}
                                    checked={selectedOption === option.id}
                                    onChange={() => setSelectedOption(option.id)}
                                    disabled={disabled}
                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:opacity-50"
                                />
                                <span className="ml-3 text-gray-900">
                                    {option.text}
                                </span>
                            </div>
                        </label>
                    ))}
                </div>

                <Button
                    type="submit"
                    disabled={!selectedOption || disabled}
                    className="w-full"
                >
                    {disabled ? 'Submitting...' : 'Submit Answer'}
                </Button>
                <Button
                    type="button"
                    variant={"secondary"}
                    onClick={onSkipClicked}
                    className="w-full"
                >
                    Skip and Finish
                </Button>
            </form>
        </div>
    );
};

export default QuizQuestion;
