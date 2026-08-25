import { Seo } from '@/components/common/Seo'
import { LazyImage } from '@/components/common/LazyImage'
import { FeaturedPackages } from '@/features/home/components/FeaturedPackages'
import { HeroSearch } from '@/features/home/components/HeroSearch'
import { RecommendedSection } from '@/features/home/components/RecommendedSection'
import { StyleCategories } from '@/features/home/components/StyleCategories'
import { TestimonialsSection } from '@/features/home/components/TestimonialsSection'
import { TrendingDestinations } from '@/features/home/components/TrendingDestinations'
import { WhyChooseUs } from '@/features/home/components/WhyChooseUs'

export default function HomePage() {
  return (
    <div>
      <Seo description="Discover unforgettable destinations, compare travel packages, and book your next trip with Wayfarer." />

      <section className="relative flex min-h-[34rem] items-end overflow-hidden sm:min-h-[38rem]">
        <LazyImage
          src="https://picsum.photos/seed/wayfarer-hero/1920/1080"
          alt=""
          loading="eager"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-slate-900/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
          <h1 className="max-w-2xl font-display text-4xl font-bold text-white sm:text-5xl">
            Your Next Journey Starts Here
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/90">
            Explore unforgettable destinations and experiences, curated for every kind of traveler.
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </section>

      <StyleCategories />
      <TrendingDestinations />
      <FeaturedPackages />
      <RecommendedSection />
      <WhyChooseUs />
      <TestimonialsSection />
    </div>
  )
}
