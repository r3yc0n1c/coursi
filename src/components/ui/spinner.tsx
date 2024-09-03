import type React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="animate-ping rounded-full h-10 w-10 border-2 border-green-500"/>
    );
};

export default Spinner;