import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Vladislav Titov",
    designation: "C.E.O & Software Engineer",
    image:
      "/vlad.jpeg",
  },
  {
    id: 2,
    name: "Stepan Nikulenko",
    designation: "C.T.O & Mobile Engineer",
    image:
      "/step.jpeg",
  },
  {
    id: 3,
    name: "Noelia Conti",
    designation: "C.F.O & Testing Engineer",
    image:
      "/noe.jpeg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="flex relative justify-center text-start">
      <AnimatedTooltip items={people} />
    </div>
  );
}
