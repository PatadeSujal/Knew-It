

const nutrientThresholds = [
  {
    name: "protein",
    unit: "g",
    green: 20, // High protein
    amber: 10, // Moderate protein
    red: 0, // Low protein
  },
  {
    name: "fats",
    unit: "g",
    green: 1.5, // Low saturated fat
    amber: 5, // Moderate saturated fat
    red: Infinity, // High saturated fat
  },
  {
    name: "trans-fat",
    unit: "g",
    green: 3, // Low total fat
    amber: 17.5, // Moderate total fat
    red: Infinity, // High total fat
  },
  {
    name: "sugars",
    unit: "g",
    green: 5, // Low sugars
    amber: 22.5, // Moderate sugars
    red: Infinity, // High sugars
  },
];

export default function getNutrientColor(nutrientName, valuePer100g) {
  const nutrient = nutrientThresholds.find((n) => n.name === nutrientName);
  if (!nutrient) return null;

  if (nutrientName === "protein") {
    if (valuePer100g >= nutrient.green) return "green";
    if (valuePer100g >= nutrient.amber) return "amber";
    return "red";
  } else {
    if (valuePer100g <= nutrient.green) return "green";
    if (valuePer100g <= nutrient.amber) return "amber";
    return "red";
  }
}

export function sumNutrient(key, arr) {
  return arr.reduce((sum, item) => sum + (parseFloat(item[key]) || 0), 0);
}

export const getChartOptions = () => ({
  chart: {
    type: "donut",
    height: 320,
  },
  labels: ["Protein", "Saturated Fat", "Sugars"],
  colors: ["#008236", "#f8cb47", "#ff0033"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            label: "Total",
            formatter: (w) =>
              w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(1) +
              "g",
          },
        },
      },
    },
  },
  legend: {
    position: "bottom",
  },
});

export function setTraficLabel(name) {
  if (name === "protein") {
    return "proteins_100g";
  }
  if (name === "fats") {
    return "saturated-fat_100g";
  }
  if (name === "trans-fats") {
    return "trans-fat_100g";
  }
  if (name === "sugars") {
    return "sugars_100g";
  }
}

export function calculateNutritionScore(protein, saturatedFats, sugars) {
  const total = protein + saturatedFats + sugars;

  // Normalize to percentages
  const proteinPct = (protein / total) * 100;
  const fatPct = (saturatedFats / total) * 100;
  const sugarPct = (sugars / total) * 100;

  // Score logic (higher protein = good, lower fat/sugar = good)
  let score = 0;

  // Protein contribution
  if (proteinPct >= 40) score += 2;
  else if (proteinPct >= 25) score += 1.5;
  else if (proteinPct >= 15) score += 1;

  // Fat penalty
  if (fatPct <= 10) score += 2;
  else if (fatPct <= 25) score += 1;
  else score += 0;

  // Sugar penalty
  if (sugarPct <= 5) score += 1;
  else if (sugarPct <= 15) score += 0.5;

  return Math.min(5, parseFloat(score.toFixed(1)));
}

export const fetchData = async (nutrientValue) => {
    const response = await fetch("api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            'You are a nutrition analysis assistant. You will receive summed nutrient values (per 100g) for a grocery item. Based on this input, perform the following tasks using your own reasoning based on standard dietary guidelines:\n\n1. Classify each nutrient as "good", "moderate", or "bad" depending on whether it is healthy, acceptable, or concerning.\n\n2. Generate short, positive comments only if any nutrients are notably good (e.g., high protein, low sugar). If no nutrient is particularly good, return "no_positives".\n\n3. Generate short, negative comments for nutrients that are in the "bad" range (e.g., high sodium, excessive sugar).\n\n4. Provide 1–3 brief and relevant health tips to improve the overall nutrition of the item. Do not copy examples — generate your own based on the nutrient data.\n\nReturn the final output strictly as a JavaScript object, not JSON. Do not use triple backticks, and do not wrap it in quotes. Example:\n\n{\n  nutrient_status: {\n    carbohydrates_100g: "moderate",\n    cholesterol_100g: "good",\n    fat_100g: "bad"\n,  },\n  positive_comments: ["Low in cholesterol"],\n  negative_comments: ["High in saturated fat"],\n  health_tips: ["Use lower-fat ingredients", "Increase fiber content with whole grains"]\n} and be a strict nutrition analyser',
        },
        {
          role: "user",
          content: JSON.stringify(nutrientValue),
        },
      ],
    }),
  });
  const data = await response.json();
  return data;

};

export const positiveStatusStyles = {
  good: {
    text: "text-green-800",
    bg: "bg-green-100",
    dot: "bg-green-500",
    label: "Good",
  },
  moderate: {
    text: "text-yellow-800",
    bg: "bg-yellow-100",
    dot: "bg-yellow-500",
    label: "Moderate",
  },
  bad: {
    text: "text-red-800",
    bg: "bg-red-100",
    dot: "bg-red-500",
    label: "Bad",
  },
  unknown: {
    text: "text-gray-600",
    bg: "bg-gray-100",
    dot: "bg-gray-400",
    label: "Unknown",
  },
};
