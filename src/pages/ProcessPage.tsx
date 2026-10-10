import { Code, Lightbulb, MessageSquare, Rocket } from 'lucide-react';
import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';

const steps = [
  {
    icon: <MessageSquare size={20} />,
    step: '01',
    title: 'Discovery',
    desc: 'We dig deep into your business — goals, audience, competition, and pain points. Understanding comes before building.',
  },
  {
    icon: <Lightbulb size={20} />,
    step: '02',
    title: 'Strategy',
    desc: 'We plan the technical architecture and design approach. Every feature is justified, every decision purposeful.',
  },
  {
    icon: <Code size={20} />,
    step: '03',
    title: 'Development',
    desc: 'Custom code, no templates. We build with weekly demos so you see progress in real-time.',
  },
  {
    icon: <Rocket size={20} />,
    step: '04',
    title: 'Launch & Growth',
    desc: 'Deploy, monitor, optimize. We stay for the long haul with maintenance, updates, and continuous improvement.',
  },
];

const reasons = [
  {
    num: '1',
    title: 'Custom Code, Zero Templates',
    desc: 'Every website we build is hand-coded from scratch. No WordPress themes. No page builders. Just clean, fast, scalable code tailored to your business.',
  },
  {
    num: '2',
    title: 'Built for US Small Businesses',
    desc: 'We understand the US market. From local SEO to conversion-focused design, we build digital solutions that help small businesses compete and win.',
  },
  {
    num: '3',
    title: 'Full-Stack in One Team',
    desc: 'From frontend design to backend APIs, from social media strategy to SEO — you get everything under one roof. No outsourcing, no coordination headaches.',
  },
];

export default function ProcessPage() {
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">HOW WE WORK</p>
            <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4 reveal">
              Our Process
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] max-w-xl reveal">
              A proven workflow that takes you from idea to launch — and beyond.
            </p>
          </div>
        </section>

        <section className="bg-[#050505] pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
              <div className="hidden lg:block absolute top-[24px] left-[12.5%] right-[12.5%] h-[1px] bg-[#1a1a1a]" />
              {steps.map((step) => (
                <div key={step.step} className="reveal text-center relative">
                  <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#E8734A] mx-auto mb-6 relative z-10">
                    {step.icon}
                  </div>
                  <p className="text-[#E8734A] text-[10px] font-semibold tracking-[0.15em] uppercase mb-2">
                    STEP {step.step}
                  </p>
                  <h3 className="text-white text-lg font-semibold mb-3">{step.title}</h3>
                  <p className="text-[#888] text-sm leading-[1.7] max-w-[260px] mx-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24 sm:py-32 lg:py-40 border-t border-[#1a1a1a]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28">
              <div className="reveal">
                <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">WHY FIXERS</p>
                <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  Your digital growth
                  <br />
                  <em className="font-serif italic">partner</em>
                </h2>
              </div>
              <div className="reveal border border-[#1a1a1a] rounded-2xl p-6 sm:p-8 lg:p-10 bg-[#0a0a0a]">
                <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">OUR MISSION</p>
                <p className="text-white text-lg sm:text-xl lg:text-2xl font-medium leading-[1.4] mb-6 italic font-serif">
                  "Fueling Business Growth Through Optimized Digital Ecosystems"
                </p>
                <p className="text-[#888] text-sm sm:text-[15px] leading-[1.7] mb-8">
                  We believe every business deserves a digital presence that works as hard as they do. From custom
                  websites to social media dominance, we build the infrastructure that turns clicks into customers.
                </p>
                <div className="flex items-center gap-3 pt-6 border-t border-[#1a1a1a]">
                  <div className="flex -space-x-2">
                    <span className="w-8 h-8 rounded-full bg-[#E8734A] flex items-center justify-center text-white text-xs font-bold">
                      AW
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#555] flex items-center justify-center text-white text-xs font-bold">
                      AM
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Mr. Abdul Wahab &amp; Ahmad Murtaza</p>
                    <p className="text-[#888] text-xs">Founders, Fixers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {reasons.map((reason) => (
                <div
                  key={reason.num}
                  className="reveal grid grid-cols-1 sm:grid-cols-[48px_1fr] gap-4 sm:gap-6 items-start"
                >
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#E8734A] text-sm font-bold">
                    {reason.num}
                  </span>
                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">{reason.title}</h3>
                    <p className="text-[#888] text-sm sm:text-[15px] leading-[1.7]">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
