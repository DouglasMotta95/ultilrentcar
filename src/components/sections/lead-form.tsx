import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const formSchema = z.object({
  full_name: z.string().min(3, "Nome muito curto"),
  cpf: z.string().min(11, "CPF inválido"),
  birth_date: z.string().min(10, "Data inválida"),
  cellphone: z.string().min(10, "Celular inválido"),
  landline: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  cep: z.string().min(8, "CEP inválido"),
  street: z.string().min(3, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  profession: z.string().min(3, "Profissão obrigatória"),
  platform: z.enum(["Uber", "99", "inDrive", "Outro"]),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  ref_phone_1: z.string().min(10, "Telefone de referência obrigatório"),
  ref_phone_2: z.string().min(10, "Telefone de referência obrigatório"),
  vehicle_interest: z.string().optional(),
  cnh_url: z.any().optional(),
  residence_proof_url: z.any().optional(),
  criminal_record_url: z.any().optional(),
});

export function LeadForm() {
  const navigate = useNavigate();
  const submitLeadFn = useServerFn(submitLead);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "Uber",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await submitLeadFn({ data: values });
      toast.success("Cadastro enviado com sucesso! Aguarde nosso contato.");
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Erro ao enviar cadastro. Tente novamente.");
    }
  }

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              step >= i ? "bg-primary shadow-[0_0_10px_rgba(34,211,238,0.5)]" : "bg-black/5"
            }`}
          />
        ))}
      </div>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cellphone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular (WhatsApp)</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="button" className="w-full" onClick={nextStep}>Próximo Passo</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-xl font-bold mb-4">Endereço</h2>
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Apto, Bloco, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="UF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>Voltar</Button>
              <Button type="button" className="flex-1" onClick={nextStep}>Próximo Passo</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-xl font-bold mb-4">Dados Profissionais & Referências</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissão</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Motorista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataforma</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a plataforma" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Uber">Uber</SelectItem>
                        <SelectItem value="99">99</SelectItem>
                        <SelectItem value="inDrive">inDrive</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ref_phone_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referência 1 (Telefone)</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ref_phone_2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referência 2 (Telefone)</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>Voltar</Button>
              <Button type="button" className="flex-1" onClick={nextStep}>Próximo Passo</Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
            <h2 className="text-xl font-bold mb-4">Documentação (Fotos/PDF)</h2>
            <div className="grid grid-cols-1 gap-6">
              <FormItem>
                <FormLabel>CNH (Frente e Verso)</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*,application/pdf" className="bg-background border-border" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Comprovante de Residência (Atualizado)</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*,application/pdf" className="bg-background border-border" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Antecedentes Criminais</FormLabel>
                <FormControl>
                  <Input type="file" accept="image/*,application/pdf" className="bg-background border-border" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>Voltar</Button>
              <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
              </Button>
            </div>
          </div>
        )}
      </form>
      </Form>
    </div>
  );
}
