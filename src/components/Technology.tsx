import SectionLabel from "./ui/SectionLabel";
import {
  SiReact,
  SiNextdotjs,
  SiHtml5,

  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiFigma,
} from "react-icons/si";

const techStack = {
  Frontend: [
    { name: "React.js", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "HTML5", icon: SiHtml5 },
   
    { name: "JavaScript", icon: SiJavascript },
  ],
  Backend: [
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Express.js", icon: SiExpress },
    { name: "PHP", icon: SiPhp },
  ],
  Database: [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "MySQL", icon: SiMysql },
    { name: "Firebase", icon: SiFirebase },
  ],
  "UI/UX": [
    { name: "Figma", icon: SiFigma },
  ],
};

export default function Technology() {
  return (
    <section
      id="technology"
      className="py-24 bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <SectionLabel>Technology Stack</SectionLabel>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Technologies We Use
          </h2>

          <p className="mt-4 text-slate-400">
            Modern technologies for scalable, secure and high-performance
            applications.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(techStack).map(([category, items]) => (
            <div
              key={category}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <h3 className="mb-6 text-xl font-semibold text-green-400">
                {category}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.name}
                      className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 p-4 hover:border-green-500 transition-all duration-300"
                    >
                      <Icon className="text-4xl text-green-400 mb-3" />

                      <span className="text-white text-sm text-center">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}