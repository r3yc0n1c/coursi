import type React from 'react';
import { cn } from '@/lib/utils';


interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> { }

const H1: React.FC<HeadingProps> = ({ children, className, ...props }) => {
    return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
        </h1>
    );
};

const H2: React.FC<HeadingProps> = ({ children, className, ...props }) => {
    return (
        <h2 className={cn(className, "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0")}>
            {children}
        </h2>
    );
};

const H3: React.FC<HeadingProps> = ({ children, className, ...props }) => {
    return (
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {children}
        </h3>
    );
};

const H4: React.FC<HeadingProps> = ({ children, className, ...props }) => {
    return (
        <h4 className={`text-xl font-normal mb-2 ${className}`} {...props}>
            {children}
        </h4>
    );
};

export { H1, H2, H3, H4 };