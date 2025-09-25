"use client"
import Lookup from '@/data/Lookup';
import { validateInput } from '../../lib/validateInput';
import { MessagesContext } from '@/context/MessagesContext';
import { ArrowRight, Link, Sparkles, Send, Wand2, Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react';
import Chatbot from './Chatbot';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function Hero() {
    const [userInput, setUserInput] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [inputError, setInputError] = useState('');
    const { messages, setMessages } = useContext(MessagesContext);
    const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
    const router = useRouter();

    const onGenerate = async (input) => {
        setInputError('');
        if (!validateInput(input)) {
            setInputError('Please enter a valid intent, e.g., "Create a website".');
            return;
        }
        const msg = {
            role: 'user',
            content: input
        }
        setMessages(msg);
        const workspaceID = await CreateWorkspace({
            messages: [msg]
        });
        router.push('/workspace/' + workspaceID);
    }

    const enhancePrompt = async () => {
        if (!userInput) return;
        
        setIsEnhancing(true);
        try {
            const response = await fetch('/api/enhance-prompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            const data = await response.json();
            if (data.enhancedPrompt) {
                setUserInput(data.enhancedPrompt);
            }
        } catch (error) {
            console.error('Error enhancing prompt:', error);
        } finally {
            setIsEnhancing(false);
        }
    };

    const onSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] animate-gradient-move">
            {/* Animated, glowing, and blurred background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_300px,#60a5fa33,transparent)] blur-2xl animate-pulse-slow" />
                <div className="absolute right-0 bottom-0 h-[300px] w-[600px] bg-[radial-gradient(circle_300px_at_100%_100%,#ec489933,transparent)] blur-2xl animate-pulse-slow2" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-12">
                    {/* Hero Header */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center justify-center space-x-2 bg-electric-blue-500/20 rounded-full px-6 py-3 mb-6 border border-electric-blue-500/30">
                            <Sparkles className="h-6 w-6 text-electric-blue-400" />
                            <span className="text-electric-blue-400 text-lg font-semibold tracking-wide">
                                NEXT-GEN AI DEVELOPMENT
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-[linear-gradient(45deg,#60a5fa_30%,#ec4899)] leading-tight">
                            Code the <br className="md:hidden" />Impossible
                        </h1>
                        <p className="text-xl text-neon-cyan max-w-3xl mx-auto font-mono tracking-tight">
                            Transform your wildest ideas into production-ready code with Ai-powered assistance
                        </p>
                    </div>

                    {/* Modified Input Section */}
                    <div className="w-full max-w-3xl bg-white/10 backdrop-blur-3xl rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_60px_10px_rgba(59,130,246,0.18)] relative overflow-visible">
                        <div className="p-2 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-2xl">
                            <div className="bg-gray-900/80 p-8 rounded-xl relative">
                                <div className="flex gap-4 items-start">
                                    <div className="relative w-full">
                                        <label className={`absolute left-6 top-3 text-cyan-300 text-xs font-semibold pointer-events-none transition-all duration-200 ${userInput ? 'opacity-80 scale-90 -translate-y-3' : 'opacity-60'}`}>Describe your vision...</label>
                                        <textarea
                                            value={userInput}
                                            onChange={(e) => {
                                                setUserInput(e.target.value);
                                                setInputError('');
                                            }}
                                            className="w-full bg-transparent border-2 border-cyan-400/30 focus:border-cyan-400/80 focus:shadow-[0_0_12px_2px_rgba(34,211,238,0.25)] rounded-xl p-6 pt-8 text-gray-100 placeholder-transparent font-mono text-lg h-40 resize-none transition-all duration-300 hover:border-cyan-400/60 outline-none"
                                            disabled={isEnhancing}
                                        />
                                        {inputError && (
                                            <div className="absolute left-0 right-0 -bottom-7 text-center text-pink-400 text-sm animate-fade-in font-semibold drop-shadow-lg">{inputError}</div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-3 mt-1">
                                        {userInput && (
                                            <>
                                                <button
                                                    onClick={enhancePrompt}
                                                    disabled={isEnhancing}
                                                    className={`flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 rounded-full p-4 shadow-lg shadow-cyan-400/20 border-2 border-white/10 transition-all duration-200 ${isEnhancing ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                                                    title="Enhance prompt"
                                                >
                                                    {isEnhancing ? (
                                                        <Loader2 className="h-7 w-7 animate-spin text-cyan-200" />
                                                    ) : (
                                                        <Wand2 className="h-7 w-7 text-cyan-200" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => onGenerate(userInput)}
                                                    disabled={isEnhancing}
                                                    className={`flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 rounded-full p-4 shadow-lg shadow-purple-400/20 border-2 border-white/10 transition-all duration-200 ${isEnhancing ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                                                    title="Generate"
                                                >
                                                    <Send className="h-7 w-7 text-white" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Link className="h-6 w-6 text-cyan-300/80 hover:text-cyan-200 transition-colors duration-200" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Holographic Suggestions Grid */}
                    <div className="w-full max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Lookup?.SUGGSTIONS.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => onSuggestionClick(suggestion)}
                                    className="group relative p-7 bg-gradient-to-br from-gray-900/60 via-cyan-900/30 to-purple-900/30 hover:from-cyan-900/60 hover:to-purple-900/60 border-2 border-cyan-400/20 rounded-2xl text-left transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_24px_4px_rgba(34,211,238,0.13)] shadow-cyan-400/10 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_60%,#67e8f9a0)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
                                    <span className="text-cyan-300/90 group-hover:text-cyan-200 font-mono text-base tracking-wide transition-colors duration-300 drop-shadow-md">
                                        {suggestion}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    <Chatbot />
    </div>
    );
}

export default Hero;