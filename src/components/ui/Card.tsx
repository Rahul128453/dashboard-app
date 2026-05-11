type Props = {
    title: string;
    children: React.ReactNode;
};

const Card = ({ title, children }: Props) => {
    return (
        <div className="bg-white rounded-[12px] p-[20px] shadow-sm">
            <div className="flex justify-between mb-4">
                <h3 className="font-semibold">{title}</h3>
                <span className="text-sm text-blue-500 cursor-pointer">
                    View Report
                </span>
            </div>
            {children}
        </div>
    );
};

export default Card;