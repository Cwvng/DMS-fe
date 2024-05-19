import { FaArrowLeft } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
}
export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="px-5 py-2 flex items-center gap-2 border-b-1 border-solid border-border">
      <FaArrowLeft className="text-primary hover:cursor-pointer" onClick={() => navigate(-1)} />
      <span className="text-xl font-bold">{title}</span>
    </div>
  );
};
