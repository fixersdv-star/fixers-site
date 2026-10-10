import Layout from '../components/Layout';
import { useStaggerReveal } from '../hooks/useReveal';
import { STATS } from '../data/site';

const projects = [
  {
    title: 'Virtual Study Room (VSR)',
    tags: ['Node.js', 'WebRTC', 'PeerJS', 'Own Product'],
    desc: 'Free virtual study platform with live video, Pomodoro timer, AI coach, and collaborative whiteboard. Built with Node.js, Express, SQLite, WebSocket, and PeerJS WebRTC. 25K+ active students.',
  },
  {
    title: 'NexusPost',
    tags: ['React', 'TypeScript', 'Supabase', 'In Dev'],
    desc: 'Social media automation platform currently in development. Schedule, publish, and analyze across all major platforms. Built with React, TypeScript, and Supabase.',
  },
  {
    title: 'Examify',
    tags: ['AI', 'EdTech', 'Own Product'],
    desc: "Pakistan's first AI-powered exam paper generation platform for private schools. UAE curricula focus. Built to help educators create quality assessments in minutes.",
  },
];

const stack = [
  'React',
  'Vue',
  'Laravel',
  'Node.js',
  'TypeScript',
  'Shopify',
  'WooCommerce',
  'Three.js',
  'WebGL',
  'Supabase',
  'SQLite',
  'WebSocket',
  'PeerJS',
];

export default function WorkPage() {
  const ref = useStaggerReveal<HTMLDivElement>();

  return (
    <Layout>
      <div ref={ref}>
        <section className="bg-[#050505] pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4 reveal">
              RECENT PROJECTS
            </p>
            <h1 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4 reveal">
              Work we shipped
            </h1>
            <p className="text-[#888] text-sm sm:text-[15px] reveal">Real projects, real code, real results.</p>
          </div>
        </section>

        <section className="bg-[#050505] pb-16 sm:pb-20 lg:pb-28">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="reveal group border border-[#1a1a1a] rounded-xl p-6 sm:p-8 bg-[#0a0a0a] hover:border-[#333] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <h3 className="text-white text-lg sm:text-xl font-semibold group-hover:text-[#E8734A] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-[#E8734A] bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#888] text-sm leading-[1.7]">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#E8734A] py-16 sm:py-20 lg:py-24">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="reveal text-center">
                  <p className="text-white text-[clamp(2.5rem,6vw,4rem)] font-bold leading-[1] mb-2">{stat.value}</p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-24 sm:py-32 lg:py-40">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="text-center mb-12 lg:mb-16 reveal">
              <p className="text-[#E8734A] text-xs font-semibold tracking-[0.15em] uppercase mb-4">OUR STACK</p>
              <h2 className="text-white text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.02em] mb-4">
                Built With
              </h2>
              <p className="text-[#888] text-sm sm:text-[15px]">
                The technologies and tools we use to bring your project to life.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="reveal text-sm text-[#aaa] border border-[#2a2a2a] rounded-full px-5 py-2.5 bg-[#0a0a0a] hover:border-[#E8734A] hover:text-[#E8734A] transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
