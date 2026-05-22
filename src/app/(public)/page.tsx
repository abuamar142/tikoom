import { LandingHero } from "@/components/organisms/LandingHero/LandingHero";
import { LandingSearch } from "@/components/organisms/LandingSearch/LandingSearch";
import { LandingEvents } from "@/components/organisms/LandingEvents/LandingEvents";
import { LandingCategories } from "@/components/organisms/LandingCategories/LandingCategories";
import { LandingHowItWorks } from "@/components/organisms/LandingHowItWorks/LandingHowItWorks";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingSearch />
      <LandingEvents />
      <LandingCategories />
      <LandingHowItWorks />

      {/* CTA Banner */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 sm:p-12 lg:p-16 text-center">
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Punya Event Menarik?
              </h2>
              <p className="mt-4 text-lg text-primary-100 max-w-2xl mx-auto">
                Daftarkan eventmu di Tikoom dan jangkau ribuan calon peserta.
                Platform kami membantu eventmu lebih dikenal.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/register">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                    className="bg-white text-primary-700 hover:bg-surface-100 border-0"
                  >
                    Mulai Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
