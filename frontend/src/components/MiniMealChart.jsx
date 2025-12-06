import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

/**
 * Stacked macro bar with inline segment labels.
 * Shows Protein / Carbs / Fat values + short name inside each colored segment.
 * Automatically hides label if segment too small.
 */
export const MacroStackBar = ({ meal }) => {
  const protein = meal?.protein || 0;
  const carbs = meal?.carbohydrates || 0;
  const fat = meal?.fat || 0;
  const total = protein + carbs + fat || 1;

  const data = [
    {
      label: "Macros",
      Protein: protein,
      Carbs: carbs,
      Fat: fat,
    },
  ];

  // Decide if value wide enough to show label (percentage threshold)
  const showLabel = (value) => (value / total) * 100 >= 10; // hide if <10%

  // Reusable label renderer
  const renderSegmentLabel = (props, shortName) => {
    const { x, y, width, height, value, fill } = props;
    if (!showLabel(value) || height < 12) return null;
    return (
      <g>
        <text
          x={x + width / 2}
          y={y + height / 2 + 1}
          fill={fill === "#FBBF24" ? "#4a3b00" : "#ffffff"}
          fontSize={11}
          fontWeight="600"
          textAnchor="middle"
          pointerEvents="none"
        >
          {shortName} {value}g
        </text>
      </g>
    );
  };

  return (
    <div className="w-full h-56">
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
        >
          <XAxis type="number" hide domain={[0, total]} />
          <YAxis type="category" dataKey="label" hide />
          <Tooltip
            formatter={(v, n) => [
              `${v}g (${((v / total) * 100).toFixed(1)}%)`,
              n,
            ]}
            contentStyle={{ fontSize: 12 }}
          />

          <Bar
            dataKey="Protein"
            stackId="a"
            fill="#10B981"
            radius={[4, 0, 0, 4]}
            isAnimationActive={true}
          >
            <LabelList
              dataKey="Protein"
              content={(props) => renderSegmentLabel(props, "Protein")}
            />
          </Bar>

          <Bar
            dataKey="Carbs"
            stackId="a"
            fill="#FBBF24"
            isAnimationActive={true}
          >
            <LabelList
              dataKey="Carbs"
              content={(props) => renderSegmentLabel(props, "Carbs")}
            />
          </Bar>

          <Bar
            dataKey="Fat"
            stackId="a"
            fill="#F97316"
            radius={[0, 4, 4, 0]}
            isAnimationActive={true}
          >
            <LabelList
              dataKey="Fat"
              content={(props) => renderSegmentLabel(props, "Fat")}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between mt-2 text-[11px] px-1 opacity-70">
        <span>Protein: {protein}g</span>
        <span>Carbs: {carbs}g</span>
        <span>Fat: {fat}g</span>
      </div>
    </div>
  );
};

// Default export (can extend later)
const MiniMealChart = ({ meal }) => <MacroStackBar meal={meal} />;

export default MiniMealChart;
