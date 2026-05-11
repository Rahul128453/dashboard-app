import React from 'react';
import { useGetRatingsQuery } from '../dashboardApi';
import type { RatingData } from '../types';

interface RatingCircleProps {
    color: string;
    percentage: number;
    label: string;
    top: string;
    left: string;
    size: string;
}

const RatingCircle = ({ color, percentage, label, top, left, size }: RatingCircleProps) => (
    <div
        style={{
            position: 'absolute',
            top,
            left,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            border: '4px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}
    >
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{percentage}%</div>
        <div style={{ fontSize: '14px', marginTop: '4px' }}>{label}</div>
    </div>
);

const RatingChart: React.FC = () => {
    const { data: ratingData, isLoading, isError } = useGetRatingsQuery(null);

    if (isLoading) {
        return (
            <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
                Loading rating data...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
                Error loading rating data.
            </div>
        );
    }

    const ratings: RatingData[] = ratingData || [];

    return (
        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <h2 className="text-lg font-semibold mb-1">Your Rating</h2>
            <p className="text-sm text-gray-400 mb-10">
                Customer ratings for hygiene, packaging, and taste.
            </p>

            <div className="relative w-full max-w-[400px] h-[350px] mx-auto">
                {ratings.map((rating) => (
                    <RatingCircle
                        key={rating.label}
                        color={rating.color}
                        percentage={rating.percentage}
                        label={rating.label}
                        top={rating.top}
                        left={rating.left}
                        size={rating.size}
                    />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-gray-500">
                {ratings.map((rating) => (
                    <div key={rating.label} className="flex flex-col items-center gap-1">
                        <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: rating.color }}
                        />
                        <span>{rating.label}</span>
                        <span className="text-gray-400">{rating.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingChart;