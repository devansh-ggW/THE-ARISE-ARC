import { HeroSection, WhatIsSection, PhilosophySection, AttributesSection, ArcsSection } from '../sections/IdentitySections';
import { JourneyPreview } from '../sections/JourneyPreview';
import { QuestSection, ProgressionSection, ComebackSection, BossSection } from '../sections/ProgressionSections';
import { TrainingSection, FocusSection, RecoverySection } from '../sections/PracticeSections';
import { BookSection } from '../sections/BookSection';
import { PurchaseSection, FAQSection, ContactCallout } from '../sections/ClosingSections';

export default function HomePage() {
  return <>
    <HeroSection />
    <WhatIsSection />
    <PhilosophySection />
    <AttributesSection />
    <ArcsSection />
    <JourneyPreview />
    <QuestSection />
    <ProgressionSection />
    <ComebackSection />
    <BossSection />
    <TrainingSection />
    <FocusSection />
    <RecoverySection />
    <BookSection />
    <PurchaseSection />
    <FAQSection />
    <ContactCallout />
  </>;
}
