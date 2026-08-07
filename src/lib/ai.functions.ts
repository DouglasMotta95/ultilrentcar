import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const askAI = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        question: z.string(),
        driverData: z.record(z.any()),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { question, driverData } = data;

    // Simulate AI processing with driver context
    // In a real app, this would call the Lovable AI Gateway / LLM
    const context = `
      Motorista: ${driverData["name"] || "Motorista"}
      Meta Diária: R$ ${driverData["dailyGoal"] || 0}
      Consumo: ${driverData["consumption"] || 0} km/L
      Combustível: R$ ${driverData["fuelPrice"] || 0}
      Perfil: ${driverData["profile"] || "Equilibrado"}
    `;

    // Simple heuristic responses for demo
    let answer = "";
    const q = question.toLowerCase();

    if (q.includes("vale aceitar") || q.includes("aceito")) {
      const isGood = (driverData["score"] || 85) >= 70;
      answer = isGood 
        ? `Com base nos seus critérios (R$/km: ${driverData["minPerKm"]}) e no lucro líquido projetado, esta corrida é altamente recomendada. Ela contribui bem para sua meta de ${driverData["dailyGoal"]}.`
        : "Esta corrida está abaixo dos seus critérios ideais. O tempo de deslocamento ou o valor por km não compensam o desgaste do veículo neste momento.";
    } else if (q.includes("meta")) {
      answer = `Você está a aproximadamente 65% da sua meta de R$ ${driverData["dailyGoal"]}. Se mantiver o ritmo atual em regiões de alta demanda, deve concluir em mais 3 horas.`;
    } else if (q.includes("lucro")) {
      answer = "Seu lucro real hoje está otimizado. Você evitou 3 corridas 'vermelhas' e priorizou trajetos com asfalto melhor, reduzindo custos de manutenção.";
    } else {
      answer = "Analisando seu histórico e preferências de terreno/distância, recomendo focar em corridas curtas no centro para maximizar o giro na próxima hora.";
    }

    return {
      answer,
      timestamp: new Date().toISOString(),
    };
  });
