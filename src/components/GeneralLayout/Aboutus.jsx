function Aboutus() {
  return (
    <section className="bg-gradient-to-r from-[#0F123F] to-[#1E2A5F] py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl overflow-hidden shadow-lg transform -skew-x-12 h-[70vh] w-[90%] mx-auto">
          {/* Image */}
          <img
            src="/img/nice.jpg"
            alt="Library"
            className="w-full h-full object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F123F]/70 to-[#1E2A5F]/70 flex items-center justify-center p-6 sm:p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                About Us
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                At OFAG Library, we are passionate about fostering a love for
                reading and learning. Our mission is to provide access to a
                diverse collection of books, eBooks, and resources that cater to
                all interests and age groups. Whether you&apos;re seeking
                knowledge, entertainment, or inspiration, we aim to create a
                welcoming space for everyone to explore and grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Aboutus;
