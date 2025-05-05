function ServiceCard({ children, title, icon }) {
  return (
    <div className="bg-white space-y-6 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Icon */}
      <div className="p-4 bg-[#0F123F] rounded-lg inline-block">{icon}</div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#0F123F]">{title}</h3>

      {/* Description */}
      {children}
    </div>
  );
}

export default ServiceCard;
