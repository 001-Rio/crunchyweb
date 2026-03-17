import Hero from "../src/components/hero";
import TopActorsHierarchy from "../src/components/TopMembersSlider"; // Pastikan path benar
import StageGallery from "../src/components/StageGallery";

export default function Page() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-sparkle-black text-white">
      
      <section className="h-screen snap-start overflow-hidden">
        <Hero />
      </section>

      {/* Layer 2: Hierarchy Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-hsr-gray/10 overflow-hidden px-4">
        <TopActorsHierarchy />
      </section>

      <section className="h-screen snap-start overflow-hidden">
        <StageGallery />
      </section>

    </main>
  );
}