import React, { useState } from 'react';
import { Question } from '../../services/types';

interface QuizQuestionProps {
    question: Question;
    onAnswerSelect: (optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({question, onAnswerSelect}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId);
        onAnswerSelect(optionId);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{question.text}</h2>
            <div className="space-y-3">
                {question.options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={
                            `w-full p-3 text-left rounded-lg transition-colors 
                            ${selectedOption === option.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'}
                            `
                        }
                    >
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizQuestion;