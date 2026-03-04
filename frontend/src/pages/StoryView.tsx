import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SUCCESS_STORIES } from '../constants/stories';
import { ChevronLeft, MapPin, Tag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { LazyImage } from '../components/LazyImage';

export const StoryView = () => {
    const { storyId } = useParams<{ storyId: string }>();
    const story = SUCCESS_STORIES.find((s) => s.id === storyId);

    if (!story) {
        return <Navigate to="/impact" replace />;
    }

    // Split into paragraphs assuming double newline denotes a new paragraph based on our formatting
    const paragraphs = story.fullText.split('\n\n').filter(p => p.trim() !== '');

    return (
        <div className="bg-slate-50 min-h-screen pb-24">
            <SEO
                title={`${story.title} - A.P.D.F.E Story`}
                description={story.shortText}
            />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full bg-slate-900">
                <LazyImage
                    src={story.img}
                    alt={story.title}
                    className="w-full h-full object-cover opacity-60"
                    containerClassName="w-full h-full absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full px-4 pb-12 md:pb-20">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            to="/impact"
                            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm font-semibold uppercase tracking-wider"
                        >
                            <ChevronLeft size={16} /> Back to Impact
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-md">
                                <Tag size={12} /> {story.tag}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-md">
                                <MapPin size={12} /> {story.location}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 tracking-tight">
                            {story.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl">
                            {story.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-slate-100">
                    {/* Decorative Lead-in */}
                    <div className="w-16 h-1 bg-blue-600 mb-10 rounded-full"></div>

                    <div className="prose prose-lg md:prose-xl prose-slate max-w-none">
                        {paragraphs.map((paragraph, idx) => (
                            <p key={idx} className="leading-relaxed text-slate-700 mb-8 font-medium">
                                {idx === 0 ? (
                                    <>
                                        <span className="float-left text-5xl md:text-7xl font-black text-blue-600 leading-none pr-3 pb-2 pt-2 uppercase">
                                            {paragraph.charAt(0)}
                                        </span>
                                        {paragraph.slice(1)}
                                    </>
                                ) : (
                                    paragraph
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
