import { PiHandGrabbing } from "react-icons/pi";
import { BsBookmarkCheck } from "react-icons/bs";
import { LiaBookReaderSolid } from "react-icons/lia";
import ServiceCard from "./ServiceCard";

function Service() {
  return (
    <section
      className="bg-gradient-to-r from-[#0F123F] to-[#1E2A5F] py-16 sm:py-24"
      id="services"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-12">
          Our Services
        </h2>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Place Hold"
            icon={<PiHandGrabbing className="text-white text-3xl" />}
          >
            <p className="text-gray-600 text-base leading-relaxed">
              Placing a hold on a book allows you to join the queue to borrow it
              as soon as it becomes available. Once the book is returned and
              checked in, you&apos;ll be notified, and it will be ready for you
              to pick up.
            </p>
          </ServiceCard>

          <ServiceCard
            title="Check out"
            icon={<BsBookmarkCheck className="text-white text-3xl" />}
          >
            <p className="text-gray-600 text-base leading-relaxed">
              Checking out a book is simple! Once you&apos;ve found your next
              read, just proceed to checkout, and the book is yours to borrow
              for a set period. Enjoy your reading, and don&apos;t forget to
              return it on time!
            </p>
          </ServiceCard>

          <ServiceCard
            title="Read online"
            icon={<LiaBookReaderSolid className="text-white text-3xl" />}
          >
            <p className="text-gray-600 text-base leading-relaxed">
              Accessing a book online allows you to dive into your reading
              instantly. Simply borrow the eBook, and start reading right from
              your device, anytime and anywhere, without waiting!
            </p>
          </ServiceCard>
        </div>
      </div>
    </section>
  );
}

export default Service;
