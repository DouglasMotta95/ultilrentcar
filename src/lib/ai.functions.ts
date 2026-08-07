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
      Motorista: ${driverData.name || "Motorista"}
      Meta Diária: R$ ${driverData.dailyGoal || 0}
      Consumo: ${driverData.consumption || 0} km/L
      Combustível: R$ ${driverData.fuelPrice || 0}
      Perfil: ${driverData.profile || "Equilibrado"}
    `;

    // Simple heuristic responses for demo
    let answer = "";
    const q = question.toLowerCase();

    if (q.includes("vale aceitar") || q.includes("aceito")) {
      answer = "Com base nos seus critérios de R$/km e seu perfil equilibrado, esta corrida parece lucrativa. O lucro líquido estimado após combustível e desgaste é positivo.";
    } else if (q.includes("meta")) {
      answer = `Você está a aproximadamente 65% da sua meta de ${driverData.dailyGoal}. Se mantiver o ritmo atual, deve concluir em mais 3 horas.`;
    } else if (q.includes("lucro")) {
      answer = "Seu lucro real hoje está otimizado. Você evitou 3 corridas 'vermelhas' que teriam gerado prejuízo.";
    } else {
      answer = "Interessante pergunta! Analisando seus dados de hoje e configurações de custos, recomendo focar em corridas acima de R$ 2,00 por km na próxima hora.";
    }

    return {
      answer,
      timestamp: new Date().toISOString(),
    };
  });
